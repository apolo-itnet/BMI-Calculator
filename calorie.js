  // Set default gender to Male
  document.querySelector('.gender-btn[data-value="male"]').classList.add("bg-green-600", "text-white");

  // Set default height unit to Feet/Inch
  toggleHeightInputs("feet");

  // Height Input Toggle Function
  function toggleHeightInputs(unit) {
    document.querySelectorAll(".height-btn").forEach((btn) => btn.classList.remove("bg-green-600", "text-white"));
    document.querySelector(`[data-unit="${unit}"]`).classList.add("bg-green-600", "text-white");

    document.getElementById("heightFt").closest(".relative").classList.add("hidden");
    document.getElementById("heightIn").closest(".relative").classList.add("hidden");
    document.getElementById("heightCm").closest(".relative").classList.add("hidden");
    document.getElementById("heightM").closest(".relative").classList.add("hidden");

    if (unit === "feet") {
      document.getElementById("heightFt").closest(".relative").classList.remove("hidden");
      document.getElementById("heightIn").closest(".relative").classList.remove("hidden");
    } else if (unit === "cm") {
      document.getElementById("heightCm").closest(".relative").classList.remove("hidden");
    } else if (unit === "meter") {
      document.getElementById("heightM").closest(".relative").classList.remove("hidden");
    }
  }

  // Function to calculate standard height for children based on age
  function getStandardHeightForChild(age) {
    const regionFactor = parseFloat(document.getElementById("region").value);
  
    const standardHeightByRegion = {
      1: { // Africa
        2: 84, 3: 94, 4: 101, 5: 107, 6: 113, 7: 119, 8: 125, 9: 131, 10: 137, 11: 143, 12: 149, 13: 156
      },
      2: { // Asia
        2: 82, 3: 92, 4: 99, 5: 105, 6: 111, 7: 117, 8: 123, 9: 129, 10: 135, 11: 141, 12: 147, 13: 154
      },
      3: { // Australia
        2: 85, 3: 95, 4: 102, 5: 108, 6: 114, 7: 120, 8: 126, 9: 132, 10: 138, 11: 144, 12: 150, 13: 157
      },
      4: { // Europe
        2: 86, 3: 96, 4: 103, 5: 109, 6: 115, 7: 121, 8: 127, 9: 133, 10: 139, 11: 145, 12: 151, 13: 158
      },
      5: { // Middle East
        2: 83, 3: 93, 4: 100, 5: 106, 6: 112, 7: 118, 8: 124, 9: 130, 10: 136, 11: 142, 12: 148, 13: 155
      },
      6: { // North America
        2: 86, 3: 96, 4: 103, 5: 109, 6: 115, 7: 121, 8: 127, 9: 133, 10: 139, 11: 145, 12: 151, 13: 158
      },
      7: { // South America
        2: 84, 3: 94, 4: 101, 5: 107, 6: 113, 7: 119, 8: 125, 9: 131, 10: 137, 11: 143, 12: 149, 13: 156
      }
    };
  
    const selectedRegion = standardHeightByRegion[regionFactor] || standardHeightByRegion[4]; // ডিফল্ট Europe
    return selectedRegion[age] || null;
  }

  // Function to show error messages with red borders
  function showError(inputElement, message) {
    inputElement.classList.add("border-red-500");
    const errorElement = document.createElement("p");
    errorElement.className = "text-red-500 text-sm mt-1";
    errorElement.textContent = message;
    inputElement.closest(".space-y-2").appendChild(errorElement);
  }

  // Function to clear all errors
  function clearErrors() {
    document.querySelectorAll(".border-red-500").forEach((el) => el.classList.remove("border-red-500"));
    document.querySelectorAll(".text-red-500").forEach((el) => el.remove());
  }

  // Function to validate input fields
  function validateInputs() {
    clearErrors();
  
    const age = parseInt(document.getElementById("age").value);
    const weight = parseFloat(document.getElementById("weight").value);
    const gender = document.querySelector(".gender-btn.bg-green-600")?.dataset.value;
    const activityLevel = parseFloat(document.getElementById("activityLevel").value);
    const regionFactor = parseFloat(document.getElementById("region").value);
  
    let height;
    if (document.querySelector("[data-unit='feet']").classList.contains("bg-green-600")) {
      const feet = parseFloat(document.getElementById("heightFt").value);
      const inches = parseFloat(document.getElementById("heightIn").value);
      if (isNaN(feet) || isNaN(inches) || feet < 0 || inches < 0) {
        showError(document.getElementById("heightFt"), "Height cannot be negative or empty.");
        return false;
      }
      height = feet * 30.48 + inches * 2.54;
    } else if (document.querySelector("[data-unit='cm']").classList.contains("bg-green-600")) {
      height = parseFloat(document.getElementById("heightCm").value);
      if (isNaN(height) || height < 0) {
        showError(document.getElementById("heightCm"), "Height cannot be negative or empty.");
        return false;
      }
    } else if (document.querySelector("[data-unit='meter']").classList.contains("bg-green-600")) {
      height = parseFloat(document.getElementById("heightM").value) * 100;
      if (isNaN(height) || height < 0) {
        showError(document.getElementById("heightM"), "Height cannot be negative or empty.");
        return false;
      }
    }
  
    let isValid = true;
  
    // বয়স: ২-১২০
    if (!age || age < 2 || age > 120) {
      showError(document.getElementById("age"), "Please enter a valid age (2-120 years).");
      isValid = false;
    }
  
    // ওজন: ২.৫-৭০০ কেজি
    if (!weight || weight < 2.5 || weight > 700) {
      showError(document.getElementById("weight"), "Please enter a valid weight (2.5-700 kg).");
      isValid = false;
    }
  
    // উচ্চতা: ৪৯-৩০০ সেমি
    if (height < 49 || height > 300) {
      showError(document.getElementById("heightCm"), "Height must be between 49-300 cm.");
      isValid = false;
    }
  
    // জেন্ডার, অ্যাক্টিভিটি লেভেল, রিজিয়ন চেক
    if (!gender) {
      showError(document.querySelector(".gender-btn"), "Please select a gender.");
      isValid = false;
    }
    if (!activityLevel) {
      showError(document.getElementById("activityLevel"), "Please select an activity level.");
      isValid = false;
    }
    if (!regionFactor) {
      showError(document.getElementById("region"), "Please select a region.");
      isValid = false;
    }
  
    // শিশুদের জন্য চেক
    if (gender === "child") {
      const standardHeight = getStandardHeightForChild(age);
      if (standardHeight === null) {
        showError(document.getElementById("age"), "Please enter a valid age for a child (2-13 years).");
        isValid = false;
      } else if (height) {
        const heightDifference = Math.abs(standardHeight - height);
        if (heightDifference > 15) {
          showError(
            document.getElementById("heightCm"),
            `Height seems unusual for a ${age}-year-old child. Expected around ${standardHeight} cm.`
          );
          isValid = false;
        }
      }
    }
  
    return isValid;
  }

  // Calorie Calculation Logic
  document.getElementById("calculateBtn").addEventListener("click", function () {
    if (!validateInputs()) {
      return; // Stop calculation if any field is invalid
    }

    const age = parseInt(document.getElementById("age").value);
    const weight = parseFloat(document.getElementById("weight").value);
    const gender = document.querySelector(".gender-btn.bg-green-600")?.dataset.value;
    const activityLevel = parseFloat(document.getElementById("activityLevel").value);
    const regionFactor = parseFloat(document.getElementById("region").value);

    // Validate height based on selected unit
    let height;
    if (document.querySelector("[data-unit='feet']").classList.contains("bg-green-600")) {
      const feet = parseFloat(document.getElementById("heightFt").value);
      const inches = parseFloat(document.getElementById("heightIn").value);
      if (isNaN(feet) || isNaN(inches)) {
        showError(document.getElementById("heightFt"), "Please fill all height fields.");
        return;
      }
      height = feet * 30.48 + inches * 2.54; // Convert feet and inches to cm
    } else if (document.querySelector("[data-unit='cm']").classList.contains("bg-green-600")) {
      height = parseFloat(document.getElementById("heightCm").value);
      if (isNaN(height)) {
        showError(document.getElementById("heightCm"), "Please enter a valid height.");
        return;
      }
    } else if (document.querySelector("[data-unit='meter']").classList.contains("bg-green-600")) {
      height = parseFloat(document.getElementById("heightM").value) * 100; // Convert meters to cm
      if (isNaN(height)) {
        showError(document.getElementById("heightM"), "Please enter a valid height.");
        return;
      }
    } else {
      showError(document.querySelector(".height-btn"), "Please select a height unit and fill the fields.");
      return;
    }

    // Validate age for child (under 14)
    if (gender === "child" && age >= 14) {
      showError(document.getElementById("age"), "Child option is only for ages under 14. Please select a different gender.");
      return;
    }

    // For children, use standard height based on age
    if (gender === "child") {
      const standardHeight = getStandardHeightForChild(age);
      if (standardHeight === null) {
        showError(document.getElementById("age"), "Please enter a valid age for a child (1-13 years).");
        return;
      }
      height = standardHeight; // Use standard height for children
    }

    // Mifflin-St Jeor Formula for BMR
    let bmr;
    if (gender === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else if (gender === "female") {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    } else if (gender === "child") {
      bmr = 22.5 * weight + 499;
    }

    // Calculate TDEE with region factor
    const tdee = Math.round(bmr * activityLevel * regionFactor);
    document.getElementById("calorieValue").textContent = tdee;

    // Weight Loss/Gain Targets
    const weightLossTarget = tdee - 500;
    const weightGainTarget = tdee + 500;
    document.getElementById("weightLossTarget").textContent = weightLossTarget;
    document.getElementById("weightGainTarget").textContent = weightGainTarget;

    // Macronutrient Distribution (Carbs: 50%, Fats: 30%, Proteins: 20%)
    const carbs = Math.round(tdee * 0.5);
    const fats = Math.round(tdee * 0.3);
    const proteins = Math.round(tdee * 0.2);

    document.getElementById("carbsValue").textContent = carbs;
    document.getElementById("fatsValue").textContent = fats;
    document.getElementById("proteinsValue").textContent = proteins;

    // Pie Chart Data
    const ctx = document.getElementById("calorieChart").getContext("2d");

    // Destroy existing chart instance if it exists
    if (window.myChart) {
      window.myChart.destroy();
    }

    // Create new chart instance
    window.myChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Carbs", "Fats", "Proteins"],
        datasets: [
          {
            data: [carbs, fats, proteins],
            backgroundColor: ["#3b82f6", "#ef4444", "#eab308"],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // Prevent chart from resizing
      },
    });

    // Dynamic Recommendations
    let recommendationText = "";
    if (gender === "male") {
      recommendationText = `
        <strong>For Men:</strong> Aim for a balanced diet with lean proteins, whole grains, and plenty of vegetables. Regular exercise is key.<br />
        <strong>Weight Loss:</strong> Focus on cardio exercises like running, cycling, or swimming for 30-60 minutes daily.<br />
        <strong>Weight Gain:</strong> Eat calorie-dense foods like bananas, avocados, nuts, and whole-grain bread.
      `;
    } else if (gender === "female") {
      recommendationText = `
        <strong>For Women:</strong> Focus on iron-rich foods, calcium, and healthy fats. Include fruits, vegetables, and whole grains in your diet.<br />
        <strong>Weight Loss:</strong> Try yoga, pilates, or brisk walking for 30-60 minutes daily.<br />
        <strong>Weight Gain:</strong> Include foods like sweet potatoes, quinoa, and dairy products in your diet.
      `;
    } else if (gender === "child") {
      recommendationText = `
        <strong>For Children:</strong> Ensure a diet rich in calcium, protein, and vitamins. Include dairy, fruits, and vegetables for growth.<br />
        <strong>Weight Loss:</strong> Encourage outdoor play and activities like swimming or cycling.<br />
        <strong>Weight Gain:</strong> Add healthy snacks like peanut butter, cheese, and dried fruits to their diet.
      `;
    }
    document.getElementById("recommendationText").innerHTML = recommendationText;
  });

  // Clear Button
  document.getElementById("clearBtn").addEventListener("click", function () {
    // ফর্ম রিসেট করা
    document.getElementById("calorieForm").reset();
  
    // টেক্সট ফিল্ডগুলো রিসেট করা
    document.getElementById("calorieValue").textContent = "-";
    document.getElementById("weightLossTarget").textContent = "-";
    document.getElementById("weightGainTarget").textContent = "-";
    document.getElementById("recommendationText").textContent = "Enter your details to calculate calories.";
    document.getElementById("carbsValue").textContent = "-";
    document.getElementById("fatsValue").textContent = "-";
    document.getElementById("proteinsValue").textContent = "-";
  
    // চার্ট পুরোপুরি ক্লিয়ার করা
    const ctx = document.getElementById("calorieChart").getContext("2d");
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    if (window.myChart) {
      window.myChart.destroy();
    }
    window.myChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Carbs", "Fats", "Proteins"],
        datasets: [
          {
            data: [0, 0, 0],
            backgroundColor: ["#3b82f6", "#ef4444", "#eab308"],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  
    // জেন্ডার বাটন রিসেট করা: সব বাটন থেকে স্টাইল রিমুভ করে শুধু "Male" একটিভ করা
    document.querySelectorAll(".gender-btn").forEach((btn) => {
      btn.classList.remove("bg-green-600", "text-white");
    });
    document.querySelector('.gender-btn[data-value="male"]').classList.add("bg-green-600", "text-white");
  
    // হাইট ইউনিট ফিটে রিসেট করা
    toggleHeightInputs("feet");
  
    // সব এরর মেসেজ ক্লিয়ার করা
    clearErrors();
  });

  // Gender Button Toggle
  document.querySelectorAll(".gender-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".gender-btn").forEach((b) => b.classList.remove("bg-green-600", "text-white"));
      btn.classList.add("bg-green-600", "text-white");

      // Clear errors when switching gender
      clearErrors();
    });
  });


  // পেজ লোড হলে ইউজারের লোকেশন পাওয়া
  window.onload = function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        // সিম্পল লজিক: ল্যাটিটিউড-লংগিটিউড দিয়ে রিজিয়ন নির্ধারণ
        let defaultRegion;
        if (lat > 0 && lon > -30 && lon < 60) { // Europe
          defaultRegion = "4";
        } else if (lat > 0 && lon < -60) { // North America
          defaultRegion = "6";
        } else if (lat < 0 && lon < -30) { // South America
          defaultRegion = "7";
        } else if (lat < 20 && lon > 20 && lon < 60) { // Middle East
          defaultRegion = "5";
        } else if (lat < 0 && lon > 110) { // Australia
          defaultRegion = "3";
        } else if (lat < 20 && lon > -20 && lon < 50) { // Africa
          defaultRegion = "1";
        } else { // Asia (বাকি)
          defaultRegion = "2";
        }
        document.getElementById("region").value = defaultRegion;
      },
      function () {
        document.getElementById("region").value = "4"; // এরর হলে Europe ডিফল্ট
      }
    );
  } else {
    document.getElementById("region").value = "4"; // Geolocation না থাকলে Europe
  }
  };