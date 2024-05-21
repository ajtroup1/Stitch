from django.db import models
from django.utils import timezone

# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=15, unique=True, null=False)
    password = models.CharField(max_length=25, null=False)
    firstname = models.CharField(max_length=50, null=False)
    lastname = models.CharField(max_length=50, null=False)
    pic_url = models.CharField(max_length=250, null=False, default="")

class Fragment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField(null=False)
    date = models.DateField(default=timezone.now)
    story_id = models.IntegerField(null=True)

class Story(models.Model):
    title = models.CharField(max_length=50, null=False, default="Untitled")
    fragments = models.ManyToManyField(Fragment)
    date_modified = models.DateField(default=timezone.now)
    description = models.CharField(max_length=200, null=True, default="No description listed")
    private = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=0)