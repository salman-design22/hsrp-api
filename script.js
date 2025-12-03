// script.js - frontend only multi-step flow + validation + local "upload" simulation

// STATES list (India + UT) - minimal example; add more if you want
const STATES = ["Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa",
  "Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh",
  "Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan",
  "Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal",
  "Delhi","Puducherry","Chandigarh","Jammu & Kashmir","Ladakh"];

// fill state dropdown
const sbox = document.getElementById('stateSelect');
sbox.innerHTML = '<option value="">Select State / UT</option>' + STATES.map(s=>`<option>${s}</option>`).join('');

// helpers: go to step
function showStep(n){
  document.querySelectorAll('.form-panel, #thankyou').forEach(el=>el.style.display='none');
  document.querySelectorAll('.step').forEach(el=>el.classList.remove('active'));
  document.querySelector(`.step[data-step="${n}"]`).classList.add('active');
  if(n<=3) document.getElementById(`form${n}`).style.display='block';
  else if(n===4) document.getElementById('form4').style.display='block';
}

// validation regexes
const regRegex = /^[A-Z]{2}\d{1,2}[A-Z]{1,2}\d{1,4}$/i; // common Indian style (loose)
const chassisEngineRegex = /^[A-Z0-9]{5}\d{5}$/i; // XXXXX12345 -> first 5 alnum then 5 digits
const phoneRegex = /^\d{10}$/;

// navigation buttons
document.getElementById('toPersonal').addEventListener('click', ()=>{
  const state = sbox.value.trim();
  const reg = document.getElementById('regNumber').value.trim();
  const ch = document.getElementById('chassisNumber').value.trim();
  const en = document.getElementById('engineNumber').value.trim();
  const vt = document.getElementById('vehicleType').value;

  if(!state){ return alert('Please select State/UT'); }
  if(!reg){ return alert('Please enter Registration number'); }
  if(!regRegex.test(reg)){ return alert('Registration number format seems invalid. Example: MH12AB1234'); }
  if(!ch || !chassisEngineRegex.test(ch)){ return alert('Chassis number must match pattern: 5 characters followed by 5 digits (e.g. ABCD112345)'); }
  if(!en || !chassisEngineRegex.test(en)){ return alert('Engine number must match pattern: 5 characters followed by 5 digits'); }
  if(!vt){ return alert('Please select Vehicle Type'); }

  showStep(2);
});

document.getElementById('backToVehicle').addEventListener('click', ()=> showStep(1));
document.getElementById('backToPersonal').addEventListener('click', ()=> showStep(2));

document.getElementById('toPreview').addEventListener('click', ()=>{
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  const addr = document.getElementById('address').value.trim();

  if(!name) return alert('Name is required');
  if(!phoneRegex.test(phone)) return alert('Enter valid 10 digit phone number');
  if(!email || !/^\S+@\S+\.\S+$/.test(email)) return alert('Enter valid email');
  if(!addr) return alert('Address required');

  // prepare preview
  const summary = {
    State: document.getElementById('stateSelect').value,
    RegNumber: document.getElementById('regNumber').value.toUpperCase(),
    ChassisNumber: document.getElementById('chassisNumber').value,
    EngineNumber: document.getElementById('engineNumber').value,
    VehicleType: document.getElementById('vehicleType').value,
    Name: name,
    Phone: phone,
    Email: email,
    Address: addr,
    OrderId: 'HSRP-' + Date.now()
  };

  // render summary
  const box = document.getElementById('summaryTable');
  let html = '<table style="width:100%">';
  for(const k in summary){
    html += `<tr><td style="width:30%;font-weight:700;padding:8px;border-bottom:1px solid #f0f0f0">${k}</td><td style="padding:8px;border-bottom:1px solid #f0f0f0">${summary[k]}</td></tr>`;
  }
  html += '</table>';
  box.innerHTML = html;

  // save summary to localStorage so payment step can access
  localStorage.setItem('hsrp_preview', JSON.stringify(summary));

  showStep(3);
});

document.getElementById('proceedToPayment').addEventListener('click', ()=>{
  // show payment and QR
  const preview = JSON.parse(localStorage.getItem('hsrp_preview') || '{}');
  // show order id in invoice area (optional)
  showStep(4);
  // Keep placeholder intact; if user wants to replace, they will put image in qr-images folder or use console to set image.
  // But we can also show a sample QR if qr-images/[Reg].png exists
  const reg = preview.RegNumber;
  if(reg){
    // attempt to load qr image from qr-images/<REG>.png (user must have added this file)
    fetch('vehicle-data.json')
  .then(res => res.json())
  .then(data => {
    const qr = data[reg]?.qr || data.defaultQR;
    document.getElementById('qrContainer').innerHTML =
      `<img src="${qr}" style="max-width:220px;max-height:220px">`;
  });
;
  }
});

// screenshot upload (frontend-only)
document.getElementById('submitScreenshot').addEventListener('click', ()=>{
  const fileInput = document.getElementById('screenshotInput');
  if(!fileInput.files || !fileInput.files[0]) return alert('Please select a screenshot image (PNG/JPG).');
  const file = fileInput.files[0];
  if(file.size > 25 * 1024 * 1024) return alert('File too large. Max 25 MB.');
  // simulate upload: read and store as DataURL (localStorage) and mark order as paid
  const reader = new FileReader();
  reader.onload = function(e){
    // store in localStorage (demo purpose only)
    localStorage.setItem('hsrp_payment_screenshot', e.target.result);
    const preview = JSON.parse(localStorage.getItem('hsrp_preview') || '{}');
    preview.paidAt = new Date().toISOString();
    localStorage.setItem('hsrp_preview', JSON.stringify(preview));

    // show thank you panel
    document.getElementById('form4').style.display = 'none';
    document.getElementById('thankyou').style.display = 'block';
    // scroll to top
    window.scrollTo({top:0,behavior:'smooth'});
  };
  reader.readAsDataURL(file);
});

// back from payment
document.getElementById('backToPreview').addEventListener('click', ()=> showStep(3));

// init
showStep(1);
