from rest_framework import serializers
from Api_Clothes.models import Color, DataBaseClothes, ImageClothes, Size, Category

class ImageClothesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageClothes
        fields = ['image']

class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = ['name', 'hex']

class SizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Size
        fields = ['name']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['name']

class SerializersClothes(serializers.ModelSerializer):
  url = serializers.HyperlinkedIdentityField(view_name='Crud_clothes-detail')
  url_user_detail = serializers.HyperlinkedIdentityField(view_name='user-detail')

  images = ImageClothesSerializer(many=True, read_only=True)
  colors = ColorSerializer(many=True, read_only=True)
  sizes = SizeSerializer(many=True, read_only=True)
  category = CategorySerializer(many=True, read_only=True)
  class Meta:
    model = DataBaseClothes
    fields = '__all__'

