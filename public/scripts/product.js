console.log('hello from product.js');

const baseURL = 'http://localhost:3000';

const qty = document.querySelector('.qty');

const minusBtn = document.querySelector('.minusBtn');
minusBtn.addEventListener('click', () => {
  if (qty.innerText > 0) {
    qty.innerText = Number(qty.innerText) - 1;
  }
  
})

const plusBtn = document.querySelector('.plusBtn');
plusBtn.addEventListener('click', () => {
  qty.innerText = Number(qty.innerText) + 1;
})



const addToCartBtn = document.getElementById('addBtn');
addToCartBtn.addEventListener('click', addToCart)

async function addToCart(e) {
  // check the value of qty, and product(look at url :productId), and cart(from user).
  
  let urls = window.location.href.split('/');
  let productId = urls[urls.length-1];
  console.log(productId);
  let quantity = document.querySelector('.qty').innerText;
  // let {cart} = JSON.parse(window.localStorage.getItem('user'));

  let cart = window.localStorage.getItem('user')
    ? JSON.parse(window.localStorage.getItem('user'))['cart']
    : null;
    
  const newItem = {
    product: productId,
    quantity,
    cart
  }

  try {
    // TODO: send a post request with auth header, using newItem (above)
    const response = await fetch(`${baseURL}/api/cartItems`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newItem)
    });
    const data = await response.json();
    if (data.name === 'JsonWebTokenError') {
      if (window.confirm('You must login first.')) {
        window.location.href = `${baseURL}/api/login`;
      }
      
    } else {
      window.alert('Item added to cart!');
    }
    //  if user not validated => response (jwt malformatted error)
    // data = {name : 'JsonWebTokenError', message 'jwt malformatted'}



  } catch (error) {
    console.log(error);
  }


}