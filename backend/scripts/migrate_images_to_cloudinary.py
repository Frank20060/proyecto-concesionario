"""Upload legacy local VehicleImage files to Cloudinary.

Run from backend/: python scripts/migrate_images_to_cloudinary.py
"""

import os
import sys
from pathlib import Path

BACKEND_DIR = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(BACKEND_DIR))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

import django

django.setup()

from vehicles.cloudinary_service import upload_image
from vehicles.models import VehicleImage


def main():
    pending = VehicleImage.objects.filter(
        cloudinary_url='',
        image__isnull=False,
    ).exclude(image='')
    migrated = 0

    for image in pending.iterator():
        print(f'Uploading VehicleImage #{image.pk}: {image.image.name}')
        with image.image.storage.open(image.image.name, 'rb') as local_file:
            result = upload_image(local_file, image.vehicle)

        image.cloudinary_url = result['secure_url']
        image.cloudinary_public_id = result['public_id']
        image.save(update_fields=['cloudinary_url', 'cloudinary_public_id'])
        migrated += 1

    print(f'Migrated {migrated} image(s).')


if __name__ == '__main__':
    main()