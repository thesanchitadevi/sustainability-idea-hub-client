import Image from "next/image";

export function Partners() {
  const partners = [
    {
      name: "Bangladesh Green Initiative",
      logo: "bd-youth.png",
    },
    {
      name: "Sustainable Future Foundation",
      logo: "sustainable-future-foundation.png",
    },
    {
      name: "Clean Energy Alliance",
      logo: "clean-energy-alliance.png",
    },
    {
      name: "Eco-Innovation Hub",
      logo: "eco-hub.png",
    },
    {
      name: "Bangladesh Climate Action",
      logo: "bd-climate-action.png",
    },
    {
      name: "Sustainable Bangladesh",
      logo: "sustainable-bangladesh.png",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-green-900 mb-2">
            Our Partners
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We collaborate with leading organizations committed to
            sustainability in Bangladesh
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {partners.map((partner, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center p-4 rounded-lg hover:shadow-lg transition-shadow duration-300 bg-white"
            >
              <div className="flex flex-col items-center space-y-3 w-full">
                <div className="relative h-16 w-full">
                  <Image
                    src={`/images/partners/${partner.logo}`}
                    alt={partner.name}
                    className="object-contain"
                    fill
                    sizes="(max-width: 768px) 100vw, 150px"
                  />
                </div>
                <span className="text-sm font-medium text-gray-700 text-center">
                  {partner.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
