import patientsEntries from "../../data/patients.ts";

import type {
	Patient,
	NonSensitivePatient,
	NewPatientEntry,
} from "../types.ts";
import { v1 as uuid } from "uuid";

const getPatients = (): Patient[] => {
	return patientsEntries;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
	return patientsEntries.map(
		({ id, name, dateOfBirth, gender, occupation }) => ({
			id,
			name,
			dateOfBirth,
			gender,
			occupation,
		}),
	);
};

const addPatient = (patient: NewPatientEntry): Patient => {
	const newPatient = {
		id: uuid(),
		...patient,
	};
	patientsEntries.push(newPatient);
	return newPatient;
};

export default {
	getPatients,
	getNonSensitivePatients,
	addPatient,
};
