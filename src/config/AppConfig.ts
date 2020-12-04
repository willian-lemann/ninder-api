import express from "express";
import cors from "cors";
import routes from "../routes";
import path from "path";

const appConfig = [
   cors(),
   express.json(),
   routes
];

export default appConfig;
