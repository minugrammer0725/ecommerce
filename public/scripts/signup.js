console.log('hello from signup.js');

const URL = 'http://localhost:3000/api/users';

const form = document.querySelector('.signup-form');
form.addEventListener('submit', onSubmit);


async function onSubmit(event) {
  event.preventDefault();
  const username = document.querySelector('#username');
  const email = document.querySelector('#email');
  const password = document.querySelector('#password');
  console.log(`New User: ${username.value} ${email.value} ${password.value}`);

  const payload = {
    username: username.value,
    email: email.value,
    password: password.value
  }

  // create a new user
  try {
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error('Could not create new user');

    const newUser = await response.json();
    console.log(`new user created, hello ${newUser.username}`);

    // redirect to login.
    window.location.href = 'http://localhost:3000/login.html';
  } catch (error) {
    console.log(error);
  }


  // empty form fields
  username.value = '';
  email.value = '';
  password.value = '';

}