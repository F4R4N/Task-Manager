# Task-Manager

## How To Run Backend

1. Install python
2. Execute

    ``` bash
        cd Task-Manager
        touch .env
    ```

3. add these lines in the .env file and configure accordingly:

    ``` bash
    SECRET_KEY=secret_key
    ALLOWED_HOSTS=127.0.0.1, localhost
    CORS_ALLOWED_ORIGINS=http://localhost:5173
    ```

4. Execute:

    ``` bash
    python3 -m venv venv (for windows: python -m venv venv)
    source venv/bin/activate (for windows: source venv\Scripts\activate)
    pip3 install -r requirements.txt (for windows: pip install -r requirements.txt)
    python3 manage.py migrate (for windows: python manage.py migrate)
    python3 manage.py runserver (for windows: python manage.py runserver)
    ```

5. Open the url in your terminal on your browser (<http://127.0.0.1:8000/>)

## How To Run UI

1. `cd Task-Manager-UI`
2. `echo "VITE_API_BASE="http://127.0.0.1:8000" > .env`
3. `npm run dev`

## How to test

1. Navigate to the root directory of the backend project (Task-Management)
2. run `pytest`

## Design Notes and Choices

### Backend

I separated the project into 2 apps (customauth and task) to separate concepts and allow expanding the two apps in the future more easily (add registration, user dashboard, and other user-related actions).

#### Customauth

I used the djangorestframework_simplejwt library to implement my authorization of users using JWT tokens. To perform this action, I inherited the already existing classes for generating tokens, refreshing tokens, and blacklisting tokens, and customized them to fit my needs.

I inherited the TokenObtainPairView and edited it to not return the refresh token as part of the response and instead set it as an HttpOnly, SameSite cookie. This will prevent the refresh token from being hijacked through XSS, as this won't expose the refresh token to JavaScript, and only send the access token in the response and save it in a temporary variable in JS on the frontend. This is important because refresh tokens are meant to have a long lifetime, and them being hijacked can lead to severe damage. On the other hand, access tokens have a short lifetime; even if the access token gets hijacked, the damage can be controlled as they expire much sooner. The SameSite=Lax flag also prevents cross-site request forgery.

#### Task

##### UsersView

I added a new view called UsersView in my Task app to populate the assignee dropdown field when the user is trying to create or update the assignee of a field. I understand that this will expose a list of all users in the DB to the end user. This should be changed later to only show a list of users that are invited within the scope of the project in which the tasks are being created. I did not specify project scopes at this stage of development for tasks as it is not mentioned in the specification, and I tried to stay as loyal as possible to the original specification.

##### IsOwnerOrReadOnly Permission

This permission has the purpose of checking whether the object owner is equal to the authenticated user or not. If not, the user is not able to use "unsafe" methods on that endpoint (PATCH, PUT, DELETE).

##### TaskSerializer

Made the owner field read-only, as the user should not be able to change the owner of the task object. I also made the assignee field read-only and added an assignee_id field to allow the API user to create/change the assignee by sending the user ID of the assignee.

I used DRF filters to allow the API user to filter tasks based on task title and description content.
