const baseURL = 'http://localhost:3000';

// home, login buttons (header) 
const homeBtn = document.querySelector('.home-btn');
homeBtn.addEventListener('click', () => {
  window.location.href = baseURL;
})

const loginBtn = document.querySelector('.login-btn');
loginBtn.addEventListener('click', () => {
  window.location.href = `${baseURL}/api/login`;
})

// sign up form 
const form = document.querySelector('.signup-form');
form.addEventListener('submit', onSubmit);

async function onSubmit(event) {
  event.preventDefault();
  const username = document.querySelector('#username');
  const email = document.querySelector('#email');
  const password = document.querySelector('#password');
  console.log(`User credentials provided: ${username.value} ${email.value} ${password.value}`);

  const payload = {
    username: username.value,
    email: email.value,
    password: password.value
  }

  // create a new user
  try {
    const response = await fetch(`${baseURL}/api/users`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error('Could not create new user');

    // redirect to login.
    window.location.href = baseURL;
  } catch (error) {
    console.log(error);
  }


  // empty form fields
  username.value = '';
  email.value = '';
  password.value = '';

}