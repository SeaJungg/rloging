from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid

class User(AbstractUser):
    realname = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=11)
    auth_code = models.CharField(max_length=4)
    member_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)

class Sessions(models.Model):
    session_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    name = models.CharField(max_length=100)
    member_id = models.CharField(max_length=100)
    launch_date = models.DateTimeField()
    create_date = models.DateTimeField(auto_now_add=True)
    update_date = models.DateTimeField(auto_now=True)

class SessionHistories(models.Model):
    session_id = models.CharField(max_length=100)
    member_id = models.CharField(max_length=100)
    create_date = models.DateTimeField(auto_now_add=True)