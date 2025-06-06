from django.core.mail import EmailMessage
from ninja import Router, Form, File
from ninja.files import UploadedFile
from http import HTTPStatus
from django.conf import settings
import httpx

router = Router(tags=["Email"])

@router.post("/send", auth=None)
async def send_email(
    request,
    subject: str = Form(...),
    message: str = Form(...),
    to: str = Form(...),
    isFiles: bool = Form(False),
    file: UploadedFile = File(None),
    recaptcha_token: str = Form(...)
):
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://www.google.com/recaptcha/api/siteverify",
            data={
                "secret": settings.RECAPTCHA_PRIVATE_KEY,
                "response": recaptcha_token
            }
        )
    result = response.json()
    if not result.get("success"):
        return {
            "status": HTTPStatus.BAD_REQUEST,
            "message": "reCAPTCHA не пройдена"
        }

    is_files = request.POST.get("isFiles", "").lower() == "true"
    to_list = [email.strip() for email in to.split(",") if email.strip()]
    
    email = EmailMessage(
        subject=subject,
        body=message,
        from_email=settings.EMAIL_HOST_USER,
        to=to_list
    )

    if is_files and file:
        email.attach(file.name, file.read(), file.content_type)

    try:
        email.send()
        return {"status": HTTPStatus.OK, "message": "Письмо отправлено"}
    except Exception as e:
        return {"status": HTTPStatus.INTERNAL_SERVER_ERROR, "message": str(e)}
    