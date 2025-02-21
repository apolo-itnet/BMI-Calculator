document.addEventListener("DOMContentLoaded", function () {
    // Selecting elements
    const heightFt = document.getElementById("heightFt");
    const heightIn = document.getElementById("heightIn");
    const heightCm = document.getElementById("heightCm");
    const heightM = document.getElementById("heightM");
    const weight = document.getElementById("weight");
    const bmiValue = document.getElementById("bmiValue");
    const recommendation = document.getElementById("recommendation");
    const genderButtons = document.querySelectorAll(".gender-btn");
    const heightButtons = document.querySelectorAll(".height-btn");
    const categories = {
        underweight: document.getElementById("underweight"),
        normal: document.getElementById("normal"),
        overweight: document.getElementById("overweight"),
        obesity: document.getElementById("obesity"),
    };

    // Set default active selections
    genderButtons[0].classList.add("bg-green-600", "text-white");
    heightButtons[0].classList.add("bg-green-600", "text-white");

    // Function to toggle gender selection
    genderButtons.forEach(button => {
        button.addEventListener("click", function () {
            genderButtons.forEach(btn => btn.classList.remove("bg-green-600", "text-white"));
            this.classList.add("bg-green-600", "text-white");
        });
    });

    // Function to toggle height input fields
    window.toggleHeightInputs = function (unit) {
        heightFt.classList.add("hidden");
        heightIn.classList.add("hidden");
        heightCm.classList.add("hidden");
        heightM.classList.add("hidden");

        heightButtons.forEach(btn => btn.classList.remove("bg-green-600", "text-white"));

        if (unit === "feet") {
            heightFt.classList.remove("hidden");
            heightIn.classList.remove("hidden");
        } else if (unit === "cm") {
            heightCm.classList.remove("hidden");
        } else if (unit === "meter") {
            heightM.classList.remove("hidden");
        }

        document.querySelector(`button[data-unit="${unit}"]`).classList.add("bg-green-600", "text-white");
    };

    // Function to calculate BMI
    function calculateBMI() {
        let heightInMeters = 0;
        let weightValue = parseFloat(weight.value);

        if (!heightFt.classList.contains("hidden")) {
            let feet = parseFloat(heightFt.value) || 0;
            let inches = parseFloat(heightIn.value) || 0;
            heightInMeters = (feet * 12 + inches) * 0.0254;
        } else if (!heightCm.classList.contains("hidden")) {
            heightInMeters = parseFloat(heightCm.value) / 100;
        } else if (!heightM.classList.contains("hidden")) {
            heightInMeters = parseFloat(heightM.value);
        }

        if (heightInMeters > 0 && weightValue > 0) {
            let bmi = weightValue / (heightInMeters * heightInMeters);
            bmi = bmi.toFixed(1);
            bmiValue.textContent = bmi;
            updateCategory(bmi);
        } else {
            bmiValue.textContent = "-";
            recommendation.textContent = "Please enter valid values for height and weight.";
            recommendation.classList.add("text-orange-400")
            bmiValue.className = "";
        }
    }

    // Function to update category highlight and recommendation
    function updateCategory(bmi) {
        Object.values(categories).forEach(category => category.classList.remove("bg-green-600", "bg-amber-400", "bg-orange-500", "bg-red-600", "text-white"));
        recommendation.classList.remove("text-red-500", "text-green-500");
        bmiValue.className = "p-2 rounded text-white";

        if (bmi < 18.5) {
            categories.underweight.classList.add("bg-amber-400", "text-white");
            recommendation.textContent = "Warning: You are underweight. Consider a balanced diet.";
            recommendation.classList.add("text-red-500");
            bmiValue.classList.add("bg-amber-400");
        } else if (bmi >= 18.5 && bmi < 25) {
            categories.normal.classList.add("bg-green-600", "text-white");
            recommendation.textContent = "You have a normal weight. Keep up the healthy lifestyle!";
            recommendation.classList.add("text-green-500");
            bmiValue.classList.add("bg-green-600");
        } else if (bmi >= 25 && bmi < 30) {
            categories.overweight.classList.add("bg-orange-500", "text-white");
            recommendation.textContent = "Warning: You are overweight. Consider regular exercise and a healthy diet.";
            recommendation.classList.add("text-red-500");
            bmiValue.classList.add("bg-orange-500");
        } else {
            categories.obesity.classList.add("bg-red-600", "text-white");
            recommendation.textContent = "Warning: You are in the obesity category. Consult a healthcare provider.";
            recommendation.classList.add("text-red-500");
            bmiValue.classList.add("bg-red-600");
        }
    }

    // Event listener for BMI calculation
    document.getElementById("calculateBtn").addEventListener("click", function (e) {
        e.preventDefault();
        calculateBMI();
    });
});
