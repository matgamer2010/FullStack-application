from django.urls import path
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
  
  path("login/", views.formLogin, name="login_form"),
  path("register/",views.formRegister, name="register_form"),
  path("logout/", views.Logout, name="logout"),

  path("process_login/", views.ProcessLogin, name="process_login"),
  path("process_register/", views.ProcessRegister, name="process_register"),
  path("process_users/", views.ProcessUsers, name="process_users"),
  path("process_user_payments/", views.ProcessUsersPayments, name="process_users_payments"),
  path("process_payment/", views.ProcessPayments, name="process_payments"),
  path("process_search/", views.ProcessSearch, name="process_search"),
  path("process_logout/", views.ProcessLogout, name ="process_logout"),
  path("calculo_frete_prazo/", views.CalcFretePrazo, name="calculo_frete_prazo"),
  path("process_category/",views.ProcessSearchCategory, name="process_category"),
  # These URLs are using for the Reset Account feature. It does not be changed
  path("reset/", 
       views.Forget.as_view(),
       name="password_reset"),

  path("reset/done/", 
       views.ChangePassword_done.as_view(),
       name="password_reset_done"),
  
  # essa url por si só não faz NADA, ela serve para ser SOBRESCRITA, então, nunca use o name:
  # "password_reset_confirm" por si só.
  path("reset/<str:uidb64>/<str:token>", 
       auth_views.PasswordResetConfirmView.as_view(template_name="Emails/Reset.html"),
       name="password_reset_confirm"),
  
  path("reset/completed/", 
       views.ChagePassword_completed.as_view(),
       name="password_reset_completed"),
]
