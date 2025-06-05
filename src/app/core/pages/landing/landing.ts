import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Importar todos los componentes
import { Header } from '../../sections/header/header';
import { Hero } from '../../sections/hero/hero';
import { Features } from '../../sections/features/features';
import { Packages } from '../../sections/packages/packages';
import { TestimonialsComponent } from '../../sections/testimonials/testimonials';
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
    TestimonialsComponent,
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
  // State variables
  isLoading = true;
  isScrolled = false;
  isMobileMenuOpen = false;
  showBackToTop = false;
  showCtaBanner = false;

  // Form data
  formData: FormData = {
    name: '',
    email: '',
    phone: '',
    package: '',
    message: ''
  };

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

  ngOnInit(): void {
    // Simulate preloader
    setTimeout(() => {
      this.isLoading = false;
    }, 3500);

    // Show CTA banner after 10 seconds
    setTimeout(() => {
      this.showCtaBanner = true;
    }, 10000);
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isScrolled = scrollTop > 100;
    this.showBackToTop = scrollTop > 500;
  }

  // Event handlers
  onToggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
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
    this.isMobileMenuOpen = false;
  }

  onContractPackage(packageName: string): void {
    this.formData.package = packageName;
    this.onScrollToSection('contacto');
  }

  onSubmitForm(formData: FormData): void {
    console.log('Form submitted:', formData);
    alert(`¡Gracias ${formData.name}! Hemos recibido tu solicitud para el paquete ${formData.package}. Un asesor se comunicará contigo en menos de 30 minutos.`);

    // Reset form
    this.formData = {
      name: '',
      email: '',
      phone: '',
      package: '',
      message: ''
    };
  }

  onScrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  onHideCtaBanner(): void {
    this.showCtaBanner = false;
  }

  onContractNow(): void {
    this.onScrollToSection('contacto');
  }
}
