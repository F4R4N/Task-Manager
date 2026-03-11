from rest_framework.routers import DefaultRouter
from .views import TaskViewSet

app_name = "task"

router = DefaultRouter()
router.register("", TaskViewSet)

urlpatterns = router.urls
