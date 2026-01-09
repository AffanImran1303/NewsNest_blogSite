import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-gray-200 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Left Side: Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start">
            <div className="text-2xl font-bold tracking-tighter">
              <span className="text-blue-600">News</span>
              <span className="text-gray-900">Nest</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              &copy; {currentYear} NewsNest. All rights reserved.
            </p>
          </div>

          {/* Right Side: Credit */}
          <div className="text-center md:text-right">
            <p className="text-sm font-medium text-gray-700">
              Made By <span className="text-blue-600">M. Farzeen Imran</span>
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;