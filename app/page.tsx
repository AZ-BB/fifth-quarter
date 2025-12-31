"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    consent: false,
  });
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("idle");
    
    // Simulate form submission
    setTimeout(() => {
      setFormStatus("success");
      setFormData({ name: "", email: "", company: "", message: "", consent: false });
    }, 500);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="text-xl font-semibold text-[#2d5a5a]">
              Fifth Quarter Cards
            </div>
            <div className="flex items-center gap-8">
              <button
                onClick={() => scrollToSection("capabilities")}
                className="text-sm text-gray-700 hover:text-[#2d5a5a] transition-colors"
              >
                Capabilities
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-sm text-gray-700 hover:text-[#2d5a5a] transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="px-4 py-2 text-sm font-medium text-[#2d5a5a] border border-[#2d5a5a] rounded hover:bg-[#2d5a5a] hover:text-white transition-colors"
              >
                Let&apos;s Talk
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="w-screen pt-32 pb-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl lg:text-6xl font-[var(--font-playfair)] font-normal text-gray-900 leading-tight">
                Where brand clarity meets customer acquisition.
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                I help growth minded teams scale acquisition through paid media and performance optimization that is grounded in brand strategy with clear messaging, compelling creative that converts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => scrollToSection("contact")}
                  className="px-8 py-4 bg-[#2d5a5a] text-white font-medium rounded hover:bg-[#3d7a7a] transition-colors"
                >
                  Let&apos;s Talk
                </button>
                <button
                  onClick={() => scrollToSection("capabilities")}
                  className="px-8 py-4 border border-gray-300 text-gray-700 font-medium rounded hover:bg-gray-50 transition-colors"
                >
                  View Capabilities
                </button>
              </div>
            </div>
            <div className="relative h-[500px] lg:h-[600px] rounded-lg overflow-hidden">
              <Image
                src="/1.jpg"
                alt="Marketing strategy"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent opacity-60"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white opacity-40"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section id="capabilities" className="w-screen py-24 px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-wider text-gray-500 mb-4">
              Capabilities designed to connect brand positioning to in-market performance
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-lg border border-gray-100 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-[var(--font-playfair)] text-gray-900 mb-3">
                Customer Acquisition Strategy
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Build scalable acquisition programs across channels with a clear testing and measurement cadence.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-100 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-[var(--font-playfair)] text-gray-900 mb-3">
                Paid Media Strategy
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Strategy across the paid ecosystem, from structure to day-to-day optimization.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-100 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-[var(--font-playfair)] text-gray-900 mb-3">
                Performance Marketing
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Improve CAC, conversion rate, and ROI through disciplined measurement, experimentation, and iteration.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-100 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-[var(--font-playfair)] text-gray-900 mb-3">
                Brand Strategy
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Positioning and messaging that sharpen the story and make performance marketing work harder.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-100 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-[var(--font-playfair)] text-gray-900 mb-3">
                Creative Direction
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Translate strategy into ads and landing experiences that look on-brand and convert.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="w-screen py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] lg:h-[500px] rounded-lg overflow-hidden">
              <Image
                src="/2.jpg"
                alt="About"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-white via-transparent to-transparent opacity-70"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-50"></div>
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl font-[var(--font-playfair)] text-gray-900">
                About
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Marketing consultant combining brand experience with customer acquisition and paid media execution. Focused on delivering measurable results that result in both short and long-term business growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-screen py-24 px-6 lg:px-8 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-[var(--font-playfair)] text-gray-900 mb-12 text-center">
            Get in Touch
          </h2>
          
          {formStatus === "success" ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <p className="text-green-800 font-medium">
                Thanks — I&apos;ll reply within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d5a5a] focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d5a5a] focus:border-transparent outline-none"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                  Company *
                </label>
                <input
                  type="text"
                  id="company"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d5a5a] focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d5a5a] focus:border-transparent outline-none resize-none"
                />
              </div>
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="consent"
                  required
                  checked={formData.consent}
                  onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                  className="mt-1 mr-3 h-4 w-4 text-[#2d5a5a] focus:ring-[#2d5a5a] border-gray-300 rounded"
                />
                <label htmlFor="consent" className="text-sm text-gray-600">
                  I consent to being contacted by Fifth Quarter Cards *
                </label>
              </div>
              <button
                type="submit"
                className="w-full px-8 py-4 bg-[#2d5a5a] text-white font-medium rounded hover:bg-[#3d7a7a] transition-colors"
              >
                Send Message
              </button>
            </form>
          )}

          <div className="mt-12 pt-12 border-t border-gray-200 text-center">
            <p className="text-gray-600 mb-2">
              <a href="mailto:fifthquartercards@gmail.com" className="text-[#2d5a5a] hover:underline">
                fifthquartercards@gmail.com
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-screen bg-gray-900 text-white py-12 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-xl font-semibold">
              Fifth Quarter Cards
            </div>
            <div className="text-sm text-gray-400">
              <a href="mailto:fifthquartercards@gmail.com" className="hover:text-white transition-colors">
                fifthquartercards@gmail.com
              </a>
            </div>
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} Fifth Quarter Cards, LLC. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
