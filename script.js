// For the compressor page, simulate file compression.
document.addEventListener('DOMContentLoaded', function() {
  const compressForm = document.getElementById('compressForm');
  if (compressForm) {
    compressForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const fileInput = document.getElementById('fileInput');
      const resultDiv = document.getElementById('result');
      const files = fileInput.files;
      if (files.length === 0) {
        resultDiv.textContent = "Please select a file to compress.";
        return;
      }
      resultDiv.textContent = "Compressing file(s)...";
      // Simulate a compression delay
      setTimeout(() => {
        resultDiv.textContent = "File(s) compressed successfully!";
      }, 2000);
    });
  }
});
