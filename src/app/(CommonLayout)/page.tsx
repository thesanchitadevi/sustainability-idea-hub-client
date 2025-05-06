import { FeaturedIdeas } from "@/components/pages/modules/Home/FeaturedIdeas";
import { HeroSection } from "@/components/pages/modules/Home/Hero";
import { Testimonials } from "@/components/pages/modules/Home/Testimonials";
import { getFeaturedIdeas } from "@/lib/api/ideas/action";

const HomePage = async () => {
  const ideas = await getFeaturedIdeas();
  return (
    <>
      <HeroSection />
      <FeaturedIdeas />
      <Testimonials ideas={ideas} />
    </>
  );
};

export default HomePage;
