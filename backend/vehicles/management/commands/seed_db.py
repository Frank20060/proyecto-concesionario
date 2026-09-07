import os
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from vehicles.models import Vehicle, VehicleImage

User = get_user_model()


class Command(BaseCommand):
    help = 'Popula la base de datos con el superusuario y los 4 vehículos exactos indicados.'

    def add_arguments(self, parser):
        parser.add_argument(
            '--reset',
            action='store_true',
            help='Elimina los vehículos existentes y vuelve a sembrar los 4 vehículos por defecto.',
        )

    def handle(self, *args, **options):
        reset = options.get('reset', False)

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
            self.stdout.write(self.style.NOTICE('El superusuario ya existe.'))

        # 2. Si se solicita --reset o la base de datos no tiene vehículos, los volvemos a generar
        if reset:
            self.stdout.write(self.style.WARNING('Eliminando vehículos existentes para re-sembrar...'))
            Vehicle.objects.all().delete()
        elif Vehicle.objects.count() > 0:
            # Si ya hay vehículos y no se fuerza el reset, limpiamos si eran los 5 vehículos genéricos anteriores
            if Vehicle.objects.filter(model='M3 Competition').exists():
                Vehicle.objects.all().delete()
            else:
                self.stdout.write(self.style.NOTICE('La base de datos ya contiene los vehículos actualizados.'))
                return

        vehicles_data = [
            {
                'brand': 'Opel',
                'model': 'Corsa E',
                'year': 2025,
                'price': 5000.00,
                'km': 168000,
                'description': 'Opel Corsa E con 168.000 km. Vehículo económico, totalmente equipado y revisado.',
                'is_available': False,
                'images': [
                    'vehicles/paulsteuber-opel-2400504_1920.jpg',
                    'vehicles/hans-automobile-384543_1920.jpg',
                    'vehicles/hans-rim-384545_1920.jpg',
                ],
            },
            {
                'brand': 'BMW',
                'model': 'Serie 3',
                'year': 2020,
                'price': 28500.00,
                'km': 58000,
                'description': 'BMW Serie 3 del año 2020 con 58.000 km. Mantenimiento al día en servicio oficial, paquete deportivo, navegador profesional y sensores de aparcamiento.',
                'is_available': True,
                'images': [
                    'vehicles/akbarnemati-bmw-m3-7325182_1920.jpg',
                    'vehicles/akbarnemati-car-7227559_1920.jpg',
                    'vehicles/akbarnemati-car-7227560_1920.jpg',
                    'vehicles/przemokrzak-car-2360210_1920.jpg',
                ],
            },
            {
                'brand': 'Volkswagen',
                'model': 'Golf',
                'year': 2021,
                'price': 22000.00,
                'km': 32000,
                'description': 'Volkswagen Golf del año 2021 con 32.000 km. Cuadro Digital Cockpit, llantas de aleación, faros LED Matrix y volante multifunción.',
                'is_available': True,
                'images': [
                    'vehicles/dermolf-vw-4332807_1920.jpg',
                    'vehicles/scottyuk30-golf-2472672_1920.jpg',
                    'vehicles/benfaist-volkswagen-6364239_1920.jpg',
                    'vehicles/steingraeber-automobile-999719_1920.jpg',
                ],
            },
            {
                'brand': 'Toyota',
                'model': 'Corolla',
                'year': 2022,
                'price': 18500.00,
                'km': 45000,
                'description': 'Toyota Corolla del año 2022 con 45.000 km. Etiqueta ECO, consumo reducido, cámara de visión trasera y asistentes de conducción.',
                'is_available': True,
                'images': [
                    'vehicles/goodfreephotos_com-toyota-347288_1920.jpg',
                    'vehicles/cicero7-toyota-2897313_1920.jpg',
                    'vehicles/cicero7-toyota-c-hr-2931733_1920.jpg',
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
            estado_str = 'Vendido' if not vehicle.is_available else 'En venta'
            self.stdout.write(self.style.SUCCESS(f'Vehículo Creado: {vehicle.brand} {vehicle.model} ({vehicle.year}) - {estado_str}'))

        self.stdout.write(self.style.SUCCESS('Base de datos populada con éxito con los 4 vehículos exactos.'))
