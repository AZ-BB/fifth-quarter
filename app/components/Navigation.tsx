"use client";

import { useState, useRef, useEffect } from "react";
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

interface NavigationProps {
  capabilities: Capability[];
}

export default function Navigation({ capabilities }: NavigationProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
      timeoutRef.current = null;
    }, 200); // 200ms delay before hiding
  };

  const capabilitiesLinks = capabilities.map((capability) => ({
    label: capability.title,
    id: "capabilities",
  }));

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#2d5a5a]/50">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-24 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="cursor-pointer hover:opacity-80 transition-opacity"
            aria-label="Go to top"
          >
            <Image
              src="/FQC logo 1.png"
              alt="Fifth Quarter Cards Consulting"
              width={200}
              height={80}
              className="h-10 sm:h-12 lg:h-14 w-auto"
              priority
            />
          </button>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 font-semibold">
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className="text-sm lg:text-base text-gray-700 hover:text-[#2d5a5a] transition-colors hover:underline cursor-pointer flex items-center gap-1"
              >
                Capabilities
                <svg
                  className={`w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isDropdownOpen && (
                <>
                  <div className="absolute top-[calc(100%+18px)] left-0 w-80 pt-1 z-50">
                    <div className="bg-white border border-gray-200 shadow-lg py-2">
                      {capabilitiesLinks.map((link, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            scrollToSection(link.id);
                            setIsDropdownOpen(false);
                          }}
                          className="w-full cursor-pointer text-left px-4 py-8 text-base text-gray-700 hover:bg-[#2d5a5a]/10 hover:text-[#2d5a5a] transition-colors"
                        >
                          {link.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
            <button
              onClick={() => scrollToSection("about")}
              className="text-sm lg:text-base text-gray-700 hover:text-[#2d5a5a] transition-colors hover:underline cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="px-6 lg:px-10 py-1 text-sm lg:text-base font-medium hover:underline cursor-pointer text-[#2d5a5a] border border-[#2d5a5a] hover:bg-[#2d5a5a] hover:text-white transition-colors"
            >
              Let&apos;s Talk
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-[#2d5a5a] transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="flex flex-col gap-4 pt-4">
              <button
                onClick={() => {
                  scrollToSection("capabilities");
                  setIsMobileMenuOpen(false);
                }}
                className="text-left text-lg text-gray-700 hover:text-[#2d5a5a] transition-colors font-semibold"
              >
                Capabilities
              </button>
              <button
                onClick={() => {
                  scrollToSection("about");
                  setIsMobileMenuOpen(false);
                }}
                className="text-left text-lg text-gray-700 hover:text-[#2d5a5a] transition-colors font-semibold"
              >
                About
              </button>
              <button
                onClick={() => {
                  scrollToSection("contact");
                  setIsMobileMenuOpen(false);
                }}
                className="text-left px-6 py-2 text-lg font-medium text-[#2d5a5a] border border-[#2d5a5a] hover:bg-[#2d5a5a] hover:text-white transition-colors w-fit"
              >
                Let&apos;s Talk
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

