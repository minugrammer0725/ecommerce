
console.log('hello from cart.js');


// do GET to /api/carts/userId => return cart
const baseURL = 'http://localhost:3000';

try {
  const {cart} = JSON.parse(window.localStorage.getItem('user'));
  const response = await fetch(`${baseURL}/api/carts/${cart}`);
  const cartInfo = await response.json();
  const userCart = document.querySelector('.user-cart');
  const emptyMsg = document.querySelector('.empty-msg');

  // console.log(cartInfo);

  
  if (cartInfo?.items?.length === 0) {
    // no items in cart yet
    console.log(`you don't have anything in your cart yet.`)
    
    emptyMsg.style.display = 'block';
    const homeBtn = document.querySelector('.goToHome');
    homeBtn.addEventListener('click', () => {
      window.location.href = baseURL;
    })

  } else {
    // display items in cart
    emptyMsg.style.display = 'none';  
    console.log('you have something!');

    const cartItems = document.querySelector('.cart-items');

    for (let item of cartInfo.items) {
      // do fetch on api/cartItems/:cartItemId
      const response = await fetch(`${baseURL}/api/cartItems/${item}`);
      const singleCart = await response.json();
      
      const qty = singleCart.quantity;
      const res = await fetch(`${baseURL}/api/products/${singleCart.product}?data=return`);
      const product = await res.json();


      // create DOM element
      const itemCard = document.createElement('div');
      itemCard.classList.add('item-card');

      const itemName = document.createElement('h3');
      itemName.classList.add('item-name');
      itemName.innerText = `name - ${product.name}`;

      const itemBrand = document.createElement('h4');
      itemBrand.classList.add('item-brand');
      itemBrand.innerText = `brand - ${product.brand}`;

      const itemQty = document.createElement('h5');
      itemQty.classList.add('item-qty');
      itemQty.innerText = `quantity - ${qty}`;

      itemCard.appendChild(itemName);
      itemCard.appendChild(itemBrand);
      itemCard.appendChild(itemQty);

      cartItems.appendChild(itemCard);


    }

  }
  
} catch (error) {
  console.log(error);
}