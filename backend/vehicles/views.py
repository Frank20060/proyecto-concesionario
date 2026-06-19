from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.http import require_GET

from .models import Vehicle


def vehicle_to_dict(vehicle):
    return {
        'id': vehicle.id,
        'brand': vehicle.brand,
        'model': vehicle.model,
        'year': vehicle.year,
        'price': str(vehicle.price),
        'km': vehicle.km,
        'description': vehicle.description,
        'is_available': vehicle.is_available,
        'created_at': vehicle.created_at.isoformat(),
    }


@require_GET
def vehicle_list(request):
    vehicles = Vehicle.objects.all()
    data = [vehicle_to_dict(vehicle) for vehicle in vehicles]
    return JsonResponse(data, safe=False)


@require_GET
def vehicle_detail(request, pk):
    vehicle = get_object_or_404(Vehicle, pk=pk)
    return JsonResponse(vehicle_to_dict(vehicle))
