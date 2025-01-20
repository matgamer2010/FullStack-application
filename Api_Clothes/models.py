from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from datetime import datetime
import json


class DataBaseClothes(models.Model):
    name = models.CharField(max_length=100, null=False, blank=False)
    price = models.FloatField(validators=[MinValueValidator(10), MaxValueValidator(380)], null=False, blank=False)
    public = models.BooleanField(default=False)
    date = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(blank=True)
    size_g = models.BooleanField(default=False)
    size_gg = models.BooleanField(default=False)
    size_m = models.BooleanField(default=False)
    size_p = models.BooleanField(default=False)
    size_pp = models.BooleanField(default=False)
