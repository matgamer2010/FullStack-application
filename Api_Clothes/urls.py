from rest_framework.routers import DefaultRouter
from Api_Clothes.views import Crud, GetObjectPerUser
from django.urls import path, include

router = DefaultRouter()
router.register(r'Crud', Crud, basename='Crud_clothes') 
router.register(r'user-detail', GetObjectPerUser, basename='user')

urlpatterns = [
    path("", include(router.urls)),
]
