const baseURL = 'http://localhost:3000';

// home, login buttons (header) 
const homeBtn = document.querySelector('.home-btn');
homeBtn.addEventListener('click', () => {
  window.location.href = baseURL;
})

const signupBtn = document.querySelector('.signup-btn');
signupBtn.addEventListener('click', () => {
  window.location.href = `${baseURL}/api/signup`;
})


const form = document.querySelector('.login-form');


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
    const response = await fetch(`${baseURL}/api/login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) throw new Error('Login failed');

    const {token, user} = await response.json();

    // store jwt in localStorage
    window.localStorage.setItem('token', token);
    window.localStorage.setItem('user', JSON.stringify(user));  // retrieve using JSON.parse()

        // store jwt, userId in browser cookie.
        // document.cookie = `JWT=${token}`;
        // document.cookie = `USERID=${user.id}`;
      
    // redirect to index(home page)
    window.location.href = baseURL;

  } catch (error) {
    console.log(error);
  }

}