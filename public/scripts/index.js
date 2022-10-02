// toggle classname depending on user state
// check cookie to verify user state
const cookies = document.cookie;
console.log(cookies);
if (cookies) {
  // verified user
  const {JWT, USERID} = getCookies();

  document.getElementsByClassName('navbar')[0].style.display = "none";
  document.getElementsByClassName('navbar-verified')[0].style.display = "inline";
  console.log('User verified!');
} else {
  // not logged in
  document.getElementsByClassName('navbar')[0].style.display = "inline";
  document.getElementsByClassName('navbar-verified')[0].style.display = "none";

  console.log('User is not logged in yet');
}


// Logout button
// remove all cookies and redirect to main page
const logoutBtn = document.querySelector('#logout');

logoutBtn.addEventListener('click', logout);

function logout() {
  console.log('Logging out user');
  // remove cookies
  document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
  // ref: https://stackoverflow.com/questions/179355/clearing-all-cookies-with-javascript

  // redirect to main page
  window.location.href = '../index.html';
}

function getCookies() {
  var pairs = document.cookie.split(";");
  var cookies = {};
  for (var i=0; i<pairs.length; i++){
    var pair = pairs[i].split("=");
    cookies[(pair[0]+'').trim()] = unescape(pair.slice(1).join('='));
  }
  return cookies;
}
// ref: https://stackoverflow.com/questions/252665/i-need-to-get-all-the-cookies-from-the-brow



// display all products
const productsList = document.querySelector('.products');
const URL = 'http://localhost:3000/api/products';

try {
  const response = await fetch(URL);
  const products = await response.json();
  for (let product of products) {
    const p = document.createElement('p');
    p.innerText = `product: ${product.name} from ${product.brand}`;
    productsList.appendChild(p);
  }

  // TODO:
  // create a thumbnail component using product image, name, brand, price.
  // attach event listener on click => redirect (window.location.href) to 
  // clicked product page.

} catch (error) {
  console.log(error);
}

