import { Router } from "express";
  
export interface RouteGroupParams {
   routes: Router,
   resource: string,
   middleware?: any | null,
   controller: any,
   except?: string[]
}; 