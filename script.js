async function fetchVehicle() {
    const plate = document.getElementById("plateInput").value.toUpperCase().trim();

    const apiUrl = "https://raw.githubusercontent.com/salman-design22/hsrp-qr-system/main/vehicle-data.json";
    
    const res = await fetch(apiUrl);
    const data = await res.json();

    if(data[plate]){

        document.getElementById("resultBox").innerHTML = `
            <p><b>Vehicle:</b> ${plate}</p>
            <p><b>Owner:</b> ${data[plate].owner}</p>
            <p><b>Model:</b> ${data[plate].model}</p>
            <p><b>Chassis:</b> ${data[plate].chassis}</p>
            <p><b>Engine:</b> ${data[plate].engine}</p>
            <p><b>Amount:</b> ₹ ${data[plate].amount}</p>
        `;

        document.getElementById("qrContainer").innerHTML = `
            <img src="qr-images/${plate}.png" style="width:200px;height:200px;">
        `;

    } else {
        document.getElementById("resultBox").innerHTML = `<p style="color:red;">❌ Vehicle not found!</p>`;
        document.getElementById("qrContainer").innerHTML = `QR WILL APPEAR HERE`;
    }
}
