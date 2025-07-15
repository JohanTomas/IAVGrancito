import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  askQuestion(question: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/api/chatbot/ask`, question, {
      responseType: 'text' as 'json'
    });
  }
}
