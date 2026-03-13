# Task-Mangement

## How To Setup

### Windows

1. Install python
2. Execute:

    ``` bash
    python -m venv venv
    source venv/Script/activate
    pip install -r requirements.txt
    python manage.py migrate
    python manage.py runserver
    ```

3. Open the url in your terminal on your browser (<http://127.0.0.1:8000/>)

### Linux

1. Install python
2. Execute:

    ``` bash
    python3 -m venv venv
    source venv/bin/activate
    pip3 install -r requirements.txt
    python3 manage.py migrate
    python3 manage.py runserver
    ```

3. Open the url in your terminal on your browser (<http://127.0.0.1:8000/>)

## Design Notes and Choices

I separated the project into 2 apps (customauth and task) to separate concepts and allow expanding the two apps in the future more easily (add registration, user dashboard, and other user related actions)

### Customauth

I used djangorestframework_simplejwt library to implement my authorization of user sung the JWT tokens. To perform this action I inherited the already existing classes for generating token, refreshing token, and blacklisting token and customized them to fit my need.

I inherited the TokenObtainPairView and edited it to not return the refresh token as part of the response and instead, set it as a httpOnly, Same-Site cookie. This will prevent refresh token being highjacked through XSS, as this wont expose the refresh token to javascript. and only send the access token on the response and save it in a temporary variable on js on the frontend. This is important because refresh tokens are meant to have long lifetime, and them being highjacked can lead to severe damage. On the other hand access tokens have short lifetime, even if the access token gets highjacked the damage can be controlled as they expire much sooner. The same-site flag also prevents cross site Request Forgery.

### Task

