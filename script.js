document.addEventListener("DOMContentLoaded", function () {
    console.log("Page Loaded — Initializing form");

    const stateSelect = document.getElementById("state");
    const vehicleTypeSelect = document.getElementById("vehicleType");

    // 🔥 STATIC — ultrafast — NO API — NO delay
    const stateList = [
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
        "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
        "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
        "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
        "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
        "Uttar Pradesh", "Uttarakhand", "West Bengal",
        "Andaman & Nicobar Islands", "Chandigarh", "Dadra & Nagar Haveli & Daman & Diu",
        "Delhi", "Jammu & Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
    ];

    const vehicleTypes = [
        "Two Wheeler",
        "Three Wheeler",
        "Four Wheeler",
        "Commercial Light Vehicle",
        "Commercial Heavy Vehicle",
        "Tractor",
        "Trailer"
    ];

    // 🟦 Insert state options
    stateSelect.innerHTML = `<option value="">Select State / UT</option>`;
    stateList.forEach(state => {
        let opt = document.createElement("option");
        opt.value = state;
        opt.textContent = state;
        stateSelect.appendChild(opt);
    });

    // 🟨 Insert vehicle type options
    vehicleTypeSelect.innerHTML = `<option value="">Select Vehicle Type</option>`;
    vehicleTypes.forEach(type => {
        let opt = document.createElement("option");
        opt.value = type;
        opt.textContent = type;
        vehicleTypeSelect.appendChild(opt);
    });

    console.log("State + Vehicle dropdowns loaded successfully");
});
