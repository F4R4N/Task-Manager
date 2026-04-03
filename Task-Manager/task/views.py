from django.contrib.auth import get_user_model
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import (
    IsAuthenticatedOrReadOnly, IsAuthenticated
)
from rest_framework import filters
from rest_framework.generics import ListAPIView
from .serializers import TaskSerializer, ProjectSerializer
from .permissions import IsOwnerOrReadOnly, IsProjectMember
from .models import Task, Project, ProjectMember
from customauth.serializers import UserSerializer

User = get_user_model()


class TaskViewSet(ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    ordering = ["-created_at"]
    filter_backends = [filters.SearchFilter]
    search_fields = ["title", "description"]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class UsersListView(ListAPIView):
    permission_classes = [IsAuthenticated, ]
    queryset = User.objects.all()
    serializer_class = UserSerializer


class ProjectViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated, IsProjectMember]
    ordering = ["-created_at"]
    filter_backends = [filters.SearchFilter]
    search_fields = ["name"]

    def perform_create(self, serializer):
        project = serializer.save(owner=self.request.user)
        ProjectMember.objects.create(
            user=self.request.user,
            project=project,
            role=ProjectMember.Role.OWNER
        )

    def get_queryset(self):
        return Project.objects.filter(members=self.request.user)
