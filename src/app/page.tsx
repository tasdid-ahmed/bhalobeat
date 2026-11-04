import { FeaturesSection } from "@/components/home/features-section";
import { GallerySection } from "@/components/home/gallery-section";
import { Hero } from "@/components/home/hero";
import { NewsletterSection } from "@/components/home/newsletter-section";
import { UpcomingSection } from "@/components/home/upcoming-section";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturesSection />
      <UpcomingSection />
      <GallerySection />
      <NewsletterSection />
    </>
  );
}