import pytest
from django.urls import reverse
from rest_framework import status
from task.tests.factories import UserFactory


@pytest.mark.django_db
class TestUserListView:
    def test_user_list_allowed_only(self, authed_client):
        user = UserFactory()
        post = authed_client.post(reverse("task:user_view"))
        delete = authed_client.delete(
            f"{reverse("task:user_view")}/{user.id}/"
        )
        edit = authed_client.patch(f"{reverse("task:user_view")}/{user.id}/")
        detail = authed_client.get(f"{reverse("task:user_view")}/{user.id}/")
        lst = authed_client.get(reverse("task:user_view"))
        assert post.status_code == status.HTTP_405_METHOD_NOT_ALLOWED
        assert delete.status_code == status.HTTP_404_NOT_FOUND
        assert edit.status_code == status.HTTP_404_NOT_FOUND
        assert detail.status_code == status.HTTP_404_NOT_FOUND
        assert lst.status_code == status.HTTP_200_OK
        assert len(lst.data) == 2  # authed user + user object I created above

    def test_unauthenticated_users_not_allowed(self, unauthed_client):
        res = unauthed_client.get(reverse("task:user_view"))
        assert res.status_code == status.HTTP_401_UNAUTHORIZED
