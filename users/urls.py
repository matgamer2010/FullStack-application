from django.urls import path
from users.views import formLogin, formRegister, Logout, Forget
from django.contrib.auth.views import PasswordResetConfirmView

urlpatterns = [
  path("login/", formLogin, name="login_form"),
  path("register/",formRegister, name="register_form"),
  path("logout/", Logout, name="logout"),
  path("forget/<uidb64>/<token>", PasswordResetConfirmView.as_view(), name="retrive_account"),
]
