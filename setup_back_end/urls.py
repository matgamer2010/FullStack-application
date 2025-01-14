from django.contrib import admin
from django.urls import path, include
from setup_back_end.settings import MEDIA_ROOT, MEDIA_URL
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),   
    path('', include("Api_Clothes.urls")),
] + static(MEDIA_URL, document_root=MEDIA_ROOT)
