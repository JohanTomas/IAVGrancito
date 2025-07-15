import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.css']
})
export class ChatViewComponent {
  @Input() prompt: string = '';

  copiado = false;

  copiarAlPortapapeles(): void {
    const respuesta = this.prompt.split('\nIA:')[1]?.trim() || '';
    navigator.clipboard.writeText(respuesta).then(() => {
      this.copiado = true;
      setTimeout(() => this.copiado = false, 2000);
    }).catch(err => {
      console.error('Error al copiar al portapapeles', err);
    });
  }
}
