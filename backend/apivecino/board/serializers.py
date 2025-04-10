from rest_framework import serializers
from .models import Board

# El objeto que voy a mostrar
class BoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Board
        fields = '__all__'






