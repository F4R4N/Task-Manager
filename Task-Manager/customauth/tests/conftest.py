import pytest
from rest_framework.test import APIClient


@pytest.fixture
def unauthed_client():
    return APIClient()
