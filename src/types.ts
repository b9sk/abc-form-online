export interface ABCForm {
    id?: number;
    dateTime: string; // ISO string from datetime-local
    emotions: string;
    actions: string;
    activationEvent: string;
    beliefs: string;
    thinkingError: string;
}