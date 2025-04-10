from rest_framework import serializers
from .models import CustomUser

# El objeto que voy a mostrar
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = (
            'id', 'username', 'email', 'first_name', 'last_name',
            'phone_number', 'points', 'district',
        )
        depth = 1

class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = (
            'username', 'email', 'password',
            'first_name', 'last_name', 'phone_number', 'district'
        )
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user
