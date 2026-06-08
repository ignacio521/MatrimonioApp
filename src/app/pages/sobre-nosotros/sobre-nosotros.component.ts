import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-sobre-nosotros',
  templateUrl: './sobre-nosotros.component.html',
  styleUrls: ['./sobre-nosotros.component.css']
})
export class SobreNosotrosComponent implements OnInit {

  galleryImages = [
    'WhatsApp Image 2026-05-13 at 10.03.11 PM (1).jpeg',
    'WhatsApp Image 2026-05-13 at 10.03.11 PM.jpeg',
    'WhatsApp Image 2026-05-13 at 10.03.12 PM (1).jpeg',
    'WhatsApp Image 2026-05-13 at 10.03.12 PM (2).jpeg',
    'WhatsApp Image 2026-05-13 at 10.03.12 PM (3).jpeg',
    'WhatsApp Image 2026-05-13 at 10.03.12 PM (4).jpeg',
    'WhatsApp Image 2026-05-13 at 10.03.12 PM.jpeg',
    'WhatsApp Image 2026-05-13 at 10.03.13 PM (1).jpeg',
    'WhatsApp Image 2026-05-13 at 10.03.13 PM (10).jpeg',
    'WhatsApp Image 2026-05-13 at 10.03.13 PM (11).jpeg',
    'WhatsApp Image 2026-05-13 at 10.03.13 PM (12).jpeg',
    'WhatsApp Image 2026-05-13 at 10.03.13 PM (13).jpeg',
    'WhatsApp Image 2026-05-13 at 10.03.13 PM (14).jpeg',
    'WhatsApp Image 2026-05-13 at 10.03.13 PM (15).jpeg',
    'WhatsApp Image 2026-05-13 at 10.03.13 PM (16).jpeg',
    'WhatsApp Image 2026-05-13 at 10.03.13 PM (17).jpeg',
    'WhatsApp Image 2026-05-13 at 10.03.13 PM (18).jpeg',
    'WhatsApp Image 2026-05-13 at 10.03.13 PM (19).jpeg',
    'WhatsApp Image 2026-05-13 at 10.03.13 PM (2).jpeg',
    'WhatsApp Image 2026-05-13 at 10.03.13 PM (20).jpeg',
    'WhatsApp Image 2026-05-13 at 10.03.13 PM (21).jpeg',
    'WhatsApp Image 2026-05-13 at 10.03.13 PM (22).jpeg',
    'WhatsApp Image 2026-05-13 at 10.03.13 PM (3).jpeg',
    'WhatsApp Image 2026-05-13 at 10.03.13 PM (4).jpeg',
    'WhatsApp Image 2026-05-13 at 10.03.13 PM (5).jpeg',
    'WhatsApp Image 2026-05-13 at 10.03.13 PM (6).jpeg',
    'WhatsApp Image 2026-05-13 at 10.03.13 PM (7).jpeg',
    'WhatsApp Image 2026-05-13 at 10.03.13 PM (8).jpeg',
    'WhatsApp Image 2026-05-13 at 10.03.13 PM.jpeg',
    'WhatsApp Image 2026-05-13 at 10.44.48 PM (2).jpeg',
    'WhatsApp Image 2026-05-13 at 10.44.48 PM (3).jpeg',
    'WhatsApp Image 2026-05-13 at 9.49.15 PM (1).jpeg',
    'WhatsApp Image 2026-05-13 at 9.49.15 PM (2).jpeg',
    'WhatsApp Image 2026-05-13 at 9.49.15 PM (3).jpeg',
    'WhatsApp Image 2026-05-13 at 9.49.15 PM (4).jpeg',
    'WhatsApp Image 2026-05-13 at 9.49.15 PM (5).jpeg',
    'WhatsApp Image 2026-05-13 at 9.49.15 PM.jpeg',
    'WhatsApp Image 2026-05-13 at 9.51.25 PM.jpeg',
    'WhatsApp Image 2026-06-03 at 10.44.29 AM.jpeg',
    'WhatsApp Image 2026-06-03 at 10.45.09 AM.jpeg',
    'WhatsApp Image 2026-06-03 at 10.45.56 AM.jpeg',
    'WhatsApp Image 2026-06-03 at 10.46.30 AM.jpeg',
    'WhatsApp Image 2026-06-03 at 10.46.42 AM.jpeg',
    'WhatsApp Image 2026-06-03 at 10.49.06 AM.jpeg'
  ];

  photoGroups: Array<{ title: string; images: string[] }> = [];

  collages = [
    {
      title: 'Risas y Aventuras',
      images: [
        'WhatsApp Image 2026-05-13 at 10.03.13 PM (8).jpeg',
        'WhatsApp Image 2026-05-13 at 10.03.13 PM (9).jpeg',
        'WhatsApp Image 2026-05-13 at 10.03.13 PM (10).jpeg',
        'WhatsApp Image 2026-05-13 at 10.03.13 PM (11).jpeg'
      ],
      layout: 'grid-2x2'
    },
    {
      title: 'Momentos Especiales',
      images: [
        'WhatsApp Image 2026-05-13 at 10.03.13 PM (12).jpeg',
        'WhatsApp Image 2026-05-13 at 10.03.13 PM (13).jpeg',
        'WhatsApp Image 2026-05-13 at 10.03.13 PM (14).jpeg',
        'WhatsApp Image 2026-05-13 at 10.03.13 PM (15).jpeg'
      ],
      layout: 'grid-left-big'
    },
    {
      title: 'Días Inolvidables',
      images: [
        'WhatsApp Image 2026-05-13 at 10.03.13 PM (16).jpeg',
        'WhatsApp Image 2026-05-13 at 10.03.13 PM (17).jpeg',
        'WhatsApp Image 2026-05-13 at 10.03.13 PM (18).jpeg',
        'WhatsApp Image 2026-05-13 at 10.03.13 PM (19).jpeg'
      ],
      layout: 'grid-right-big'
    },
    {
      title: 'Más Recuerdos',
      images: [
        'WhatsApp Image 2026-05-13 at 10.03.13 PM (20).jpeg',
        'WhatsApp Image 2026-05-13 at 10.03.13 PM (21).jpeg',
        'WhatsApp Image 2026-05-13 at 10.03.13 PM (22).jpeg',
        'WhatsApp Image 2026-05-13 at 10.03.13 PM.jpeg'
      ],
      layout: 'grid-2x2'
    },
    {
      title: 'Lo Mejor de Nosotros',
      images: [
        'WhatsApp Image 2026-05-13 at 9.49.15 PM (1).jpeg',
        'WhatsApp Image 2026-05-13 at 9.49.15 PM (2).jpeg',
        'WhatsApp Image 2026-05-13 at 9.49.15 PM (3).jpeg',
        'WhatsApp Image 2026-05-13 at 9.49.15 PM (4).jpeg'
      ],
      layout: 'grid-left-big'
    },
    {
      title: 'Y Muchos Más',
      images: [
        'WhatsApp Image 2026-05-13 at 9.49.15 PM (5).jpeg',
        'WhatsApp Image 2026-05-13 at 9.49.15 PM.jpeg',
        'WhatsApp Image 2026-05-13 at 10.03.12 PM.jpeg',
        'WhatsApp Image 2026-05-13 at 10.03.13 PM.jpeg'
      ],
      layout: 'grid-right-big'
    }
  ];

  yearLine = [
    {
      year: 2017,
      title: 'El Comienzo',
      description: 'Nuestras vidas se cruzaron de la manera más inesperada. Un café, una sonrisa y el inicio de todo.',
      images: [
        'WhatsApp Image 2026-05-13 at 9.49.15 PM (1).jpeg',
        'WhatsApp Image 2026-05-13 at 9.49.15 PM (2).jpeg',
        'WhatsApp Image 2026-05-13 at 10.03.11 PM.jpeg',
        'WhatsApp Image 2026-05-13 at 10.03.12 PM (1).jpeg'
      ]
    },
    {
      year: 2018,
      title: 'Aventuras',
      description: 'Descubrimos que todo es mejor cuando lo vivimos juntos. Viajes, risas y momentos inolvidables.',
      images: [
        'WhatsApp Image 2026-05-13 at 10.03.12 PM (2).jpeg',
        'WhatsApp Image 2026-05-13 at 10.03.12 PM (3).jpeg',
        'WhatsApp Image 2026-05-13 at 10.03.13 PM (1).jpeg',
        'WhatsApp Image 2026-05-13 at 10.03.13 PM (2).jpeg'
      ]
    },
    {
      year: 2019,
      title: 'Crecimiento',
      description: 'Aprendimos que el amor es más que sentimientos, es compromiso y apoyo constante.',
      images: [
        'WhatsApp Image 2026-05-13 at 10.03.13 PM (3).jpeg',
        'WhatsApp Image 2026-05-13 at 10.03.13 PM (4).jpeg',
        'WhatsApp Image 2026-05-13 at 10.03.13 PM (5).jpeg',
        'WhatsApp Image 2026-05-13 at 10.03.13 PM (6).jpeg'
      ]
    },
    {
      year: 2020,
      title: 'Desafíos',
      description: 'Tiempos difíciles que nos hicieron más fuertes. El amor aguanta todo, especialmente juntos.',
      images: [
        'WhatsApp Image 2026-05-13 at 10.03.13 PM (7).jpeg',
        'WhatsApp Image 2026-05-13 at 10.03.13 PM (8).jpeg',
        'WhatsApp Image 2026-05-13 at 10.03.13 PM (9).jpeg',
        'WhatsApp Image 2026-05-13 at 10.03.13 PM (10).jpeg'
      ]
    },
    {
      year: 2021,
      title: 'Consolidación',
      description: 'Sabíamos que esto iba para siempre. Cada día reafirmaba nuestra decisión de estar juntos.',
      images: [
        'WhatsApp Image 2026-05-13 at 10.03.13 PM (11).jpeg',
        'WhatsApp Image 2026-05-13 at 10.03.13 PM (12).jpeg',
        'WhatsApp Image 2026-05-13 at 10.03.13 PM (13).jpeg',
        'WhatsApp Image 2026-05-13 at 10.03.13 PM (14).jpeg'
      ]
    },
    {
      year: 2022,
      title: 'Preparación',
      description: 'Empezamos a soñar con nuestro futuro juntos, planeando cada detalle del camino que venía.',
      images: [
        'WhatsApp Image 2026-05-13 at 10.03.13 PM (15).jpeg',
        'WhatsApp Image 2026-05-13 at 10.03.13 PM (16).jpeg',
        'WhatsApp Image 2026-05-13 at 10.03.13 PM (17).jpeg',
        'WhatsApp Image 2026-05-13 at 10.03.13 PM (18).jpeg'
      ]
    },
    {
      year: 2023,
      title: 'Decisión',
      description: 'La pregunta se hizo realidad. Un \"sí\" que selló para siempre nuestro compromiso.',
      images: [
        'WhatsApp Image 2026-05-13 at 10.03.13 PM (19).jpeg',
        'WhatsApp Image 2026-05-13 at 10.03.13 PM (20).jpeg',
        'WhatsApp Image 2026-05-13 at 10.03.13 PM (21).jpeg',
        'WhatsApp Image 2026-05-13 at 10.03.13 PM (22).jpeg'
      ]
    },
    {
      year: 2024,
      title: 'Planificación',
      description: 'Los preparativos del día más importante de nuestras vidas. Todo debe ser perfecto.',
      images: [
        'WhatsApp Image 2026-05-13 at 10.03.13 PM.jpeg',
        'WhatsApp Image 2026-05-13 at 9.49.15 PM (1).jpeg',
        'WhatsApp Image 2026-05-13 at 9.49.15 PM (2).jpeg',
        'WhatsApp Image 2026-05-13 at 9.49.15 PM (3).jpeg'
      ]
    },
    {
      year: 2025,
      title: 'Anticipación',
      description: 'Los últimos preparativos, la emoción en el aire, la certeza de que este es nuestro momento.',
      images: [
        'WhatsApp Image 2026-05-13 at 9.49.15 PM (4).jpeg',
        'WhatsApp Image 2026-05-13 at 9.49.15 PM (5).jpeg',
        'WhatsApp Image 2026-05-13 at 9.49.15 PM.jpeg',
        'WhatsApp Image 2026-05-13 at 10.03.12 PM.jpeg'
      ]
    },
    {
      year: 2026,
      title: '¡Nuestro Día!',
      description: 'Finalmente aquí. El día que esperamos, soñamos y planeamos. El inicio de nuestro \"para siempre\".',
      images: [
        'WhatsApp Image 2026-05-13 at 10.03.11 PM (1).jpeg',
        'WhatsApp Image 2026-05-13 at 10.03.12 PM (4).jpeg',
        'WhatsApp Image 2026-05-13 at 10.03.13 PM (1).jpeg',
        'WhatsApp Image 2026-05-13 at 10.03.13 PM (3).jpeg'
      ]
    },
    {
      year: 0,
      title: '¿Más Por Venir?',
      description: 'La historia continúa... Cada día escribe un nuevo capítulo de nuestro amor.',
      images: [
        'WhatsApp Image 2026-05-13 at 10.03.12 PM (2).jpeg',
        'WhatsApp Image 2026-05-13 at 10.03.12 PM (3).jpeg',
        'WhatsApp Image 2026-05-13 at 10.03.13 PM (2).jpeg',
        'WhatsApp Image 2026-05-13 at 10.03.13 PM (4).jpeg'
      ]
    }
  ];

  hoveredImageIndex: number | null = null;
  hoveredCollageIndex: number | null = null;
  selectedQuadImage: string | null = null;
  selectedQuadTitle = '';

  ngOnInit(): void {
    this.photoGroups = this.createPhotoGroups(this.galleryImages, 4);
    this.animateOnScroll();
  }

  cardHues = [340, 150, 260, 30, 200, 80, 310, 170, 50, 220];

  createPhotoGroups(images: string[], chunkSize: number): Array<{ title: string; images: string[] }> {
    const labels = [
      '🌍 Aventura', '💛 Recuerdo', '✨ Instante', '📸 Postal',
      '🌸 Capítulo', '🎉 Momento', '💕 Historia', '🌟 Destello',
      '🎨 Pincelada', '🔥 Chispa'
    ];
    const groups: Array<{ title: string; images: string[] }> = [];

    for (let i = 0; i < images.length; i += chunkSize) {
      const blockNumber = Math.floor(i / chunkSize);
      const title = labels[blockNumber % labels.length];
      groups.push({
        title,
        images: images.slice(i, i + chunkSize)
      });
    }

    return groups;
  }

  animateOnScroll(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.quad-card, .collage');
    elements.forEach(el => observer.observe(el));
  }

  setHoveredImage(index: number | null): void {
    this.hoveredImageIndex = index;
  }

  setHoveredCollage(index: number | null): void {
    this.hoveredCollageIndex = index;
  }

  openQuadImage(imageName: string, title: string): void {
    this.selectedQuadImage = imageName;
    this.selectedQuadTitle = title;
  }

  closeQuadImage(): void {
    this.selectedQuadImage = null;
    this.selectedQuadTitle = '';
  }

  @HostListener('document:keydown.escape')
  onEscClose(): void {
    if (this.selectedQuadImage) {
      this.closeQuadImage();
    }
  }
}
