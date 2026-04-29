import { z } from "zod";

export interface Diagnosis {
	code: string;
	name: string;
	latin?: string;
}
export const Gender = {
	Male: "male",
	Female: "female",
	Other: "other",
} as const;

export type Gender = (typeof Gender)[keyof typeof Gender];

type Year = `${number}${number}${number}${number}`;
type Month = `${number}` | `${number}${number}`;
type Day = `${number}` | `${number}${number}`;

export type BirthDate = `${Year}-${Month}-${Day}`;
export const NewPatientSchema = z.object({
	name: z.string().min(1),
	dateOfBirth: z
		.string()
		.trim()
		.regex(/^\d{4}-(\d{1,2})-(\d{1,2})$/, {
			message: "Invalid date format, should be YYYY-M[M]-D[D]",
		}) as z.ZodType<BirthDate>,
	ssn: z.string().min(1),
	gender: z.enum(Gender),
	occupation: z.string().min(1),
});

export type NewPatientEntry = z.infer<typeof NewPatientSchema>;

export interface Patient extends NewPatientEntry {
	id: string;
}

export type NonSensitivePatient = Omit<Patient, "ssn">;
