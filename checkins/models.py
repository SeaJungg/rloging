from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid

class User(AbstractUser):
    member_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    realname = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=11)
    auth_code = models.CharField(max_length=4)

class Session(models.Model):
    session_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    imageUrl = models.TextField(blank=True)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    location = models.CharField(max_length=100, default='용산역')
    member_id = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='sessions', null=True)
    launch_date = models.DateTimeField()
    max_attendee = models.IntegerField(default=100)
    application_fee = models.CharField(max_length=6, default = 0)
    create_date = models.DateTimeField(auto_now_add=True)
    update_date = models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.name
    @property
    def username(self):
        return self.User.username

class SessionHistory(models.Model):
    session_id = models.ForeignKey(Session, on_delete=models.CASCADE, related_name='attendee')
    member_id = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    is_attendance = models.BooleanField(default=0)
    is_supporter_welcome = models.BooleanField(default=0)
    is_supporter_dj = models.BooleanField(default=0)
    is_supporter_car = models.BooleanField(default=0)
    create_date = models.DateTimeField(auto_now_add=True)
    update_date = models.DateTimeField(auto_now_add=True)