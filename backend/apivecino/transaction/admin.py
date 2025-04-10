from django.contrib import admin
from .models import Transaction

@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('user', 'favor', 'transaction_type', 'amount', 'date_created')
    list_filter = ('transaction_type', 'date_created')
    search_fields = ('user__username', 'favor__title')
    readonly_fields = ('date_created',)
    ordering = ('-date_created',)
    
    fieldsets = (
        ('Información Principal', {
            'fields': ('user', 'favor', 'transaction_type', 'amount')
        }),
        ('Información Temporal', {
            'fields': ('date_created',),
            'classes': ('collapse',)
        }),
    )
