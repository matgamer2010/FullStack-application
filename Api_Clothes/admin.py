from django.contrib import admin
from Api_Clothes.models import DataBaseClothes

class AdminClothes(admin.ModelAdmin):
  list_display = ("id","name", "price", "public", "date", "image", "size_gg", "size_g", "size_m", "size_p", "size_pp")
  list_display_links = ("id","name",)
  search_fields = ("name",)
  list_editable = ("public",)
 
admin.site.register(DataBaseClothes,AdminClothes)
