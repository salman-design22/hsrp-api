document.addEventListener("DOMContentLoaded", () => {

  const stateSelect = document.getElementById("stateSelect");
  const indianStates = [
    "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh",
    "Delhi","Goa","Gujarat","Haryana","Himachal Pradesh","Jammu & Kashmir",
    "Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra",
    "Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab",
    "Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura",
    "Uttar Pradesh","Uttarakhand","West Bengal","Andaman & Nicobar",
    "Chandigarh","Dadra & Nagar Haveli","Daman & Diu","Ladakh","Lakshadweep","Puducherry"
  ];
  indianStates.forEach(s => stateSelect.innerHTML += `<option>${s}</option>`);

  const s1 = document.getElementById("form1");
  const s2 = document.getElementById("form2");
  const s3 = document.getElementById("form3");
  const s4 = document.getElementById("form4");
  const thanks = document.getElementById("thankyou");

  document.getElementById("toPersonal").onclick = () => { s1.style.display="none"; s2.style.display="block"; };
  document.getElementById("backToVehicle").onclick = () => { s2.style.display="none"; s1.style.display="block"; };

  document.getElementById("toPreview").onclick = () => { 
    s2.style.display="none"; 
    s3.style.display="block";
    document.getElementById("summaryTable").innerHTML = "Details verified ✔";
  };
  document.getElementById("backToPersonal").onclick = () => { s3.style.display="none"; s2.style.display="block"; };

  document.getElementById("proceedToPayment").onclick = () => { s3.style.display="none"; s4.style.display="block"; };
  document.getElementById("backToPreview").onclick = () => { s4.style.display="none"; s3.style.display="block"; };

  document.getElementById("submitScreenshot").onclick = () => {
    s4.style.display = "none";
    thanks.style.display = "block";
  };
});
