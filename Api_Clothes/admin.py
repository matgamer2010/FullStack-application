from django.contrib import admin
from Api_Clothes.models import DataBaseClothes


class AdminClothes(admin.ModelAdmin):
  def get_list_display(self, request):
    base_fields = ["name","price", "public","date"]
    dynamic_fields = [f"is_validy{sizes.lower()}" for sizes in DataBaseClothes.KindOfSizes]
    return base_fields + dynamic_fields
admin.site.register(DataBaseClothes, AdminClothes)