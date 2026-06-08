import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-lugar-boda',
  templateUrl: './lugar-boda.component.html',
  styleUrls: ['./lugar-boda.component.css']
})
export class LugarBodaComponent {
  readonly venueAddress = 'Avenida Concha y Toro 01340, Pirque, Centro de Eventos Aires del Maipo';
  userOrigin = '';
  directionsEmbedUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.directionsEmbedUrl = this.buildEmbedUrl();
  }

  venuePhotos = [
    { src: '/assets/img/LugarEvento/aires1.png', alt: 'Aires del Maipo 1' },
    { src: '/assets/img/LugarEvento/aires2.png', alt: 'Aires del Maipo 2' },
    { src: '/assets/img/LugarEvento/aires3.jpg', alt: 'Aires del Maipo 3' },
    { src: '/assets/img/LugarEvento/aires4.jpg', alt: 'Aires del Maipo 4' },
    { src: '/assets/img/LugarEvento/aires5.jpg', alt: 'Aires del Maipo 5' },
    { src: '/assets/img/LugarEvento/aires56.jpg', alt: 'Aires del Maipo 6' },
    { src: '/assets/img/LugarEvento/aires7.jpg', alt: 'Aires del Maipo 7' },
    { src: '/assets/img/LugarEvento/aires8.jpg', alt: 'Aires del Maipo 8' },
    { src: '/assets/img/LugarEvento/aires9.jpg', alt: 'Aires del Maipo 9' },
    { src: '/assets/img/LugarEvento/aires10.jpg', alt: 'Aires del Maipo 10' },
    { src: '/assets/img/LugarEvento/aires11.jpg', alt: 'Aires del Maipo 11' },
  ];

  carouselIndex = 0;
  prevIndex = -1;

  nextPhoto(): void {
    this.prevIndex = this.carouselIndex;
    this.carouselIndex = (this.carouselIndex + 1) % this.venuePhotos.length;
  }

  prevPhoto(): void {
    this.prevIndex = this.carouselIndex;
    this.carouselIndex = (this.carouselIndex - 1 + this.venuePhotos.length) % this.venuePhotos.length;
  }

  goToPhoto(index: number): void {
    this.prevIndex = this.carouselIndex;
    this.carouselIndex = index;
  }

  schedule = [
    {
      hour: '18:00 - 19:00',
      event: 'Ceremonia',
      place: 'Sector jardin, costado de salon cerrado.'
    },
    {
      hour: '19:00 - 20:15',
      event: 'Inicio Coctel',
      place: 'Cambio de ambiente a sector carpa y pergola 7 estrellas.'
    },
    {
      hour: '20:15 - 22:30',
      event: 'Cena de 3 tiempos',
      place: 'Incluye plato de entrada, plato de fondo y estacion buffet con 5 variedades de postres.'
    },
    {
      hour: '22:30 - 02:30',
      event: 'Fiesta y bar abierto',
      place: ''
    },
    {
      hour: 'Todo el evento',
      event: 'Estacion de coffee libre',
      place: 'Te, cafe y hierbas de libre consumo durante toda la celebracion.'
    },
    {
      hour: 'Todo el evento',
      event: 'Evento completo',
      place: '7 horas.'
    }
  ];

  updateRoute(): void {
    this.directionsEmbedUrl = this.buildEmbedUrl();
  }

  get directionsUrl(): string {
    const origin = this.userOrigin.trim();
    const destination = encodeURIComponent(this.venueAddress);
    if (!origin) {
      return `https://www.google.com/maps/search/?api=1&query=${destination}`;
    }

    return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${destination}&travelmode=driving`;
  }

  private buildEmbedUrl(): SafeResourceUrl {
    const destination = encodeURIComponent(this.venueAddress);
    const origin = this.userOrigin.trim();
    let url = `https://www.google.com/maps?q=${destination}&output=embed`;

    if (origin) {
      url = `https://www.google.com/maps?output=embed&saddr=${encodeURIComponent(origin)}&daddr=${destination}`;
    }

    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
