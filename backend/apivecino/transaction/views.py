from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Transaction
from .serializers import TransactionSerializer
from django.db import models

class TransactionPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'
    max_page_size = 5

class TransactionViewSet(viewsets.ModelViewSet):
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = TransactionPagination

    def get_queryset(self):
        queryset = Transaction.objects.filter(user=self.request.user)
        transaction_type = self.request.query_params.get('transaction_type', None)
        
        if transaction_type:
            queryset = queryset.filter(transaction_type=transaction_type)
            
        return queryset

    @action(detail=False, methods=['get'])
    def totals(self, request):
        user = request.user
        queryset = Transaction.objects.filter(user=user)
        
        # Calculate totals
        total_earned = queryset.filter(transaction_type='EARN').aggregate(total=models.Sum('amount'))['total'] or 0
        total_spent = queryset.filter(transaction_type='SPEND').aggregate(total=models.Sum('amount'))['total'] or 0
        total_favors = queryset.count()
        
        return Response({
            'total_earned': total_earned,
            'total_spent': total_spent,
            'total_favors': total_favors
        })