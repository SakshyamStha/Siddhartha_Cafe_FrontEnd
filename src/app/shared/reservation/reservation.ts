import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  inject,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../api- configs/api';

declare var bootstrap: any;

interface TimeSlot {
  value: string;
  label: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[0-9+\-\s()]{7,20}$/;
const INTEGER_PATTERN = /^\d+$/;

function localToday(): string {
  const now = new Date();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
}

function notBlank(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (typeof value === 'string' && value.length > 0 && value.trim() === '') {
    return { required: true };
  }
  return null;
}

function notPastDate(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value) return null;
  return value < localToday() ? { pastDate: true } : null;
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
  today = localToday();

  amSlots: TimeSlot[] = [];
  pmSlots: TimeSlot[] = [];
  selectedTimeLabel = '';
  timeDropdownOpen = false;

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          notBlank,
          Validators.minLength(2),
          Validators.maxLength(100),
        ],
      ],
      email: [
        '',
        [Validators.maxLength(254), Validators.pattern(EMAIL_PATTERN)],
      ],
      phone: ['', [Validators.required, Validators.pattern(PHONE_PATTERN)]],
      date: ['', [Validators.required, notPastDate]],
      time: ['', Validators.required],
      number_of_guests: [
        1,
        [
          Validators.required,
          Validators.min(1),
          Validators.max(50),
          Validators.pattern(INTEGER_PATTERN),
        ],
      ],
      message: ['', Validators.maxLength(500)],
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
    this.today = localToday();
    this.form.reset({ number_of_guests: 1 });
    this.selectedTimeLabel = '';
    this.timeDropdownOpen = false;
    const modalEl = document.getElementById('reservationModal');
    if (modalEl) {
      new bootstrap.Modal(modalEl).show();
    }
  }

  private buildPayload() {
    const v = this.form.getRawValue();
    const email = typeof v.email === 'string' ? v.email.trim() : '';
    const message = typeof v.message === 'string' ? v.message.trim() : '';

    return {
      name: v.name.trim(),
      ...(email ? { email: email.toLowerCase() } : {}),
      phone: v.phone.trim(),
      date: v.date,
      time: v.time,
      number_of_guests: Number(v.number_of_guests),
      ...(message ? { message } : {}),
    };
  }

  private handleError(err: any): void {
    const body = err?.error;
    const details: { field: string; message: string }[] = Array.isArray(
      body?.error?.details,
    )
      ? body.error.details
      : [];

    if (err?.status === 0) {
      this.errorMsg =
        'Cannot reach the server. Check your connection and try again.';
      return;
    }

    if (details.length === 0) {
      this.errorMsg =
        body?.message && typeof body.message === 'string'
          ? body.message
          : 'Something went wrong. Please try again.';
      return;
    }

    const unmatched: string[] = [];
    details.forEach((d) => {
      const control = this.form.get(d.field);
      if (control) {
        control.setErrors({ ...(control.errors ?? {}), server: d.message });
        control.markAsTouched();
      } else {
        unmatched.push(d.message);
      }
    });

    if (unmatched.length > 0) {
      this.errorMsg = unmatched.join(' | ');
    } else {
      this.errorMsg = 'Please correct the highlighted fields.';
    }
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMsg = '';

    this.api.createData(this.buildPayload(), 'RESERVATION_ADD').subscribe({
      next: () => {
        this.loading = false;
        this.success = true;
        this.form.reset({ number_of_guests: 1 });
        this.selectedTimeLabel = '';
      },
      error: (err) => {
        this.loading = false;
        this.handleError(err);
      },
    });
  }
}
