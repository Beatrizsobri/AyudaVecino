from rest_framework import serializers
from .models import Point

class PointSerializer(serializers.ModelSerializer):
    class Meta:
        model = Point
        fields = ['id', 'points']



    # points = models.IntegerField(default=50)
    # user = models.ForeignKey(User,on_delete=models.CASCADE)
