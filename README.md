# E-Commerce Store - Fullstack

![Banner](https://i.ibb.co/YTTvRC0w/banner.png)

## Table of Contents

- [About The Project](#about-the-project)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## About The Project

E-Commerce Store is a comprehensive full-stack ecommerce platform featuring an intuitive user interface and a powerful admin dashboard. Built with React, Node.js, Express.js, MongoDB, Zustand, Stripe, Redis, Cloudinary, and Tailwind CSS, this project provides a platform for users to browse and purchase products, manage their shopping cart, and apply coupons with ease. The admin dashboard allows administrators to manage products, coupons, and access detailed analytics. The application includes user authentication and authorization, allowing users to create accounts, and log in. It leverages the power of React for building a dynamic and responsive user interface, MongoDB for reliable and robust data storage, Express.js for handling server-side logic and API endpoints, Zustand for state management, Stripe for payment processing, Redis for performance optimization through caching, Cloudinary for uploading images, and Tailwind CSS for styling and responsive design, customizable components

### Larger Devices

- Click to play the gif.

<a href="https://i.ibb.co/kTnCp1Z/ecommerce-store.gif" target="_blank"><img src="https://i.ibb.co/ZrsD3m9/ecommerce-store.gif" alt="blog-app" border="0" /></a>

### Smaller Devices

- Click to play the gif.

<a href="https://i.ibb.co/JR7JF388/mobile-ecommerce-store.gif" target="_blank"><img src="https://i.ibb.co/nscJ8P44/mobile-ecommerce-store.gif" alt="blog-app" border="0" /></a>

### Key Use Cases:

- User authentication and authorization using JWT and cookies.
- Browse products categorized by type.
- Add products to the shopping cart and manage the cart.
- Apply coupons to the cart for discounts.
- Checkout process with Stripe payment integration.
- Admin dashboard for managing products, coupons and viewing analytics.
- Create, edit, and delete products.
- Create, edit, and delete coupons.
- View analytics for product performance and sales.
- Toggle featured products.
- Upload product images using Cloudinary.
- State management using Zustand for a predictable and maintainable state.
- Real-time updates for cart and product availability.
- User-friendly and responsive interface built with Tailwind CSS.
- Caching with Redis for improved performance and reduced database load.
- Efficient data management and querying with MongoDB.
- Managing cross-origin requests with cors, enabling smooth frontend-backend communication.
- Server-side rendering with Express.js.

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/mr-smoke/ecommerce-store.git
   ```

2. Navigate to the project directory:

   ```bash
   cd ecommerce-store
   ```

3. Install the [dependencies](#dependencies) for the backend:

   ```bash
   npm install
   ```

4. Set up environment variables:

   - Create a `.env` file in the root directory and add the necessary environment variables.

   ```bash
   PORT= 5000
   CLIENT_URL= http://localhost:5173
   MONGODB_URI= your_mongodb_connection_string
   REDIS_URL= your_redis_connection_string
   ACCESS_TOKEN_SECRET= your_access_token_secret
   REFRESH_TOKEN_SECRET= your_refresh_token_secret
   STRIPE_SECRET_KEY= your_stripe_secret_key
   CLOUDINARY_CLOUD_NAME= your_cloudinary_name
   CLOUDINARY_API_KEY= your_cloudinary_key
   CLOUDINARY_API_SECRET= your_cloudinary_secret
   ```

5. Start the backend development server:

   ```bash
   npm run dev
   ```

6. Open a new terminal and navigate to the frontend directory in project:

   ```bash
   cd ecommerce-store/frontend
   ```

7. Install the [dependencies](#dependencies) for the frontend:

   ```bash
   npm install
   ```

8. Start the frontend development server:

   ```bash
   npm run dev
   ```

Now both the backend and frontend servers should be running, and you can use the application.

## Usage

To use the ecommerce store, follow these steps:

1. Open your browser and go to `http://localhost:5173`.
2. Create a new account or log in with your existing credentials.
3. Explore the platform: browse products, add items to your cart, manage your cart, apply discount coupons, and complete your purchase through the checkout process.
4. For admin users, access the admin dashboard to manage products, create or edit coupons, and analyze sales performance.

### Example Commands

- To add a product to your cart:

  1. Browse the categories and select a product.
  2. Click the "Add to Cart" button.

- To apply a coupon:

  1. Go to the cart page.
  2. Enter the "View Coupons" button.
  3. Select a coupon from the list and click "Apply".

- To proceed to checkout:

  1.  Go to the cart page.
  2.  Click the "Checkout" button and follow the Stripe payment process.

- To manage products or coupons as an admin:

  1.  Click the "Dashboard" button on the navbar.
  2.  Use the products or coupons section to add, edit, or delete items.

- To view analytics as an admin:

  1.  Click the "Analytics" button on the admin dashboard.
  2.  View product performance and sales data.

## Features

- **User Authentication**: Secure login and session management using JWT. Includes login, logout, and registration functionality.
- **Product Browsing**: Browse products categorized by type.
- **Shopping Cart**: Add, view, edit, and delete products in the shopping cart. Includes coupon application functionality.
- **Apply Coupons**: Apply coupons to the cart for discounts.
- **Checkout Process**: Secure checkout process using Stripe for payment processing.
- **Admin Dashboard**: Admins can manage products, coupons, and view analytics.
- **Product Management**: Add, edit, and delete products. Includes search functionality.
- **Coupon Management**: Create, edit, and delete coupons. Includes search functionality.
- **Analytics**: View analytics for product performance and sales.
- **Featured Products**: Toggle featured products for better visibility.
- **Product Images**: Upload product images using Cloudinary.
- **State Management**: Efficient state management using Zustand for a predictable and maintainable state.
- **Real-time Updates**: Dynamic updates for cart and product availability.
- **User-friendly Interface**: Built with Tailwind CSS for a responsive and modern design.
- **Redis Caching**: Improved performance and reduced database load with Redis caching.
- **Database Integration**: MongoDB for flexible and scalable data storage.
- **Cross-Origin Resource Sharing**: Managing cross-origin requests with cors, enabling smooth frontend-backend communication.
- **Server-side Rendering**: Improved performance and SEO with server-side rendering using Express.js.
- **Security**: Implemented security best practices, including password hashing, input validation, and secure authentication mechanisms.

## Technologies Used

- [![React][React.js]][React-url]
- [![Express][Express.js]][Express-url]
- [![MongoDB][MongoDB]][Mongo-url]
- [![Node][Node.js]][Node-url]
- [![Zustand][Zustand]][Zustand-url]
- [![Stripe][Stripe]][Stripe-url]
- [![Redis][Redis.io]][Redis-url]
- [![Cloudinary][Cloudinary]][Cloudinary-url]
- [![Tailwind][Tailwind.css]][Tailwind-url]

## Dependencies

### Backend Dependencies

- **bcrypt**: For hashing passwords and ensuring secure authentication.
- **cloudinary**: For uploading and managing images.
- **cookie-parser**: Parse HTTP request cookies.
- **cors**: Enable Cross-Origin Resource Sharing.
- **dotenv**: Load environment variables from a .env file.
- **express**: Web framework for Node.js.
- **ioredis**: Redis client for Node.js.
- **jsonwebtoken**: For generating and verifying JSON Web Tokens.
- **mongoose**: MongoDB object modeling tool designed to work in an asynchronous environment.
- **stripe**: For payment processing.

### Frontend Dependencies

- **@stripe/stripe-js**: Stripe.js library for integrating Stripe payments.
- **axios**: Promise-based HTTP client for the browser and Node.js.
- **react**: JavaScript library for building user interfaces.
- **react-dom**: Entry point of the DOM-related rendering paths.
- **react-hot-toast**: To display non-intrusive toast notifications.
- **react-icons**: Include popular icons in your React projects easily.
- **react-router-dom**: DOM bindings for React Router.
- **recharts**: Charting library for visualizing data.
- **zustand**: State management library.

## Contributing

Contributions are welcome! To contribute to this project, follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m 'Add some feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more information.

## Contact

For questions or feedback, feel free to reach out:

- Email: [muhammetbakiduman@gmail.com](mailto:muhammetbakiduman@gmail.com)
- LinkedIn: [Baki Duman](https://www.linkedin.com/in/muhammet-baki-duman-019451195/)

---

[React.js]: https://img.shields.io/badge/react-000000?style=for-the-badge&logo=react&logoColor=white
[React-url]: https://react.dev
[Express.js]: https://img.shields.io/badge/express-20232A?style=for-the-badge&logo=express&logoColor=61DAFB
[Express-url]: https://expressjs.com
[MongoDB]: https://img.shields.io/badge/mongodb-000000?style=for-the-badge&logo=mongodb&logoColor=white
[Mongo-url]: https://www.mongodb.com
[Node.js]: https://img.shields.io/badge/nodejs-20232A?style=for-the-badge&logo=nodedotjs&logoColor=61DAFB
[Node-url]: https://nodejs.org/en
[Zustand]: https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logo=Zustand&logoColor=white
[Zustand-url]: https://zustand-demo.pmnd.rs
[Stripe]: https://img.shields.io/badge/stripe-20232A?style=for-the-badge&logo=stripe&logoColor=61DAFB
[Stripe-url]: https://stripe.com
[Redis.io]: https://img.shields.io/badge/redis-000000?style=for-the-badge&logo=redis&logoColor=white
[Redis-url]: https://redis.io
[Cloudinary]: https://img.shields.io/badge/cloudinary-20232A?style=for-the-badge&logo=cloudinary&logoColor=61DAFB
[Cloudinary-url]: https://cloudinary.com
[Tailwind.css]: https://img.shields.io/badge/tailwindcss-000000?style=for-the-badge&logo=tailwindcss&logoColor=white
[Tailwind-url]: https://tailwindcss.com
