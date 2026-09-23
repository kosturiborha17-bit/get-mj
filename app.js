console.log("GET MJ SYSTEMS Online. Get MJ loaded.");

document.getElementById('download-btn')?.addEventListener('click', () => {
    alert("Downloading MJ APK v1.0.4 from GET MJ SYSTEMS secure servers...");
});

document.getElementById('buy-btn')?.addEventListener('click', () => {
    alert("Redirecting to secure checkout for MJ Pro ($29)...");
});

document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
        console.log("Action triggered: " + btn.innerText);
    });
});
