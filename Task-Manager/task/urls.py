from rest_framework.routers import DefaultRouter
from .views import TaskViewSet, UsersListView, ProjectViewSet
from django.urls import path
app_name = "task"

router = DefaultRouter()
router.register("task", TaskViewSet)
router.register("project", ProjectViewSet)

urlpatterns = [
    path("users", UsersListView.as_view(), name="user_view"),
]

urlpatterns += router.urls
