export interface Profile {
  id: number;
  name: string;
  value: number;
  photo: string;
  notification: number;
  age: number;
  address: string;
  status?: { key: string; value: string };
  myPhotos: string[];
}
