from django.conf import settings
import hashlib


def get_user_gravatar_link(email: str) -> str:
    email = email.lower().encode("utf-8")
    hashed = hashlib.md5(email).hexdigest()
    return settings.GRAVATAR_URL + hashed + "?s=32&d=identicon"
