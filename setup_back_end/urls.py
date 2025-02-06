from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from Api_Clothes.views import Crud, GetObjectPerUser
from users.views import formLogin
from Api_Clothes.models import DataBaseClothes
from django.shortcuts import get_object_or_404

# Há um erro na rota da API crud, o problema é que nas models, eu defini que cada usuário deve ter "posse"
# de seus respectivos produtos, então, devemos alterar a rota de maneira que tenha um atributo chamado
# "user-detail", acho que temos que criar uma view que passe o foreign key de cada usuário para a rota
# não esquecer de acrecentar: "<int:pk>/", podemos definir "pk" como quisermos, mas vamos manter assim, além disso,

router = DefaultRouter()
router.register(r'Crud', Crud, basename='Crud_clothes') 
router.register(r'user-detail', GetObjectPerUser, basename='user') # talvez adicionar "Crud/user-detail ajude na resolução."

urlpatterns = [
    path("", include(router.urls)),
    path("accounts/login/",formLogin, name="login_form_urls_setup"),
    path('admin/', admin.site.urls),   
    path("forms/", include("users.urls"))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
