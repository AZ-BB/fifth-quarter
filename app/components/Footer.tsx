"use client";

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

export default function Footer() {
  return (
    <footer className="w-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-8 sm:mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="text-2xl sm:text-2xl font-semibold mb-4">
              Fifth Quarter Cards
            </div>
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
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-base">
                  Case Studies
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-base">
                  Resources
                </a>
              </li>
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-base font-semibold uppercase tracking-wider text-gray-300 mb-4">
              Services
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-base">
                  Customer Acquisition
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-base">
                  Paid Media Strategy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-base">
                  Performance Marketing
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-base">
                  Brand Strategy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-base">
                  Creative Direction
                </a>
              </li>
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
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-base">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-base">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-base">
                  Newsletter
                </a>
              </li>
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
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

