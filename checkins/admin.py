from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Sessions, SessionHistories

admin.site.register(User, UserAdmin)
admin.site.register(Sessions)
admin.site.register(SessionHistories)