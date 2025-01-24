from django.urls import path
from users.views import formLogin, formRegister, Logout

urlpatterns = [
  path("login/", formLogin, name="login_form"),
  path("register/",formRegister, name="register_form"),
  path("logout/", Logout, name="logout")  
]
