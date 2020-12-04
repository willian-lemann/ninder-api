import { Router } from "express";
import { HttpMethods } from "./HttpMethods";

export interface ResourceParams {
   routes: Router,
   resource: string, 
   middleware?: any | null,
   controller: any,
   except?: string[]
}