document.addEventListener("DOMContentLoaded", function () {
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
    
    heightButtons[0].classList.add("bg-green-600", "text-white");
    genderButtons[0].classList.add("bg-green-600", "text-white");
    
    genderButtons.forEach(button => {
        button.addEventListener("click", function () {
            genderButtons.forEach(btn => btn.classList.remove("bg-green-600", "text-white"));
            this.classList.add("bg-green-600", "text-white");
        });
    });

    window.toggleHeightInputs = function (unit) {
        [heightFt, heightIn, heightCm, heightM].forEach(el => el.parentElement.classList.add("hidden"));
        document.querySelectorAll(".height-btn").forEach(btn => btn.classList.remove("bg-green-600", "text-white"));
        if (unit === "feet") [heightFt, heightIn].forEach(el => el.parentElement.classList.remove("hidden"));
        else if (unit === "cm") heightCm.parentElement.classList.remove("hidden");
        else heightM.parentElement.classList.remove("hidden");
        document.querySelector(`button[data-unit="${unit}"]`).classList.add("bg-green-600", "text-white");
    };

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
            animateCategoryHighlight(bmi);
        }
    }

    function animateCategoryHighlight(finalBmi) {
        let counter = 0, categoryKeys = Object.keys(categories);
        let interval = setInterval(() => {
            let randomCategory = categoryKeys[Math.floor(Math.random() * categoryKeys.length)];
            categoryKeys.forEach(key => document.getElementById(key).classList.remove(...Object.values(categories)));
            document.getElementById(randomCategory).classList.add(categories[randomCategory]);
            if (++counter >= 6) {
                clearInterval(interval);
                showBMI(finalBmi);
            }
        }, 300);
    }

    function showBMI(bmi) {
        bmiValue.textContent = bmi;
        Object.keys(categories).forEach(key => document.getElementById(key).classList.remove(...Object.values(categories)));
        let result = bmi < 18.5 ? "underweight" : bmi < 25 ? "normal" : bmi < 30 ? "overweight" : "obesity";
        document.getElementById(result).classList.add(categories[result]);
        bmiValue.className = "p-2 rounded text-white " + categories[result];

        let weightSuggestion = "";
        if (result === "underweight") weightSuggestion = `Gain at least ${(18.5 * (parseFloat(heightFt.value) * 0.3048) ** 2 - parseFloat(weight.value)).toFixed(1)} kg to ${(24.9 * (parseFloat(heightFt.value) * 0.3048) ** 2 - parseFloat(weight.value)).toFixed(1)} kg`;
        else if (result === "overweight" || result === "obesity") weightSuggestion = `Lose at least ${(parseFloat(weight.value) - 24.9 * (parseFloat(heightFt.value) * 0.3048) ** 2).toFixed(1)} kg to be in a healthy range`;

        recommendation.innerHTML = `<div class='text-xl font-bold'>${{
            underweight: "Warning: You are underweight!",
            normal: "Great Shape!",
            overweight: "Warning: You are overweight!",
            obesity: "Critical: Obesity detected!"
        }[result]}</div>
        <div class='text-lg'>${{
            underweight: "Maintain a balanced diet and gain weight.",
            normal: "Keep up the healthy lifestyle!",
            overweight: "Consider a healthier diet and exercise.",
            obesity: "Consult a healthcare provider immediately."
        }[result]}</div>
        <div class='text-lg text-blue-600 font-semibold'>${weightSuggestion}</div>`;
    }

    document.getElementById("calculateBtn").addEventListener("click", function (e) {
        e.preventDefault();
        calculateBMI();
    });
});
