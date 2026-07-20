import AIBenefits from "@/components/AIBenefits";
import Categories from "@/components/Categories";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import FeaturedRecipes from "@/components/FeaturedRecipes";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonial";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedRecipes />
      <Categories />
      <AIBenefits />

      <HowItWorks />

      <Testimonials />

      <FAQ />
      <CTA />
    </>
  );
}