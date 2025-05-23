from math import prod
from django.contrib import admin
from Api_Clothes.models import DataBaseClothes, ImageClothes, Size, Color, Category, ClothesSizeColorStock

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

class ProductsSizeStockInline(admin.TabularInline):
    model = ClothesSizeColorStock
    extra = 1

class AdminClothes(admin.ModelAdmin):
    inlines = [ImagesInline, ProductsSizeStockInline]
    list_display = ("id", "name", "price", "public", "date", "image",)
    list_display_links = ("id", "name",)
    search_fields = ("name",)
    list_editable = ("public",)

admin.site.register(DataBaseClothes, AdminClothes)
