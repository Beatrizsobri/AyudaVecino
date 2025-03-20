from django.contrib import admin

# Register your models here.
from .models import Point

admin.site.register(Point)  # Registra el modelo en el panel de administración
