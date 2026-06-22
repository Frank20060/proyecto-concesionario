from django import forms

from .models import Vehicle

INPUT_CLASS = 'form-input'


class VehicleForm(forms.ModelForm):
    class Meta:
        model = Vehicle
        fields = [
            'brand',
            'model',
            'year',
            'price',
            'km',
            'description',
            'is_available',
        ]
        widgets = {
            'brand': forms.TextInput(attrs={'class': INPUT_CLASS, 'placeholder': 'Ej. Toyota'}),
            'model': forms.TextInput(attrs={'class': INPUT_CLASS, 'placeholder': 'Ej. Corolla'}),
            'year': forms.NumberInput(attrs={'class': INPUT_CLASS, 'min': 1900, 'max': 2100}),
            'price': forms.NumberInput(attrs={'class': INPUT_CLASS, 'step': '0.01', 'min': 0}),
            'km': forms.NumberInput(attrs={'class': INPUT_CLASS, 'min': 0}),
            'description': forms.Textarea(attrs={'class': INPUT_CLASS, 'rows': 4}),
            'is_available': forms.CheckboxInput(attrs={'class': 'form-checkbox'}),
        }
        labels = {
            'brand': 'Marca',
            'model': 'Modelo',
            'year': 'Año',
            'price': 'Precio (€)',
            'km': 'Kilometraje',
            'description': 'Descripción',
            'is_available': 'Disponible para venta',
        }
