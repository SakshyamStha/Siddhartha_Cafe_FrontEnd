import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../api- configs/api';

declare var bootstrap: any;

interface TimeSlot {
  value: string;
  label: string;
}

@Component({
  selector: 'app-reservation-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reservation.html',
  styleUrl: './reservation.scss',
})
export class ReservationModalComponent implements OnInit {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);
  private elRef = inject(ElementRef);

  form!: FormGroup;
  loading = false;
  success = false;
  errorMsg = '';
  today = new Date().toISOString().split('T')[0];

  amSlots: TimeSlot[] = [];
  pmSlots: TimeSlot[] = [];
  selectedTimeLabel = '';
  timeDropdownOpen = false;

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.maxLength(50)]],
      date: ['', Validators.required],
      time: ['', Validators.required],
      number_of_guests: [1, [Validators.required, Validators.min(1)]],
      message: [''],
    });

    const slots = this.generateTimeSlots();
    this.amSlots = slots.filter((s) => s.label.endsWith('AM'));
    this.pmSlots = slots.filter((s) => s.label.endsWith('PM'));
  }

  private generateTimeSlots(): TimeSlot[] {
    const slots: TimeSlot[] = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const value = `${hour.toString().padStart(2, '0')}:${minute
          .toString()
          .padStart(2, '0')}`;

        const period = hour < 12 ? 'AM' : 'PM';
        const displayHour = hour % 12 === 0 ? 12 : hour % 12;
        const label = `${displayHour}:${minute
          .toString()
          .padStart(2, '0')} ${period}`;

        slots.push({ value, label });
      }
    }
    return slots;
  }

  get f() {
    return this.form.controls;
  }

  toggleTimeDropdown(): void {
    this.timeDropdownOpen = !this.timeDropdownOpen;
  }

  selectTime(slot: TimeSlot): void {
    this.form.controls['time'].setValue(slot.value);
    this.form.controls['time'].markAsTouched();
    this.selectedTimeLabel = slot.label;
    this.timeDropdownOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.timeDropdownOpen = false;
    }
  }

  open(): void {
    this.success = false;
    this.errorMsg = '';
    this.form.reset({ number_of_guests: 1 });
    this.selectedTimeLabel = '';
    this.timeDropdownOpen = false;
    const modalEl = document.getElementById('reservationModal');
    if (modalEl) {
      new bootstrap.Modal(modalEl).show();
    }
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMsg = '';

    const payload = {
      ...this.form.value,
      time: this.form.value.time + ':00',
    };

    this.api.createData(payload, 'RESERVATION_ADD').subscribe({
      next: () => {
        this.loading = false;
        this.success = true;
        this.form.reset({ number_of_guests: 1 });
        this.selectedTimeLabel = '';
      },
      error: (err) => {
        this.loading = false;
        const errors = err?.error;
        if (errors && typeof errors === 'object') {
          this.errorMsg = Object.entries(errors)
            .map(([k, v]) => `${k}: ${(v as string[]).join(', ')}`)
            .join(' | ');
        } else {
          this.errorMsg = 'Something went wrong. Please try again.';
        }
      },
    });
  }
}
