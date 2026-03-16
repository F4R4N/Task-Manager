from rest_framework.routers import DefaultRouter
from .views import TaskViewSet, UserView
from django.urls import path
app_name = "task"

router = DefaultRouter()
router.register("task", TaskViewSet)

urlpatterns = [
    path("users", UserView.as_view(), name="user_view"),
]

urlpatterns += router.urls
