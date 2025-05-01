import HeroSection from "@/components/ui/modules/Home/Hero";

const HomePage = async () => {
  // Data fetching
  // const res = await fetch("http://localhost:5000/products")

  return (
    <div>
      Home Page
      <HeroSection />
    </div>
  );
};

export default HomePage;
