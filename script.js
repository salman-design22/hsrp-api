/* script.js - template for HSRP frontend-only flow */

// STATES array
const STATES = ["Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa",
  "Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh",
  "Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan",
  "Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal",
  "Delhi","Puducherry","Chandigarh","Jammu & Kashmir","Ladakh"];

// helper to show step
function showStep(n){
  document.querySelectorAll('.panel, #thankyou').forEach(el=>el.style.display='none');
  document.querySelectorAll('.step').forEach(el=>el.classList.remove('active'));
  const stepEl = document.querySelector(`.step[data-step="${n}"]`);
  if(stepEl) stepEl.classList.add('active');

  if(n===1) document.getElementById('form1').style.display='block';
  if(n===2) document.getElementById('form2').style.display='block';
  if(n===3) document.getElementById('form3').style.display='block';
  if(n===4) document.getElementById('form4').style.display='block';
}

// run after DOM ready
document.addEventListener('DOMContentLoaded', ()=>{
  // fill states
  const sbox = document.getElementById('stateSelect');
  sbox.innerHTML = '<option value="">Select State / UT</option>' + STATES.map(s=>`<option value="${s}">${s}</option>`).join('');

  // enforce last-5-digit inputs numeric only
  function enforceFiveDigits(id){
    const el = document.getElementById(id);
    el.addEventListener('input', ()=>{
      el.value = el.value.replace(/\D/g, '').slice(-5);
    });
  }
  enforceFiveDigits('chassisNumber');
  enforceFiveDigits('engineNumber');

  // navigation buttons
  document.getElementById('toPersonal').addEventListener('click', ()=>{
    const state = sbox.value.trim();
    const reg = document.getElementById('regNumber').value.trim();
    const ch = document.getElementById('chassisNumber').value.trim();
    const en = document.getElementById('engineNumber').value.trim();
    const vt = document.getElementById('vehicleType').value;

    const regRegex = /^[A-Z]{2}\d{1,2}[A-Z]{1,2}\d{1,4}$/i;
    if(!state) return alert('Please select State/UT');
    if(!reg || !regRegex.test(reg)) return alert('Please enter valid Registration number (e.g. MH12AB1234)');
    if(ch.length !== 5) return alert('Enter last 5 digits of Chassis');
    if(en.length !== 5) return alert('Enter last 5 digits of Engine');
    if(!vt) return alert('Select Vehicle Type');

    showStep(2);
    window.scrollTo({top:0,behavior:'smooth'});
  });

  document.getElementById('backToVehicle').addEventListener('click', ()=> showStep(1));

  document.getElementById('toPreview').addEventListener('click', ()=>{
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const addr = document.getElementById('address').value.trim();
    if(!name) return alert('Name required');
    if(!/^\d{10}$/.test(phone)) return alert('Enter valid 10 digit phone');
    if(!/^\S+@\S+\.\S+$/.test(email)) return alert('Enter valid email');
    if(!addr) return alert('Address required');

    // build preview
    const summary = {
      State: document.getElementById('stateSelect').value,
      RegNumber: document.getElementById('regNumber').value.trim().toUpperCase(),
      ChassisLast5: document.getElementById('chassisNumber').value.trim(),
      EngineLast5: document.getElementById('engineNumber').value.trim(),
      Vehicle: document.getElementById('vehicleType').value,
      Name: name,
      Phone: phone,
      Email: email,
      Address: addr,
      OrderId: 'HSRP-' + Date.now()
    };

    // render summary table
    let html = '<table style="width:100%">';
    for(const k in summary){
      html += `<tr><td style="width:35%;font-weight:700;padding:8px;border-bottom:1px solid #f3f6fb">${k}</td><td style="padding:8px;border-bottom:1px solid #f3f6fb">${summary[k]}</td></tr>`;
    }
    html += '</table>';
    document.getElementById('summaryTable').innerHTML = html;

    // store preview in localStorage for demo
    localStorage.setItem('hsrp_preview', JSON.stringify(summary));
    showStep(3);
    window.scrollTo({top:0,behavior:'smooth'});
  });

  document.getElementById('backToPersonal').addEventListener('click', ()=> showStep(2));

  document.getElementById('proceedToPayment').addEventListener('click', ()=>{
    const preview = JSON.parse(localStorage.getItem('hsrp_preview') || '{}');
    if(!preview.RegNumber) { alert('Preview missing'); return; }
    showStep(4);
    window.scrollTo({top:0,behavior:'smooth'});

    // load QR from index.html static img element (option A = single postimage link)
    // if you wish, you can set qrImage.src dynamically from vehicle-data.json defaultQR
    // Example:
    // fetch('vehicle-data.json').then(r=>r.json()).then(d=> document.getElementById('qrImage').src = d.defaultQR);
  });

  document.getElementById('backToPreview').addEventListener('click', ()=> showStep(3));

  // screenshot upload (frontend-only demo)
  document.getElementById('submitScreenshot').addEventListener('click', ()=>{
    const f = document.getElementById('screenshotInput').files[0];
    if(!f) return alert('Please select screenshot');
    if(f.size > 25*1024*1024) return alert('File too large');
    const reader = new FileReader();
    reader.onload = ()=> {
      let preview = JSON.parse(localStorage.getItem('hsrp_preview') || '{}');
      preview.paidAt = new Date().toISOString();
      preview.screenshot = reader.result; // store base64 for demo only
      localStorage.setItem('hsrp_preview', JSON.stringify(preview));
      showStep(5); // show thankyou
      document.getElementById('thankyou').style.display='block';
      window.scrollTo({top:0,behavior:'smooth'});
    };
    reader.readAsDataURL(f);
  });

  // Initialize on load
  showStep(1);
});
