from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

from datetime import datetime
import json

def get_json_sizes():
  try:
    with open("Api_Clothes/sizes.json") as file:
      data = json.load(file)
      #return data.get("sizes", ["G","GG","M","P","PP"])

  except (FileNotFoundError, KeyError, json.JSONDecodeError):
    return ["G","GG","M","P","PP"] 
  
  """
  With this function, we can create any object that include many options of choices, exemple: colors and size of clothes

  I could use the "manytoMany" paramn? yes, but maybe, it could be more hard to develop and implement anothers features.
  Besides that this solution is a creative mean to build escalabe features.

  """

class DataBaseClothes(models.Model):
  publish_date = datetime.now()
  formated_date = publish_date.strftime("%d/%m/%Y")
  
  name = models.CharField(max_length=100,null=False, blank=False)
  price = models.FloatField([MinValueValidator(10), MaxValueValidator(380)],null=False, blank=False) # If any problem happens, maybe, the erro is here, swap "FloatField" to "IntegerField()"!
  public = models.BooleanField(default=False)
  date = models.DateTimeField(auto_now_add=True)
  
  @classmethod
  def add_dynamic_fields(cls):
    sizes = get_json_sizes()
    list_fields = []
    list_fields.append(sizes)
    Each_field = len(list_fields)
    c=0
    while c<Each_field:
      for size in list_fields:
          field_name = f"is_size_{size}"
          field = models.BooleanField(default=False)
          cls.add_to_class(field_name, field)
            
DataBaseClothes.add_dynamic_fields()