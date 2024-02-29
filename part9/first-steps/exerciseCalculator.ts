interface TrainingResults {
    periodLength: number,
    trainingDays: number,
    targetDailyHours: number,
    dailyHours: number,
    success: boolean,
    rating: number,
    ratingDescription: string
}

function calculateExercises(dailyExerciseHours: number[], targetDailyHours: number): TrainingResults {
    let sum = 0;

    dailyExerciseHours.forEach(dayHours => {
        sum += dayHours;
    });

    const periodLength = dailyExerciseHours.length;
    const trainingDays = dailyExerciseHours.filter(dayHours => dayHours > 0).length;
    const dailyHours = sum / periodLength;
    const success = dailyHours >= targetDailyHours;

    const rating = Math.min(Math.max(Math.floor(dailyHours / targetDailyHours * 3), 1), 3);

    let ratingDescription = "Not even close";

    if (rating === 2) {
        ratingDescription = "You tried";
    } else if (rating === 3) {
        ratingDescription = "You met your goal!";
    }
    
    const results: TrainingResults = {
        periodLength,
        trainingDays,
        targetDailyHours,
        dailyHours,
        success,
        rating,
        ratingDescription
    };

    return results;
}

if (process.argv.length < 4) throw new Error('Not enough arguments');

const inputTargetDailyHours = Number(process.argv[2]);

if (isNaN(inputTargetDailyHours)) throw new Error(`Parameter '${process.argv[2]}' is not a number!`);

const inputExerciseHours: number[] = [];

for (let i = 3; i < process.argv.length; i++) {
    const dayHours = Number(process.argv[i]);

    if (isNaN(dayHours)) throw new Error(`Parameter '${process.argv[i]}' is not a number!`);

    inputExerciseHours.push(dayHours);
}

console.log(calculateExercises(inputExerciseHours, inputTargetDailyHours));