from django.db.models import Avg, Count, Sum

from .models import Vehicle


def get_dashboard_metrics():
    vehicles = Vehicle.objects.all()
    available = vehicles.filter(is_available=True)
    sold = vehicles.filter(is_available=False)

    stock_value = available.aggregate(total=Sum('price'))['total'] or 0
    avg_price = vehicles.aggregate(avg=Avg('price'))['avg'] or 0
    avg_km = vehicles.aggregate(avg=Avg('km'))['avg'] or 0

    top_brands = (
        vehicles.values('brand')
        .annotate(count=Count('id'))
        .order_by('-count')[:5]
    )

    return {
        'total': vehicles.count(),
        'available_count': available.count(),
        'sold_count': sold.count(),
        'stock_value': stock_value,
        'avg_price': avg_price,
        'avg_km': int(avg_km),
        'top_brands': list(top_brands),
    }
