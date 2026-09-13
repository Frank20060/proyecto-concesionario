interface WhatsAppVehicle {
	brand: string;
	model: string;
	year: number;
	price: string;
}

function getWhatsAppNumber(): string {
	const configuredNumber =
		process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ??
		process.env.NEXT_PUBLIC_WHATSAPP ??
		process.env.VITE_WHATSAPP_NUMBER ??
		process.env.REACT_APP_WHATSAPP_NUMBER ??
		'';

	return configuredNumber.replace(/\D/g, '');
}

export function buildWhatsAppUrl(vehicle?: WhatsAppVehicle): string {
	const number = getWhatsAppNumber();

	if (!vehicle) {
		return number ? `https://wa.me/${number}` : 'https://wa.me';
	}

	if (!number) {
		return 'https://wa.me';
	}

	const message = `Hola, me gustaría solicitar información sobre el vehículo: ${vehicle.brand} ${vehicle.model} (${vehicle.year}/${vehicle.price})`;
	return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function buildWhatsAppContactUrl(): string {
	return buildWhatsAppUrl();
}
