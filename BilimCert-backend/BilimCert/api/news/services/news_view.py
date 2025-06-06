from api.models import NewsView
from django.utils import timezone

def track_news_view(post_id: int, ip: str) -> bool:
    obj, created = NewsView.objects.get_or_create(
        post_id=post_id,
        ip_address=ip,
        defaults={"viewed_at": timezone.now()}
    )
    return created

def get_viewed_at(post_id: int, ip: str):
    try:
        return NewsView.objects.get(post_id=post_id, ip_address=ip).viewed_at
    except NewsView.DoesNotExist:
        return None

def get_views_count(post_id: int) -> int:
    return NewsView.objects.filter(post_id=post_id).count()
