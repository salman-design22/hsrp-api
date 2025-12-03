// =======================
// State / UT List
// =======================
const states = [
"Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa",
"Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala",
"Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland",
"Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura",
"Uttar Pradesh","Uttarakhand","West Bengal","Andaman & Nicobar Islands",
"Chandigarh","Dadra & Nagar Haveli and Daman & Diu","Delhi","Jammu & Kashmir",
"Ladakh","Lakshadweep","Puducherry"
];

const ST = document.getElementById("stateSelect");
ST.innerHTML = `<option value="">Select State / UT</option>`;
states.forEach(s => ST.innerHTML += `<option>${s}</option>`);


// =======================
// STEP NAVIGATION
// =======================
function showStep(stepNum) {
  document.querySelectorAll(".panel").forEach(el => el.style.display = "none");
  document.getElementById("form" + stepNum).style.display = "block";
  document.querySelectorAll(".step").forEach(el => el.classList.remove("active"));
  document.querySelector(`.step[data-step="${stepNum}"]`).classList.add("active");
}

// Buttons

document.getElementById("toPersonal").onclick = () => showStep(2);
document.getElementById("backToVehicle").onclick = () => showStep(1);
document.getElementById("backToPersonal").onclick = () => showStep(2);
document.getElementById("backToPreview").onclick = () => showStep(3);
document.getElementById("toPreview").onclick = () => {
  createSummary();
  showStep(3);
};
document.getElementById("proceedToPayment").onclick = () => showStep(4);


// =======================
// PREVIEW PAGE SUMMARY
// =======================
function createSummary() {
  document.getElementById("summaryTable").innerHTML = `
    <b>State:</b> ${ST.value}<br>
    <b>Registration No.:</b> ${regNumber.value}<br>
    <b>Chassis Last 5:</b> ${chassisNumber.value}<br>
    <b>Engine Last 5:</b> ${engineNumber.value}<br>
    <b>Vehicle Type:</b> ${vehicleType.value}<br><br>
    <b>Name:</b> ${name.value}<br>
    <b>Phone:</b> ${phone.value}<br>
    <b>Email:</b> ${email.value}<br>
    <b>Address:</b> ${address.value}<br>
  `;
}
