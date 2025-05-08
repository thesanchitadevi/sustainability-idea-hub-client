import React from "react";

const Stats = () => {
  return (
    <section className="py-16  bg-green-700 text-white">
      <div className=" max-w-7xl mx-auto px-8 text-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="text-4xl font-bold mb-2">50K+</div>
            <div className="text-lg">Community Members</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">12K+</div>
            <div className="text-lg">Ideas Shared</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">64</div>
            <div className="text-lg">Districts Represented</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">150+</div>
            <div className="text-lg">Implemented Solutions</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
