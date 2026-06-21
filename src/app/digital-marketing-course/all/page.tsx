import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Wifi, ArrowRight } from "lucide-react";
import AnimateOnScroll from "@/components/shared/AnimateOnScroll";
import { getHaryanaLocations, getDelhiLocations } from "@/lib/data/locations";

export const metadata: Metadata = {
  title: "Digital Marketing Institute in Haryana & Delhi NCR — All Locations",
  description:
    "Digital Magician is the digital marketing institute serving all 22 Haryana districts and Delhi NCR — live Google Ads, SEO & Meta Ads training with a 100% placement guarantee. Online live batch from anywhere, offline classes at the Sonipat campus.",
};

export default function AllLocationsPage() {
  const haryanaLocations = getHaryanaLocations();
  const delhiLocations = getDelhiLocations();

  return (
    <>
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[#09071c]" />
        <div className="absolute inset-0 z-[1] pattern-dots opacity-20" />
        <div className="orb orb-amber w-[400px] h-[400px] -top-10 -right-10 opacity-25 z-[2]" />
        <div className="absolute bottom-0 left-0 right-0 h-40 z-[3] bg-gradient-to-t from-midnight to-transparent pointer-events-none" />
        <div className="relative z-[10] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="hero-item hero-item-1 inline-flex items-center gap-2 glass-amber rounded-full px-5 py-2 mb-6">
            <MapPin className="w-3.5 h-3.5 text-amber-brand" />
            <span className="text-amber-brand text-sm font-heading font-bold tracking-wide">Haryana & Delhi NCR</span>
          </div>
          <h1 className="hero-item hero-item-2 heading-xl text-4xl sm:text-5xl lg:text-6xl text-white mb-5">
            Digital Marketing Institute in Haryana<br />
            <em className="not-italic text-gradient-amber">Wherever You Are in North India</em>
          </h1>
          <p className="hero-item hero-item-3 text-white/60 text-lg max-w-2xl mx-auto font-body">
            Our Sonipat campus serves students in person. Our live online batch serves the entire region.
            Same curriculum. Same Gaurav. Same placement guarantee. Your location is not a barrier.
          </p>
        </div>
      </section>

      {/* Haryana */}
      <section className="py-20 bg-midnight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="mb-10">
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-white/[0.06]" />
              <span className="tag">Haryana — All 22 Districts</span>
              <div className="h-px flex-1 bg-white/[0.06]" />
            </div>
          </AnimateOnScroll>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {haryanaLocations.map((loc, i) => (
              <AnimateOnScroll key={loc.slug} delay={(i % 4) * 60}>
                <Link href={`/digital-marketing-course/${loc.slug}`} className="group bento p-5 flex flex-col gap-3 hover:border-amber-brand/30 transition-all">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-heading font-bold text-white group-hover:text-amber-brand transition-colors">{loc.name}</div>
                      <div className="text-white/35 text-xs font-body mt-0.5">{loc.distanceFromSonipat} from Sonipat</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-amber-brand group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-0.5" />
                  </div>
                  <div className="flex items-center gap-2">
                    {loc.mode !== "far" && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-heading font-bold bg-white/5 text-white/35">
                        <MapPin className="w-2.5 h-2.5" /> Offline
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-heading font-bold bg-amber-brand/10 text-amber-brand/70">
                      <Wifi className="w-2.5 h-2.5" /> Online
                    </span>
                  </div>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Delhi NCR */}
      <section className="py-16 bg-[#07051a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="mb-10">
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-white/[0.06]" />
              <span className="tag">Delhi NCR</span>
              <div className="h-px flex-1 bg-white/[0.06]" />
            </div>
          </AnimateOnScroll>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {delhiLocations.map((loc, i) => (
              <AnimateOnScroll key={loc.slug} delay={(i % 4) * 60}>
                <Link href={`/digital-marketing-course/${loc.slug}`} className="group bento p-5 flex flex-col gap-3 hover:border-amber-brand/30 transition-all">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-heading font-bold text-white group-hover:text-amber-brand transition-colors">{loc.name}</div>
                      <div className="text-white/35 text-xs font-body mt-0.5">{loc.distanceFromSonipat} from Sonipat</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-amber-brand group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-0.5" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-heading font-bold bg-white/5 text-white/35">
                      <MapPin className="w-2.5 h-2.5" /> Offline reachable
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-heading font-bold bg-amber-brand/10 text-amber-brand/70">
                      <Wifi className="w-2.5 h-2.5" /> Online
                    </span>
                  </div>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-midnight">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateOnScroll>
            <div className="glass-amber rounded-3xl p-10">
              <h2 className="heading-lg text-3xl sm:text-4xl text-white mb-4">
                Don&apos;t See Your City?<br />
                <span className="text-gradient-amber">We Still Cover You.</span>
              </h2>
              <p className="text-white/60 font-body mb-8 max-w-lg mx-auto">
                Our live online batch is open to students anywhere in India. Same Gaurav, same campaigns,
                same 100% placement guarantee — from wherever you are.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="https://wa.me/917988227240?text=Hi%20Gaurav!%20I%20want%20to%20know%20about%20the%20online%20batch%20at%20Digital%20Magician."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary px-8 py-4 text-base gap-2 group w-full sm:w-auto justify-center"
                >
                  Ask About Your City
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/programs" className="btn-ghost px-8 py-4 text-base gap-2 w-full sm:w-auto justify-center">
                  View All Programs
                </Link>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
