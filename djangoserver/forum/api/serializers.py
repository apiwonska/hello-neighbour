from rest_framework import serializers

from forum.models import Category, Thread, Post
from users.models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    # This declaration is necessary for displaying avatar_thumbnail. Don't delete!
    avatar_thumbnail = serializers.ImageField(read_only=True)

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'avatar_thumbnail']
        extra_kwargs = {
            'username': {'read_only': True}
        }


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = ['id', 'name', 'description', 'threads', 'posts']


class ThreadSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Thread
        fields = ['id', 'title', 'subject', 'user', 'category', 'sticky', 'closed', 'posts', 'latest_post_time', 'created', 'updated']


class PostSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Post
        fields = ['id', 'content', 'user', 'thread', 'created', 'updated']
