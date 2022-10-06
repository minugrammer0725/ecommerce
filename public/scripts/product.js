console.log('hello from product.js');

const baseURL = 'http://localhost:3000';

const qty = document.querySelector('.qty');

let urls = window.location.href.split('/');
let productId = urls[urls.length-1];

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

const reviewBtn = document.getElementById('reviewBtn');
reviewBtn.addEventListener('click', addReview);

const reviews = document.querySelector('.reviews');
try {
  // load all reviews, if there is any. If not, no reviews yet...
  
  const res = await fetch(`${baseURL}/api/reviews/${productId}`);
  const productReviews = await res.json();
  if (productReviews && productReviews?.length > 0) {
    // There are reviews
    const reviewsContainer = document.createElement('div');
    reviewsContainer.classList.add('review-container');

    for (let productReview of productReviews) {
      const review = document.createElement('h3');
      review.classList.add('review-item');
      const reviewInfo = `${productReview.rating} star - "${productReview.comment}"`;
      review.innerText = reviewInfo;
      reviewsContainer.appendChild(review);
    }
 
    reviews.appendChild(reviewsContainer);

  } else {
    // No reviews yet
    const msg = document.createElement('h3');
    msg.innerText = 'There are currently no reviews..';
    reviews.appendChild(msg);
  }

} catch (error) {
  console.log(error);
}


async function addReview(e) {
  // e.preventDefault();
  const ratingSelect = document.getElementById('rating');
  const reviewText = document.getElementById('reviewText');

  let user = window.localStorage.getItem('user')
    ? JSON.parse(window.localStorage.getItem('user'))['id']
    : null;

  const newReview = {
    rating: ratingSelect.value,
    comment: reviewText.value,
    user,
    product: productId
  };

  try {
    const response = await fetch(`${baseURL}/api/reviews`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newReview)
    });

    const data = await response.json();
    if (data.name === 'JsonWebTokenError') {
      if (window.confirm('You must login first.')) {
        window.location.href = `${baseURL}/api/login`;
      }
    } else {
      window.alert('New review created!');
    }


  } catch (error) {
    console.log(error);
  } finally {
    // empty form fields
    ratingSelect.value = '';
    reviewText.value = '';
  }

}


async function addToCart(e) {
  // check the value of qty, and product(look at url :productId), and cart(from user).
  // e.preventDefault();

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
    // send a post request with auth header, using newItem (above)
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