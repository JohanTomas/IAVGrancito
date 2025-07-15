export interface Chat {
  id: string;
  title: string;
  messages: string[]; // antes era solo "prompt: string"
}
