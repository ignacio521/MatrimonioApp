import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  coupleNames = 'Ignacio & Melisa';
  weddingDateLabel = '08 de enero de 2027 · 18:00 hrs';
  weddingPlaceLabel = 'Avenida Concha y Toro 01340, Pirque';
  isPlaying = false;
  private readonly musicVolume = 0.12;

  @ViewChild('bgMusic') bgMusic!: ElementRef<HTMLAudioElement>;

  musicBlocked = false;

  blockMusic(): void {
    const audio = this.bgMusic?.nativeElement;
    if (audio) {
      audio.pause();
    }
    this.isPlaying = false;
    this.musicBlocked = true;
  }

  private musicStarted = false;

  startMusicOnFirstInteraction(): void {
    if (!this.musicStarted) {
      this.musicStarted = true;
      const audio = this.bgMusic.nativeElement;
      audio.volume = this.musicVolume;
      audio.play();
      this.isPlaying = true;
    }
  }

  toggleMusic(): void {
    const audio = this.bgMusic.nativeElement;
    if (this.isPlaying) {
      audio.pause();
    } else {
      audio.volume = this.musicVolume;
      audio.play();
    }
    this.isPlaying = !this.isPlaying;
  }
}
