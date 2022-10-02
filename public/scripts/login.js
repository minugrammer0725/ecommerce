console.log('hello from login.js');

const form = document.querySelector('.login-form');

const URL = 'http://localhost:3000/api/login';

form.addEventListener('submit', onSubmit);


async function onSubmit(event) {
  event.preventDefault();

  const username = document.querySelector('#username');
  const password = document.querySelector('#password');

  const payload = {
    username: username.value,
    password: password.value
  };

  try {
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) throw new Error('Login failed');

    const {token, user} = await response.json();

    // store jwt, userId in browser cookie.
    document.cookie = `JWT=${token}`;
    document.cookie = `USERID=${user.id}`;

    // redirect to index(home page)
    window.location.href = '../index.html';
    // 'http://localhost:3000/index.html';

  } catch (error) {
    console.log(error);
  }

}