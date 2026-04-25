interface ExerciseStats {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseValues {
  dailyHours: number[];
  target: number;
}

const printUsage = () => {
  console.log("Usage: `npm run calculateExercises target daily_hours...`");
};

const parseArgs = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const values = args.slice(2).map((arg) => Number(arg));
  if (values.some((value) => isNaN(value))) {
    throw new Error("Provided values were not numbers!");
  }

  const [target, ...dailyHours] = values;
  return {
    dailyHours,
    target,
  };
};

const getRating = (
  dailyAve: number,
  dailyTarget: number,
): { rating: number; ratingDescription: string } => {
  // if within factor of your target, decent
  const ratings = [
    "You are way behind, but you can catch up!",
    "Not too bad but could be better",
    "Great Job! Keep it up!",
  ];

  let rating;
  const factor = 0.2;
  if (dailyAve >= dailyTarget) rating = 2;
  else if (dailyAve >= (1 - factor) * dailyTarget) rating = 1;
  else rating = 0;

  return {
    rating: rating + 1,
    ratingDescription: ratings[rating],
  };
};

const calculateExercises = (
  dailyHours: number[],
  target: number,
): ExerciseStats => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter((d) => d !== 0).length;
  const average = periodLength
    ? dailyHours.reduce((a, c) => a + c, 0) / periodLength
    : 0;
  const success = average >= target;
  const { rating, ratingDescription } = getRating(average, target);

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

if (process.argv[1] === import.meta.filename) {
  try {
    const { dailyHours, target } = parseArgs(process.argv);
    console.log(calculateExercises(dailyHours, target));
  } catch (error: unknown) {
    let errorMessage = "Something went wrong: ";
    if (error instanceof Error) {
      errorMessage += error.message;
      console.log(errorMessage);
      printUsage();
    }
  }
}

export { calculateExercises, type ExerciseStats };
