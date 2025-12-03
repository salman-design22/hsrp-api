document.addEventListener("DOMContentLoaded", () => {

  const states = [
    "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat",
    "Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra",
    "Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu",
    "Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal","Andaman & Nicobar Islands",
    "Chandigarh","Dadra & Nagar Haveli & Daman & Diu","Delhi","Jammu & Kashmir","Ladakh","Lakshadweep","Puducherry"
  ];

  const stateSel = document.getElementById("state");
  stateSel.innerHTML = '<option value="">Select State / UT</option>';
  states.forEach(s => {
    const o = document.createElement("option");
    o.value = s;
    o.textContent = s;
    stateSel.appendChild(o);
  });

  let current = 1;
  function show(step) {
    document.querySelectorAll(".form-panel").forEach(p => p.style.display = "none");
    document.getElementById("form" + step).style.display = "block";
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    document.querySelector(`.tab[data-step="${step}"]`).classList.add("active");
    current = step;
  }
  show(1);

  document.getElementById("nextToPersonal").onclick = () => show(2);
  document.getElementById("backToVehicle").onclick = () => show(1);
  document.getElementById("backToPersonal").onclick = () => show(2);

  document.getElementById("toPreview").onclick = () => {
    // simple validation
    if (!stateSel.value) { alert("Select state"); return; }
    const reg = document.getElementById("regNumber").value.trim();
    if (!reg) { alert("Enter reg no"); return; }
    const ch = document.getElementById("chassisNumber").value.trim();
    if (ch.length !== 5) { alert("Enter last 5 digits of chassis"); return; }
    const en = document.getElementById("engineNumber").value.trim();
    if (en.length !== 5) { alert("Enter last 5 digits of engine"); return; }
    const vt = document.getElementById("vehicleType").value;
    if (!vt) { alert("Select vehicle type"); return; }

    const nm = document.getElementById("name").value.trim();
    const ph = document.getElementById("phone").value.trim();
    const em = document.getElementById("email").value.trim();
    const ad = document.getElementById("address").value.trim();
    if (!nm || !ph || !em || !ad) { alert("Fill all personal fields"); return; }

    let summary = `
      <p><b>State/UT:</b> ${stateSel.value}</p>
      <p><b>Registration No:</b> ${reg}</p>
      <p><b>Chassis (last 5):</b> ${ch}</p>
      <p><b>Engine (last 5):</b> ${en}</p>
      <p><b>Vehicle Type:</b> ${vt}</p>
      <hr>
      <p><b>Name:</b> ${nm}</p>
      <p><b>Phone:</b> ${ph}</p>
      <p><b>Email:</b> ${em}</p>
      <p><b>Address:</b> ${ad}</p>
    `;
    document.getElementById("summary").innerHTML = summary;
    show(3);
  };

  document.getElementById("toPayment").onclick = () => show(4);
  document.getElementById("backToPreview").onclick = () => show(3);

  document.getElementById("submitPay").onclick = () => {
    // Just simulate success
    alert("Payment screenshot submitted — booking confirmed");
    show(5);
  };

});
