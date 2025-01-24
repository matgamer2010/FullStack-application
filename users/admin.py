from django.contrib import admin
from django.contrib.auth.models import User

class AdminUsers(admin.ModelAdmin):
    list_field = ["User"]