// Import necessary modules
import Image from "next/image";

// Define the list of companies with their names and image sources
const companies = [
  { name: "Amazon", src: "/images/homepage/Amazon.png" },
  { name: "Ebay", src: "/images/homepage/Ebay.png" },
  { name: "PayPal", src: "/images/homepage/PayPal.png" },
  { name: "Shopee", src: "/images/homepage/Shopee.png" },
  { name: "Stripe", src: "/images/homepage/Stripe.png" },
  { name: "TikTok", src: "/images/homepage/TikTok.png" },
];

// Define the CompaniesList component
export default async function CompaniesList() {
  return (
    <section className="container mx-auto flex flex-col gap-20">
      {/* Section title */}
      <h2 className="font-bold text-xl md:text-2xl lg:text-4xl text-center">
        Powering the world&apos;s leading brands
      </h2>
      {/* Grid of company logos */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {companies.map((company) => (
          <div
            key={company.name}
            className="relative h-5 md:h-10 rounded-md overflow-hidden"
          >
            <Image
              key={company.name}
              src={company.src}
              alt={`${company.name} logo`}
              fill
              sizes="100px"
              className="absolute object-scale-down"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
