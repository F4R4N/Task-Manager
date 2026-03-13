from rest_framework import serializers
from django.contrib.auth import get_user_model
from .utils import get_user_gravatar_link

User = get_user_model()
# TODO: add custom serializer for obtain pair view
# to contain user data. change the view as well.


class UserSerializer(serializers.ModelSerializer):
    gravatar = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ["id", "username", "email", "gravatar"]

    def get_gravatar(self, obj):
        return get_user_gravatar_link(obj.email)
