import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'nl2br',
  standalone: true // <-- Marca el pipe como standalone
})
export class Nl2brPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {
    if (!value) return '';
    const formattedText = value.replace(/\n/g, '<br>');
    return this.sanitizer.bypassSecurityTrustHtml(formattedText);
  }
}
