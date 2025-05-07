import { FeaturedIdeas } from "@/components/pages/modules/Home/FeaturedIdeas";
import { HeroSection } from "@/components/pages/modules/Home/Hero";
import { Testimonials } from "@/components/pages/modules/Home/Testimonials";

const HomePage = async () => {
  return (
    <>
      <HeroSection />
      <FeaturedIdeas />
      <Testimonials />
    </>
  );
};

export default HomePage;
