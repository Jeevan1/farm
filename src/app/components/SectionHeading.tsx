import React from 'react';

const SectionHeading = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <div>
      <h2 className="mb-4 text-center text-3xl font-bold text-secondary md:text-4xl">
        {title}
      </h2>
      <p className="mx-auto mb-8 max-w-3xl text-center text-lg text-gray-600 md:text-xl">
        {subtitle}
      </p>
    </div>
  );
};

export default SectionHeading;
