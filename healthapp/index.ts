import express, { type Request, type Response } from "express";
import { calculateBmi } from "./bmiCalculator.ts";
import { calculateExercises } from "./exerciseCalculator.ts";

const app = express();

app.use(express.json());

app.get("/hello", (_req: Request, res: Response) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req: Request, res: Response) => {
  const weight = Number(req.query?.weight);

  const height = Number(req.query?.height);

  if (isNaN(weight) || isNaN(height)) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  try {
    const bmi = calculateBmi(height, weight);
    return res.json({ weight, height, bmi });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";
    return res.status(400).json({ error: message });
  }
});

app.post("/exercises", (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target)
    return res.status(400).json({ error: "parameters missing" });

  if (
    isNaN(Number(target)) ||
    // hacky, but works for now
    (daily_exercises as unknown[]).some((exercise) => isNaN(Number(exercise)))
  )
    return res.status(400).json({ error: "malformatted parameters" });

  try {
    const result = calculateExercises(
      daily_exercises as number[],
      Number(target),
    );
    return res.json(result);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";
    return res.status(400).json({ error: message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
