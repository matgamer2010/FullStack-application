from django.contrib import admin
from Api_Clothes.models import DataBaseClothes, ImageClothes, Size, Color, Category

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name']
    search_fields = ['name']

@admin.register(Color)
class ColorAdmin(admin.ModelAdmin):
    list_display = ['name', 'hex']
    search_fields = ['name']

@admin.register(Size)
class SizeAdmin(admin.ModelAdmin):
    list_display = ['name']
    search_fields = ['name']

class ImagesInline(admin.TabularInline):
    list_display = ['products', 'image']
    model = ImageClothes
    extra = 5

class AdminClothes(admin.ModelAdmin):
    inlines = [ImagesInline]
    list_display = ("id", "name", "price", "public", "date", "image",)
    list_display_links = ("id", "name",)
    search_fields = ("name",)
    list_editable = ("public",)

admin.site.register(DataBaseClothes, AdminClothes)
