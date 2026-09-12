import { Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Customize from "./pages/Customize";
import About from "./pages/About";
import Account from "./pages/Account";
import Contact from "./pages/Contact";
import Checkout from "./pages/Checkout";
import TrackOrder from "./pages/TrackOrder";
import FAQs from "./pages/FAQs";
import LegalPage from "./pages/LegalPage";
import ComingSoon from "./pages/ComingSoon";

function StorefrontLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-base">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:category" element={<Shop />} />
          <Route path="/customize" element={<Customize />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/account" element={<Account />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/shipping-policy" element={<LegalPage slug="shipping-policy" />} />
          <Route path="/return-policy" element={<LegalPage slug="return-policy" />} />
          <Route path="/privacy-policy" element={<LegalPage slug="privacy-policy" />} />
          <Route path="/terms" element={<LegalPage slug="terms" />} />
          <Route path="*" element={<ComingSoon label="This page" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default StorefrontLayout;
