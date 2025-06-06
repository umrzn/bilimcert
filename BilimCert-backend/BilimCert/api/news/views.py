from ninja import Router
from fastapi import Request
from asgiref.sync import sync_to_async
from api.news.services.news_view import track_news_view, get_viewed_at, get_views_count

router = Router(tags=["News"])

def get_client_ip(request):
    xff = request.headers.get("X-Forwarded-For")
    if xff:
        return xff.split(",")[0]
    return request.META.get("REMOTE_ADDR")

@router.post("/view/{post_id}")
async def view_post(request: Request, post_id: int):
    ip = get_client_ip(request)
    counted = await sync_to_async(track_news_view)(post_id, ip)
    viewed_at = await sync_to_async(get_viewed_at)(post_id, ip)

    return {
        "view_counted": counted,
        "viewed_at": viewed_at.isoformat() if viewed_at else None
    }

@router.get("/view/{post_id}")
async def get_news_view_count(request, post_id: int):
    count = await sync_to_async(get_views_count)(post_id)
    return {"post_id": post_id, "views": count}
