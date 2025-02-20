// On page load, make sure the correct height unit input is visible
document.addEventListener("DOMContentLoaded", function() {
  const defaultUnit = document.querySelector('.height-toggle-btn.active').dataset.unit;
  const heightInputs = document.querySelectorAll('.height-input input');

  // Hide all inputs first
  heightInputs.forEach(input => input.style.display = 'none');

  // Show relevant inputs based on default unit
  if (defaultUnit === 'ft-in') {
    document.getElementById('heightFt').style.display = 'block';
    document.getElementById('heightIn').style.display = 'block';
  } else if (defaultUnit === 'cm') {
    document.getElementById('heightCm').style.display = 'block';
  } else if (defaultUnit === 'm') {
    document.getElementById('heightM').style.display = 'block';
  }
});

// Toggle gender buttons
document.querySelectorAll('.gender-btn').forEach(button => {
  button.addEventListener('click', function () {
    document.querySelectorAll('.gender-btn').forEach(btn => btn.classList.remove('active'));
    this.classList.add('active');
  });
});

// Toggle height unit input
document.querySelectorAll('.height-toggle-btn').forEach(button => {
  button.addEventListener('click', function () {
    document.querySelectorAll('.height-toggle-btn').forEach(btn => btn.classList.remove('active'));
    this.classList.add('active');

    const unit = this.dataset.unit;
    const heightInputs = document.querySelectorAll('.height-input input');

    // Hide all inputs first
    heightInputs.forEach(input => input.style.display = 'none');

    // Show relevant inputs based on unit
    if (unit === 'ft-in') {
      document.getElementById('heightFt').style.display = 'block';
      document.getElementById('heightIn').style.display = 'block';
    } else if (unit === 'cm') {
      document.getElementById('heightCm').style.display = 'block';
    } else if (unit === 'm') {
      document.getElementById('heightM').style.display = 'block';
    }
  });
});

// BMI Calculation Logic
document.getElementById('bmiForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const gender = document.querySelector('.gender-btn.active').dataset.value;
  const age = parseInt(document.getElementById('age').value);
  const weight = parseFloat(document.getElementById('weight').value);

  const heightUnit = document.querySelector('.height-toggle-btn.active').dataset.unit;
  let heightInMeters;

  if (heightUnit === 'ft-in') {
    const heightFt = parseFloat(document.getElementById('heightFt').value);
    const heightIn = parseFloat(document.getElementById('heightIn').value);
    heightInMeters = ((heightFt * 12) + heightIn) * 0.0254; // convert to meters
  } else if (heightUnit === 'cm') {
    const heightCm = parseFloat(document.getElementById('heightCm').value);
    heightInMeters = heightCm / 100; // convert to meters
  } else if (heightUnit === 'm') {
    heightInMeters = parseFloat(document.getElementById('heightM').value);
  }

  const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);
  document.getElementById('bmiValue').textContent = bmi;

  // Categorize BMI
  const categories = {
    Underweight: bmi < 18.5,
    Normal: bmi >= 18.5 && bmi < 25,
    Overweight: bmi >= 25 && bmi < 30,
    Obesity: bmi >= 30
  };

  let healthCategory = Object.keys(categories).find(key => categories[key]);
  let recommendation = {
    Underweight: "Increase your calorie intake for a healthy weight.",
    Normal: "Your weight is within a healthy range. Keep it up!",
    Overweight: "Try a balanced diet and regular exercise.",
    Obesity: "Consult a healthcare professional for a weight plan."
  };

  // Update BMI category and recommendation
  document.querySelectorAll('.bmi-categories span').forEach(span => {
    span.classList.remove('active');
  });

  document.getElementById(healthCategory.toLowerCase()).classList.add('active');
  document.getElementById('recommendation').textContent = recommendation[healthCategory];

  // Show warning for red categories
  if (healthCategory === "Underweight" || healthCategory === "Overweight" || healthCategory === "Obesity") {
    document.getElementById('recommendation').style.color = "red";
  } else {
    document.getElementById('recommendation').style.color = "#4caf50";
  }
});
