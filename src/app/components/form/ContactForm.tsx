import React from 'react';
import Button from '../ui/Button';

const Input = ({
  type,
  name,
  placeholder,
  label,
  className,
  ...props
}: {
  type: string;
  name: string;
  label: string;
  placeholder: string;
  className?: string;
  [key: string]: any;
}) => {
  return (
    <div className={`group ${className}`}>
      <label
        htmlFor={label}
        className="block text-sm font-semibold text-gray-600 group-hover:text-primary"
      >
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          name={name}
          placeholder={`${placeholder}...`}
          className="w-full border-b-2 border-gray-400 py-1 outline-none placeholder:text-textdark focus:border-primary"
          {...props}
        ></textarea>
      ) : (
        <input
          type={type}
          name={name}
          placeholder={`${placeholder}...`}
          className="w-full border-b-2 border-gray-400 py-1 outline-none placeholder:text-textdark focus:border-primary"
          {...props}
        />
      )}
    </div>
  );
};

const ContactForm = () => {
  return (
    <form
      action=""
      className="grid w-full grid-cols-2 gap-4 px-8 py-9 md:gap-6"
    >
      <Input
        type="text"
        label="Your Name"
        name="name"
        placeholder="Enter your name"
      />
      <Input
        type="email"
        label="Your Email"
        name="email"
        placeholder="Enter your email"
      />
      <Input
        type="text"
        label="Subject"
        name="subject"
        placeholder="Enter subject"
        className="col-span-2"
      />
      <Input
        type="textarea"
        label="Message"
        name="message"
        placeholder="Enter your message"
        className="col-span-2"
        rows={3}
      />
      <div className="col-span-2 flex justify-start">
        <Button variant="primary" type="button">
          <span className="block px-1 py-1.5">Submit Message</span>
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;
