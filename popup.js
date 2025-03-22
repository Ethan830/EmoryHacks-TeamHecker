
document.getElementById("testButton").onclick = function () {
    window.open("https://enchroma.com/pages/color-blindness-test", "_blank");
};
document.querySelectorAll('.colorblind-checkbox').forEach((checkbox) => {
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            document.querySelectorAll('.colorblind-checkbox').forEach((cb) => {
                if (cb !== this) cb.checked = false; // Uncheck others
            });
        }
    });
});
