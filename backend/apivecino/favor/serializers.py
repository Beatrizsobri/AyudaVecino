from rest_framework import serializers
from .models import Favor
from district.serializers import DistrictSerializer
from user.serializers import UserSerializer

# El objeto que voy a mostrar
class FavorSerializer(serializers.ModelSerializer):
    creator = UserSerializer(read_only=True)
    district = DistrictSerializer(read_only=True)
    
    class Meta:
        model = Favor
        fields = ['id', 'title', 'deadline', 'description', 'type', 'points', 'creator', 'district', 'publication_date', 'status']
        read_only_fields = ['creator', 'publication_date', 'status']

    def create(self, validated_data):
        validated_data['creator'] = self.context['request'].user
        return super().create(validated_data)



class MyFavorSerializer(serializers.ModelSerializer):
    district = DistrictSerializer(read_only=True)
    
    class Meta:
        model = Favor
        fields = ['id', 'title', 'deadline', 'description', 'type', 'points', 'district', 'publication_date', 'status', 'assigned_user']
        read_only_fields = ['creator', 'publication_date', 'status', 'assigned_user']


