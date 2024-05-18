from django.urls import path
from .views import *

urlpatterns = [
    path('users', GetUsers.as_view()),
    path('create-user', CreateUser.as_view()),
    path('validate-user', ValidateUser.as_view()),
    path('delete-user/<int:id>', DeleteUser.as_view()),
    path('temp', Temp.as_view()),
    path('initialize-story', InitializeStory.as_view()),
]