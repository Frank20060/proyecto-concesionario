from django.contrib import admin

from .models import Vehicle


@admin.register(Vehicle)
class VehicleAdmin(admin.ModelAdmin):
    list_display = ['brand', 'model', 'year', 'price', 'km', 'is_available', 'created_at']
    list_filter = ['is_available', 'brand', 'year']
    search_fields = ['brand', 'model']
