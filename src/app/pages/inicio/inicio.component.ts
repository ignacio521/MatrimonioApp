import { Component, OnDestroy, OnInit } from '@angular/core';

type SectionKey = 'inicio' | 'sobre-nosotros' | 'lugar' | 'regalos' | 'confirmacion' | 'canciones' | 'fotos';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit, OnDestroy {
  readonly sectionCards: Array<{
    key: SectionKey;
    icon: string;
    cardImage: string;
    title: string;
    subtitle: string;
    summary: string;
  }> = [
    {
      key: 'inicio',
      icon: '🏠',
      cardImage: '/assets/img/FotosParaCards/PHOTO-2026-06-02-11-14-21 (1).jpg',
      title: 'Bienvenida',
      subtitle: 'Cuenta regresiva',
      summary: 'Fecha clave, foto principal y acceso rápido para agendar en Google Calendar.'
    },
    {
      key: 'sobre-nosotros',
      icon: '💞',
      cardImage: '/assets/img/FotosParaCards/PHOTO-2026-06-02-11-15-05.jpg',
      title: 'Sobre nosotros',
      subtitle: 'Historia y fotos',
      summary: 'Recorrido de nuestra historia y galería de momentos juntos.'
    },
    {
      key: 'lugar',
      icon: '📍',
      cardImage: '/assets/img/FotosParaCards/PHOTO-2026-06-02-11-17-50.jpg',
      title: 'Lugar',
      subtitle: 'Mapa y cronograma',
      summary: 'Ubicación, horarios del evento y recomendaciones de llegada.'
    },
    {
      key: 'confirmacion',
      icon: '✅',
      cardImage: '/assets/img/FotosParaCards/PHOTO-2026-06-02-11-14-21 (1).jpg',
      title: 'Confirmación',
      subtitle: 'Asistencia',
      summary: 'Formulario para confirmar asistencia al evento.'
    },
    {
      key: 'regalos',
      icon: '🎁',
      cardImage: '/assets/img/FotosParaCards/PHOTO-2026-06-02-11-18-04.jpg',
      title: 'Regalos',
      subtitle: 'Aportes',
      summary: 'Opciones de regalos y aportes para celebrar juntos este día especial.'
    },
    {
      key: 'canciones',
      icon: '🎵',
      cardImage: '/assets/img/FotosParaCards/PHOTO-2026-06-02-11-15-05.jpg',
      title: 'Canciones sugeridas',
      subtitle: 'Playlist del evento',
      summary: 'Suma canciones para que suenen durante la celebración.'
    },
    {
      key: 'fotos',
      icon: '📸',
      cardImage: '/assets/img/FotosParaCards/PHOTO-2026-06-02-11-17-50.jpg',
      title: 'Fotos de invitados',
      subtitle: 'Sube tus recuerdos',
      summary: 'Comparte y revisa las fotos del evento '
    }
  ];

  expandedSections: Record<SectionKey, boolean> = {
    'inicio': true,
    'sobre-nosotros': false,
    'lugar': false,
    'regalos': false,
    'confirmacion': false,
    'canciones': false,
    'fotos': false
  };

  weddingDate = new Date('2027-01-08T18:00:00');
  weddingEndDate = new Date('2027-01-09T01:00:00');
  weddingLocation = 'Avenida Concha y Toro 01340, Pirque';
  weddingTitle = 'Boda Ignacio y Melisa';
  weddingDescription = 'Nos casamos. Te esperamos para celebrar juntos este dia especial.';

  countdown = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  };

  private timerId?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.updateCountdown();
    this.timerId = setInterval(() => this.updateCountdown(), 1000);
  }

  ngOnDestroy(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  toggleSection(section: SectionKey): void {
    this.expandedSections[section] = !this.expandedSections[section];
  }

  isSectionExpanded(section: SectionKey): boolean {
    return this.expandedSections[section];
  }

  get googleCalendarUrl(): string {
    const baseUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE';
    const startDate = this.formatGoogleDate(this.weddingDate);
    const endDate = this.formatGoogleDate(this.weddingEndDate);
    const encodedTitle = encodeURIComponent(this.weddingTitle);
    const encodedDescription = encodeURIComponent(this.weddingDescription);
    const encodedLocation = encodeURIComponent(this.weddingLocation);

    return `${baseUrl}&text=${encodedTitle}&dates=${startDate}/${endDate}&details=${encodedDescription}&location=${encodedLocation}`;
  }

  private updateCountdown(): void {
    const now = new Date().getTime();
    const distance = this.weddingDate.getTime() - now;

    if (distance <= 0) {
      this.countdown = { days: 0, hours: 0, minutes: 0, seconds: 0 };
      return;
    }

    this.countdown.days = Math.floor(distance / (1000 * 60 * 60 * 24));
    this.countdown.hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    this.countdown.minutes = Math.floor((distance / (1000 * 60)) % 60);
    this.countdown.seconds = Math.floor((distance / 1000) % 60);
  }

  private formatGoogleDate(date: Date): string {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');

    return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
  }
}
