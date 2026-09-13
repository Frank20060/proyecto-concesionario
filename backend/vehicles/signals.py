from django.db.models.signals import post_delete, pre_save
from django.dispatch import receiver

from .cloudinary_service import delete_image
from .models import VehicleImage


@receiver(pre_save, sender=VehicleImage)
def delete_old_image_on_change(sender, instance, **kwargs):
    if not instance.pk:
        return

    try:
        old_instance = VehicleImage.objects.get(pk=instance.pk)
    except VehicleImage.DoesNotExist:
        return

    if old_instance.image and old_instance.image != instance.image:
        old_instance.image.delete(save=False)


@receiver(post_delete, sender=VehicleImage)
def delete_image_file(sender, instance, **kwargs):
    if instance.image:
        instance.image.delete(save=False)
    if instance.cloudinary_public_id:
        delete_image(instance.cloudinary_public_id)
