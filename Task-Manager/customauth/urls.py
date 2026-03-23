from django.urls import path
from .views import LoginView, LogoutView, RefreshView, AccountView

app_name = "customauth"

urlpatterns = [
    path("login/", LoginView.as_view(), name="login"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("refresh/", RefreshView.as_view(), name="refresh"),
    path("account/", AccountView.as_view(), name="account"),
]
