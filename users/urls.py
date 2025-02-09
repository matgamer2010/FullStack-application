from django.urls import path
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
  path("login/", views.formLogin, name="login_form"),
  path("register/",views.formRegister, name="register_form"),
  path("logout/", views.Logout, name="logout"),
  
  path("reset/", 
       views.Forget.as_view(),
       name="password_reset"),

  path("reset/done/", 
       views.ChangePassword_done.as_view(),
       name="password_reset_done"),
  
  # essa url por si só não faz NADA, ela serve para ser SOBRESCRITA, então, nunca use o name:
  # "password_reset_confirm".
  path("reset/<str:uidb64>/<str:token>", 
       auth_views.PasswordResetConfirmView.as_view(template_name="Emails/Reset.html"),
       name="password_reset_confirm"),
  
  path("reset/completed/", 
       views.ChagePassword_completed.as_view(),
       name="password_reset_completed"),
]
