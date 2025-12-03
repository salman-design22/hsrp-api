// STATE LIST
const STATES = ["Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa",
  "Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh",
  "Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan",
  "Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal",
  "Delhi","Puducherry","Chandigarh","Jammu & Kashmir","Ladakh"];

// FILL STATES
document.addEventListener("DOMContentLoaded", () => {
  const sbox = document.getElementById('stateSelect');
  sbox.innerHTML = '<option value="">Select State / UT</option>' +
    STATES.map(s => `<option>${s}</option>`).join('');
});

// STEP SWITCH
function showStep(n){
  document.querySelectorAll('.form-panel, #thankyou').forEach(el=>el.style.display='none');
  document.querySelectorAll('.step').forEach(el=>el.classList.remove('active'));
  document.querySelector(`.step[data-step="${n}"]`).classList.add('active');
  if(n<=4) document.getElementById(`form${n}`).style.display='block';
}

// VALIDATION ONLY 5 DIGITS
const fiveDigitRegex = /^[0-9]{5}$/;
const phoneRegex = /^\d{10}$/;
const regRegex = /^[A-Z]{2}\d{1,2}[A-Z]{1,2}\d{1,4}$/i;

// STEP 1 → STEP 2
document.getElementById('toPersonal').addEventListener('click', ()=>{
  const state = stateSelect.value.trim();
  const reg = regNumber.value.trim();
  const ch = chassisNumber.value.trim();
  const en = engineNumber.value.trim();
  const vt = vehicleType.value;

  if(!state) return alert('Please select State/UT');
  if(!regRegex.test(reg)) return alert('Enter valid Registration number');
  if(!fiveDigitRegex.test(ch)) return alert('Enter LAST 5 digits of Chassis');
  if(!fiveDigitRegex.test(en)) return alert('Enter LAST 5 digits of Engine');
  if(!vt) return alert('Choose Vehicle Type');

  showStep(2);
});

// STEP 2 → STEP 3
document.getElementById('toPreview').addEventListener('click', ()=>{
  const name = nameInput.value.trim();
  const phone = phone.value.trim();
  const email = email.value.trim();
  const addr = address.value.trim();

  if(!name) return alert('Name is required');
  if(!phoneRegex.test(phone)) return alert('Enter valid 10 digit phone');
  if(!email.includes('@')) return alert('Enter valid email');
  if(!addr) return alert('Address required');

  const summary = {
    State: stateSelect.value,
    RegNumber: regNumber.value.trim().toUpperCase(),
    ChassisLast5: chassisNumber.value.trim(),
    EngineLast5: engineNumber.value.trim(),
    Vehicle: vehicleType.value,
    Name: name,
    Phone: phone,
    Email: email,
    Address: addr,
    OrderId: 'HSRP-' + Date.now()
  };

  // TABLE BUILD
  let html = '<table>';
  for(const k in summary){
    html += `<tr><td><b>${k}</b></td><td>${summary[k]}</td></tr>`;
  }
  html += '</table>';
  summaryTable.innerHTML = html;

  localStorage.setItem('hsrp_preview', JSON.stringify(summary));

  showStep(3);
});

// STEP 3 → STEP 4
document.getElementById('proceedToPayment').addEventListener('click', ()=>{
  const preview = JSON.parse(localStorage.getItem('hsrp_preview') || '{}');
  const reg = preview.RegNumber;

  showStep(4);

  if(!reg) return;

  // try custom QR
  const test = new Image();
  test.src = `qr-images/${reg}.png`;
  test.onload = ()=>{
    qrContainer.innerHTML = `<img src="${test.src}" style="max-width:220px">`;
  };
});

// PAYMENT SCREENSHOT
document.getElementById('submitScreenshot').addEventListener('click', ()=>{
  const file = screenshotInput.files[0];
  if(!file) return alert('Select Screenshot');

  const reader = new FileReader();
  reader.onload = ()=>{
    const preview = JSON.parse(localStorage.getItem('hsrp_preview') || '{}');
    preview.paid = true;
    preview.paymentProof = reader.result;
    localStorage.setItem('hsrp_preview', JSON.stringify(preview));

    form4.style.display = 'none';
    thankyou.style.display = 'bloc
