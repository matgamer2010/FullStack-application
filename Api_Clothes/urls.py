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
  path("get-endpoint/", Define_routers, name="get-endpoint"),
  path("post-endpoint/", Define_routers, name="post-endpoint"),
  path("put-endpoint/", Define_routers, name="put-endpoint"),
  path("patch-endpoint/", Define_routers, name="patch-endpoint"),
  path("delete-endpoint/", Define_routers, name="delete-endpoints"),
]
