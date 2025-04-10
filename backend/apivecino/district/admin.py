from django.contrib import admin
from .models import District

@admin.register(District)
class DistrictAdmin(admin.ModelAdmin):
    list_display = ('name', 'postal_code')
    list_filter = ('name',)
    search_fields = ('name', 'postal_code')
    ordering = ('name',)
    list_per_page = 25
