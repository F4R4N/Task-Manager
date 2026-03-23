from django.contrib.auth import get_user_model
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import (
    IsAuthenticatedOrReadOnly, IsAuthenticated
)
from rest_framework import filters
from rest_framework.generics import ListAPIView
from .serializers import TaskSerializer
from .permissions import IsOwnerOrReadOnly
from .models import Task
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


class UsersView(ListAPIView):
    permission_classes = [IsAuthenticated, ]
    queryset = User.objects.all()
    serializer_class = UserSerializer
