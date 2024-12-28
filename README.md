# E-commerce Website

This is a fully responsive e-commerce website where users can browse products, add them to the shopping cart. The application is built with **NextJs** and utilizes **Redux** for state management and **Context API** for handling API calls.

## Figma Design

![Ecommerce Design](/public/SmallShopEcommerceSite.png)

Link to Desing: [Open In Figma](https://www.figma.com/community/file/1454844671412995105)

## Features

- **Browse Products**: View a list of products available for sale.
- **Search Products**: Search for the products.
- **Add to Cart**: Add products to the cart with options to increase/decrease quantities.
- **Responsive Design**: The site is fully responsive and works on both desktop and mobile devices.
- **Redux for State Management**: The shopping cart state is managed using Redux for efficient handling of actions and reducers.
- **Context API for API Calls**: The Context API is used to manage and provide API responses throughout the app.

## Technologies Used

- **NextJs**: JavaScript library for building user interfaces.
- **Redux**: State management library for React.
- **React Context API**: Used for managing API call states.
- **CSS**: For styling and ensuring responsiveness across devices.

## Installation

To get started, follow the steps below:

### Steps

1. **Clone the repository**:

   `git clone https://github.com/srijankarki07/hamro-sano-ecommerce.git`

2. **Navigate into the project directory**:

   `cd hamro-sano-ecommerce`

3. **Install dependencies**:

   `pnpm install`

4. **Run the application**:

   `pnpm start`

   This will start the app on `http://localhost:3000`.

## Folder Structure

- `src/`
  - `components/`: Contains all components like Header, Carousel, Categories, CartModal, Footer etc.
  - `redux/`: Contains Redux actions, reducers, and the store configuration.
  - `context/`: Contains the Context API logic for managing API calls.

## How It Works

### Redux for Cart Management

The shopping cart state is managed using Redux. It allows users to:

- Add products to the cart.
- Remove products from the cart.
- Update the product quantity in the cart.
- Filter/sort functionality for the products.
- Update the total cost dynamically

### Context API for API Calls

The product data is fetched from an external API using the Context API. The Context is set up to:

- Provide the API response to the components.
- Handle loading and error states for API calls.

### Responsiveness

The website is designed to be fully responsive. It adjusts the layout and styling according to the screen size (mobile, desktop).

## Contributing

We welcome contributions to improve this project! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
