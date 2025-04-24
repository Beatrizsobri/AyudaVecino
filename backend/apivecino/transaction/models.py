from django.db import models
from django.contrib.auth import get_user_model
from favor.models import Favor

class Transaction(models.Model):
    TRANSACTION_TYPES = [
        ('SPEND', 'Spend'),
        ('EARN', 'Earn'),
        ('RETURN', 'Return'),
    ]
    user = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE,
        related_name='transactions'
    )
    
    favor = models.ForeignKey(
        Favor,
        on_delete=models.CASCADE,
        related_name='transactions'
    )
    
    transaction_type = models.CharField(
        max_length=6,
        choices=TRANSACTION_TYPES,
    )
    
    amount = models.IntegerField()
    
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.transaction_type} - {self.amount}"
