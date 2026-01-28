"use client";

import Image from "next/image";

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

interface Capability {
  title: string;
  description: string;
}

interface FooterProps {
  capabilities: Capability[];
  linkedinUrl?: string;
}

export default function Footer({ capabilities, linkedinUrl }: FooterProps) {
  return (
    <footer className="w-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-8 sm:mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="cursor-pointer hover:opacity-80 transition-opacity mb-4"
              aria-label="Go to top"
            >
              <Image
                src="/FQC logo 1.png"
                alt="Fifth Quarter Cards Consulting"
                width={200}
                height={80}
                className="h-12 sm:h-14 w-auto brightness-0 invert"
              />
            </button>
            <p className="text-gray-400 text-base leading-relaxed">
              Growth marketing partner combining brand thinking with customer acquisition and paid media execution.
            </p>
          </div>

          {/* Navigation Column */}
          <div>
            <h3 className="text-base font-semibold uppercase tracking-wider text-gray-300 mb-4">
              Navigation
            </h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection("capabilities")}
                  className="text-gray-400 hover:text-white transition-colors text-base"
                >
                  Capabilities
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-gray-400 hover:text-white transition-colors text-base"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-gray-400 hover:text-white transition-colors text-base"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-base font-semibold uppercase tracking-wider text-gray-300 mb-4">
              Services
            </h3>
            <ul className="space-y-3">
              {capabilities.map((capability, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection("capabilities")}
                    className="text-gray-400 hover:text-white transition-colors text-base text-left"
                  >
                    {capability.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-base font-semibold uppercase tracking-wider text-gray-300 mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:fifthquartercards@gmail.com"
                  className="text-gray-400 hover:text-white transition-colors text-base"
                >
                  fifthquartercards@gmail.com
                </a>
              </li>
              {linkedinUrl && (
                <li>
                  <a 
                    href={linkedinUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors text-base"
                  >
                    LinkedIn
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-base text-gray-400">
              © {new Date().getFullYear()} Fifth Quarter Cards, LLC. All rights reserved.
            </div>
            <div className="flex gap-6 text-base text-gray-400">

            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

