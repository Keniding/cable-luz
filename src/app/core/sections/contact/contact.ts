import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss']
})
export class Contact {
  @Input() contactInfo: ContactInfo[] = [];
  @Input() formData: FormData = {
    name: '',
    email: '',
    phone: '',
    package: '',
    message: ''
  };
  @Output() submitForm = new EventEmitter<FormData>();

  onSubmit(): void {
    if (this.formData.name && this.formData.email && this.formData.phone && this.formData.package) {
      this.submitForm.emit({ ...this.formData });
    }
  }
}
