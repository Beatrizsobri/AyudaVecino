from django.db import models
from django.contrib.auth.models import AbstractUser
from district.models import District

class CustomUser(AbstractUser):
    """
    Modelo de Usuario personalizado que hereda de AbstractUser.
    
    Campos heredados de AbstractUser:
    - username: Nombre de usuario único
    - first_name: Nombre
    - last_name: Apellido
    - email: Correo electrónico
    - password: Contraseña (almacenada de forma segura)
    - is_active: Booleano que indica si la cuenta está activa
    - is_staff: Booleano que indica si el usuario puede acceder al admin
    - is_superuser: Booleano que indica si es un superusuario
    - date_joined: Fecha y hora de registro
    - last_login: Última fecha y hora de inicio de sesión
    - groups: Relación muchos a muchos con grupos de permisos
    - user_permissions: Relación muchos a muchos con permisos individuales
    """

    phone_number = models.CharField(max_length=15)
    points = models.IntegerField(default=0)
    district = models.ForeignKey(District, on_delete=models.SET_NULL, null=True, blank=True, related_name='users')

    def __str__(self):
        return f"{self.username} - {self.first_name} {self.last_name}"

    def save(self, *args, **kwargs):
        """
        Normaliza el email antes de guardar el usuario.
        Convierte el email a minúsculas y elimina espacios en blanco.
        """
        if self.email:
            self.email = self.email.lower().strip()
        super().save(*args, **kwargs)
