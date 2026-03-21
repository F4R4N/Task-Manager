import pytest
from django.urls import reverse
from rest_framework import status
from task.tests.factories import UserFactory, TaskFactory


@pytest.mark.django_db
class TestTaskViewSet:
    valid_task = {
        "title": "valid title",
        "description": "valid description",
        "priority": "high",
        "status": "in_progress",
    }
    invalid_task = {
        "title": "invalid task title",
        "description": "invalid task description",
        "priority": "invalid",
        "status": "invalid",
    }

    def test_list_tasks_unauthed(self, unauthed_client):
        response = unauthed_client.get(reverse("task:task-list"))
        assert response.status_code == status.HTTP_200_OK
        assert len(response.json()) == 0

        TaskFactory.create_batch(3)

        response = unauthed_client.get(reverse("task:task-list"))

        assert response.status_code == status.HTTP_200_OK
        assert len(response.json()) == 3

    def test_list_tasks_authed(self, authed_client):
        TaskFactory.create_batch(3)

        response = authed_client.get(reverse("task:task-list"))

        assert response.status_code == status.HTTP_200_OK
        assert len(response.json()) == 3

    def test_list_tasks_search_authed(self, authed_client):
        unique_title = "unique title"
        TaskFactory(title=unique_title)
        TaskFactory.create_batch(3)
        response = authed_client.get(
            f"{reverse("task:task-list")}?search='{unique_title}'"
        )

        assert response.status_code == status.HTTP_200_OK
        assert len(response.json()) == 1

    def test_list_tasks_search_unauthed(self, unauthed_client):
        unique_title = "unique title"
        TaskFactory(title=unique_title)
        TaskFactory.create_batch(3)
        response = unauthed_client.get(
            f"{reverse("task:task-list")}?search='{unique_title}'"
        )

        assert response.status_code == status.HTTP_200_OK
        assert len(response.json()) == 1

    def test_create_task_unauthed(self, unauthed_client):
        response = unauthed_client.post(
            reverse("task:task-list"), self.valid_task, format="json"
        )

        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_create_task_authed(self, authed_client):
        user = UserFactory()
        authed_client.force_authenticate(user=user)

        response = authed_client.post(
            reverse("task:task-list"), self.valid_task, format="json"
        )

        assert response.status_code == status.HTTP_201_CREATED
        data = response.json()
        assert data["owner"]["id"] == user.id
        assert data["title"] == "valid title"
        assert data["status"] == "in_progress"
        assert data["priority"] == "high"
        assert data["assignee"] is None

    def test_create_task_assignee(self, authed_client):
        user = UserFactory()
        authed_client.force_authenticate(user=user)
        assignee_username = "assignee1"
        assignee = UserFactory(username=assignee_username)
        body = self.valid_task
        body["assignee_id"] = assignee.id

        response = authed_client.post(
            reverse("task:task-list"), body, format="json"
        )

        assert response.status_code == status.HTTP_201_CREATED
        data = response.json()
        assert data["assignee"]["id"] == assignee.id
        assert data["assignee"]["username"] == assignee_username
        body["assignee_id"] = None

    def test_create_task_invalid_status(self, authed_client):
        user = UserFactory()
        authed_client.force_authenticate(user=user)

        response = authed_client.post(
            reverse("task:task-list"), self.invalid_task, format="json"
        )

        assert response.status_code == status.HTTP_400_BAD_REQUEST

    def test_create_task_invalid_priority(self, authed_client):
        user = UserFactory()
        authed_client.force_authenticate(user=user)

        response = authed_client.post(
            reverse("task:task-list"), self.invalid_task, format="json"
        )

        assert response.status_code == status.HTTP_400_BAD_REQUEST

    def test_task_update_valid(self, authed_client):
        user = UserFactory()
        authed_client.force_authenticate(user=user)
        task = TaskFactory(owner=user)

        response = authed_client.patch(
            reverse("task:task-detail", kwargs={"pk": task.id}),
            self.valid_task,
            format="json"
        )
        print(response.json())
        assert response.status_code == status.HTTP_200_OK
        assert response.data["title"] == self.valid_task["title"]
        assert response.data["description"] == self.valid_task["description"]
        assert response.data["status"] == self.valid_task["status"]
        assert response.data["priority"] == self.valid_task["priority"]

    def test_task_update_invalid_data(self, authed_client):
        user = UserFactory()
        authed_client.force_authenticate(user=user)
        task = TaskFactory(owner=user)

        response = authed_client.patch(
            reverse("task:task-detail", kwargs={"pk": task.id}),
            self.invalid_task,
            format="json"
        )
        assert response.status_code == status.HTTP_400_BAD_REQUEST

    def test_task_update_invalid_pk(self, authed_client):
        user = UserFactory()
        authed_client.force_authenticate(user=user)
        TaskFactory(owner=user)

        response = authed_client.patch(
            reverse("task:task-detail", kwargs={"pk": 10}),
            self.valid_task,
            format="json"
        )
        assert response.status_code == status.HTTP_404_NOT_FOUND

    def test_non_owner_cannot_update_task(self, authed_client):
        owner = UserFactory()
        unauthorized_user = UserFactory()

        task = TaskFactory(owner=owner)
        authed_client.force_authenticate(user=unauthorized_user)

        body = {"title": "Illegal Update"}

        response = authed_client.patch(
            reverse("task:task-detail", kwargs={"pk": task.id}),
            body,
            format="json"
        )

        assert response.status_code == status.HTTP_403_FORBIDDEN

# TODO: NON OWNER CANT DELETE
# TODO: OWNER SHOULD BE ABLE TO DELETE
# TODO: TEST CREATED AT AND UPDATED AT TIMES

