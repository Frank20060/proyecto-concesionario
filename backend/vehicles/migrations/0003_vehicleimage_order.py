from django.db import migrations, models


def set_initial_order(apps, schema_editor):
    Vehicle = apps.get_model('vehicles', 'Vehicle')
    VehicleImage = apps.get_model('vehicles', 'VehicleImage')

    for vehicle in Vehicle.objects.all():
        for index, image in enumerate(
            VehicleImage.objects.filter(vehicle=vehicle).order_by('created_at')
        ):
            image.order = index
            image.save(update_fields=['order'])


class Migration(migrations.Migration):

    dependencies = [
        ('vehicles', '0002_vehicleimage'),
    ]

    operations = [
        migrations.AddField(
            model_name='vehicleimage',
            name='order',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AlterModelOptions(
            name='vehicleimage',
            options={'ordering': ['order', 'created_at']},
        ),
        migrations.RunPython(set_initial_order, migrations.RunPython.noop),
    ]
