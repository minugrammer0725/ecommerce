Models:
  users: either a normal user or admin(isAdmin = true)
    user can
    (not logged in)
      1) Browse main page to see products.
      2) Filter products by brand/rank.
      3) Click on a product for more detailed info.
    (logged in)
      4) View past orders history.
      5) Add products to cart.
      6) Checkout cart.

    admins can(ONLY):
    (logged in)
      1) Review checkout requests and set order status. 
      2) View all user accounts and order history.

  products:
    1) Have some thumbnail image.
    2) 'Add to Cart' functionality with qty specified.
    3) Reviews can be subitted by any logged-in user(Not Admin).
      => does not have to purchase product to write a review.

  reviews:
    Review for a specific product, with a rating and a comment.
    1-to-many relationship with products.
    Check for valid user authorization(normal logged in user).
    User does not have to purchase product to write a review.

  cart-items:
    Each cart item consists of the product and its quantity.
    Everytime a user hits 'Add to Cart', it creates a new cart-item.

  cart:
    Cart has one or more cart-items, and additional billing info.
    Cart should persist its items even if user logs out.
    User can checkout a cart, which then produces an order.

  orders(requests):
    An order consists of checkout products and order status.
    Status is by default "Pending", later becomes "Approved" or "Rejected".
    Logged in users can view past orders.
    Logged in admins can resolve the status of pending requests.

  billing:
    Contains user's billing info.
    Name, email, phone, address, billingMethod, etc.

-----------------------------------------------------------------------------


Pages:  
  Signup page:
    New user created using unique username, unique email, and password.
  
  Login page:
    User must provide username and password to log in.
    Upon successful login, redirect to home page.
    If user has active session, log in user automatically.

  Main page:
    Header (app name, Logo, Navbar)
      Navbar (Home, Cart, Orders, Signup, Login, Logout)
    Body   (gallery of products, search filter)
      Products (prev, next button to browse products)
      Sections sorted by brands.
    Footer (copyright, contact info)

    'Login', 'Signup', 'Logout' according to user status.
  
  Product page:
    Detailed info of products(pics, price, etc).
    'Add to Cart' button with quantity specified. 
    Reviews can be submitted from logged in users.

  Cart page:
    All products that are currently in the cart.
    Display all cart-items by the user(persisted throughout sessions).
    Billing form that user must fill out before checkout.
    User can checkout a cart if it has at least 1 item, 
    AND billing info.

  Orders page:
    Displays user's order history, each with its status.
    Each order contains info of purchased products.

  Admin page:
    Upon login, admins will be directed to /admin.
    Here, admins can resolve pending order requests.
    Admins can also view user accounts and order history.


 
  ...
  Header/Footer page:
    Create separate header/footer.html and use JQuery to include 
    them throughout multiple pages in our app. (Better UX)

-----------------------------------------------------------------------------

Packages:
  express => express server
  nodemon => dev dependency
  mongoose => interact with mongodb
  dotenv => .env file
  bcrypt => encrypt user password
  jsonwebtoken => use JWT for auth token

  cookie-parser => IF I want to use cookie to store JWT
  express-session => IF I want to use session state (install uuid)

-----------------------------------------------------------------------------

API endpoints(/api):

  /users
        // GET: return all users data.
    GET (/:userId): return a specific user. 
    POST: creates a new user.
    PUT (/:userId): update user data.

  /products
    GET: return all products.
    GET (?brand=): return products from specific brand.
    GET (/:productId): return a specific product.

  /reviews
    GET (/:productId): return all reviews for a specific product.
    POST: creates a new review.


  /orders
        // GET: return all orders. 
    GET (/:orderId): return a specific order.
    GET (/user/:userId): return orders for a specific user.
    POST: creates a new order.

  /carts
    GET (/:userId): return a cart for user.
    POST: create a new cart for a user. 
        (automatically when new user is created)
    PUT (/:cartId): update cart, either adding cart item or 
        updating billing info.

  /cartItems
    GET (/:cartItemId): return a specific cart item.
    POST: create a new cart item with product & qty.

  /billings
    GET (/:billingId): return a specific billing info.
    POST: create a new billing info.

  /admin
    GET (/requests): return all unresolved requests(orders).
    GET (/users): return all user data.
    PUT (/requests/:requestId): update request status. 
        remember that requestId === orderId


  /login
    POST: verifies user credentials and logs in user.
          upon success, attach a jwt to response header. 


