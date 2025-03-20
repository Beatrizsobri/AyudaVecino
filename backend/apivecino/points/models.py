from django.db import models
# Create your models here.

class Point(models.Model):
    points = models.IntegerField(default=50)    
    def __str__(self):
        return str(self.points)
