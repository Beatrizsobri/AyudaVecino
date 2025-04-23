from django.db import models
from django.contrib.auth.models import AbstractUser
from district.models import District
from django.utils.translation import gettext_lazy as _

DEFAULT_AVATAR_SVG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23999'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/%3E%3C/svg%3E"

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
    profile_image = models.URLField(
        max_length=500,
        blank=True,
        default=DEFAULT_AVATAR_SVG,
        help_text="URL of the user's profile image"
    )

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
