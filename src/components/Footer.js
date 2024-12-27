import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-section">
        <h3>About Us</h3>
        <p>
          Hamro Sano Ecommerce is an online platform designed to help businesses
          create and manage their own e-commerce stores with ease. It provides a
          suite of tools and features that enable users to set up an online
          shop, manage products, process orders, and handle customer
          interactions.
        </p>
      </div>
      <div className="footer-section">
        <h3> Contact Us</h3>
        <span>
          <h5>ADDRESS:</h5> <p>Hamro Sano Ecommerce, Satungal</p>
        </span>
        <span>
          <h5>PHONE:</h5> <p>+977 9898989898 </p>
        </span>
        <span>
          <h5>EMAIL:</h5> <p>info@hamnrosanoecommerce.com</p>
        </span>
        <span>
          <h5>WORKING DAYS/HOURS:</h5> <p>Sun - Friday / 10AM - 6PM</p>
        </span>
      </div>
      <div className="footer-section">
        <h3> Follow Us On</h3>
        <ul>
          <li>
            <FaFacebookF />
            Facebook
          </li>
          <li>
            <FaXTwitter />
            Twitter
          </li>
          <li>
            <FaInstagram />
            Instagram
          </li>
        </ul>
      </div>
    </div>
  );
}
