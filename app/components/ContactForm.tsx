"use client";

import { useState } from "react";

interface ContactFormProps {
  email: string;
}

export default function ContactForm({ email }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    consent: false,
  });
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle");

  return (
    <>
      {formStatus === "success" ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <p className="text-green-800 text-base font-medium">
            Thanks — I&apos;ll reply within 24 hours.
          </p>
        </div>
      ) : (
        <form action={`https://formsubmit.co/${email}`} method="POST">
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label htmlFor="name" className="block text-base font-medium text-gray-700 mb-2">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d5a5a] focus:border-transparent outline-none text-base"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-base font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d5a5a] focus:border-transparent outline-none text-base"
              />
            </div>
          </div>
          <div>
            <label htmlFor="company" className="block text-base font-medium text-gray-700 mb-2">
              Company *
            </label>
            <input
              type="text"
              name="company"
              id="company"
              required
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d5a5a] focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-base font-medium text-gray-700 mb-2">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d5a5a] focus:border-transparent outline-none resize-none text-base"
            />
          </div>
          <div className="flex items-start">
            <input
              type="checkbox"
              id="consent"
              name="consent"
              required
              checked={formData.consent}
              onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
              className="mt-1 mr-3 h-4 w-4 text-[#2d5a5a] focus:ring-[#2d5a5a] border-gray-300 rounded"
            />
            <label htmlFor="consent" className="text-base text-gray-600">
              I consent to being contacted by Fifth Quarter Cards *
            </label>
          </div>
          <button
            type="submit"
            className="w-full px-8 py-4 bg-[#2d5a5a] text-white text-base font-medium duration-300 cursor-pointer hover:bg-[#3d7a7a] transition-colors"
          >
            Send Message
          </button>
        </form >
      )
      }
    </>
  );
}

