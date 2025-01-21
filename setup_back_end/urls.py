from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from Api_Clothes.views import Crud


router = DefaultRouter()
router.register(r'Crud', Crud, basename='Crud_clothes')

urlpatterns = [
    path("", include(router.urls)),
    path('admin/', admin.site.urls),   
    path("forms/", include("users.urls"))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
