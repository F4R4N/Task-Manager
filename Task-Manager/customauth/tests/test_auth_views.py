import pytest
from django.urls import reverse
from rest_framework import status
from task.tests.factories import UserFactory, TaskFactory
from django.contrib.auth import get_user_model
import datetime


User = get_user_model()


@pytest.mark.django_db
class TestAuthViews:
    def test_login_successful_view(self, unauthed_client):
        user = User(username="test", email="test@gmail.com")
        user.set_password("1234")
        user.save()
        body = {
            "username": "test",
            "password": "1234"
        }
        response = unauthed_client.post(
            reverse("customauth:login"), body, format="json"
        )
        assert response.status_code == status.HTTP_200_OK
        headers = {
            "Authorization": f"Bearer {response.json()["access"]}"
        }
        assert response.cookies.get("refresh") is not None
        response = unauthed_client.get(
            reverse("customauth:account"), headers=headers, format="json"
        )
        assert response.json()["username"] == "test"

    def test_login_wrong_credentials_view(self, unauthed_client):
        user = User(username="test", email="test@gmail.com")
        user.set_password("1234")
        user.save()
        body = {
            "username": "test",
            "password": "12345"
        }
        response = unauthed_client.post(reverse("customauth:login"), body, format="json")
        assert response.status_code == status.HTTP_401_UNAUTHORIZED
        assert response.cookies.get("refresh") is None

    def test_login_wrong_fields_view(self, unauthed_client):
        user = User(username="test", email="test@gmail.com")
        user.set_password("1234")
        user.save()
        body = {
            "usernam": "test",
            "password": "12345"
        }
        response = unauthed_client.post(reverse("customauth:login"), body, format="json")
        assert response.status_code == status.HTTP_400_BAD_REQUEST
