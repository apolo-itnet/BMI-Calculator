document.addEventListener("DOMContentLoaded", function () {
    // Get references to the DOM elements
    const heightFt = document.getElementById("heightFt");
    const heightIn = document.getElementById("heightIn");
    const heightCm = document.getElementById("heightCm");
    const heightM = document.getElementById("heightM");
    const weight = document.getElementById("weight");
    const bmiValue = document.getElementById("bmiValue");
    const recommendation = document.getElementById("recommendation");
    const heightButtons = document.querySelectorAll(".height-btn");
    const genderButtons = document.querySelectorAll(".gender-btn");
    const categories = { underweight: "bg-amber-400", normal: "bg-green-600", overweight: "bg-orange-500", obesity: "bg-red-600" };

    // Set initial active buttons
    heightButtons[0].classList.add("bg-green-600", "text-white");
    genderButtons[0].classList.add("bg-green-600", "text-white");

    // Add event listeners to gender buttons
    genderButtons.forEach(button => {
        button.addEventListener("click", function () {
            genderButtons.forEach(btn => btn.classList.remove("bg-green-600", "text-white"));
            this.classList.add("bg-green-600", "text-white");
        });
    });

    // Function to toggle height inputs based on selected unit
    window.toggleHeightInputs = function (unit) {
        [heightFt, heightIn, heightCm, heightM].forEach(el => el.parentElement.classList.add("hidden"));
        document.querySelectorAll(".height-btn").forEach(btn => btn.classList.remove("bg-green-600", "text-white"));
        if (unit === "feet") [heightFt, heightIn].forEach(el => el.parentElement.classList.remove("hidden"));
        else if (unit === "cm") heightCm.parentElement.classList.remove("hidden");
        else heightM.parentElement.classList.remove("hidden");
        document.querySelector(`button[data-unit="${unit}"]`).classList.add("bg-green-600", "text-white");
    };

    // Function to validate inputs
    function validateInputs() {
        let isValid = true;
        document.querySelectorAll("input").forEach(input => {
            if (input.parentElement.classList.contains("hidden")) return;
            if (!input.value || parseFloat(input.value) <= 0) {
                input.classList.add("border-red-500");
                isValid = false;
            } else {
                input.classList.remove("border-red-500");
            }
        });
        return isValid;
    }

    // Function to calculate BMI
    function calculateBMI() {
        if (!validateInputs()) return;
        let heightInMeters = 0, weightValue = parseFloat(weight.value);
        if (!heightFt.parentElement.classList.contains("hidden")) {
            heightInMeters = ((parseFloat(heightFt.value) || 0) * 12 + (parseFloat(heightIn.value) || 0)) * 0.0254;
        } else if (!heightCm.parentElement.classList.contains("hidden")) {
            heightInMeters = parseFloat(heightCm.value) / 100;
        } else {
            heightInMeters = parseFloat(heightM.value);
        }
        if (heightInMeters > 0 && weightValue > 0) {
            let bmi = (weightValue / (heightInMeters ** 2)).toFixed(1);
            animateCategoryHighlight(bmi, heightInMeters);
        }
    }

    // Function to animate the BMI category highlight
    function animateCategoryHighlight(finalBmi, heightInMeters) {
        let counter = 0, categoryKeys = Object.keys(categories);
        let interval = setInterval(() => {
            let randomCategory = categoryKeys[Math.floor(Math.random() * categoryKeys.length)];
            categoryKeys.forEach(key => document.getElementById(key).classList.remove(...Object.values(categories)));
            bmiValue.textContent = (Math.random() * (50 - 10) + 10).toFixed(1);
            if (++counter >= 20) {
                clearInterval(interval);
                showBMI(finalBmi, heightInMeters);
            }
        }, 50);
    }

    // Function to display the BMI result and recommendation
    function showBMI(bmi, heightInMeters) {
        bmiValue.textContent = bmi;
        Object.keys(categories).forEach(key => document.getElementById(key).classList.remove(...Object.values(categories)));
        let result = bmi < 18.5 ? "underweight" : bmi < 25 ? "normal" : bmi < 30 ? "overweight" : "obesity";
        document.getElementById(result).classList.add(categories[result]);
        bmiValue.className = "p-2 rounded text-white " + categories[result];

        // Calculate normal weight range
        let minWeight = (18.5 * (heightInMeters ** 2)).toFixed(1);
        let maxWeight = (24.9 * (heightInMeters ** 2)).toFixed(1);
        let weightSuggestion = `Normal weight range: ${minWeight}-${maxWeight} kg`;

        // Display recommendation based on BMI category
        recommendation.innerHTML = `<div class='text-xl font-bold'>${{
            underweight: "Time to grab food!",
            normal: "Great Shape!",
            overweight: "Time to get Run!",
            obesity: "Critical: Time to get Run and Run!"
        }[result]}</div>
        <div class='text-lg'>${{
            underweight: "Maintain a balanced diet and gain your weight.",
            normal: "Keep up the healthy lifestyle!",
            overweight: "Consider a healthier diet and exercise to lose weight.",
            obesity: "Consult a healthcare provider immediately."
        }[result]}</div>
        <div class='text-base mt-2 text-green-600 font-semibold'>${weightSuggestion}</div>`;
    }

    // Add event listener to the calculate button
    document.getElementById("calculateBtn").addEventListener("click", function (e) {
        e.preventDefault();
        calculateBMI();
    });

    // Add event listener to the clear button
    document.getElementById("clearBtn").addEventListener("click", function () {
        document.querySelectorAll("input").forEach(input => input.value = "");
        bmiValue.textContent = "-";
        bmiValue.className = "";
        recommendation.innerHTML = "";
        Object.keys(categories).forEach(key => document.getElementById(key).classList.remove(...Object.values(categories)));
    });
});