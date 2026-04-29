import express, { type Request, type Response } from "express";
import diagnoseService from "../services/diagnoseService.ts";
import type { Diagnosis } from "../types.ts";

const router = express.Router();

router.get("/", (_req: Request, res: Response<Diagnosis[]>) => {
	const diagnoses = diagnoseService.getDiagnoses();
	res.send(diagnoses);
});

export default router;
