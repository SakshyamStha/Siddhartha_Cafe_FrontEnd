import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

interface ContactPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss'],
})
export class Contact {
  heroTitle = 'Contact Us';
  heroSubtitle =
    'A glimpse into the passion, craftsmanship, and people that make every meal an experience.';
  heroImage =
    'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=1600&q=80';

  contactForm: FormGroup;
  isSubmitting = false;
  submitSuccess = false;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      email: [
        '',
        [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)],
      ],
      phone: [
        '',
        [Validators.required, Validators.pattern(/^\+?[0-9\s-]{7,15}$/)],
      ],
      message: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(1000),
        ],
      ],
    });
  }

  static websiteValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    const pattern = /^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/;
    return pattern.test(control.value) ? null : { invalidWebsite: true };
  }

  get f() {
    return this.contactForm.controls;
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.contactForm.get(controlName);
    return !!control && control.touched && control.hasError(errorName);
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.submitSuccess = false;

    const payload: ContactPayload = {
      firstName: this.contactForm.value.firstName.trim(),
      lastName: this.contactForm.value.lastName.trim(),
      email: this.contactForm.value.email.trim(),
      phone: this.contactForm.value.phone.trim(),
      message: this.contactForm.value.message.trim(),
    };

    console.log('Contact form payload:', payload);

    setTimeout(() => {
      this.isSubmitting = false;
      this.submitSuccess = true;
      this.contactForm.reset();
    }, 800);
  }
}
