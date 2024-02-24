import express from "express";
import serverless from "serverless-http";
import { app } from "../api/server.js";

const handler = serverless(app);

export { handler };