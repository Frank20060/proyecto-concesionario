from django.conf import settings


def _require_configuration():
    if not all((
        settings.CLOUDINARY_CLOUD_NAME,
        settings.CLOUDINARY_API_KEY,
        settings.CLOUDINARY_API_SECRET,
    )):
        raise RuntimeError(
            'Cloudinary no está configurado. Define CLOUDINARY_CLOUD_NAME, '
            'CLOUDINARY_API_KEY y CLOUDINARY_API_SECRET.'
        )


def upload_image(uploaded_file, vehicle):
    _require_configuration()

    import cloudinary.uploader

    result = cloudinary.uploader.upload(
        uploaded_file,
        folder='concesionario/vehicles',
        context={
            'vehicle_id': str(vehicle.pk),
            'vehicle': str(vehicle),
        },
        resource_type='image',
    )
    return {
        'secure_url': result['secure_url'],
        'public_id': result['public_id'],
    }


def delete_image(public_id):
    _require_configuration()

    import cloudinary.uploader

    cloudinary.uploader.destroy(public_id, resource_type='image')