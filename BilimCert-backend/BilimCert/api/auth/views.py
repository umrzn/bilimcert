from django.contrib.auth import get_user_model
from django.http import HttpRequest
from ninja import Router
from http import HTTPStatus
from .schemas import LoginSchema, RegisterSchema
from asgiref.sync import sync_to_async
from django.conf import settings
import httpx

User = get_user_model()
router = Router(tags=["Auth"])

login = sync_to_async(__import__("django.contrib.auth").contrib.auth.login)
logout = sync_to_async(__import__("django.contrib.auth").contrib.auth.logout)
RECAPTCHA_SECRET_KEY = settings.RECAPTCHA_PRIVATE_KEY


@router.post("/auth", auth=None)
async def auth_view(request: HttpRequest, data: LoginSchema):
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://www.google.com/recaptcha/api/siteverify",
            data={
                "secret": RECAPTCHA_SECRET_KEY,
                "response": data.recaptcha_token
            }
        )
    result = response.json()
    if not result.get("success"):
        return {
            "status": HTTPStatus.BAD_REQUEST,
            "response": "reCAPTCHA не пройдена"
        }

    user = await User.objects.filter(username=data.username).afirst()
    if not user or not await sync_to_async(user.check_password)(data.password):
        return {
            "status": HTTPStatus.FORBIDDEN,
            "response": "Неправильный логин или пароль."
        }

    await login(request, user)
    return {"status": HTTPStatus.OK}


@router.post("/registration", auth=None)
async def registration_view(request: HttpRequest, data: RegisterSchema):
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://www.google.com/recaptcha/api/siteverify",
            data={
                "secret": RECAPTCHA_SECRET_KEY,
                "response": data.recaptcha_token
            }
        )
    result = response.json()
    if not result.get("success"):
        return {
            "status": HTTPStatus.BAD_REQUEST,
            "response": "reCAPTCHA не пройдена"
        }

    if await User.objects.filter(username=data.username).aexists():
        return {
            "status": HTTPStatus.BAD_REQUEST,
            "response": f"Пользователь с логином {data.username} уже существует"
        }

    if await User.objects.filter(email=data.email).aexists():
        return {
            "status": HTTPStatus.BAD_REQUEST,
            "response": f"Пользователь с email {data.email} уже существует"
        }

    user = await sync_to_async(User.objects.create_user)(
        username=data.username,
        email=data.email,
        password=data.password,
    )

    if data.auth:
        await login(request, user)

    return {"status": HTTPStatus.OK}


@router.post("/logout")
async def logout_view(request: HttpRequest):
    await logout(request)
    return {"status": HTTPStatus.OK}
