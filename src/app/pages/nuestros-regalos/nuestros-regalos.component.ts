import { Component } from '@angular/core';

interface Gift {
  id: number;
  name: string;
  price: number;
  category: string;
}

@Component({
  selector: 'app-nuestros-regalos',
  templateUrl: './nuestros-regalos.component.html',
  styleUrls: ['./nuestros-regalos.component.css']
})
export class NuestrosRegalosComponent {
  gifts: Gift[] = [
    { id: 1, name: 'Juego de sábanas de lino', price: 120, category: 'Hogar' },
    { id: 2, name: 'Máquina de espresso', price: 280, category: 'Cocina' },
    { id: 3, name: 'Set de cuchillos de chef', price: 150, category: 'Cocina' },
    { id: 4, name: 'Cristalería de lujo', price: 200, category: 'Hogar' },
    { id: 5, name: 'Pasajes de Luna de Miel con Luki', price: 50000, category: 'Deportes' },
    { id: 6, name: 'Cafecito pet-friendly a mitad de camino', price: 60000, category: 'Tecnología' },
    { id: 7, name: 'Escapada Basset Patitas Viajeras', price: 70000, category: 'Experiencia' },
    { id: 8, name: 'Aventura de Luki en kayak', price: 80000, category: 'Tecnología' },
    { id: 9, name: 'Luki viajando por el sur de Chile', price: 90000, category: 'Bienestar' },
    { id: 10, name: 'Sesion de Fotos de Viaje con Luki', price: 100000, category: 'Tecnología' }
  ];

  private readonly giftImageMap: Record<number, string> = {
    5: '/assets/img/FondosRegalos/WhatsApp Image 2026-06-07 at 9.43.24 PM.jpeg',
    6: '/assets/img/FondosRegalos/WhatsApp Image 2026-06-07 at 9.43.51 PM.jpeg',
    7: '/assets/img/FondosRegalos/WhatsApp Image 2026-06-07 at 9.44.12 PM.jpeg',
    8: '/assets/img/FondosRegalos/WhatsApp Image 2026-06-07 at 9.44.47 PM.jpeg',
    9: '/assets/img/FondosRegalos/WhatsApp Image 2026-06-07 at 9.45.33 PM.jpeg',
    10: '/assets/img/FondosRegalos/WhatsApp Image 2026-06-07 at 9.45.59 PM.jpeg'
  };

  private readonly homeCategories = ['Hogar', 'Cocina'];

  selectedGift: Gift | null = null;
  showGiftPopup = false;
  giftPopupStep: 'confirm' | 'transfer' = 'confirm';
  lukiImagePath = '/assets/img/Luki/Luki1.png';

  transferData = {
    bank: 'Mercado Pago',
    type: 'Cuenta Vista',
    holder: 'Melisa Andrea Contreras Gómez',
    accountNumber: '1045524380',
    email: 'contrerasmelissa441@gmail.com',
    rut: '204210632'
  };

  bankAccount: string = this.transferData.accountNumber;

  selectGift(gift: Gift): void {
    this.selectedGift = gift;
    this.giftPopupStep = 'confirm';
    this.showGiftPopup = true;
  }

  confirmGiftSelection(): void {
    this.giftPopupStep = 'transfer';
  }

  closeGiftPopup(): void {
    this.showGiftPopup = false;
  }

  openLibreAporte(): void {
    this.selectedGift = null;
    this.giftPopupStep = 'transfer';
    this.showGiftPopup = true;
  }

  resetGiftSelection(): void {
    this.selectedGift = null;
    this.showGiftPopup = false;
    this.giftPopupStep = 'confirm';
  }

  get homeGifts(): Gift[] {
    return this.gifts.filter(g => this.homeCategories.includes(g.category));
  }

  get celebrationGifts(): Gift[] {
    return this.gifts.filter(g => !this.homeCategories.includes(g.category));
  }

  giftIcon(gift: Gift): string {
    switch (gift.category) {
      case 'Hogar':
        return '🏡';
      case 'Cocina':
        return '🍽️';
      case 'Experiencia':
        return '✈️';
      case 'Tecnología':
        return '📸';
      case 'Bienestar':
        return '🕯️';
      case 'Deportes':
        return '🚴';
      default:
        return '🎁';
    }
  }

  giftImage(gift: Gift): string {
    return this.giftImageMap[gift.id] ?? '/assets/img/Luki/Luki1.png';
  }

  transferAmount(gift: Gift): void {
    console.log(`Transferring ${gift.price} for gift: ${gift.name}`);
    // Add logic for transferring amount
  }

  clearSelection(): void {
    this.selectedGift = null;
    console.log('Gift selection cleared');
  }
}
