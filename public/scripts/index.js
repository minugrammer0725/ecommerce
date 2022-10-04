const baseURL = 'http://localhost:3000';
// check the filter/sort value to determine final productList

// trigger reload upon each filter click
const pFilter = document.getElementById('filter');
pFilter.addEventListener('change', changeFilter);


const pSort = document.getElementById('sort');
pSort.addEventListener('change', changeSorting);


let filterValue = window.localStorage.getItem('filter');
let sortValue = window.localStorage.getItem('sort');

// display all products
const products = document.querySelector('.products');

try {
  const response = await fetch(`${baseURL}/api/products`);
  let productList = await response.json();

  if (filterValue) {
    if (filterValue === 'all') window.localStorage.removeItem('filter');
    else {
      productList = productList.filter(product => product.brand === filterValue)
    }
  }

  if (sortValue) {
    if (sortValue === 'popular') {
      // sort by rank
      productList.sort((a,b) => a.rank - b.rank);
    }
    else if (sortValue === 'descending') {
      // sort by price descnding
      productList.sort((a,b) => b.price - a.price);
    } else { 
      // sort by price ascending
      productList.sort((a,b) => a.price - b.price);
    }
  }


  // below code should be reusable for all products..
  for (let product of productList) {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    const productImage = document.createElement('div');
    productImage.classList.add('product-image');
    const image = document.createElement('img');
    image.setAttribute('src', product.pictures[0]);
    image.setAttribute('alt', product.name);
    // store productId as data attribute
    image.setAttribute('data-pid', product.id);
    // attach onClick handler
    image.addEventListener('click', onClick)
    productImage.appendChild(image);

    const productInfo = document.createElement('div');
    productInfo.classList.add('product-info');
    const pName = document.createElement('h5');
    pName.innerText = product.name;
    const pPrice = document.createElement('h6');
    pPrice.innerText = `$${product.price}`;
    productInfo.appendChild(pName);
    productInfo.appendChild(pPrice);

    productCard.appendChild(productImage);
    productCard.appendChild(productInfo);
    
    // finally, append the created product card to list of cards
    products.appendChild(productCard);
  }


} catch (error) {
  console.log(error);
}

function onClick(e) {
  // product image clicked
  // should navigate to product page

  // get the product Id and GET /:productId
  // -> server renders product.ejs with options


  // store productId somewhere when creating new DOM element
  // data-pid="12314"
  // el.dataset.pid; 
  const pid = e.target.dataset.pid;
  window.location.href = `${baseURL}/api/products/${pid}`;

}

function changeFilter(e) {
  window.localStorage.setItem('filter', e.target.value);
  if (window.localStorage.getItem('sort')) {
    // empty sort filter
    window.localStorage.removeItem('sort');
  }
  window.location.href = baseURL;
}

function changeSorting(e) {
  window.localStorage.setItem('sort', e.target.value);
  window.location.href = baseURL;
}