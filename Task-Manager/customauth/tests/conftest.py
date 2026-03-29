import pytest
from rest_framework.test import APIClient
from task.tests.factories import UserFactory


@pytest.fixture
def unauthed_client():
    return APIClient()
