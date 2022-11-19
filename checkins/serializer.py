from dataclasses import fields
from .models import User, Session, SessionHistory
from rest_framework import serializers

class SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class SessionHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SessionHistory
        fields = '__all__'