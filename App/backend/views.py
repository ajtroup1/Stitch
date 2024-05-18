from django.shortcuts import render
from .models import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import *


class GetUsers(APIView):
    def get(self, request):
        users = User.objects.all()
        if not users:
            return Response({"No users"}, status=status.HTTP_204_NO_CONTENT)
        else:
            serializer = UserSerializer(users, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
class ValidateUser(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        users = User.objects.filter(username=username)

        if not username:
            return Response({"message": "Must enter username"}, status=status.HTTP_404_NOT_FOUND)
        if not password:
            return Response({"message": "Must enter password"}, status=status.HTTP_404_NOT_FOUND)

        if not users.exists():
            return Response({"message": "No users with username"}, status=status.HTTP_404_NOT_FOUND)
        
        if len(users) > 1:  # Changed from 2 to 1, assuming you want to check for more than one user
            return Response({"message": "Users with non-unique ID"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        user = users.first()  # Get the first user (if exists)

        if password == user.password:
            return Response({"message": "Success"}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Invalid password"}, status=status.HTTP_403_FORBIDDEN)
        
def check_password_complexity(password):
    has_digit = False
    has_char = False
    
    for char in password:
        if char.isdigit():
            has_digit = True
        elif char.isalpha():
            has_char = True
        
        # If both conditions are met, the password is valid
        if has_digit and has_char:
            return True
    
    return False
        
class CreateUser(APIView):
    def post(self, request):
        username = request.data.get('username')
        firstname = request.data.get('firstname')
        lastname = request.data.get('lastname')
        password = request.data.get('password')
        confpassword = request.data.get('confpassword')

        print(username, firstname, lastname, password, confpassword)

        if username == "" or firstname == "" or lastname == "" or password == "" or confpassword == "":
            return Response({"message": "Enter all signup fields"}, status=status.HTTP_400_BAD_REQUEST)

        users = User.objects.filter(username=username)

        if users.exists():
            return Response({"message": "Username is not unique"}, status=status.HTTP_400_BAD_REQUEST)
        elif len(username) > 15:
            return Response({"message": "Username must be less than 15 characters"}, status=status.HTTP_400_BAD_REQUEST)
        elif len(password) < 8:
            return Response({"message": "Password must be more than 8 characters"}, status=status.HTTP_400_BAD_REQUEST)
        elif not check_password_complexity(password):
            return Response({"message": "Password must contain both numbers and characters"}, status=status.HTTP_400_BAD_REQUEST)
        elif password != confpassword:
            return Response({"message": "Passwords must match"}, status=status.HTTP_400_BAD_REQUEST)
        elif len(firstname) < 2 or len(lastname) < 1: # allow for last initial and realistic first name
            return Response({"message": "Must provide valid first and last name"}, status=status.HTTP_400_BAD_REQUEST)

        user = User(username=username, firstname=firstname, lastname=lastname, password=password)
        user.save()

        return Response({"User created"}, status=status.HTTP_200_OK)
    
class DeleteUser(APIView):
    def delete(self, request, id):
        users = User.objects.filter(id=id)
        if not users:
            return Response({"No user found with ID"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        if len(users) > 1:
            return Response({"Nonunique user IDs"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        user = users.first()
        user.delete()
        
        return Response({f"User #{id} delted"}, status=status.HTTP_200_OK)
    

class InitializeStory(APIView):
    def post(self, request):
        userID = request.data.get('userID')
        text = request.data.get('text')
        title = request.data.get('title')

        users = User.objects.filter(id=userID)

        if userID == None or text == "" or title == "":
            return Response({f"Please fill out all relevant fields"}, status=status.HTTP_400_BAD_REQUEST)
        
        if len(users) < 1:
            return Response({f"No users with ID"}, status=status.HTTP_400_BAD_REQUEST)
        elif len(users) > 1:
            return Response({f"Nonunique user ID"}, status=status.HTTP_400_BAD_REQUEST)
        
        user = users.first()

        fragment = Fragment(user=user, text=text)
        fragment.save()

        # INITIALIZE THE STORY TOO AFTER THE FRAGMENT

        return Response({f"Story initialized"}, status=status.HTTP_200_OK)
    
class Temp(APIView):
    def get(self, request):
        fragments = Fragment.objects.all()
        fragments.delete()
        return Response({f"ok"}, status=status.HTTP_200_OK)