from django.contrib import admin
from Api_Clothes.models import DataBaseClothes
import json 

def get_json_admin_files():
    with open("Api_Clothes/sizes.json") as file_admin:
      data = json.load(file_admin)

class AdminClothes(admin.ModelAdmin):
  def get_list_display(self, request):
    base_fields = ["name","price", "public","date"]
    dynamic_fields = []
    
    for sizes in get_json_fields:
      field_name = f"is_size{sizes}"
      dynamic_fields.append(field_name)
      #add a "str()" primitive tipe above.

    return base_fields + dynamic_fields
admin.site.register(DataBaseClothes, AdminClothes)