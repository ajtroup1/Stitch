from django.urls import path
from .views import *

urlpatterns = [
    path('users', GetUsers.as_view()),
    path('users/<str:username>', GetUserByName.as_view()),
    path('create-user', CreateUser.as_view()),
    path('validate-user', ValidateUser.as_view()),
    path('delete-user/<int:id>', DeleteUser.as_view()),
    path('initialize-story', InitializeStory.as_view()),
    path('stories', GetStories.as_view()),
    path('fragments', GetFragments.as_view()),
    path('user-stories/<str:user>', GetUserStories.as_view()),

    # only for development delete later
    path('flush-fragments', FlushFragments.as_view()),
    path('flush-stories', FlushStories.as_view()),
]