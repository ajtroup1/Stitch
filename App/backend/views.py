from django.shortcuts import render
from .models import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from django.db import transaction
import requests

class GetUsers(APIView):
    def get(self, request):
        users = User.objects.all()
        if not users:
            return Response({"No users"}, status=status.HTTP_204_NO_CONTENT)
        else:
            serializer = UserSerializer(users, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

# class GetNumUsers(APIView):
#     def get(self, request):
#         users = User.objects.all()
#         if not users:
#             return Response({"No users"}, status=status.HTTP_204_NO_CONTENT)
#         else:
#             count = len(users)
#             return Response({"Users": count}, status=status.HTTP_200_OK)
        
class GetUserByName(APIView):
    def get(self, request, username):
        user = User.objects.filter(username=username).first()
        users = User.objects.all()
        if not user:
            return Response({f"No user found with username: {username}"}, status=status.HTTP_404_NOT_FOUND)
        else:
            response = requests.get(f"http://127.0.0.1:8000/api/user-stories/{user.id}")
            if response.status_code == 200:
                stories_count = len(response.json())
            else:
                stories_count = 0
            
            serializer = UserSerializer(user, context={'stories_count': stories_count, 'num_users': len(users)})
            return Response(serializer.data, status=status.HTTP_200_OK)
        
class EditUser(APIView):
    def put(self, request, id):
        info = request.data

        user = User.objects.filter(id=id).first()
        
        user.username = info['username']
        user.firstname = info['firstname']
        user.lastname = info['lastname']
        user.pic_url = info['pic_url']

        user.save()

        return Response({"message": "Edited user successfully"}, status=status.HTTP_200_OK)
        
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
    
class GetStories(APIView):
    def get(self, request):
        stories = Story.objects.all()
        nonprivate_stories = []
        for story in stories:
            if story.private == False:
                nonprivate_stories.append(story)
        if not nonprivate_stories:
            return Response({"No non-private stories"}, status=status.HTTP_204_NO_CONTENT)
        else:
            serializer = StorySerializer(nonprivate_stories, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
class GetStoryID(APIView):
    def get(self, request, id):
        story = Story.objects.filter(id=id).first()
        if not story:
            return Response({f"No story with id {id}"}, status=status.HTTP_404_NOT_FOUND)
        else:
            serializer = StorySerializer(story)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
class GetUserStories(APIView):
    def get(self, request, user):
        fragments = Fragment.objects.filter(user=user)
        if not fragments:
            return Response({"No stories for user"}, status=status.HTTP_204_NO_CONTENT)
        
        unique_story_ids = fragments.values_list('story_id', flat=True).distinct()
        stories = []
        for id in unique_story_ids:
            story = Story.objects.filter(id=id).first()
            if story:
                stories.append(story)

        serializer = StorySerializer(stories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class Get3UserStories(APIView):
    def get(self, request, id):
        # Get the most recent 3 fragments associated with the user, ordered by their ids in descending order
        recent_fragments = Fragment.objects.filter(user=id).order_by('-id')[:3]
        
        if not recent_fragments:
            return Response({"No stories found for this user"}, status=status.HTTP_204_NO_CONTENT)
        
        # Get the unique story ids from the recent fragments
        unique_story_ids = recent_fragments.values_list('story_id', flat=True)
        stories = []
        
        # Retrieve the stories associated with the unique story ids
        for story_id in unique_story_ids:
            story = Story.objects.filter(id=story_id).first()
            if story:
                stories.append(story)
        
        # Sort the stories by date_modified in descending order
        sorted_stories = sorted(stories, key=lambda x: x.date_modified, reverse=True)
        
        # Get the first 3 sorted stories
        first_3_stories = sorted_stories[:3]
        
        serializer = StorySerializer(first_3_stories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class GetFragments(APIView):
    def get(self, request):
        fragments = Fragment.objects.all()
        if not fragments:
            return Response({"No fragments"}, status=status.HTTP_204_NO_CONTENT)
        else:
            serializer = FragmentSerializer(fragments, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

class DeleteFragment(APIView):
    def delete(self, request, id):
        fragment = Fragment.objects.filter(id=id).first()
        if not fragment:
            return Response({"No fragments"}, status=status.HTTP_404_NOT_FOUND)
        else:
            fragment.delete()
            return Response({"message": f"Fragment #{id} deleted"}, status=status.HTTP_200_OK)
        
class FlushStories(APIView):
    def delete(self, request):
        stories = Story.objects.all()
        fragments = Fragment.objects.all()
        if not stories:
            return Response({"No stories"}, status=status.HTTP_404_NOT_FOUND)
        else:
            stories.delete()
            fragments.delete()
            return Response({"message": "All stories flushed"}, status=status.HTTP_200_OK)

class InitializeStory(APIView):
    def post(self, request):
        userID = request.data.get('userID')
        text = request.data.get('text')
        title = request.data.get('title')
        description = request.data.get('description')
        is_private = request.data.get('is_private')

        users = User.objects.filter(username=userID)

        if userID is None or text == "" or title == "":
            return Response({"message": "Please fill out all relevant fields"}, status=status.HTTP_400_BAD_REQUEST)
        
        if not users.exists():
            return Response({"message": "No users with ID"}, status=status.HTTP_400_BAD_REQUEST)
        elif users.count() > 1:
            return Response({"message": "Nonunique user ID"}, status=status.HTTP_400_BAD_REQUEST)
        
        user = users.first()

        
        with transaction.atomic(): # all code either succeeds or fails together
            fragment = Fragment.objects.create(user=user, text=text)

            story = Story.objects.create(title=title, description=description, user=user, private=is_private)
            story.fragments.add(fragment)  # Add the fragment to the story
            story.save()

            fragment.story_id = story.id  # Assign the story's ID to fragment's story_id
            fragment.save()

        return Response({"message": "Story initialized"}, status=status.HTTP_200_OK)
    
class AppendStory(APIView):
    def post(self, request, id):
        original_story = Story.objects.filter(id=id).first()
        
        if not original_story:
            return Response({"No stories"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = StorySerializer(original_story)

        user_id = request.data.get('userID')
        text = request.data.get('text')
        title = request.data.get('title')
        description = request.data.get('description')
        private = request.data.get('private')

        user = User.objects.filter(username=user_id).first()

        with transaction.atomic():  # All database operations in this block will succeed or fail together
            # Create a new story object based on the original story's information
            new_story = Story.objects.create(
                title=title,
                description=description,
                private=private,  # Copy other fields as needed
                date_modified=timezone.now().date(),
                user = user
            )

            # Create a new fragment representing the appended text
            new_fragment = Fragment.objects.create(user=user, text=text, story_id=new_story.id)


            # Copy the original fragments to the new story
            for fragment in original_story.fragments.all():
                new_story.fragments.add(fragment)

            # Associate the new fragment with the new story
            new_story.fragments.add(new_fragment)
            new_story.save()

            # Return the serialized data of the new story
            new_story_serializer = StorySerializer(new_story)
            return Response({"Appended story": new_story_serializer.data}, status=status.HTTP_200_OK)
