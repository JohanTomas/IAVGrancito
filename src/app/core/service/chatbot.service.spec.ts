/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { ChatbotService } from './chatbot.service';

describe('Service: Chatbot', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChatbotService]
    });
  });

  it('should ...', inject([ChatbotService], (service: ChatbotService) => {
    expect(service).toBeTruthy();
  }));
});
