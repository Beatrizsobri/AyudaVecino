from django.db import models

# Create your models here.

class District(models.Model):
    name = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=10, blank=True)


    class Meta:
        verbose_name = "Distrit"
        verbose_name_plural = "Distrits"
    
    def __str__(self):
        return f"{self.name} ({self.postal_code})"
