from rest_framework import serializers
from django.conf import settings
from django.contrib.auth import get_user_model
import hashlib

User = get_user_model()
# TODO: add custom serializer for obtain pair view
# to contain user data. change the view as well.


class UserSerializer(serializers.ModelSerializer):
    gravatar = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ["id", "username", "email", "gravatar"]

    def get_gravatar(self, obj):
        email = obj.email.lower().encode("utf-8")
        hashed = hashlib.md5(email).hexdigest()
        return settings.GRAVATAR_URL + hashed + "?s=200&d=identicon"
