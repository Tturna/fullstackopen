function calculateBmi(heightCm: number, weightKg: number): string {
    const heightM = heightCm / 100;
    const index = weightKg / (heightM * heightM);

    // console.log(index);

    if (index < 16) {
        return "Underweight (Severe thinness)";
    } else if (index < 17) {
        return "Underweight (Moderate thinness)";
    } else if (index < 18.5) {
        return "Underweight (Mild thinness)";
    } else if (index < 25) {
        return "Normal range";
    } else if (index < 30) {
        return "Overweight (Pre-obese)";
    } else if (index < 35) {
        return "Obese (Class I)";
    } else if (index < 40) {
        return "Obese (Class II)";
    } else {
        return "Obese (Class III)";
    }

}

const inputHeightCm = Number(process.argv[2]);
const inputWeightKg = Number(process.argv[3]);

if (isNaN(inputHeightCm) || isNaN(inputWeightKg)) {
    throw new Error('Provided values are not numbers');
}

console.log(calculateBmi(inputHeightCm, inputWeightKg));