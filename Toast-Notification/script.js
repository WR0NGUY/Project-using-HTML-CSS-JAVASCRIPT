// Function to show the toast notification
function showToast() {
    var toast = document.getElementById('toast');
    
    // Show the toast
    toast.className = 'toast show';
  
    // Hide the toast after 3 seconds
    setTimeout(function() {
      toast.className = toast.className.replace('show', '');
    }, 3000);
  }
  
  // Function to generate QR code
  function generateQRCode() {
    var inputText = document.getElementById('qr-input').value;
    var qrCodeContainer = document.getElementById('qr-code');
  
    // Clear previous QR code if any
    qrCodeContainer.innerHTML = '';
  
    if (inputText) {
      // Create a canvas element dynamically
      var canvas = document.createElement('canvas');
      qrCodeContainer.appendChild(canvas); // Add canvas to the container
  
      // Generate QR code
      QRCode.toCanvas(canvas, inputText, function(error) {
        if (error) {
          console.error('Error generating QR code: ', error);
        } else {
          console.log('QR Code generated!');
        }
      });
    } else {
      alert("Please enter some text for the QR code.");
    }
  }
  