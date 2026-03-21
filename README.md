# Task-Manager

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

### Backend

I separated the project into 2 apps (customauth and task) to separate concepts and allow expanding the two apps in the future more easily (add registration, user dashboard, and other user related actions)

#### Customauth

I used djangorestframework_simplejwt library to implement my authorization of user sung the JWT tokens. To perform this action I inherited the already existing classes for generating token, refreshing token, and blacklisting token and customized them to fit my need.

I inherited the TokenObtainPairView and edited it to not return the refresh token as part of the response and instead, set it as a httpOnly, Same-Site cookie. This will prevent refresh token being highjacked through XSS, as this wont expose the refresh token to javascript. and only send the access token on the response and save it in a temporary variable on js on the frontend. This is important because refresh tokens are meant to have long lifetime, and them being highjacked can lead to severe damage. On the other hand access tokens have short lifetime, even if the access token gets highjacked the damage can be controlled as they expire much sooner. The same-site lax flag also prevents cross site Request Forgery.

#### Task

##### UsersView

I added a new view called UsersView in my Task app to populate the assignee dropdown field when user is trying to create or update the assignee of a field. I understand that this will expose a list of all users in the DB to the end-user. This should be changed later to only show a list of users that are invited in the scope of project which the tasks are being created at. I did not specify project scopes at this stage of developement for tasks as it is not mentioned in the specification, and I tried to stay as loyal as possible to the original specification.

##### IsOwnerOrReadOnly Permission

This permission has the purpose to check if the obj owner is equal to authenticated user or not. If not the user is not able to use "unsafe" methods on that endpoint (patch, put, delete).

##### TaskSerializer

Made owner field read only as user should not be able to change the owner of the task object. I also made the assignee field readonly, and added assignee_id field to allow api user to be able to create/change the assignee with sending the user id of the assignee.

I used DRF filters to allow api user to be able to filter tasks based on task title and description content.
