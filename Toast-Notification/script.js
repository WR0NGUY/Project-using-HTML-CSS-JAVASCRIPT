// Function to show the toast
function showToast() {
    var toast = document.getElementById('toast');
    
    // Show the toast
    toast.className = 'toast show';
  
    // Hide the toast after 3 seconds
    setTimeout(function() {
      toast.className = toast.className.replace('show', '');
    }, 3000);
  }
  