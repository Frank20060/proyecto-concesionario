from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vehicles', '0003_vehicleimage_order'),
    ]

    operations = [
        migrations.AlterField(
            model_name='vehicleimage',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='vehicles/'),
        ),
        migrations.AddField(
            model_name='vehicleimage',
            name='cloudinary_public_id',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AddField(
            model_name='vehicleimage',
            name='cloudinary_url',
            field=models.URLField(blank=True),
        ),
    ]