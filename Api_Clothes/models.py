from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth.models import User
class DataBaseClothes(models.Model):
    
    name = models.CharField(max_length=100, null=False, blank=False)
    description = models.TextField(null=False, blank=False)
    #
    price = models.FloatField(validators=[MinValueValidator(10), MaxValueValidator(380)], null=False, blank=False)
    public = models.BooleanField(default=False)
    #
    date = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(blank=True)
    #
    cross_databases = models.ForeignKey(
        to=User,
        on_delete=models.SET_NULL,
        null=True,
        blank=False,
        related_name="Clothes_users",
    )
    
    amount = models.IntegerField(null=False, blank=False)

    sizes = models.ManyToManyField("Size", related_name="clothes")
    colors = models.ManyToManyField("Color", related_name="clothes")
    category = models.ManyToManyField("Category", related_name="clothes")
    
    def __str__(self):
        return f"Item {self.name} was saved"
    
    class Meta:
        app_label = "Api_Clothes"

class ImageClothes(models.Model):
    product = models.ForeignKey(DataBaseClothes, on_delete=models.CASCADE, related_name="images")
    image =  models.ImageField(blank=True)
    
    def __str__(self):
        return f"Image for {self.product.name}"

class Size(models.Model):
    name = models.CharField(max_length=20, unique=True)
    
    def __str__(self):
        return self.name

class Color(models.Model):
    name = models.CharField(max_length=20, unique=True)
    hex = models.CharField(max_length=7, default="#FFFFFF")

    def __str__(self):
        return self.name

class Category(models.Model):
    name = models.CharField(max_length=50, unique=True)
    def __str__(self):
        return self.name