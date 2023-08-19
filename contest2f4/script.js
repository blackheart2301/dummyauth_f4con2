//script.js
const app = document.getElementById('app');

function renderLogin() {
  app.innerHTML = `
    <div>
      <h2>Login</h2>
      <input type="text" id="username" placeholder="Username">
      <input type="password" id="password" placeholder="Password">
      <button id="loginButton">Login</button>
      <p id="errorText" style="color: red;"></p>
    </div>
  `;

  const loginButton = document.getElementById('loginButton');
  loginButton.addEventListener('click', handleLogin);
}

function handleLogin() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
  .then(res => res.json())
  .then(data => {
    if (data.status === 200) {
      localStorage.setItem('user', JSON.stringify(data.user));
      renderProfile(data.user.id);
    } else {
      const errorText = document.getElementById('errorText');
      errorText.textContent = data.message;
    }
  })
  .catch(error => console.error('Error:', error));
}

function renderProfile(userId) {
  fetch(`https://dummyjson.com/users/${userId}`)
  .then(res => res.json())
  .then(data => {
    localStorage.setItem('profile', JSON.stringify(data));
    renderProfilePage(data);
  })
  .catch(error => console.error('Error:', error));
}

function renderProfilePage(profileData) {
  app.innerHTML = `
    <div>
      <h2>Profile</h2>
      <p>Name: ${profileData.name}</p>
      <p>Email: ${profileData.email}</p>
      <!-- Add more profile information here -->
    </div>
  `;
}

// Check if user is logged in
const storedUser = JSON.parse(localStorage.getItem('user'));
if (storedUser) {
  renderProfile(storedUser.id);
} else {
  renderLogin();
}
