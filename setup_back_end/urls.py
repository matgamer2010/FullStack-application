from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from Api_Clothes.views import Crud, GetObjectPerUser
from users.views import formLogin

router = DefaultRouter()
router.register(r'Crud', Crud, basename='Crud_clothes') 
router.register(r'user-detail', GetObjectPerUser, basename='user')

urlpatterns = [
    path("accounts/login/",formLogin, name="login_form_urls_setup"),
    path("", include(router.urls)),
    path('admin/', admin.site.urls),   
    path("forms/", include("users.urls"))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
