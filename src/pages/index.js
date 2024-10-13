import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProductFeatures from "../components/ProductFeatures";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <ProductFeatures />
      <Testimonials />
      <Footer />
    </div>
  );
}
