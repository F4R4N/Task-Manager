from rest_framework_simplejwt.views import (
    TokenObtainPairView, TokenBlacklistView, TokenRefreshView
)
from .serializers import LoginSerializer
from rest_framework.permissions import AllowAny
from rest_framework.response import Response


class LoginView(TokenObtainPairView):
    permission_classes = [AllowAny]
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        refresh_token = response.data.pop("refresh")

        response.set_cookie(
            key="refresh",
            value=refresh_token,
            httponly=True,
            secure=True,
            samesite="Lax",
            path="/auth/",
        )
        return response


class LogoutView(TokenBlacklistView):

    def post(self, request, *args, **kwargs):
        refresh = request.COOKIES.get("refresh")
        if refresh is None:
            return Response({"detail": "No refresh token found"}, status=401)

        request.data["refresh"] = refresh

        response = super().post(request, *args, **kwargs)
        response.delete_cookie("refresh_token")
        return response


class RefreshView(TokenRefreshView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        refresh = request.COOKIES.get("refresh")
        if refresh is None:
            return Response({"detail": "No refresh token found"}, status=401)

        request.data["refresh"] = refresh

        return super().post(request, *args, **kwargs)
