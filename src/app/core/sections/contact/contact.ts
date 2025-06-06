import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule,
  MessageCircle, Phone, Mail, MapPin, Clock, Send, ChevronDown, ChevronRight,
  Info, User, Bot, CheckCircle } from 'lucide-angular';

interface ContactInfo {
  icon: string;
  title: string;
  info: string[];
}

interface ChatMessage {
  id: number;
  type: 'bot' | 'user';
  message: string;
  timestamp: Date;
  options?: string[];
}

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  package: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss']
})
export class Contact implements OnInit, OnChanges {
// Inputs del componente padre
  @Input() contactInfo: ContactInfo[] = [];
  @Input() formData: ContactFormData = {
    name: '',
    email: '',
    phone: '',
    package: '',
    message: ''
  };

// Output para enviar datos al componente padre
  @Output() submitForm = new EventEmitter<ContactFormData>();

// Iconos importados de Lucide
  readonly MessageCircleIcon = MessageCircle;
  readonly PhoneIcon = Phone;
  readonly MailIcon = Mail;
  readonly MapPinIcon = MapPin;
  readonly ClockIcon = Clock;
  readonly SendIcon = Send;
  readonly ChevronDownIcon = ChevronDown;
  readonly ChevronRightIcon = ChevronRight;
  readonly InfoIcon = Info;
  readonly UserIcon = User;
  readonly BotIcon = Bot;
  readonly CheckCircleIcon = CheckCircle;

// Estado del chat
  currentStep = 0;
  isTyping = false;
  chatMessages: ChatMessage[] = [];
  currentInput = '';

// Datos internos del formulario para el chat
  internalFormData: ContactFormData = {
    name: '',
    email: '',
    phone: '',
    package: '',
    message: ''
  };

// Pasos del chat conversacional
  chatSteps = [
    {
      message: '¡Hola! 👋 Soy tu asistente virtual de CableLuz. ¿Cuál es tu nombre?',
      field: 'name',
      type: 'text'
    },
    {
      message: 'Perfecto, [name]! ¿Cuál es tu correo electrónico?',
      field: 'email',
      type: 'email'
    },
    {
      message: 'Genial! Ahora necesito tu número de teléfono para contactarte',
      field: 'phone',
      type: 'tel'
    },
    {
      message: '¿Qué paquete te interesa más?',
      field: 'package',
      type: 'options',
      options: ['Básico (S/99)', 'Avanzado (S/129)', 'Premium (S/159)']
    },
    {
      message: '¿Hay algo específico que quieras contarnos? (opcional)',
      field: 'message',
      type: 'textarea'
    }
  ];

  ngOnInit() {
    this.initializeFormData();
    this.startChat();
  }

  ngOnChanges(changes: SimpleChanges) {
    // Si el formData del padre cambia, actualizar datos internos
    if (changes['formData'] && changes['formData'].currentValue) {
      this.internalFormData = { ...changes['formData'].currentValue };

      // Si hay un paquete preseleccionado, ajustar el chat
      if (this.internalFormData.package && this.currentStep === 0) {
        this.handlePreselectedPackage();
      }
    }
  }

  private initializeFormData() {
    this.internalFormData = { ...this.formData };
  }

  private handlePreselectedPackage() {
    // Si viene un paquete preseleccionado desde el componente padre
    if (this.internalFormData.package) {
      // Actualizar el paso del paquete en chatSteps
      const packageStep = this.chatSteps.find(step => step.field === 'package');
      if (packageStep) {
        packageStep.message = `Veo que te interesa el paquete ${this.internalFormData.package}. ¿Confirmamos este paquete?`;
        packageStep.options = ['Sí, confirmar', 'Ver otros paquetes'];
      }
    }
  }

  startChat() {
    this.addBotMessage(this.chatSteps[0].message);
  }

  addBotMessage(message: string, options?: string[]) {
    this.isTyping = true;

    setTimeout(() => {
      const processedMessage = this.processMessage(message);
      this.chatMessages.push({
        id: Date.now(),
        type: 'bot',
        message: processedMessage,
        timestamp: new Date(),
        options
      });
      this.isTyping = false;
      this.scrollToBottom();
    }, 1000);
  }

  addUserMessage(message: string) {
    this.chatMessages.push({
      id: Date.now(),
      type: 'user',
      message,
      timestamp: new Date()
    });
    this.scrollToBottom();
  }

  processMessage(message: string): string {
    return message.replace('[name]', this.internalFormData.name || 'amigo/a');
  }

  handleUserInput() {
    if (!this.currentInput.trim()) return;

    const currentStepData = this.chatSteps[this.currentStep];

    // Agregar mensaje del usuario
    this.addUserMessage(this.currentInput);

    // Guardar en formData interno
    (this.internalFormData as any)[currentStepData.field] = this.currentInput;

    // Limpiar input
    this.currentInput = '';

    // Siguiente paso
    this.currentStep++;

    if (this.currentStep < this.chatSteps.length) {
      setTimeout(() => {
        const nextStep = this.chatSteps[this.currentStep];
        this.addBotMessage(nextStep.message, nextStep.options);
      }, 500);
    } else {
      // Finalizar chat y enviar datos al padre
      this.finishChat();
    }
  }

  selectOption(option: string) {
    // Manejar opciones especiales para paquete preseleccionado
    if (this.currentStep === 3 && this.internalFormData.package) { // Paso del paquete
      if (option === 'Sí, confirmar') {
        this.currentInput = this.internalFormData.package;
      } else if (option === 'Ver otros paquetes') {
        // Restaurar opciones originales
        const packageStep = this.chatSteps[3];
        packageStep.options = ['Básico (S/99)', 'Avanzado (S/129)', 'Premium (S/159)'];
        this.addBotMessage('Perfecto, aquí tienes todas nuestras opciones:', packageStep.options);
        return;
      } else {
        this.currentInput = option;
      }
    } else {
      this.currentInput = option;
    }

    this.handleUserInput();
  }

  finishChat() {
    setTimeout(() => {
      this.addBotMessage('¡Perfecto! He recibido toda tu información. Nuestro equipo se pondrá en contacto contigo muy pronto. 🚀');

      // Emitir datos al componente padre
      this.submitForm.emit(this.internalFormData);

      setTimeout(() => {
        this.addBotMessage('¿Te gustaría iniciar una nueva consulta?', ['Sí, empezar de nuevo', 'No, gracias']);
      }, 1500);
    }, 1000);
  }

  resetChat() {
    this.currentStep = 0;
    this.chatMessages = [];
    this.internalFormData = {
      name: '',
      email: '',
      phone: '',
      package: '',
      message: ''
    };
    this.startChat();
  }

  private scrollToBottom() {
    setTimeout(() => {
      const chatContainer = document.querySelector('.chat-container');
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }, 100);
  }

// Métodos para obtener iconos dinámicos
  getContactIcon(iconName: string): any {
    const iconMap: { [key: string]: any } = {
      'phone': this.PhoneIcon,
      'mail': this.MailIcon,
      'location': this.MapPinIcon,
      'clock': this.ClockIcon
    };
    return iconMap[iconName] || this.InfoIcon;
  }

// Método legacy para compatibilidad
  onSubmit(): void {
    // Este método ya no se usa directamente,
    // pero lo mantenemos por compatibilidad
    this.submitForm.emit(this.internalFormData);
  }
}
