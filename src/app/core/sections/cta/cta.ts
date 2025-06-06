import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Zap, ArrowRight, Info, X, Clock } from 'lucide-angular';

@Component({
  selector: 'app-cta',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './cta.html',
  styleUrls: ['./cta.scss']
})
export class Cta implements OnInit, OnDestroy {
  @Input() showCtaBanner = false;
  @Output() hideBanner = new EventEmitter<void>();
  @Output() contractNow = new EventEmitter<void>();
  @Output() learnMore = new EventEmitter<void>();

// Iconos importados de Lucide
  readonly ZapIcon = Zap;
  readonly ArrowRightIcon = ArrowRight;
  readonly InfoIcon = Info;
  readonly XIcon = X;
  readonly ClockIcon = Clock;

// Estado interno para debugging
  private debugMode = false;

  ngOnInit(): void {
    // Debug: Verificar si el componente se inicializa
    if (this.debugMode) {
      console.log('CTA Component initialized');
      console.log('showCtaBanner:', this.showCtaBanner);
    }
  }

  ngOnDestroy(): void {
    // Cleanup si es necesario
  }

  onHideBanner(): void {
    if (this.debugMode) {
      console.log('Hide banner clicked');
    }
    this.hideBanner.emit();
  }

  onContractNow(): void {
    if (this.debugMode) {
      console.log('Contract now clicked');
    }
    this.contractNow.emit();
  }

  onLearnMore(): void {
    if (this.debugMode) {
      console.log('Learn more clicked');
    }
    this.learnMore.emit();
  }
}
