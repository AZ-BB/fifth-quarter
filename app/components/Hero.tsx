"use client";

import Image from "next/image";
import ScrollFadeIn from "./ScrollFadeIn";

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

interface HeroProps {
  title: string;
  subtitle: string;
  button1: string;
  button2: string;
}

export default function Hero({ title, subtitle, button1, button2 }: HeroProps) {
  return (
    <section className="w-screen pt-16 md:pt-0">
      <div className="w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 sm:space-y-8 py-12 sm:py-24 md:py-32 lg:py-56 px-4 sm:px-6 md:px-12 lg:pl-24">
            <ScrollFadeIn delay={0} className="duration-1000">
              <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-playfairDisplay font-semibold text-gray-900 leading-tight">
                {title}
              </h1>
            </ScrollFadeIn>
            <ScrollFadeIn delay={300} className="duration-1000">
              <p className="text-lg sm:text-lg text-gray-600 font-medium leading-relaxed max-w-xl">
                {subtitle}
              </p>
            </ScrollFadeIn>
            <ScrollFadeIn delay={600} className="duration-1000">
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => scrollToSection("contact")}
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-[#2d5a5a] text-white text-base sm:text-base font-medium hover:bg-[#366363] transition-colors cursor-pointer"
                >
                  {button1}
                </button>
                <button
                  onClick={() => scrollToSection("capabilities")}
                  className="px-6 sm:px-8 py-3 sm:py-4 border border-gray-500 cursor-pointer text-base sm:text-base text-gray-700 font-medium hover:bg-[#3d7a7a]/10 transition-colors"
                >
                  {button2}
                </button>
              </div>
            </ScrollFadeIn>
          </div>
          <div className="relative h-64 sm:h-80 md:h-96 lg:h-full w-full overflow-hidden lg:min-h-[600px]">
            <Image
              src="/1.jpg"
              alt="Marketing strategy"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#2d5a5a] via-transparent to-transparent opacity-60"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/50 opacity-40"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

