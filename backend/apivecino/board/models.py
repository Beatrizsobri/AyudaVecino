from django.db import models
from favor.models import Favor
from district.models import District

class Board(models.Model):
    district = models.OneToOneField(
        District,
        on_delete=models.CASCADE,
        related_name='board',
        verbose_name='District'
    )
    favors = models.ManyToManyField(
        Favor,
        related_name='boards',
        verbose_name='Favors'
    )
    creation_date = models.DateTimeField(auto_now_add=True, verbose_name='Creation date')

    class Meta:
        verbose_name = 'Board'
        verbose_name_plural = 'Boards'

    def __str__(self):
        return f"Board of {self.district.name}"
