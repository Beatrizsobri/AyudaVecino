from django.db import models
from points.models import Point

# Create your models here.

class User(models.Model):
    name = models.CharField(max_length=15)
    last_name = models.CharField(max_length=15)
    points = models.ForeignKey(Point, on_delete=models.CASCADE, null=True, blank=True)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if not Point.objects.filter(id=self.id).exists():  
            Point.objects.create()



    def __str__(self):
        return self.name 
