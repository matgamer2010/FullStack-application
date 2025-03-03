from django.contrib import admin
from Api_Clothes.models import DataBaseClothes

class AdminClothes(admin.ModelAdmin):
    list_display = ("id", "name", "price", "public", "date", "image",)
    Option_sizes_admin = ["GG", "PP","M","P","G"]    
    def get_list_display(self, request):
        dynamic_fields = [f"size_{size}" for size in self.Option_sizes_admin]
        return self.list_display + tuple(dynamic_fields)
    list_display_links = ("id", "name",)
    search_fields = ("name",)
    list_editable = ("public",)

admin.site.register(DataBaseClothes, AdminClothes)
