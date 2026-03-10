from rest_framework import serializers
from .models import Task


class TaskSerializer(serializers.ModelSerializer):
    is_owner = serializers.SerializerMethodField()

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

    def get_is_owner(self, obj):
        request = self.context.get("request")
        return request.user == obj.owner
