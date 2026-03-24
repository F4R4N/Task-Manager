from rest_framework.permissions import BasePermission, SAFE_METHODS
from .models import ProjectMember


class IsOwnerOrReadOnly(BasePermission):
    """
    Only allow owner of the task to use unsafe methods.
    """

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True

        return obj.owner == request.user


class IsProjectMember(BasePermission):
    """
    Only allow members of the project to access the view.
    """

    def has_object_permission(self, request, view, obj):
        user = request.user

        if not user.is_authenticated:
            return False

        return ProjectMember.objects.filter(
            project=obj,
            user=user,
        ).exists()
