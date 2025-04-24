from rest_framework import serializers
from .models import CustomUser
from district.serializers import DistrictSerializer
from district.models import District

# El objeto que voy a mostrar
class UserSerializer(serializers.ModelSerializer):
    district = DistrictSerializer(read_only=True)
    district_id = serializers.PrimaryKeyRelatedField(
        queryset=District.objects.all(),
        source='district',
        write_only=True,
        required=False
    )

    class Meta:
        model = CustomUser
        fields = (
            'id', 'username', 'email', 'first_name', 'last_name',
            'phone_number', 'points', 'district', 'district_id', 'profile_image'
        )
        depth = 1

    def to_internal_value(self, data):
        # Si viene el objeto district completo, extraemos el ID
        if 'district' in data and isinstance(data['district'], dict):
            district_data = data.pop('district')
            if 'id' in district_data:
                data['district_id'] = district_data['id']
        
        return super().to_internal_value(data)

    def update(self, instance, validated_data):
        # Actualizar los campos del usuario
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        instance.save()
        return instance

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
