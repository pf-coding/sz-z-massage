export interface UserModel {
  id?: string;
  name: string;
  email: string;
  timestamp?: { seconds: number; nanoseconds: number };
  timestampDate?: Date;
  year?: number;
  month?: number;
  day?: number;
  hour?: number;
  minute?: number;
  second?: number;
  dataConsent: boolean; // Új mező az adatkezelési tájékoztatóhoz
  [key: string]: any;
}
