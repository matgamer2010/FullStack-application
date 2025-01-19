from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from Api_Clothes.models import DataBaseClothes
from Api_Clothes.serializers import SerializersClothes

class Crud(viewsets.ModelViewSet):
    queryset = DataBaseClothes.objects.all()  # Define o conjunto de dados
    serializer_class = SerializersClothes  # Define o serializer para conversão de dados

    # Método POST sobrescrito
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(raise_exception=True):  # Corrigido para raise_exception
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # Corrigido para 400_BAD_REQUEST

    # Método GET sobrescrito
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    # Método PUT/PATCH sobrescrito
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        if serializer.is_valid():
            self.perform_update(serializer)  # Corrigido para perform_update
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Método DELETE sobrescrito
    def destroy(self, request, *args, **kwargs):  # Corrigido para destroy
        instance = self.get_object()
        self.perform_destroy(instance)  # Corrigido para perform_destroy
        return Response(status=status.HTTP_204_NO_CONTENT)
