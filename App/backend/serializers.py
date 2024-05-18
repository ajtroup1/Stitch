from rest_framework import serializers
from .models import User, Fragment, Story

class UserSerializer(serializers.ModelSerializer):
    stories_count = serializers.SerializerMethodField()

    def get_stories_count(self, obj):
        return self.context.get('stories_count')

    class Meta:
        model = User
        fields = ['id', 'username', 'firstname', 'lastname', 'pic_url', 'stories_count']

class FragmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fragment
        fields = ['id', 'user', 'text', "story_id"]

class StorySerializer(serializers.ModelSerializer):
    fragments = FragmentSerializer(many=True, read_only=True)
    
    class Meta:
        model = Story
        fields = ['id', 'title', 'description', 'private', 'fragments']