from rest_framework import serializers
from django.contrib.auth import get_user_model
from customauth.serializers import UserSerializer
from .models import Task

User = get_user_model()


class TaskSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    assignee = UserSerializer(read_only=True)
    assignee_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        source="assignee",
        write_only=True,
        required=False,
        allow_null=True
    )

    class Meta:
        model = Task
        fields = "__all__"
        read_only_fields = ["owner", "created_at", "updated_at"]
