import React from 'react';
import { Github, Linkedin, ExternalLink } from './icons';

const Footer = () => (
  <footer className="bg-gray-900 border-t border-gray-800 pt-10 pb-6 mt-auto">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-white text-lg font-bold mb-4">HirePortfolio</h3>
          <p className="text-gray-400 text-sm">
            Connecting top-tier talent with world-class opportunities.
          </p>
        </div>
        <div>
          <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="hover:text-blue-400 cursor-pointer">About Us</li>
            <li className="hover:text-blue-400 cursor-pointer">Privacy Policy</li>
          </ul>
        </div>
        <div>
          <h3 className="text-white text-lg font-bold mb-4">Connect</h3>
          <div className="flex space-x-4">
            <Github className="text-gray-400 hover:text-white cursor-pointer" />
            <Linkedin className="text-gray-400 hover:text-white cursor-pointer" />
            <ExternalLink className="text-gray-400 hover:text-white cursor-pointer" />
          </div>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} HirePortfolio Team. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;

