from django.contrib import admin

# Register your models here.
from .models import User

admin.site.register(User)  # Registra el modelo en el panel de administración
