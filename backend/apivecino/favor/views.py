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
from rest_framework import serializers

class CustomPagination(pagination.PageNumberPagination):
    page_size = 6
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
        user = self.request.user
        favor = serializer.save(creator=user)
        
        # Check if user has enough points
        if user.points < favor.points:
            raise serializers.ValidationError({
                'error': 'No tienes suficientes puntos para crear este favor'
            })
        
        # Deduct points from creator
        user.points -= favor.points
        user.save()
        
        # Create transaction
        Transaction.objects.create(
            user=favor.creator,
            favor=favor,
            transaction_type='SPEND',
            amount=favor.points
        )

    @action(detail=True, methods=['post'])
    def cancel(self, request, pk=None):
        favor = self.get_object()
        
        # Check if the user is the creator
        if favor.creator != request.user:
            return Response(
                {'error': 'Solo el creador puede cancelar el favor'}, 
                status=status.HTTP_403_FORBIDDEN
            )
            
        # Check if the favor is already cancelled
        if favor.status == 'CANCELLED':
            return Response(
                {'error': 'El favor ya está cancelado'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
            
        with transaction.atomic():
            # Update favor status
            favor.status = 'CANCELLED'
            favor.save()
            
            # Add points back to creator
            favor.creator.points += favor.points
            favor.creator.save()
            
            # Create RETURN transaction for creator
            Transaction.objects.create(
                user=favor.creator,
                favor=favor,
                transaction_type='RETURN',
                amount=favor.points
            )
            
            # If there is an assigned user, deduct points and create RETURN transaction
            if favor.assigned_user:
                favor.assigned_user.points -= favor.points
                favor.assigned_user.save()
                
                Transaction.objects.create(
                    user=favor.assigned_user,
                    favor=favor,
                    transaction_type='RETURN',
                    amount=-favor.points
                )
            
        return Response(
            {'message': 'Favor cancelado exitosamente'}, 
            status=status.HTTP_200_OK
        )

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
    pagination_class = CustomPagination

    def get_queryset(self):
        queryset = Favor.objects.filter(Q(creator=self.request.user) | Q(assigned_user=self.request.user))
        
        # Get status from query parameters
        status = self.request.query_params.get('status', None)
        if status and status != 'ALL':
            # Validar que el estado es uno de los permitidos
            if status in ['PENDING', 'ACCEPTED', 'CANCELLED']:
                queryset = queryset.filter(status=status)
        
        # Ordenar por fecha (deadline) de más cercana a más lejana
        queryset = queryset.order_by('deadline')
            
        print(f"MyFavorListView - Total items: {queryset.count()}")
        return queryset

class CreatedFavorListView(generics.ListAPIView):
    serializer_class = FavorSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = CustomPagination

    def get_queryset(self):
        queryset = Favor.objects.filter(creator=self.request.user)
        
        # Get status from query parameters
        status = self.request.query_params.get('status', None)
        if status and status != 'ALL':
            # Validar que el estado es uno de los permitidos
            if status in ['PENDING', 'ACCEPTED', 'CANCELLED']:
                queryset = queryset.filter(status=status)
        
        # Ordenar por fecha (deadline) de más cercana a más lejana
        queryset = queryset.order_by('deadline')
            
        print(f"CreatedFavorListView - Total items: {queryset.count()}")
        return queryset

class AcceptedFavorListView(generics.ListAPIView):
    serializer_class = FavorSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = CustomPagination

    def get_queryset(self):
        queryset = Favor.objects.filter(assigned_user=self.request.user)
        
        # Get status from query parameters
        status = self.request.query_params.get('status', None)
        if status and status != 'ALL':
            # Validar que el estado es uno de los permitidos
            if status in ['PENDING', 'ACCEPTED', 'CANCELLED']:
                queryset = queryset.filter(status=status)
        
        # Ordenar por fecha (deadline) de más cercana a más lejana
        queryset = queryset.order_by('deadline')
            
        print(f"AcceptedFavorListView - Total items: {queryset.count()}")
        return queryset

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

        # Update user points
        request.user.points += favor.points
        request.user.save()

        # Create transactions
        # Transaction for the acceptor (EARN)
        Transaction.objects.create(
            user=request.user,
            favor=favor,
            transaction_type='EARN',
            amount=favor.points
        )

    return Response({'message': 'Favor accepted successfully'}, 
                   status=status.HTTP_200_OK)
