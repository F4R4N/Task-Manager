import factory
from django.contrib.auth import get_user_model
from task.models import Task

User = get_user_model()


class UserFactory(factory.django.DjangoModelFactory):

    class Meta:
        model = User

    username = factory.Sequence(lambda n: f"user{n}")
    email = factory.LazyAttribute(lambda obj: f"{obj.username}@test.com")


class TaskFactory(factory.django.DjangoModelFactory):

    class Meta:
        model = Task

    title = factory.Sequence(lambda n: f"Task {n}")
    description = "Some description"
    owner = factory.SubFactory(UserFactory)
