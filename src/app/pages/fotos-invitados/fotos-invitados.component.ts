import { Component, OnInit } from '@angular/core';

interface GuestPhoto {
  id: string;
  name: string;
  dataUrl: string;
  createdAt: string;
}

@Component({
  selector: 'app-fotos-invitados',
  templateUrl: './fotos-invitados.component.html',
  styleUrls: ['./fotos-invitados.component.css']
})
export class FotosInvitadosComponent implements OnInit {
  private readonly storageKey = 'matrimonio.fotosInvitados';
  private readonly maxPhotoSizeBytes = 4 * 1024 * 1024;
  readonly deleteConfirmImagePath = '/assets/img/FotosParaCards/PHOTO-2026-06-02-11-14-21 (1).jpg';
  private pendingDeleteId: string | null = null;

  photos: GuestPhoto[] = [];
  feedbackMessage = '';
  feedbackKind: 'ok' | 'error' = 'ok';
  isDragActive = false;
  showDeleteConfirm = false;

  ngOnInit(): void {
    this.loadPhotos();
  }

  async onFilesSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);

    await this.processFiles(files);
    input.value = '';
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragActive = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragActive = false;
  }

  async onDrop(event: DragEvent): Promise<void> {
    event.preventDefault();
    this.isDragActive = false;

    const files = Array.from(event.dataTransfer?.files ?? []);
    await this.processFiles(files);
  }

  private async processFiles(files: File[]): Promise<void> {

    if (files.length === 0) {
      return;
    }

    this.feedbackMessage = '';

    const validFiles = files.filter(file => {
      if (!file.type.startsWith('image/')) {
        return false;
      }
      return file.size <= this.maxPhotoSizeBytes;
    });

    const skippedByValidation = files.length - validFiles.length;

    if (validFiles.length === 0) {
      this.setFeedback('No se pudo guardar. Usa imagenes de hasta 4 MB.', 'error');
      return;
    }

    try {
      const photosToAdd = await Promise.all(validFiles.map(file => this.readPhotoFile(file)));
      this.photos = [...photosToAdd.reverse(), ...this.photos];
      this.persistPhotos();

      const savedCount = photosToAdd.length;
      const skippedCount = skippedByValidation;
      const message = skippedCount > 0
        ? `Se guardaron ${savedCount} foto(s). ${skippedCount} archivo(s) no se pudieron guardar.`
        : `Se guardaron ${savedCount} foto(s) en esta app.`;

      this.setFeedback(message, 'ok');
    } catch {
      this.setFeedback('Ocurrio un error al leer los archivos seleccionados.', 'error');
    }
  }

  removePhoto(id: string): void {
    this.pendingDeleteId = id;
    this.showDeleteConfirm = true;
  }

  cancelDelete(): void {
    this.pendingDeleteId = null;
    this.showDeleteConfirm = false;
  }

  confirmDelete(): void {
    if (!this.pendingDeleteId) {
      this.cancelDelete();
      return;
    }

    this.photos = this.photos.filter(photo => photo.id !== this.pendingDeleteId);
    this.persistPhotos();
    this.cancelDelete();
  }

  trackByPhotoId(index: number, photo: GuestPhoto): string {
    return photo.id;
  }

  formatDate(value: string): string {
    const date = new Date(value);
    return date.toLocaleString();
  }

  private loadPhotos(): void {
    const raw = localStorage.getItem(this.storageKey);
    if (!raw) {
      this.photos = [];
      return;
    }

    try {
      const parsed = JSON.parse(raw) as Array<Partial<GuestPhoto>>;
      this.photos = parsed
        .filter(item => typeof item.id === 'string' && typeof item.dataUrl === 'string')
        .map(item => ({
          id: item.id ?? '',
          name: item.name ?? 'Foto',
          dataUrl: item.dataUrl ?? '',
          createdAt: item.createdAt ?? new Date().toISOString()
        }));
    } catch {
      this.photos = [];
    }
  }

  private persistPhotos(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.photos));
  }

  private readPhotoFile(file: File): Promise<GuestPhoto> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = typeof reader.result === 'string' ? reader.result : '';
        if (!result) {
          reject(new Error('Invalid image data'));
          return;
        }

        resolve({
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          name: file.name,
          dataUrl: result,
          createdAt: new Date().toISOString()
        });
      };
      reader.onerror = () => reject(reader.error ?? new Error('Read error'));
      reader.readAsDataURL(file);
    });
  }

  private setFeedback(message: string, kind: 'ok' | 'error'): void {
    this.feedbackMessage = message;
    this.feedbackKind = kind;
  }
}
