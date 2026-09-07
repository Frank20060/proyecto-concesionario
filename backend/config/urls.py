"""
URL configuration for concesionario project.
"""

from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.http import JsonResponse
from django.urls import include, path
from django.views.static import serve

from vehicles import views


def health_check(_request):
    return JsonResponse({'status': 'ok'})


urlpatterns = [
    path('health/', health_check, name='health'),
    path('', views.dashboard, name='dashboard'),
    path('login/', auth_views.LoginView.as_view(template_name='vehicles/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('vehiculos/nuevo/', views.vehicle_create, name='vehicle-create'),
    path('vehiculos/<int:pk>/editar/', views.vehicle_update, name='vehicle-update'),
    path('vehiculos/<int:pk>/imagenes/reordenar/', views.vehicle_images_reorder, name='vehicle-images-reorder'),
    path('vehiculos/<int:pk>/eliminar/', views.vehicle_delete, name='vehicle-delete'),
    path('vehiculos/imagen/<int:pk>/eliminar/', views.vehicle_image_delete, name='vehicle-image-delete'),
    path('admin/', admin.site.urls),
    path('api/', include('vehicles.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
else:
    urlpatterns += [
        path(
            'media/<path:path>',
            serve,
            {'document_root': settings.MEDIA_ROOT},
        ),
    ]
