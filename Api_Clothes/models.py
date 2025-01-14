from django.db import models
from datetime import datetime
import json


class DataBaseClothes(models.Model):
  publish_date = datetime.now()
  formated_date = publish_date.strftime("%d/%m/%Y")

  try:
    with open("Api_Clothes/sizes.json") as file:
      data = json.load(file)

  except (FileNotFoundError, KeyError, json.JSONDecodeError):
    KindsOfSizes = ["G","GG","M","P","PP"] # If will any problem exist related with updates of the sizes field. Maybe, the error is here!
  

  KindsOfSizes = data["sizes"] 
  
  def create_booleanFields_for_each_size(*args):
    fields = {}
    for size in args:
      fields[f"is_size_{size.lower()}"] = models.BooleanField(default=False)
    return fields

  """
  With this function, we can create any object that include many options of choices, exemple: colors and size of clothes

  I could use the "manytoMany" paramn? yes, but maybe, it could be more hard to develop and implement anothers features.
  Besides that this solution is a creative mean to build escalabe features.

  """

  create_sizes = create_booleanFields_for_each_size(*KindsOfSizes)

  name = models.CharField(max_length=100,null=False, blank=False)
  price = models.FloatField(MinValueValidator=10, MaxValueValidator=380,null=False, blank=False) # If any problem happens, maybe, the erro is here, swap "FloatField" to "IntegerField()"!
  public = models.BooleanField(default=False)
  for fields_sizes, fields in create_sizes.items():
    try:
      setattr(models.Model, fields_sizes, fields)
    except Exception as e:
      print(f"Erro desconhecido: {e}")
  """
  I thought use the "locals()" function, but, for try avoid errors, i choice use the "setattr".
  """
  date = models.DateTimeField(date=formated_date)
