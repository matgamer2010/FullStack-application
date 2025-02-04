from django.urls import path
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
  path("login/", views.formLogin, name="login_form"),
  path("register/",views.formRegister, name="register_form"),
  path("logout/", views.Logout, name="logout"),
  path("forget/", views.Forget, name="forget"),
  path("reset_password/", views.Reset, name="reset_password"),
  path("test/", views.test_email, name="test"),
  path("reset/<str:uidb64>/<str:token>", auth_views.PasswordResetView.as_view(),name="password_reset_confirm"),
  path("reset/done/<str:uidb64>/<str:token>", auth_views.PasswordResetConfirmView.as_view(),name="password_reset_done"),
  path("reset/complete/", auth_views.PasswordResetCompleteView.as_view(),name="password_reset_complete"),
]
