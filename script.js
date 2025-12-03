// ---------------- TAB SWITCHING ----------------
document.querySelectorAll(".tab-link").forEach((tab) => {
    tab.addEventListener("click", function () {
        document.querySelectorAll(".tab-link").forEach(t => t.classList.remove("active"));
        this.classList.add("active");

        document.querySelectorAll(".tab-content").forEach(c => c.style.display = "none");
        document.getElementById(this.dataset.tab).style.display = "block";
    });
});

// ---------------- STATE / UTS DROPDOWN ----------------
const allStates = [
    "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat",
    "Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh",
    "Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab",
    "Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand",
    "West Bengal",
    "Delhi (UT)","Jammu and Kashmir (UT)","Ladakh (UT)",
    "Chandigarh (UT)","Puducherry (UT)","Andaman & Nicobar (UT)","Lakshadweep (UT)",
    "Dadra & Nagar Haveli & Daman & Diu (UT)"
];

const stateSelect = document.getElementById("state");
allStates.forEach(st => {
    let opt = document.createElement("option");
    opt.value = st;
    opt.textContent = st;
    stateSelect.appendChild(opt);
});

// ---------------- CHASSIS / ENGINE LAST-5 VALIDATION ----------------
function validateFiveDigitInput(inputField) {
    inputField.addEventListener("input", function () {
        this.value = this.value.replace(/[^0-9]/g, ""); // only digits
        if (this.value.length > 5) this.value = this.value.slice(0, 5);
    });
}

validateFiveDigitInput(document.getElementById("chassisNumber"));
validateFiveDigitInput(document.getElementById("engineNumber"));

// ---------------- SHOW PREVIEW DATA ----------------
document.getElementById("toPreview").addEventListener("click", function () {
    document.getElementById("prevRegNo").innerText = document.getElementById("regNo").value;
    document.getElementById("prevVehType").innerText = document.getElementById("vehType").value;
    document.getElementById("prevFuel").innerText = document.getElementById("fuelType").value;
    document.getElementById("prevState").innerText = document.getElementById("state").value;
    document.getElementById("prevChassis").innerText = document.getElementById("chassisNumber").value;
    document.getElementById("prevEngine").innerText = document.getElementById("engineNumber").value;

    document.querySelector(".tab-link[data-tab='preview']").click();
});

// ---------------- DUMMY PAYMENT ----------------
document.getElementById("payBtn").addEventListener("click", function () {
    alert("Payment gateway coming soon...");
});

// ---------------- INITIAL LOAD ----------------
document.querySelector(".tab-content").style.display = "block";
console.log("✔ script.js loaded successfully — no errors");
