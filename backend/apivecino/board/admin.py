from django.contrib import admin
from .models import Board

@admin.register(Board)
class BoardAdmin(admin.ModelAdmin):
    list_display = ('district', 'creation_date', 'get_favors_count')
    list_filter = ('district', 'creation_date')
    search_fields = ('district__name',)
    readonly_fields = ('creation_date',)
    filter_horizontal = ('favors',)
    
    def get_favors_count(self, obj):
        return obj.favors.count()
    get_favors_count.short_description = 'Número de Favores'
    
    fieldsets = (
        ('Información Principal', {
            'fields': ('district', 'creation_date')
        }),
        ('Favores', {
            'fields': ('favors',),
            'classes': ('collapse',)
        }),
    )
