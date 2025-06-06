from rest_framework import viewsets, status
from rest_framework.response import Response
from Api_Clothes.models import DataBaseClothes
from Api_Clothes.serializers import SerializersClothes
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
import requests
from xml.etree import ElementTree
 
class Crud(viewsets.ModelViewSet):
    queryset = DataBaseClothes.objects.all()
    serializer_class = SerializersClothes
        
    def create(self, request, *args, **kwargs):
        if not request.user.is_admin:
            return Response(status=status.HTTP_403_FORBIDDEN)
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        if not request.user.is_admin:
            return Response(status=status.HTTP_403_FORBIDDEN)
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=partial)
        if serializer.is_valid():
            self.perform_update(serializer)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request, *args, **kwargs):
        serializer = self.get_serializer(DataBaseClothes.objects.all(), many=True)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        if not request.user.is_admin:
            return Response(status=status.HTTP_403_FORBIDDEN)
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    def perform_create(self, serializer):
        if not self.request.user.is_admin:
            return Response(status=status.HTTP_403_FORBIDDEN)
        serializer.save(cross_databases=self.request.user)

class GetObjectPerUser(viewsets.ModelViewSet):
    queryset = DataBaseClothes.objects.all()
    serializer_class = SerializersClothes
    permission_classes = [IsAuthenticated]

    def retrieve(self, request, pk=None):
        produtos = DataBaseClothes.objects.filter(cross_databases=pk)
        if not produtos:
            return Response({"detail": "Nenhum produto encontrado para o usuário."}, status=status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(produtos, many=True)
        return Response(serializer.data)
