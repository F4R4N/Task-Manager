from rest_framework import serializers
from django.contrib.auth import get_user_model
from customauth.serializers import UserSerializer
from .models import Task, Project, ProjectMember

User = get_user_model()


class ProjectMemberSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = ProjectMember
        exclude = ["project"]


class ProjectSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    members = ProjectMemberSerializer(
        source="memberships", read_only=True, many=True
    )

    class Meta:
        model = Project
        fields = "__all__"
        read_only_fields = ["created_at", "updated_at"]

    def validate_name(self, value):
        user = self.context["request"].user

        exists = Project.objects.filter(owner=user, name=value).exists()

        if exists:
            raise serializers.ValidationError(
                "You already have a project with this name,"
                + " the project name should be unique."
            )

        return value


class TaskSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    assignee = UserSerializer(read_only=True)
    project = ProjectSerializer()
    assignee_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        source="assignee",
        write_only=True,
        required=False,
        allow_null=True,
    )

    class Meta:
        model = Task
        fields = "__all__"
        read_only_fields = ["owner", "created_at", "updated_at"]
