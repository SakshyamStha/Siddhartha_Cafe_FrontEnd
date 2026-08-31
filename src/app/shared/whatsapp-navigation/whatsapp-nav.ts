import {
  Component,
  Input,
  OnChanges,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-whatsapp-link',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './whatsapp-nav.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WhatsappLinkComponent implements OnChanges {
  @Input({ required: true }) phone!: string;
  @Input() label?: string;
  @Input() message = '';

  whatsappUrl = '';
  displayLabel = '';

  ngOnChanges(): void {
    const digits = this.phone.replace(/[^\d+]/g, '');
    const encoded = this.message
      ? `?text=${encodeURIComponent(this.message)}`
      : '';
    this.whatsappUrl = `https://wa.me/${digits}${encoded}`;
    this.displayLabel = this.label ?? this.phone;
  }
}
