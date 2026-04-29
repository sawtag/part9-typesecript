import { Gender, type BirthDate, type NewPatientEntry } from "./types.ts";

// id: string;
// name: string;
// dateOfBirth: BirthDate;
// ssn: string;
// gender: Gender;
// occupation: string;

const isString = (obj: unknown): obj is string => {
	return typeof obj === "string" || obj instanceof String;
};

const isGender = (param: string): param is Gender => {
	return (Object.values(Gender) as string[]).includes(param);
};

const parseGender = (gender: unknown): Gender => {
	if (!isString(gender) || !isGender(gender))
		throw new Error(`Incorrect or missing gender: ${gender}`);
	return gender;
};

const isDate = (date: unknown): BirthDate => {
	if (!isString(date)) {
		throw new Error(`Incorrect or missing birth date: ${date}`);
	}

	if (!/^\d{4}-\d{1,2}-\d{1,2}$/.test(date)) {
		throw new Error(`Incorrect birth date format: ${date}`);
	}

	if (Number.isNaN(Date.parse(date))) {
		throw new Error(`Invalid birth date: ${date}`);
	}

	return date as BirthDate;
};

const parseName = (name: unknown): string => {
	if (!isString(name)) throw new Error(`Incorrect or missing name: ${name}`);
	return name;
};

const parseSsn = (ssn: unknown): string => {
	if (!isString(ssn)) throw new Error(`Incorrect or missing ssn: ${ssn}`);
	return ssn;
};

const parseDateOfBirth = (dateOfBirth: unknown): BirthDate => {
	if (!isString(dateOfBirth) || !isDate(dateOfBirth))
		throw new Error(`Incorrect or missing birth date: ${dateOfBirth}`);
	return dateOfBirth as BirthDate;
};

const parseOccupation = (occupation: unknown): string => {
	if (!isString(occupation))
		throw new Error(`Incorrect or missing occupation: ${occupation}`);
	return occupation;
};

const parseNewPatient = (object: unknown): NewPatientEntry => {
	if (!object || typeof object !== "object") {
		throw new Error("Incorrect or missing data");
	}

	if (
		"name" in object &&
		"dateOfBirth" in object &&
		"gender" in object &&
		"ssn" in object &&
		"occupation" in object
	) {
		const newPatient: NewPatientEntry = {
			name: parseName(object.name),
			dateOfBirth: parseDateOfBirth(object.dateOfBirth),
			gender: parseGender(object.gender),
			ssn: parseSsn(object.ssn),
			occupation: parseOccupation(object.occupation),
		};
		return newPatient;
	}
	throw new Error("Incorrect data: some fields are missing");
};
export default parseNewPatient;
