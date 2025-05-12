import { FeaturedIdeas } from "@/components/pages/modules/Home/FeaturedIdeas";
import { HeroSection } from "@/components/pages/modules/Home/Hero";
import { IdeaCategories } from "@/components/pages/modules/Home/IdeaCategories";
import Stats from "@/components/pages/modules/Home/Stats";
import { Testimonials } from "@/components/pages/modules/Home/Testimonials";

const HomePage = async () => {
  return (
    <>
      <HeroSection />
      <IdeaCategories />
      <FeaturedIdeas />
      <Stats />
      <Testimonials />
    </>
  );
};

export default HomePage;
