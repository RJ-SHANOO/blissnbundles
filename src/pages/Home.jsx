import Hero from "../components/home/Hero";
import CategoryGrid from "../components/home/CategoryGrid";
import FeaturedProducts from "../components/home/FeaturedProducts";
import CustomizationShowcase from "../components/home/CustomizationShowcase";
import BenefitsStrip from "../components/home/BenefitsStrip";
import Testimonials from "../components/home/Testimonials";
import NewsletterCTA from "../components/home/NewsletterCTA";

function Home() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <FeaturedProducts />
      <CustomizationShowcase />
      <BenefitsStrip />
      <Testimonials />
      <NewsletterCTA />
    </>
  );
}

export default Home;
