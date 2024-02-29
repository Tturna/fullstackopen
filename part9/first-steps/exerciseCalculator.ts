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
    })

    const periodLength = dailyExerciseHours.length;
    const trainingDays = dailyExerciseHours.filter(dayHours => dayHours > 0).length;
    const dailyHours = sum / periodLength;
    const success = dailyHours >= targetDailyHours;

    const rating = Math.min(Math.max(Math.floor(dailyHours / targetDailyHours * 3), 1), 3);
    
    const results: TrainingResults = {
        periodLength,
        trainingDays,
        targetDailyHours,
        dailyHours,
        success,
        rating,
        ratingDescription: "lmao"
    }

    return results;
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));