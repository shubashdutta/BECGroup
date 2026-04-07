import { HomeHero } from "@/components/home/HomeHero";
import { HomeFeatured } from "@/components/home/HomeFeatured";
import { fetchHomeData } from "@/lib/api/home";
import { HomeStats } from "@/components/home/HomeStats";
import { HomeTestimonials } from "@/components/home/HomeTestimonials";

export default async function HomePage() {
  const data = await fetchHomeData();
  return (
    <>
      <HomeHero data={data.hero} />
      <HomeFeatured data={data.featured} />
      <HomeStats data={data.stats} />
      <HomeTestimonials data={data.testimonials} />
    </>
  );
}
