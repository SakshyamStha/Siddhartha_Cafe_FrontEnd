import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { WhatsappLinkComponent } from '../../shared/whatsapp-navigation/whatsapp-nav';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface ContactPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

interface OpeningHour {
  day: string;
  time: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, WhatsappLinkComponent],
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
  contactPhone: string = '';
  address: string = '';

  openingHours: OpeningHour[] = [
    { day: 'Monday – Friday', time: '8:00 AM – 9:00 PM' },
    { day: 'Saturday', time: '9:00 AM – 11:00 PM' },
    { day: 'Sunday', time: '12:00 PM – 9:00 PM' },
  ];

  constructor(
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
  ) {
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
    this.address = 'P8HW+7FW, Sukedhara chowk, Kathmandu 44600';
    this.contactPhone = '9849738096';
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

  googleMapsUrl(address: string): string {
    return `https://www.google.com/maps?q=${encodeURIComponent(address)}`;
  }

  mapUrl = computed<SafeResourceUrl>(() => {
    const lat = 27.7285436;
    const lng = 85.3464575;
    const url = `https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  });
}
