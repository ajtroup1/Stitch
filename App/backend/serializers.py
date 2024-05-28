from rest_framework import serializers
from .models import User, Fragment, Story

class UserSerializer(serializers.ModelSerializer):
    stories_count = serializers.SerializerMethodField()
    num_users = serializers.SerializerMethodField()
    user_rank = serializers.SerializerMethodField()

    def get_stories_count(self, obj):
        return self.context.get('stories_count')

    def get_num_users(self, obj):
        return self.context.get('num_users')

    def get_user_rank(self, obj):
        return self.context.get('user_rank')

    class Meta:
        model = User
        fields = ['id', 'username', 'firstname', 'lastname', 'pic_url', 'stories_count', 'num_users', 'user_rank']

class FragmentSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Fragment
        fields = ['id', 'user', 'text', "story_id"]

class StorySerializer(serializers.ModelSerializer):
    fragments = FragmentSerializer(many=True, read_only=True)
    
    class Meta:
        model = Story
        fields = ['id', 'title', 'description', 'private', 'date_modified', 'fragments']