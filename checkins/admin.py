from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Session, SessionHistory

admin.site.register(User, UserAdmin)
admin.site.register(Session)
admin.site.register(SessionHistory)