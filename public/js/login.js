const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const username = document.querySelector('#username-login').value.trim()
  const password = document.querySelector('#password-login').value.trim()
  const dropboxEl = document.querySelector('#dropbox')
  const dropbox = dropboxEl.options[dropboxEl.selectedIndex].value

  if (username && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password, dropbox }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/myprofile')
    } else {
      alert(response.statusText);
    }
  } else {
    alert('no credentials')
  }
};

document
.querySelector('.login-form')
.addEventListener('submit', loginFormHandler);
