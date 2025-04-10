from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import District
from .serializers import DistrictSerializer
class DistrictViewSet(viewsets.ModelViewSet):
    queryset = District.objects.all()
    serializer_class = DistrictSerializer