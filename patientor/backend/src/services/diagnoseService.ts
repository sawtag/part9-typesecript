import diagnosesEntries from "../../data/diagnoses.ts";
import type { Diagnosis } from "../types.ts";

const getDiagnoses = (): Diagnosis[] => {
	return diagnosesEntries;
};

const addDiagnosis = (diagnosis: Diagnosis): Diagnosis => {
	return diagnosis;
};

export default {
	getDiagnoses,
	addDiagnosis,
};
