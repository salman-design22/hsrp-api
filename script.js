document.getElementById('searchBtn').addEventListener('click', function () {
    const reg = document.getElementById('regInput').value.trim().toUpperCase();

    if (!reg) {
        alert("Please enter a registration number.");
        return;
    }

    fetch('vehicle-data.json')
        .then(response => response.json())
        .then(data => {
            const vehicle = data[reg];

            if (vehicle) {
                document.getElementById('owner').innerText = vehicle.owner || "NA";
                document.getElementById('model').innerText = vehicle.model || "NA";
                
                // QR from JSON
                document.getElementById('qrContainer').innerHTML =
                    `<img src="${vehicle.qr || data.defaultQR}" style="max-width:220px;max-height:220px">`;

            } else {
                document.getElementById('owner').innerText = "Not Found";
                document.getElementById('model').innerText = "Not Found";

                // default QR
                document.getElementById('qrContainer').innerHTML =
                    `<img src="${data.defaultQR}" style="max-width:220px;max-height:220px">`;
            }
        })
        .catch(error => {
            console.error('Error fetching vehicle data:', error);
            alert("Error fetching data.");
        });
});
// Chassis & Engine last 5 digits only
function enforceLast5Digits(inputId) {
    const input = document.getElementById(inputId);

    input.addEventListener("input", function () {
        // remove non-digits
        this.value = this.value.replace(/\D/g, "");

        // keep only last 5 digits
        if (this.value.length > 5) {
            this.value = this.value.slice(-5);
        }
    });
}

enforceLast5Digits("chassisInput");
enforceLast5Digits("engineInput");
