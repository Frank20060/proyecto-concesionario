from django.conf import settings
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.db.models import Max, Q
from django.http import JsonResponse
from django.shortcuts import get_object_or_404, redirect, render
from django.views.decorators.http import require_GET, require_http_methods, require_POST

from .forms import VehicleForm
from .metrics import get_dashboard_metrics
from .models import Vehicle, VehicleImage


# --- API JSON (pública, sin login) ---


def vehicle_to_dict(vehicle, request=None):
    base = settings.PUBLIC_BASE_URL.rstrip('/')
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
        'images': [
            f'{base}{image.image.url}'
            for image in vehicle.images.all()
        ],
    }


def save_vehicle_images(vehicle, files):
    if not files:
        return

    max_order = vehicle.images.aggregate(max_order=Max('order'))['max_order']
    next_order = 0 if max_order is None else max_order + 1

    for uploaded_file in files:
        VehicleImage.objects.create(
            vehicle=vehicle,
            image=uploaded_file,
            order=next_order,
        )
        next_order += 1


def filter_vehicles_queryset(request, *, for_dashboard=False):
    qs = Vehicle.objects.prefetch_related('images')

    default_status = 'all' if for_dashboard else 'available'
    status = request.GET.get('status', default_status)
    if for_dashboard:
        if status not in ('all', 'available', 'sold'):
            status = 'all'
    elif status not in ('available', 'sold'):
        status = 'available'

    if status == 'sold':
        qs = qs.filter(is_available=False)
    elif status == 'available':
        qs = qs.filter(is_available=True)

    brand = request.GET.get('brand', '').strip()
    if brand:
        qs = qs.filter(brand__iexact=brand)

    q = request.GET.get('q', '').strip()
    if q:
        terms = q.split()
        if len(terms) >= 2:
            qs = qs.filter(
                brand__icontains=terms[0],
                model__icontains=' '.join(terms[1:]),
            )
        else:
            qs = qs.filter(Q(brand__icontains=q) | Q(model__icontains=q))

    return qs.order_by('-created_at')


def get_vehicle_brands():
    return list(
        Vehicle.objects.values_list('brand', flat=True)
        .distinct()
        .order_by('brand')
    )


@require_GET
def vehicle_list(request):
    vehicles = filter_vehicles_queryset(request)
    data = [vehicle_to_dict(vehicle, request) for vehicle in vehicles]
    return JsonResponse(data, safe=False)


@require_GET
def vehicle_brands(request):
    return JsonResponse(get_vehicle_brands(), safe=False)


@require_GET
def vehicle_detail(request, pk):
    vehicle = get_object_or_404(Vehicle.objects.prefetch_related('images'), pk=pk)
    return JsonResponse(vehicle_to_dict(vehicle, request))


# --- Dashboard (requiere login) ---


@login_required
def dashboard(request):
    vehicles = filter_vehicles_queryset(request, for_dashboard=True)
    metrics = get_dashboard_metrics()

    status = request.GET.get('status', 'all')
    if status not in ('all', 'available', 'sold'):
        status = 'all'

    return render(request, 'vehicles/dashboard.html', {
        'vehicles': vehicles,
        'brands': get_vehicle_brands(),
        'metrics': metrics,
        'filters': {
            'brand': request.GET.get('brand', ''),
            'q': request.GET.get('q', ''),
            'status': status,
        },
    })


@login_required
@require_http_methods(['GET', 'POST'])
def vehicle_create(request):
    if request.method == 'POST':
        form = VehicleForm(request.POST)
        if form.is_valid():
            vehicle = form.save()
            save_vehicle_images(vehicle, request.FILES.getlist('images'))
            messages.success(request, 'Vehículo añadido correctamente.')
            return redirect('dashboard')
    else:
        form = VehicleForm()

    return render(request, 'vehicles/vehicle_form.html', {
        'form': form,
        'title': 'Añadir vehículo',
    })


@login_required
@require_http_methods(['GET', 'POST'])
def vehicle_update(request, pk):
    vehicle = get_object_or_404(Vehicle.objects.prefetch_related('images'), pk=pk)

    if request.method == 'POST':
        form = VehicleForm(request.POST, instance=vehicle)
        if form.is_valid():
            vehicle = form.save()
            save_vehicle_images(vehicle, request.FILES.getlist('images'))
            messages.success(request, 'Vehículo actualizado correctamente.')
            return redirect('dashboard')
    else:
        form = VehicleForm(instance=vehicle)

    return render(request, 'vehicles/vehicle_form.html', {
        'form': form,
        'title': f'Editar {vehicle}',
        'vehicle': vehicle,
    })


@login_required
@require_POST
def vehicle_image_delete(request, pk):
    image = get_object_or_404(VehicleImage, pk=pk)
    vehicle_pk = image.vehicle_id
    image.delete()
    messages.success(request, 'Imagen eliminada correctamente.')
    return redirect('vehicle-update', pk=vehicle_pk)


@login_required
@require_POST
def vehicle_images_reorder(request, pk):
    import json

    vehicle = get_object_or_404(Vehicle, pk=pk)

    try:
        payload = json.loads(request.body)
        order = payload.get('order', [])
    except json.JSONDecodeError:
        return JsonResponse({'error': 'JSON inválido'}, status=400)

    if not isinstance(order, list):
        return JsonResponse({'error': 'order debe ser una lista'}, status=400)

    images = {image.pk: image for image in vehicle.images.all()}
    if len(order) != len(images) or set(order) != set(images.keys()):
        return JsonResponse({'error': 'Lista de imágenes inválida'}, status=400)

    for index, image_id in enumerate(order):
        images[image_id].order = index

    VehicleImage.objects.bulk_update(images.values(), ['order'])
    return JsonResponse({'ok': True})


@login_required
@require_http_methods(['GET', 'POST'])
def vehicle_delete(request, pk):
    vehicle = get_object_or_404(Vehicle, pk=pk)

    if request.method == 'POST':
        vehicle.delete()
        messages.success(request, 'Vehículo eliminado correctamente.')
        return redirect('dashboard')

    return render(request, 'vehicles/vehicle_confirm_delete.html', {
        'vehicle': vehicle,
    })
