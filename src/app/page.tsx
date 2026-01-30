import { Navbar } from "@/components/Navbar";
import { SpacePayHero } from "@/components/SpacePayHero";
import { FeatureCards } from "@/components/FeatureCards";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <SpacePayHero />
        <FeatureCards />
      </main>
      <Footer />
    </>
  );
}
