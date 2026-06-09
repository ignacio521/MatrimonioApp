import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeddingDataService, GuestRegistration } from '../../services/wedding-data.service';

@Component({
  selector: 'app-confirmacion-boda',
  templateUrl: './confirmacion-boda.component.html',
  styleUrls: ['./confirmacion-boda.component.css']
})
export class ConfirmacionBodaComponent implements OnInit, OnDestroy {
  private readonly colorSet = ['#f2d3c2', '#d8e7cf', '#fde7b7', '#d7d9f7', '#f5cfd4', '#cbe5e8'];
  readonly deleteConfirmImagePath = '/assets/img/FotosParaCards/PHOTO-2026-06-02-11-14-21 (1).jpg';
  readonly lukiImageYesPath = '/assets/img/Luki/Luki1.png';
  readonly lukiImageNoPath = '/assets/img/Luki/Luki2.png';
  private feedbackTimer: ReturnType<typeof setTimeout> | null = null;
  private pendingDeleteId: string | null = null;

  fullName = '';
  dietaryNotes = '';
  attendance: 'si' | 'no' = 'si';
  registrations: GuestRegistration[] = [];
  showSubmitFeedback = false;
  submitFeedbackIcon = '😊';
  submitFeedbackAttendance: 'si' | 'no' = 'si';
  showAttendanceImage = false;
  attendanceImageSide: 'left' | 'right' = 'right';
  attendanceImagePath = this.lukiImageYesPath;
  showDeleteConfirm = false;

  constructor(private readonly weddingDataService: WeddingDataService) {}

  ngOnInit(): void {
    this.loadRegistrations();
  }

  ngOnDestroy(): void {
    if (this.feedbackTimer) {
      clearTimeout(this.feedbackTimer);
    }
  }

  registerGuest(): void {
    const sanitizedName = this.fullName.trim();
    if (!sanitizedName) {
      return;
    }

    const stamp = new Date().toISOString();
    const seed = `${sanitizedName}-${stamp}`;
    const hash = this.hashCode(seed);

    const registration: GuestRegistration = {
      id: `${Date.now()}-${Math.abs(hash)}`,
      fullName: sanitizedName,
      dietaryNotes: this.dietaryNotes.trim(),
      attendance: this.attendance,
      icon: this.attendance === 'si' ? '😊' : '😢',
      color: this.colorSet[Math.abs(hash) % this.colorSet.length],
      createdAt: stamp
    };

    this.registrations = [registration, ...this.registrations];
    this.weddingDataService.addRegistration(registration).subscribe({
      next: saved => {
        this.registrations = [saved, ...this.registrations.filter(item => item.id !== saved.id)];
      },
      error: () => {
        this.registrations = this.registrations.filter(item => item.id !== registration.id);
      }
    });
    this.launchSubmitFeedback(this.attendance);
    this.resetForm();
  }

  removeRegistration(id: string): void {
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
    this.registrations = this.registrations.filter(item => item.id !== deletingId);
    this.weddingDataService.deleteRegistration(deletingId).subscribe({
      error: () => {
        this.loadRegistrations();
      }
    });
    this.cancelDelete();
  }

  private resetForm(): void {
    this.fullName = '';
    this.dietaryNotes = '';
    this.attendance = 'si';
  }

  private loadRegistrations(): void {
    this.weddingDataService.getRegistrations().subscribe({
      next: registrations => {
        this.registrations = registrations.map(item => ({
          id: item.id,
          fullName: item.fullName,
          dietaryNotes: item.dietaryNotes,
          attendance: item.attendance === 'no' ? 'no' : 'si',
          icon: item.attendance === 'si' ? '😊' : '😢',
          color: item.color,
          createdAt: item.createdAt
        }));
      },
      error: () => {
        this.registrations = [];
      }
    });
  }

  private launchSubmitFeedback(attendance: 'si' | 'no'): void {
    this.submitFeedbackAttendance = attendance;
    this.submitFeedbackIcon = attendance === 'si' ? '😊' : '😢';
    this.attendanceImageSide = attendance === 'si' ? 'right' : 'left';
    this.attendanceImagePath = attendance === 'si' ? this.lukiImageYesPath : this.lukiImageNoPath;
    this.showSubmitFeedback = false;
    this.showAttendanceImage = false;

    setTimeout(() => {
      this.showSubmitFeedback = true;
      this.showAttendanceImage = true;
    }, 0);

    if (this.feedbackTimer) {
      clearTimeout(this.feedbackTimer);
    }

    this.feedbackTimer = setTimeout(() => {
      this.showSubmitFeedback = false;
      this.showAttendanceImage = false;
      this.feedbackTimer = null;
    }, 3000);
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
