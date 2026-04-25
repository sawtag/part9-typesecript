interface BmiCategory {
  cutoff: number;
  label: string;
}

interface BmiValues {
  height_cm: number;
  weight_kg: number;
}

const printUsage = () => {
  console.log("Usage: `npm run calculateBmi height_cm weight_kg`");
};

const parseArgs = (args: string[]): BmiValues => {
  if (args.length !== 4) throw new Error("Wrong number of arguments");
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height_cm: Number(args[2]),
      weight_kg: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const binarySearch = (array: number[], target: number): number => {
  // floor binary search. array is sorted asc
  // returns the INDEX of the correct category
  if (array.length === 0) throw new Error("Empty Array");
  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    // old habit: avoid overflow
    const mid = left + Math.floor((right - left) / 2);
    if (array[mid] === target) return mid;
    else if (array[mid] < target) {
      if (mid === array.length - 1 || array[mid + 1] > target) return mid;
      left = mid + 1;
    } else {
      if (mid === 0 || array[mid - 1] < target) return mid - 1;
      right = mid - 1;
    }
  }
  return -1;
};

const calculateBmi = (height_cm: number, weight_kg: number): string => {
  if (height_cm === 0) throw new Error("Height cannot be zero");
  if (height_cm < 0 || weight_kg < 0)
    throw new Error("Negative values are not supported");

  const height_m = height_cm * 0.01;
  const BMI_CATEGORIES: BmiCategory[] = [
    { cutoff: 0.0, label: "Underweight (Severe thinness)" },
    { cutoff: 16.0, label: "Underweight (Moderate thinness)" },
    { cutoff: 17.0, label: "Underweight (Mild thinness)" },
    { cutoff: 18.5, label: "Normal Range" },
    { cutoff: 25.0, label: "Overweight (Pre-obese)" },
    { cutoff: 30.0, label: "Obese (Class I)" },
    { cutoff: 35.0, label: "Obese (Class II)" },
    { cutoff: 40.0, label: "Obese (Class III)" },
  ];

  const bmi = weight_kg / height_m ** 2;
  const cutoffs = BMI_CATEGORIES.map((c) => c.cutoff);
  const cutoffIndex = binarySearch(cutoffs, bmi);

  if (cutoffIndex === -1) throw new Error("Could not classify BMI");
  return BMI_CATEGORIES[cutoffIndex].label;
};

if (process.argv[1] === import.meta.filename) {
  try {
    const { height_cm, weight_kg } = parseArgs(process.argv);
    console.log(calculateBmi(height_cm, weight_kg));
  } catch (error: unknown) {
    let errorMessage = "Something went wrong: ";
    if (error instanceof Error) {
      errorMessage += error.message;
      console.log(errorMessage);
      printUsage();
    }
  }
}

export { calculateBmi, type BmiCategory };
