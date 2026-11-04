import Image from "next/image";
import { SectionHeading } from "@/components/home/section-heading";

const photos = [
  { src: "/gallery/cleanup.png", alt: "Volunteers picking up litter along a street", caption: "Neighborhood cleanups" },
  { src: "/gallery/plantation.png", alt: "Volunteers planting saplings in a community park", caption: "Tree plantation" },
  { src: "/gallery/winter-clothes.png", alt: "Volunteers handing out winter clothes and blankets", caption: "Winter clothes drives" },
  { src: "/gallery/food-distribution.png", alt: "Volunteers serving packed meals to neighbors", caption: "Food distribution" },
  { src: "/gallery/blood-donation.png", alt: "A community blood donation camp", caption: "Blood donation camps" },
  { src: "/gallery/education.png", alt: "Volunteers teaching children outdoors", caption: "Learning for every child" },
];

export function GallerySection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <SectionHeading
        eyebrow="Moments that matter"
        title="Good deeds in action"
        description="A glimpse of the kind of events our community comes together for."
      />
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {photos.map((photo) => (
          <figure
            key={photo.src}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 1024px) 33vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-xs font-semibold text-white sm:p-4 sm:text-sm">
              {photo.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}