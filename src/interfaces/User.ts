export interface User {
   name: string;
   email: string;
   password: string | undefined;
   telephone: string;
   location: {
      latitude: number;
      longitude: number;
   };
}
