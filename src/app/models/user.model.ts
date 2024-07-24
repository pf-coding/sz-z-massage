export interface UserModel {
  id?: string;
  name: string;
  email: string;
  [key: string]: any; // Ez lehetővé teszi, hogy további mezők is jelen legyenek
}
