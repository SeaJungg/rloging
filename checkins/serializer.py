from dataclasses import fields
from tkinter.tix import Tree
from .models import User, Session, SessionHistory
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    # sessions = SessionSerializer(many = True)
    class Meta:
        model = User
        fields = '__all__'
        # fields = ['username','sessions']


class SessionHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SessionHistory
        fields = '__all__'


class SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
        fields = ['imageUrl','name','description','location','member_id','launch_date','max_attendee','application_fee']


class SessionInfoSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='member_id.username')
    total_attendee_count = serializers.IntegerField(
        source='attendee.count', 
        read_only=True
    )
    attendee = SessionHistorySerializer(many = True, read_only = True)
    class Meta:
        model = Session
        fields = '__all__'