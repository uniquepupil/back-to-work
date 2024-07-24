// Function to create the dialog box
function createDialog() {
    const dialog = document.createElement('div');
    dialog.id = 'workReminderDialog';
    dialog.style.position = 'fixed';
    dialog.style.top = '50%';
    dialog.style.left = '50%';
    dialog.style.transform = 'translate(-50%, -50%)';
    dialog.style.backgroundColor = 'white';
    dialog.style.border = '2px solid #000';
    dialog.style.padding = '20px';
    dialog.style.zIndex = '999999';
    dialog.style.display = 'none';
    dialog.innerHTML = `
      <h1>Distraction Warning</h1>
      <p>It's time to get back to work!</p>
      <button id="closeDialog">Close</button>
    `;
    document.body.appendChild(dialog);
  
    document.getElementById('closeDialog').addEventListener('click', function() {
      document.getElementById('workReminderDialog').style.display = 'none';
      document.body.style.backgroundColor = ''; // Restore the background
    });
  }
  
  // Function to make the screen translucent
  function makeScreenTranslucent() {
    const overlay = document.createElement('div');
    overlay.id = 'workReminderOverlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    overlay.style.zIndex = '999998';
    document.body.appendChild(overlay);
  
    createDialog();
  }
  
  // Check if the current URL matches any of the saved websites
  chrome.storage.sync.get(['websites'], function(result) {
    const websites = result.websites || [];
    const url = new URL(window.location.href);
  
    if (websites.includes(url.hostname)) {
      makeScreenTranslucent();
      document.getElementById('workReminderDialog').style.display = 'block';
    }
  });
  