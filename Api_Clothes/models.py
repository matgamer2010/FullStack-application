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
    def __str__(self):
        return f"Item {self.name} was saved"
    
    class Meta:
        app_label = "Api_Clothes"

#        
Option_sizes = ["GG", "PP","M","P","G"]
for size in Option_sizes:
    field_name = f"size_{size}"
    DataBaseClothes.add_to_class(field_name, models.BooleanField(default=False))
