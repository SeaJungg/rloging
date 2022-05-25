from pyexpat import model
from statistics import mode
from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid
from phonenumber_field.modelfields import PhoneNumberField

class User(AbstractUser):
    nickname = models.CharField(max_length=50)
    phone_number = PhoneNumberField(null = True, blank = True)
    member_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)

'''
class Sessions(models.Model):
    session_name = models.CharField(max_length=100)
    session_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)

class SessionHistories(models.Model):
    session_id = models.ForeignKey(Sessions, on_delete=None)
    member_id = models.ForeignKey(User, on_delete=None)
'''