import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID, Output, EventEmitter, signal, computed } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

interface LoadingState {
  progress: number;
  message: string;
  isVisible: boolean;
  isComplete: boolean;
}

@Component({
  selector: 'app-preloader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preloader.html',
  styleUrls: ['./preloader.scss']
})
export class Preloader implements OnInit, OnDestroy {
  @Output() loadingComplete = new EventEmitter<void>();

  private isBrowser: boolean;
  private animationFrame: number = 0;
  private loadingTimeout: any;
  private hasStarted = false;
  private originalBodyOverflow = '';

// Signals para el estado del loading
  private loadingState = signal<LoadingState>({
    progress: 0,
    message: 'Iniciando...',
    isVisible: true,
    isComplete: false
  });

// Computed signals para el template
  loadingProgress = computed(() => Math.round(this.loadingState().progress));
  loadingText = computed(() => this.loadingState().message);
  isVisible = computed(() => this.loadingState().isVisible);
  isComplete = computed(() => this.loadingState().isComplete);
  isLoading = computed(() => !this.loadingState().isComplete);

  private loadingMessages = [
    'Iniciando...',
    'Conectando energía...',
    'Preparando servicios...',
    'Optimizando experiencia...',
    'Casi listo...'
  ];

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.isBrowser && !this.hasStarted) {
      this.hasStarted = true;
      this.blockBodyScroll();
      this.startLoadingSequence();
    }
  }

  ngOnDestroy() {
    this.cleanupAnimations();
    this.restoreBodyScroll();
  }

  private blockBodyScroll() {
    if (this.isBrowser) {
      this.originalBodyOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    }
  }

  private restoreBodyScroll() {
    if (this.isBrowser) {
      document.body.style.overflow = this.originalBodyOverflow;
      document.documentElement.style.overflow = '';
    }
  }

  private startLoadingSequence() {
    // Iniciar animación de progreso
    this.startLoadingAnimation();

    // Configurar timeout para completar la carga
    this.loadingTimeout = setTimeout(() => {
      this.completeLoading();
    }, 3500); // 3.5 segundos total
  }

  private startLoadingAnimation() {
    const duration = 3000; // 3 segundos para llegar al 100%
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Actualizar progreso con curva suave - corregido para coincidir con porcentaje
      const currentProgress = this.easeOutCubic(progress) * 100;

      // Actualizar mensaje basado en el progreso real
      const messageIndex = Math.floor(progress * (this.loadingMessages.length - 1));
      const currentMessage = this.loadingMessages[Math.min(messageIndex, this.loadingMessages.length - 1)];

      // Actualizar el signal
      this.loadingState.update(state => ({
        ...state,
        progress: currentProgress,
        message: currentMessage
      }));

      if (progress < 1) {
        this.animationFrame = requestAnimationFrame(animate);
      } else {
        // Asegurar que llegue exactamente al 100%
        this.loadingState.update(state => ({
          ...state,
          progress: 100,
          message: 'Completado'
        }));
      }
    };

    animate();
  }

  private completeLoading() {
    // Asegurar que el progreso esté exactamente al 100%
    this.loadingState.update(state => ({
      ...state,
      progress: 100,
      message: 'Completado'
    }));

    // Pequeña pausa antes de ocultar
    setTimeout(() => {
      this.loadingState.update(state => ({
        ...state,
        isVisible: false
      }));

      // Restaurar scroll antes de emitir el evento
      this.restoreBodyScroll();

      // Emitir evento de carga completada
      this.loadingComplete.emit();

      // Marcar como completado después de la animación de salida
      setTimeout(() => {
        this.loadingState.update(state => ({
          ...state,
          isComplete: true
        }));
      }, 500); // Tiempo para la animación de fade out
    }, 300);
  }

  private easeOutCubic(t: number): number {
    return 1 - Math.pow(1 - t, 3);
  }

  private cleanupAnimations() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    if (this.loadingTimeout) {
      clearTimeout(this.loadingTimeout);
    }
  }

// Método público para forzar la finalización del loading
  forceComplete() {
    if (!this.loadingState().isComplete) {
      this.cleanupAnimations();
      this.completeLoading();
    }
  }
}
