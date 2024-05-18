from rest_framework import serializers
from .models import User, Fragment, Story

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'firstname', 'lastname']

class FragmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fragment
        fields = ['id', 'user', 'text']

class StorySerializer(serializers.ModelSerializer):
    fragments = FragmentSerializer(many=True, read_only=True)
    
    class Meta:
        model = Story
        fields = ['id', 'fragments']
