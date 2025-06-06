import { Component, OnInit, OnDestroy, HostListener, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Importar todos los componentes
import { Header } from '../../sections/header/header';
import { Hero } from '../../sections/hero/hero';
import { Features } from '../../sections/features/features';
import { Packages } from '../../sections/packages/packages';
import { Testimonials } from '../../sections/testimonials/testimonials';
import { Faq } from '../../sections/faq/faq';
import { Contact } from '../../sections/contact/contact';
import { Footer } from '../../sections/footer/footer';
import { Cta } from '../../sections/cta/cta';
import { BackToTop } from '../../sections/back-to-top/back-to-top';
import { Preloader } from '../../sections/preloader/preloader';

interface ContactInfo {
  icon: string;
  title: string;
  info: string[];
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  package: string;
  message: string;
}

interface AppState {
  isLoadingComplete: boolean;
  isScrolled: boolean;
  isMobileMenuOpen: boolean;
  showBackToTop: boolean;
  showCtaBanner: boolean;
}

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    Header,
    Hero,
    Features,
    Packages,
    Testimonials,
    Faq,
    Contact,
    Footer,
    Cta,
    BackToTop,
    Preloader
  ],
  templateUrl: './landing.html',
  styleUrls: ['./landing.scss']
})
export class Landing implements OnInit, OnDestroy {
// State signals
  private appState = signal<AppState>({
    isLoadingComplete: false,
    isScrolled: false,
    isMobileMenuOpen: false,
    showBackToTop: false,
    showCtaBanner: false
  });

// Computed signals para el template
  isLoadingComplete = computed(() => this.appState().isLoadingComplete);
  isScrolled = computed(() => this.appState().isScrolled);
  isMobileMenuOpen = computed(() => this.appState().isMobileMenuOpen);
  showBackToTop = computed(() => this.appState().showBackToTop);
  showCtaBanner = computed(() => this.appState().showCtaBanner);

// Form data signal
  formData = signal<FormData>({
    name: '',
    email: '',
    phone: '',
    package: '',
    message: ''
  });

  contactInfo: ContactInfo[] = [
    {
      icon: 'phone',
      title: 'Teléfono',
      info: ['01 700 8500', 'Cel: 987 654 321']
    },
    {
      icon: 'mail',
      title: 'Email',
      info: ['ventas@cableluz.com', 'soporte@cableluz.com']
    },
    {
      icon: 'location',
      title: 'Oficinas',
      info: ['Av. Javier Prado 1234, San Isidro', 'Lima, Perú']
    },
    {
      icon: 'clock',
      title: 'Horario de atención',
      info: ['Lunes a Viernes: 8am - 10pm', 'Sábados y Domingos: 9am - 8pm']
    }
  ];

  private ctaBannerTimeout: any;

  ngOnInit(): void {
    // No necesitamos hacer nada aquí, el preloader se maneja solo
  }

  ngOnDestroy(): void {
    if (this.ctaBannerTimeout) {
      clearTimeout(this.ctaBannerTimeout);
    }
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    // Solo procesar scroll si la carga está completa
    if (!this.isLoadingComplete()) {
      return;
    }

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    this.appState.update(state => ({
      ...state,
      isScrolled: scrollTop > 100,
      showBackToTop: scrollTop > 500
    }));
  }

// Manejar cuando el preloader termina
  onLoadingComplete(): void {
    console.log('Loading completed!');

    this.appState.update(state => ({
      ...state,
      isLoadingComplete: true
    }));

    // Programar CTA banner después de que termine el loading
    this.scheduleCTABanner();
  }

  private scheduleCTABanner(): void {
    // Mostrar CTA banner 10 segundos después de que termine el loading
    this.ctaBannerTimeout = setTimeout(() => {
      this.appState.update(state => ({
        ...state,
        showCtaBanner: true
      }));
    }, 10000);
  }

// Event handlers
  onToggleMobileMenu(): void {
    this.appState.update(state => ({
      ...state,
      isMobileMenuOpen: !state.isMobileMenuOpen
    }));
  }

  onScrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }

    // Cerrar menú móvil si está abierto
    this.appState.update(state => ({
      ...state,
      isMobileMenuOpen: false
    }));
  }

  onContractPackage(packageName: string): void {
    this.formData.update(data => ({
      ...data,
      package: packageName
    }));
    this.onScrollToSection('contacto');
  }

  onSubmitForm(formData: FormData): void {
    console.log('Form submitted:', formData);
    alert(`¡Gracias ${formData.name}! Hemos recibido tu solicitud para el paquete ${formData.package}. Un asesor se comunicará contigo en menos de 30 minutos.`);

    // Reset form
    this.formData.set({
      name: '',
      email: '',
      phone: '',
      package: '',
      message: ''
    });
  }

  onScrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  onHideCtaBanner(): void {
    this.appState.update(state => ({
      ...state,
      showCtaBanner: false
    }));
  }

  onContractNow(): void {
    this.onScrollToSection('contacto');
  }
}
