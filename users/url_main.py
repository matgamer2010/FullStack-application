from django.urls import path
from . import views

urlpatterns = [
  path("", views.MainPage, name="main"),
  path("profile_user/", views.ProfileUser, name="profile_user")
]
