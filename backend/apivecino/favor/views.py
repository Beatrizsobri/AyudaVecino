from django.shortcuts import render
from rest_framework import viewsets, generics, permissions, pagination
from .models import Favor
from .serializers import FavorSerializer, MyFavorSerializer
from district.models import District
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import IsAuthenticated
from transaction.models import Transaction
from django.db import transaction
from django.db.models import Q

class CustomPagination(pagination.PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

# Create your views here.
class FavorViewSet(viewsets.ModelViewSet):
    queryset = Favor.objects.all()
    serializer_class = FavorSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = CustomPagination

    def get_queryset(self):
        queryset = Favor.objects.all()
        
        # Get status from query parameters
        status = self.request.query_params.get('status', None)
        if status:
            queryset = queryset.filter(status=status)
            
        # Get type from query parameters
        type = self.request.query_params.get('type', None)
        if type:
            queryset = queryset.filter(type=type)
            
        # Get date range and district from query parameters
        start_date = self.request.query_params.get('start_date', None)
        end_date = self.request.query_params.get('end_date', None)
        district_id = self.request.query_params.get('district_id', None)
        
        # Apply filters based on available parameters
        if start_date and end_date:
            queryset = queryset.filter(deadline__range=[start_date, end_date])
            
        if district_id:
            queryset = queryset.filter(district_id=district_id)
            
        return queryset

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)

class FavorByDistrictListView(generics.ListAPIView):
    serializer_class = FavorSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        district_id = self.kwargs['district_id']
        district = get_object_or_404(District, id=district_id)
        return Favor.objects.filter(district=district)

class FavorDetailView(generics.RetrieveAPIView):
    queryset = Favor.objects.all()
    serializer_class = FavorSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'id'

class MyFavorListView(generics.ListAPIView):
    serializer_class = MyFavorSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Favor.objects.filter(Q(creator=self.request.user) | Q(assigned_user=self.request.user))

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def accept_favor(request, favor_id):
    try:
        favor = Favor.objects.get(id=favor_id)
    except Favor.DoesNotExist:
        return Response({'error': 'Favor not found'}, status=status.HTTP_404_NOT_FOUND)

    if favor.status != 'PENDING':
        return Response({'error': 'Favor is not available for acceptance'}, 
                       status=status.HTTP_400_BAD_REQUEST)

    if favor.creator == request.user:
        return Response({'error': 'You cannot accept your own favor'}, 
                       status=status.HTTP_400_BAD_REQUEST)

    with transaction.atomic():
        # Update favor status and assign user
        favor.status = 'ACCEPTED'
        favor.assigned_user = request.user
        favor.save()

        # Create transactions
        # Transaction for the acceptor (EARN)
        Transaction.objects.create(
            user=request.user,
            favor=favor,
            transaction_type='EARN',
            amount=favor.points
        )

        # Transaction for the creator (SPEND)
        Transaction.objects.create(
            user=favor.creator,
            favor=favor,
            transaction_type='SPEND',
            amount=favor.points
        )

    return Response({'message': 'Favor accepted successfully'}, 
                   status=status.HTTP_200_OK)
