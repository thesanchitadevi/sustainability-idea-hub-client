import Link from "next/link";

export const IdeaCategories = () => {
  const categories = [
    {
      name: "ENERGY",
      icon: "⚡",
      description: "Renewable energy and sustainability breakthroughs",
    },
    {
      name: "WASTE",
      icon: "♻️",
      description: "Innovations in waste management and recycling",
    },
    {
      name: "TRANSPORTATION",
      icon: "🚗",
      description: "Mobility solutions and transport infrastructure",
    },
  ];

  return (
    <section className="py-12 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-green-900 mb-4">
            Explore by Category
          </h2>
          <p className="mb-6 text-gray-500 font-normal">
            Discover ideas in your field of interest
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/ideas?category=${category.name.toLowerCase()}`}
              className="group relative bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-indigo-300 transition-all duration-200 hover:shadow-md"
            >
              <div className="flex items-start">
                <span className="text-3xl mr-4" aria-hidden="true">
                  {category.icon}
                </span>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {category.name.charAt(0) +
                      category.name.slice(1).toLowerCase()}
                  </h3>
                  <p className="mt-1 text-gray-600 text-sm">
                    {category.description}
                  </p>
                </div>
              </div>
              <div className="absolute top-4 right-4 text-gray-300 group-hover:text-indigo-400 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
