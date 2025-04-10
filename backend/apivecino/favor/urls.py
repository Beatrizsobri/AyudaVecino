from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FavorViewSet, FavorByDistrictListView, FavorDetailView, accept_favor

router = DefaultRouter()
router.register(r'favors', FavorViewSet)

urlpatterns = [
    # path('my/', MyFavorListCreateView.as_view(), name='my-favors'),  # <- esta es nueva
    path('', include(router.urls)),
    path('district/<int:district_id>/', FavorByDistrictListView.as_view(), name='favor-by-district'),
    path('detail/<int:id>/', FavorDetailView.as_view(), name='favor-detail'),
    path('<int:favor_id>/accept/', accept_favor, name='accept-favor'),
]