import { Component, OnInit } from '@angular/core';
import { WeddingDataService, MusicSuggestion } from '../../services/wedding-data.service';

@Component({
  selector: 'app-canciones-sugeridas',
  templateUrl: './canciones-sugeridas.component.html',
  styleUrls: ['./canciones-sugeridas.component.css']
})
export class CancionesSugeridasComponent implements OnInit {
  readonly deleteConfirmImagePath = '/assets/img/FotosParaCards/PHOTO-2026-06-02-11-14-21 (1).jpg';
  private pendingDeleteId: string | null = null;

  musicTitle = '';
  musicArtist = '';
  musicSuggestions: MusicSuggestion[] = [];
  musicFormError = '';
  showDeleteConfirm = false;

  constructor(private readonly weddingDataService: WeddingDataService) {}

  ngOnInit(): void {
    this.loadMusicSuggestions();
  }

  addMusicSuggestion(): void {
    const sanitizedTitle = this.musicTitle.trim();
    const sanitizedArtist = this.musicArtist.trim();

    if (!sanitizedTitle || !sanitizedArtist) {
      this.musicFormError = 'Completa el nombre de la cancion y el autor.';
      return;
    }

    this.musicFormError = '';
    const stamp = new Date().toISOString();

    const suggestion: MusicSuggestion = {
      id: `${Date.now()}-${Math.abs(this.hashCode(`${sanitizedTitle}-${sanitizedArtist}-${stamp}`))}`,
      title: sanitizedTitle,
      artist: sanitizedArtist,
      createdAt: stamp
    };

    this.musicSuggestions = [suggestion, ...this.musicSuggestions];
    this.weddingDataService.addMusicSuggestion(suggestion).subscribe({
      next: saved => {
        this.musicSuggestions = [saved, ...this.musicSuggestions.filter(item => item.id !== saved.id)];
      },
      error: () => {
        this.musicSuggestions = this.musicSuggestions.filter(item => item.id !== suggestion.id);
      }
    });
    this.resetMusicForm();
  }

  removeMusicSuggestion(id: string): void {
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

    const deletingId = this.pendingDeleteId;
    this.musicSuggestions = this.musicSuggestions.filter(item => item.id !== deletingId);
    this.weddingDataService.deleteMusicSuggestion(deletingId).subscribe({
      error: () => {
        this.loadMusicSuggestions();
      }
    });
    this.cancelDelete();
  }

  private loadMusicSuggestions(): void {
    this.weddingDataService.getMusicSuggestions().subscribe({
      next: suggestions => {
        this.musicSuggestions = suggestions
          .filter(item => typeof item.title === 'string' && item.title.trim().length > 0)
          .map(item => ({
            id: item.id,
            title: item.title.trim(),
            artist: item.artist.trim(),
            createdAt: item.createdAt
          }));
      },
      error: () => {
        this.musicSuggestions = [];
      }
    });
  }

  private resetMusicForm(): void {
    this.musicTitle = '';
    this.musicArtist = '';
  }

  private hashCode(value: string): number {
    let hash = 0;
    for (let i = 0; i < value.length; i += 1) {
      hash = (hash << 5) - hash + value.charCodeAt(i);
      hash |= 0;
    }
    return hash;
  }
}
