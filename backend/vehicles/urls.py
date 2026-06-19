from django.urls import path

from . import views

urlpatterns = [
    path('vehicles/', views.vehicle_list, name='vehicle-list'),
    path('vehicles/<int:pk>/', views.vehicle_detail, name='vehicle-detail'),
]
