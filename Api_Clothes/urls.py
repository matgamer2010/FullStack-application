from django.urls import path
from Api_Clothes.views import ViewSetsClothes
from rest_framework import routers
Define_routers = ({
  "get":"get",
  "post":"post",
  "put":"put",
  "patch":"patch",
  "delete": "delete",
})

urlpatterns = [
  path("products-api/", Define_routers, name="get-endpoint")
  path("products-api/", Define_routers, name="post-endpoint")
  path("products-api/", Define_routers, name="put-endpoint")
  path("products-api/", Define_routers, name="patch-endpoint")
  path("products-api/", Define_routers, name="delete-endpoints")
]
