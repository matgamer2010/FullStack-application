from rest_framework import serializers
from Api_Clothes.models import DataBaseClothes

class SerializersClothes(serializers.ModelSerializer):
  url = serializers.HyperlinkedIdentityField(view_name='Crud_clothes-detail')
  url_user_detail = serializers.HyperlinkedIdentityField(view_name='user-detail')
  class Meta:
    model = DataBaseClothes
    fields = '__all__'

