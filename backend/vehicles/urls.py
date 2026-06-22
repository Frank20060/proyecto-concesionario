from django.urls import path

from . import views

urlpatterns = [
    path('vehicles/brands/', views.vehicle_brands, name='vehicle-brands'),
    path('vehicles/', views.vehicle_list, name='vehicle-list'),
    path('vehicles/<int:pk>/', views.vehicle_detail, name='vehicle-detail'),
]
