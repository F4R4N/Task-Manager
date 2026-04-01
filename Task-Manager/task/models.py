from django.db import models
from django.contrib.auth import get_user_model
from django.core.validators import MinLengthValidator

User = get_user_model()


class ProjectMember(models.Model):
    class Role(models.TextChoices):
        ADMIN = "admin", "Admin"
        MEMBER = "member", "Member"
        OWNER = "owner", "Owner"

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    project = models.ForeignKey(
        "Project", on_delete=models.CASCADE, related_name="memberships"
    )
    role = models.CharField(
        max_length=10, choices=Role.choices, default=Role.MEMBER
    )

    class Meta:
        unique_together = ("user", "project")


class Project(models.Model):
    name = models.CharField(
        max_length=60,
        validators=[MinLengthValidator(
            5, "Project name mist be at least 5 characters long."
        )],
        unique=True,
        blank=False
    )
    description = models.TextField(blank=True, null=True)
    members = models.ManyToManyField(User, through=ProjectMember)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Task(models.Model):

    class Status(models.TextChoices):
        TODO = "todo", "Todo"
        IN_PROGRESS = "in_progress", "In Progress"
        REVIEW = "review", "Review"
        DONE = "done", "Done"

    class Priority(models.TextChoices):
        LOW = "low", "Low"
        MEDIUM = "medium", "Medium"
        HIGH = "high", "High"

    title = models.CharField(
        max_length=100,
        validators=[MinLengthValidator(
            5, "title must be at least 5 characters long."
        )]
    )
    description = models.TextField(blank=True, null=True)
    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="owned_tasks"
    )
    project = models.ForeignKey(
        Project, on_delete=models.CASCADE,
        related_name="project_tasks",
    )
    status = models.CharField(
        max_length=20, choices=Status.choices, default=Status.TODO
    )
    assignee = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True,
        related_name="assigned_tasks"
    )
    priority = models.CharField(
        max_length=20,
        choices=Priority.choices,
        default=Priority.MEDIUM
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
