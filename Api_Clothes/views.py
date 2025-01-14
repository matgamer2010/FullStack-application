from django.shortcuts import render

from rest_framework import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from Api_Clothes.models import DataBaseClothes
from Api_Clothes.serializers import SerializersClothes

def ViewSetsClothes(APIView):
  permission_classes = [IsAuthenticated]
  
  NOT_FOUND_MESSAGE = Response({"error":"This product was not Found"}, status=status.HTTP_404_NOT_FOUND)

  def get(self, request, pk=None):
    if pk:
        try:
            product = DataBaseClothes.objects.get(pk=pk)
            serializer = SerializersClothes(product)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except DataBaseClothes.DoesNotExist:
            return NOT_FOUND_MESSAGE
    else:
        products = DataBaseClothes.objects.all()
        serializer = SerializersClothes(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

      
  def post(self, request):    
        serializer = SerializersClothes(data= request.data)
        if serializer.is_valid():
          serializer.save()
          return Response(status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
  def put(self, request,pk):
    try:
      product = DataBaseClothes.objects.get(pk=pk)
      serializer = SerializersClothes(product, data=request.data)
      if serializer.is_valid():
        serializer.save()
        return Response(status=status.HTTP_200_OK)
      return Response(status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
      return Response({"Error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
  def patch(self, request, pk):
    try: 
      product = DataBaseClothes.objects.get(pk=pk)
      serializer = SerializersClothes(product, data=request.data, partial=True)
      if serializer.is_valid():
        serializer.save()
        return Response(status=status.HTTP_201_CREATED)
      return Response(status=status.HTTP_400_BAD_REQUEST)
    except product.DoesNotExist:
      return NOT_FOUND_MESSAGE
    
  def delete(self, request, pk):
    try:
      product = DataBaseClothes.objects.get(pk=pk)
      product.delete()
    except product.DoesNotExist:
      return NOT_FOUND_MESSAGE
    