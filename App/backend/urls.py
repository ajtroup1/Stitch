from django.urls import path
from .views import *

urlpatterns = [
    path('users', GetUsers.as_view()),
    # path('user-count', GetNumUsers.as_view()),
    path('users/<str:username>', GetUserByName.as_view()),
    path('edit-user/<int:id>', EditUser.as_view()),
    path('create-user', CreateUser.as_view()),
    path('validate-user', ValidateUser.as_view()),
    path('delete-user/<int:id>', DeleteUser.as_view()),
    path('initialize-story', InitializeStory.as_view()),
    path('append-story/<int:id>', AppendStory.as_view(), name='append-story'),
    path('edit-story/<int:id>', EditStory.as_view()),
    path('stories', GetStories.as_view()),
    path('story/<int:id>', GetStoryID.as_view()),
    path('delete-story/<int:id>', DeleteStory.as_view()),
    path('fragments', GetFragments.as_view()),
    path('user-stories/<str:user>', GetUserStories.as_view()),
    path('3-user-stories/<int:id>', Get3UserStories.as_view()),

    # only for development delete later
    path('delete-fragment/<int:id>', DeleteFragment.as_view()),
    path('flush-stories', FlushStories.as_view()),
]