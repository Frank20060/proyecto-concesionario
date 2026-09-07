import os
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from vehicles.models import Vehicle, VehicleImage

User = get_user_model()


class Command(BaseCommand):
    help = 'Popula la base de datos con un superusuario inicial y vehículos de prueba si la BD está vacía.'

    def handle(self, *args, **options):
        # 1. Crear superusuario inicial
        admin_username = os.environ.get('ADMIN_USERNAME', 'admin')
        admin_email = os.environ.get('ADMIN_EMAIL', 'admin@grandmotors.es')
        admin_password = os.environ.get('ADMIN_PASSWORD', 'admin1234')

        if not User.objects.filter(username=admin_username).exists() and not User.objects.filter(is_superuser=True).exists():
            User.objects.create_superuser(
                username=admin_username,
                email=admin_email,
                password=admin_password,
            )
            self.stdout.write(self.style.SUCCESS(f'Superusuario "{admin_username}" creado con éxito.'))
        else:
            self.stdout.write(self.style.NOTICE('El superusuario ya existe. Se omite la creación.'))

        # 2. Crear vehículos de prueba si la base de datos está vacía
        if Vehicle.objects.count() > 0:
            self.stdout.write(self.style.NOTICE('La base de datos ya contiene vehículos. Se omite el seed.'))
            return

        vehicles_data = [
            {
                'brand': 'BMW',
                'model': 'M3 Competition',
                'year': 2021,
                'price': 54900.00,
                'km': 45000,
                'description': 'Espectacular BMW M3 Competition en estado impecable. Mantenimiento completo en servicio oficial. Equipamiento M Performance, asientos deportivos de cuero, sistema de sonido Harman Kardon, navegador profesional y sensores de aparcamiento 360°.',
                'is_available': True,
                'images': [
                    'vehicles/akbarnemati-bmw-m3-7325182_1920.jpg',
                    'vehicles/akbarnemati-car-7227559_1920.jpg',
                    'vehicles/akbarnemati-car-7227560_1920.jpg',
                ],
            },
            {
                'brand': 'Toyota',
                'model': 'C-HR Hybrid Dynamic',
                'year': 2022,
                'price': 23500.00,
                'km': 28000,
                'description': 'Toyota C-HR 125H Dynamic en excelente estado. Único propietario, etiqueta ECO de la DGT, consumo súper reducido, cámara de visión trasera, control de crucero adaptativo y asistentes de seguridad Toyota Safety Sense.',
                'is_available': True,
                'images': [
                    'vehicles/cicero7-toyota-c-hr-2931733_1920.jpg',
                    'vehicles/cicero7-toyota-2897313_1920.jpg',
                    'vehicles/goodfreephotos_com-toyota-347288_1920.jpg',
                ],
            },
            {
                'brand': 'Volkswagen',
                'model': 'Golf GTI DSG',
                'year': 2020,
                'price': 29800.00,
                'km': 52000,
                'description': 'Volkswagen Golf GTI DSG. Cambio automático de 7 velocidades, llantas de aleación de 18 pulgadas, cockpit digital, faros Full LED Matrix y modos de conducción seleccionables. Vehículo totalmente revisado y garantizado por 12 meses.',
                'is_available': True,
                'images': [
                    'vehicles/scottyuk30-golf-2472672_1920.jpg',
                    'vehicles/benfaist-volkswagen-6364239_1920.jpg',
                    'vehicles/dermolf-vw-4332807_1920.jpg',
                ],
            },
            {
                'brand': 'Opel',
                'model': 'Astra Turbo Innovation',
                'year': 2019,
                'price': 14200.00,
                'km': 68000,
                'description': 'Opel Astra 1.4 Turbo 125 CV con acabado Innovation. Equipado con climatizador bizona, pantalla táctil con Apple CarPlay y Android Auto, sensores de luz y lluvia, y llantas de aleación de 17 pulgadas.',
                'is_available': True,
                'images': [
                    'vehicles/paulsteuber-opel-2400504_1920.jpg',
                    'vehicles/hans-automobile-384543_1920.jpg',
                ],
            },
            {
                'brand': 'Audi',
                'model': 'A4 Avant S-Line',
                'year': 2021,
                'price': 33500.00,
                'km': 39000,
                'description': 'Audi A4 Avant S-Line 40 TDI. Techo panorámico practicable, tracción quattro, paquete deportivo exterior e interior S-Line, faros LED Matrix y Audi virtual cockpit. Estado seminuevo con garantía oficial.',
                'is_available': True,
                'images': [
                    'vehicles/przemokrzak-car-2360210_1920.jpg',
                    'vehicles/steingraeber-automobile-999719_1920.jpg',
                ],
            },
        ]

        for v_data in vehicles_data:
            images = v_data.pop('images')
            vehicle = Vehicle.objects.create(**v_data)
            for idx, img_path in enumerate(images):
                VehicleImage.objects.create(
                    vehicle=vehicle,
                    image=img_path,
                    order=idx,
                )
            self.stdout.write(self.style.SUCCESS(f'Vehículo Creado: {vehicle.brand} {vehicle.model} ({vehicle.year})'))

        self.stdout.write(self.style.SUCCESS('Base de datos populada correctamente.'))
