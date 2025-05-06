import { FeaturedIdeas } from "@/components/pages/modules/Home/FeaturedIdeas";
import { HeroSection } from "@/components/pages/modules/Home/Hero";

const HomePage = async () => {
  return (
    <>
      <HeroSection />
      <FeaturedIdeas />
    </>
  );
};

export default HomePage;
