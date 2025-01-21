from django.urls import path
from users.views import formLogin, formRegister

urlpatterns = [
  path("login/", formLogin, name="login_form"),
  path("register/",formRegister, name="register_form"),
]
