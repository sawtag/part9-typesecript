import { z } from "zod";

import express, {
	type Request,
	type Response,
	type NextFunction,
} from "express";
import patientsService from "../services/patientsService.ts";
import {
	type NonSensitivePatient,
	type NewPatientEntry,
	type Patient,
	NewPatientSchema,
} from "../types.ts";

// import parseNewPatient from "../utils.ts";

const router = express.Router();

router.get("/", (_req: Request, res: Response<NonSensitivePatient[]>) => {
	const patients = patientsService.getNonSensitivePatients();
	res.send(patients);
});

//middleware to parse the body
const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
	try {
		NewPatientSchema.parse(req.body);
		next();
	} catch (error: unknown) {
		next(error);
	}
};

const errorMiddleware = (
	error: unknown,
	_req: Request,
	res: Response,
	next: NextFunction,
) => {
	if (error instanceof z.ZodError) {
		res.status(400).send({ error: error.issues });
	} else {
		next(error);
	}
};

router.post(
	"/",
	newPatientParser,
	(req: Request<unknown, unknown, NewPatientEntry>, res: Response<Patient>) => {
		const addedPatient = patientsService.addPatient(req.body);
		res.status(200).json(addedPatient);
	},
);
router.use(errorMiddleware);
export default router;
