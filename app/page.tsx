import Image from "next/image";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import ScrollFadeIn from "./components/ScrollFadeIn";

export default function Home() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navigation />

      <Hero />

      {/* Capabilities Section */}
      <section id="capabilities" className="w-screen py-16 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#489c9c28]">
        <div className="max-w-7xl mx-auto">
          <ScrollFadeIn>
            <div className="text-center mb-10 sm:mb-12 md:mb-16">
              <p className="text-sm sm:text-sm uppercase tracking-wider text-gray-500 mb-4 px-4">
                Capabilities designed to connect brand positioning to in-market performance
              </p>
            </div>
          </ScrollFadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
            <ScrollFadeIn delay={0} className="w-full">
              <div className="bg-white p-5 sm:p-8 rounded-lg border border-gray-100 flex flex-col h-[150px] md:h-full w-full">
                <h3 className="text-xl sm:text-xl font-playfairDisplay font-semibold text-gray-900 mb-2 sm:mb-3">
                  Brand Strategy
                </h3>
                <p className="text-base sm:text-base text-gray-600 leading-relaxed grow">
                  Positioning and messaging that sharpen the story and make performance marketing work harder.
                </p>
              </div>
            </ScrollFadeIn>
            <ScrollFadeIn delay={100} className="w-full">
              <div className="bg-white p-5 sm:p-8 rounded-lg border border-gray-100 flex flex-col h-[150px] md:h-full w-full">
                <h3 className="text-xl sm:text-xl font-playfairDisplay font-semibold text-gray-900 mb-2 sm:mb-3">
                  Paid Media Strategy
                </h3>
                <p className="text-base sm:text-base text-gray-600 leading-relaxed grow">
                  Strategy across the paid ecosystem, from structure to day-to-day optimization.
                </p>
              </div>
            </ScrollFadeIn>
            <ScrollFadeIn delay={200} className="w-full">
              <div className="bg-white p-5 sm:p-8 rounded-lg border border-gray-100 flex flex-col h-[150px] md:h-full w-full">
                <h3 className="text-xl sm:text-xl font-playfairDisplay font-semibold text-gray-900 mb-2 sm:mb-3">
                  Performance Marketing
                </h3>
                <p className="text-base sm:text-base text-gray-600 leading-relaxed grow">
                  Improve CAC, conversion rate, and ROI through disciplined measurement, experimentation, and iteration.
                </p>
              </div>
            </ScrollFadeIn>
            <div className="lg:col-span-3 flex flex-col md:flex-row lg:justify-center gap-6 sm:gap-6">
              <ScrollFadeIn delay={300}>
                <div className="bg-white p-5 sm:p-8 rounded-lg border border-gray-100 flex flex-col h-[150px] md:h-full">
                  <h3 className="text-xl sm:text-xl font-playfairDisplay font-semibold text-gray-900 mb-2 sm:mb-3">
                    Customer Acquisition Strategy
                  </h3>
                  <p className="text-base sm:text-base text-gray-600 leading-relaxed grow">
                    Build scalable acquisition programs across channels with a clear testing and measurement cadence.
                  </p>
                </div>
              </ScrollFadeIn>
              <ScrollFadeIn delay={400}>
                <div className="bg-white p-5 sm:p-8 rounded-lg border border-gray-100 flex flex-col h-[150px] md:h-full">
                  <h3 className="text-xl sm:text-xl font-playfairDisplay font-semibold text-gray-900 mb-2 sm:mb-3">
                    Creative Direction
                  </h3>
                  <p className="text-base sm:text-base text-gray-600 leading-relaxed grow">
                    Translate strategy into ads and landing experiences that look on-brand and convert.
                  </p>
                </div>
              </ScrollFadeIn>
            </div>
          </div>
        </div>
      </section>


      {/* About Section */}
      <section id="about" className="w-screen">
        <div className="w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="relative h-64 sm:h-80 md:h-96 lg:h-full w-full overflow-hidden lg:min-h-[500px] order-2 lg:order-1">
              <Image
                src="/2.jpg"
                alt="About"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-[#2d5a5a]  via-transparent to-transparent opacity-70"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-white/50 via-transparent to-transparent opacity-50"></div>
            </div>
            <ScrollFadeIn delay={400}>
              <div className="space-y-4 sm:space-y-6 py-12 sm:py-24 md:py-32 lg:py-52 px-4 sm:px-6 md:px-12 lg:pl-24 order-1 lg:order-2">
                <h2 className="text-3xl sm:text-3xl md:text-4xl font-[var(--font-figtree)] font-semibold text-gray-900">
                  About
                </h2>
                <p className="text-lg sm:text-lg text-gray-600 leading-relaxed">
                  Marketing consultant combining brand experience with customer acquisition and paid media execution. Focused on delivering measurable results that result in both short and long-term business growth.
                </p>
              </div>
            </ScrollFadeIn>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section id="approach" className="w-screen py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-24 lg:px-8 bg-white border-t border-gray-400/10">
        <div className="w-full mx-auto">
          <ScrollFadeIn>
            <div className="text-start mb-8 sm:mb-12 md:mb-16">
              <h2 className="text-3xl sm:text-3xl md:text-4xl font-[var(--font-figtree)] font-semibold text-gray-900 mb-4 sm:mb-6">
                Our Approach
              </h2>
              <p className="text-sm sm:text-sm uppercase tracking-wider text-gray-500">
                A strategic framework for sustainable growth
              </p>
            </div>
          </ScrollFadeIn>

          <ScrollFadeIn delay={100}>
            <div className="space-y-6 sm:space-y-8 text-gray-700 leading-relaxed">
              <p className="text-lg sm:text-lg">
                Every successful marketing strategy begins with understanding your brand's unique position in the market. We start by diving deep into your business objectives, target audience, and competitive landscape to build a comprehensive foundation for growth.
              </p>

              <p className="text-lg sm:text-lg">
                Our methodology combines rigorous data analysis with creative thinking, ensuring that every campaign we develop is both strategically sound and creatively compelling. We believe that the most effective marketing doesn't just drive immediate conversions—it builds lasting brand equity that compounds over time.
              </p>

              <p className="text-lg sm:text-lg">
                Through continuous testing, measurement, and optimization, we refine our approach to deliver increasingly better results. This iterative process allows us to identify what resonates most with your audience, optimize spend allocation, and scale what works while eliminating what doesn't.
              </p>

              <p className="text-lg sm:text-lg">
                Whether you're launching a new product, entering a new market, or looking to accelerate growth in your existing channels, our approach is tailored to your specific needs. We work collaboratively with your team to ensure alignment, transparency, and shared ownership of results.
              </p>
            </div>
          </ScrollFadeIn>
        </div>
      </section>


      {/* Contact Section */}
      <section id="contact" className="w-screen py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <ScrollFadeIn>
            <h2 className="text-3xl sm:text-3xl md:text-4xl font-[var(--font-figtree)] font-semibold text-gray-900 mb-8 sm:mb-12 text-center">
              Get in Touch
            </h2>
          </ScrollFadeIn>

          <ScrollFadeIn delay={100}>
            <ContactForm />
          </ScrollFadeIn>

          <ScrollFadeIn delay={200}>
            <div className="mt-8 sm:mt-12 pt-8 sm:pt-12 border-t border-gray-200 text-center sm:text-start">
              <p className="text-base sm:text-base text-gray-600 mb-2">
                <span>
                  Contact us at: <br />
                </span>
                <a href="mailto:fifthquartercards@gmail.com" className="text-[#2d5a5a] hover:underline break-all">
                  fifthquartercards@gmail.com
                </a>
              </p>
            </div>
          </ScrollFadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}
