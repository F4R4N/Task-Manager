from rest_framework import serializers
from .models import Task


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = (
            "title",
            "description",
            "is_owner",
            "status",
            "assignee",
            "priority",
            "created_at",
            "updated_at",
        )
