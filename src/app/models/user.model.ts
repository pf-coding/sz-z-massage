export interface UserModel {
  id?: string;
  name: string;
  email: string;
  timestamp?: { seconds: number; nanoseconds: number }; // Firestore timestamp format
  timestampDate?: Date; // JavaScript Date format
  year?: number;
  month?: number;
  day?: number;
  hour?: number;
  minute?: number;
  second?: number;
  [key: string]: any; // This allows additional fields
}
