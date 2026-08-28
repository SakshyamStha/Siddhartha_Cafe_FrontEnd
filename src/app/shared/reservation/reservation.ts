import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../api- configs/api';

declare var bootstrap: any;

@Component({
  selector: 'app-reservation-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reservation.html',
})
export class ReservationModalComponent implements OnInit {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);

  form!: FormGroup;
  loading = false;
  success = false;
  errorMsg = '';
  today = new Date().toISOString().split('T')[0];

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
  }

  get f() {
    return this.form.controls;
  }

  open(): void {
    this.success = false;
    this.errorMsg = '';
    this.form.reset({ number_of_guests: 1 });
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
