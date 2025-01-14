from rest_framework import serializers
from Api_Clothes.models import DataBaseClothes

class SerializersClothes(serializers.ModelSerializer):
    class meta():
      model = DataBaseClothes
      fields = '__all__'
