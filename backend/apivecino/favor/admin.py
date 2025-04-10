from django.contrib import admin
from .models import Favor

@admin.register(Favor)
class FavorAdmin(admin.ModelAdmin):
    list_display = ('title', 'type', 'creator', 'assigned_user', 'status', 'points', 'publication_date', 'deadline', 'district')
    list_filter = ('type', 'status', 'publication_date', 'deadline', 'district')
    search_fields = ('title', 'description', 'creator__username', 'assigned_user__username', 'district__name')
    readonly_fields = ('publication_date',)
    ordering = ('-publication_date',)
    date_hierarchy = 'publication_date'
    
    fieldsets = (
        ('Información Básica', {
            'fields': ('title', 'type', 'description', 'status', 'points', 'district')
        }),
        ('Fechas', {
            'fields': ('publication_date', 'deadline')
        }),
        ('Usuarios', {
            'fields': ('creator', 'assigned_user')
        }),
    )
