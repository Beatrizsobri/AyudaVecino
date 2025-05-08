from rest_framework import serializers
from .models import Transaction
from favor.serializers import FavorSerializer

# El objeto que voy a mostrar
class TransactionSerializer(serializers.ModelSerializer):
    favor = FavorSerializer(read_only=True)
    
    class Meta:
        model = Transaction
        fields = '__all__'






