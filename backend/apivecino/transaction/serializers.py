from rest_framework import serializers
from .models import Transaction

# El objeto que voy a mostrar
class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'






