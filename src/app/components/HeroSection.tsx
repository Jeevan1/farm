import React from 'react';

const HeroSection = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <section className="bg-primary/10 py-16 md:py-22">
      <div className="container">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-4 text-4xl font-bold text-secondary md:text-5xl">
            {title}
          </h1>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">{subtitle}</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
