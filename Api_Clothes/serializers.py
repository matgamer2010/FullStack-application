from rest_framework import serializers
from Api_Clothes.models import DataBaseClothes

class SerializersClothes(serializers.HyperlinkedModelSerializer):
  url = serializers.HyperlinkedIdentityField(view_name='Crud_clothes-detail')
  class Meta:
    model = DataBaseClothes
    fields = '__all__'
