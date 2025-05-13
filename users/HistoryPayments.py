from django.db import models
from django.contrib.auth.models import User
from Api_Clothes.models import DataBaseClothes

class HistoryPayments(models.Model):

    Product = models.ForeignKey(to=DataBaseClothes, on_delete=models.CASCADE, null= False, blank= False)
    #Image can be blank, that's why i don't set blank=False
    Image = models.TextField(blank=True)
    Value = models.FloatField(null= False, blank= False)
    Amount = models.IntegerField(null= False, blank= False)
    Date = models.DateTimeField(auto_now_add=True) 
    Username = models.ForeignKey(to=User, on_delete=models.CASCADE, null= False, blank = False)