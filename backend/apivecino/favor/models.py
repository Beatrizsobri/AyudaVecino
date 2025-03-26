from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone

class Favor(models.Model):
    TYPE_CHOICES = [
        ('COOKING', 'Cooking'),
        ('MASONRY', 'Masonry'),
        ('CLASS', 'Class'),
    ]

    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('ACCEPTED', 'Accepted'),
        ('CANCELLED', 'Cancelled'),
    ]

    type = models.CharField(
        max_length=20,
        choices=TYPE_CHOICES,
        verbose_name='Favor type'
    )
    
    description = models.TextField(
        verbose_name='Description'
    )
    
    publication_date = models.DateTimeField(
        default=timezone.now,
        verbose_name='Publication date'
    )
    
    deadline = models.DateTimeField(
        verbose_name='Deadline'
    )
    
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='PENDING',
        verbose_name='Status'
    )
    
    creator = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE,
        related_name='created_favors',
        verbose_name='Favor creator'
    )
    
    assigned_user = models.ForeignKey(
        get_user_model(),
        on_delete=models.SET_NULL,
        related_name='assigned_favors',
        null=True,
        blank=True,
        verbose_name='Assigned user'
    )

    class Meta:
        verbose_name = 'Favor'
        verbose_name_plural = 'Favors'

    def __str__(self):
        return f"{self.get_type_display()} - {self.creator.username}"