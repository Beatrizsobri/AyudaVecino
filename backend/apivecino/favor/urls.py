from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FavorViewSet, FavorByDistrictListView, FavorDetailView, accept_favor, MyFavorListView, CreatedFavorListView, AcceptedFavorListView

router = DefaultRouter()
router.register(r'', FavorViewSet)

urlpatterns = [
    path('my/', MyFavorListView.as_view(), name='my-favors'),
    path('created/', CreatedFavorListView.as_view(), name='created-favors'),
    path('accepted/', AcceptedFavorListView.as_view(), name='accepted-favors'),
    path('', include(router.urls)),
    path('district/<int:district_id>/', FavorByDistrictListView.as_view(), name='favor-by-district'),
    path('detail/<int:id>/', FavorDetailView.as_view(), name='favor-detail'),
    path('<int:favor_id>/accept/', accept_favor, name='accept-favor'),
]