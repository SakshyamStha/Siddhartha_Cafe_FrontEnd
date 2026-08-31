import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-whatsapp-link',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './whatsapp-nav.html',
})
export class WhatsappLinkComponent implements OnChanges {
  @Input({ required: true }) phone!: string;
  @Input() label?: string;
  @Input() message = '';

  whatsappUrl = '';
  displayLabel = '';

  ngOnChanges(): void {
    // Strip everything except digits and a leading +
    const digits = this.phone.replace(/[^\d+]/g, '');
    const encoded = this.message
      ? `?text=${encodeURIComponent(this.message)}`
      : '';
    this.whatsappUrl = `https://wa.me/${digits}${encoded}`;
    this.displayLabel = this.label ?? this.phone;
  }
}
