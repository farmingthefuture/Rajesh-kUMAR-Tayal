import React from 'react';
import { ArrowDown, ArrowRight, Flame, LayoutDashboard, Leaf, Sprout, TrendingUp, Users } from 'lucide-react';

interface LandingPageProps {
  onEnterDashboard: () => void;
}

export default function LandingPage({ onEnterDashboard }: LandingPageProps) {
  return (
    <div className="bg-[#F4F1EA] min-h-screen font-sans text-[#1A1A1A] relative selection:bg-[#E9E5DC]">
      {/* Editorial Nav Header */}
      <nav className="border-b border-[#1A1A1A] bg-[#F4F1EA]/85 backdrop-blur-md sticky top-0 z-50 transition-all">
        <div className="flex justify-between items-center w-full px-6 md:px-12 py-4 max-w-7xl mx-auto">
          <div className="font-serif italic text-2xl font-bold tracking-tight text-[#01261f]">
            RKTAS&reg;
          </div>
          
          {/* Desktop Journalistic Nav Links */}
          <div className="hidden md:flex items-center gap-10 text-[11px] uppercase tracking-[0.2em] font-medium text-[#1A1A1A]/80">
            <a href="#crisis" className="hover:text-[#01261f] transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-[#1A1A1A] hover:after:w-full after:transition-all">The Crisis</a>
            <a href="#solutions" className="hover:text-[#01261f] transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-[#1A1A1A] hover:after:w-full after:transition-all">Solutions</a>
            <a href="#napier" className="hover:text-[#01261f] transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-[#1A1A1A] hover:after:w-full after:transition-all">Napier Fuel</a>
            <a href="#scale" className="hover:text-[#01261f] transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-[#1A1A1A] hover:after:w-full after:transition-all">Roadmap</a>
          </div>

          <button
            onClick={onEnterDashboard}
            className="border border-[#1A1A1A] bg-[#1A1A1A] text-[#F4F1EA] hover:bg-transparent hover:text-[#1A1A1A] px-5 py-2 rounded-none font-mono text-[10px] uppercase tracking-[0.18em] transition-all duration-200 cursor-pointer flex items-center gap-2 font-semibold"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            Go to Portal
          </button>
        </div>
      </nav>

      {/* Hero Section - Split Editorial Layout */}
      <section className="relative min-h-[90vh] md:min-h-screen w-full flex flex-col md:flex-row border-b border-[#1A1A1A]">
        {/* Left Column (Editorial Headline / Narrative Introduction) */}
        <div className="w-full md:w-[45%] p-6 md:p-12 flex flex-col justify-between border-r border-[#1A1A1A] bg-[#F4F1EA] animate-fade-in gap-12 md:gap-0">
          <div className="max-w-md">
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#8C8880] mb-8 flex items-center gap-2">
              <span>Vol. 024</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#01261f]"></span>
              <span>Punjab &amp; Haryana Edition</span>
            </div>
            
            <h1 className="font-serif italic text-6xl md:text-8xl text-[#01261f] leading-[0.9] tracking-tighter mb-8 font-normal">
              Farming the Energy
            </h1>
            <p className="font-serif text-[#01261f] text-2xl md:text-3xl leading-snug mb-8 font-light italic">
              "We harvest the waste of Punjab, creating drop-in biofuels and permanent farmer prosperity."
            </p>
            <p className="text-sm text-[#1A1A1A]/80 leading-relaxed max-w-sm mb-10">
              Transforming raw residue into hydrophobic bio-coal and compressed biogas through 8 years of rigorous, field-proven engineering. Solving Northern India's seasonal air crisis permanently.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#solutions"
              className="border border-[#1A1A1A] bg-[#1A1A1A] text-[#F4F1EA] hover:bg-transparent hover:text-[#1A1A1A] px-6 py-3.5 rounded-none font-mono text-[11px] uppercase tracking-[0.15em] transition-all text-center flex items-center justify-center gap-2 font-medium"
            >
              Explore Products
              <ArrowDown className="w-3.5 h-3.5" />
            </a>
            <a
              href="#crisis"
              className="border border-[#1A1A1A] hover:bg-[#1A1A1A]/5 px-6 py-3.5 rounded-none font-mono text-[11px] uppercase tracking-[0.15em] transition-all text-center flex items-center justify-center text-[#1A1A1A] font-medium"
            >
              Read the Crisis
            </a>
          </div>
        </div>

        {/* Right Column (Hero Featured Images with fine titles) */}
        <div className="w-full md:w-[55%] bg-[#E9E5DC] p-6 md:p-12 grid grid-cols-1 sm:grid-cols-2 gap-8 items-stretch">
          {/* Grid Piece 1 */}
          <div className="flex flex-col gap-4 group justify-between">
            <div className="relative overflow-hidden border border-[#1A1A1A]/60 flex-1 aspect-[4/3] sm:aspect-auto">
              <img
                alt="Punjab Agricultural Field Sunset"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4Eit3Dq1REQ0VeLY4P59I2ytEu-r-MdknWmXL3JzPd8dnQC_JaADcdCIxHSPl3oa2TJYdX3nSDHCdxY6sNaAJeGmy2AD1OVsJednALp0AvBlAJP0S193s35YvYdwwuLN4DtN2Mtl9RjMRlv8k_QY7R17PD8jzLGjG-uskm-XH9BlJvLsNjZuW80VbI_Y3L7MSukjn6v3lQ8zimxMk-6etMft9p9qVSYZ4duYryZwIJLH4KpHY96_ZagsujHQC2A1PRFKeEkT0CRY"
              />
              <div className="absolute inset-0 bg-[#01261f]/10 mix-blend-multiply"></div>
            </div>
            <div>
              <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#8C8880] mb-1">Plateau I</div>
              <div className="font-serif italic text-lg text-[#01261f]">Harvesting Paddy Residue</div>
            </div>
          </div>

          {/* Grid Piece 2 */}
          <div className="flex flex-col gap-4 group justify-between pt-0 sm:pt-16">
            <div className="relative overflow-hidden border border-[#1A1A1A]/60 flex-1 aspect-[4/3] sm:aspect-auto">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt="Lush green tall Napier grass stems"
                referrerPolicy="no-referrer"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCk2ZG7zsyM7_Bz77IwvZRVnYm4qcG_HoKrSw5ir2qzYmpyJzUiDGmx7TCNJPK8RAb2YY5_J-pYyj6fLQ5HxwQUkamvpbmUm1po_yMiLXmjyTT3Zw0ZI5LnOU-4AOU7hgD0wAsKrk4ffkZFYKKBKhk44MSo1p6fpm0AV1xFSXGurNBeRsG5OurhTPBJu-iy0Wrj-0BcYjDh1XRaYbbOVvtOS3JpSBN5_-OEesNYU3t6hYjefpFt2OcYbNmPX1p5TF_pJNciCWUjzZ4"
              />
              <div className="absolute inset-0 bg-[#01261f]/10 mix-blend-multiply"></div>
            </div>
            <div>
              <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#8C8880] mb-1">Plateau II</div>
              <div className="font-serif italic text-lg text-[#01261f]">The 80-Tonne Energy Engine</div>
            </div>
          </div>
        </div>
      </section>

      {/* The Crisis Section - Journal Entry Style */}
      <section className="py-24 px-6 md:px-12 bg-[#F4F1EA] border-b border-[#1A1A1A]" id="crisis">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end pb-12 border-b border-[#1A1A1A] mb-16">
            <div className="md:col-span-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#8C8880] mb-3 block">Environmental Audit</span>
              <h2 className="font-serif italic text-5xl md:text-6xl text-[#01261f] leading-none">The Stubble Burning Crisis</h2>
            </div>
            <div className="md:col-span-6 md:pl-8 border-l border-[#1A1A1A]/20">
              <p className="text-md text-[#1A1A1A]/80 leading-relaxed font-serif">
                Crop stubble residues cost our regional communities combined eco-structural damages of <span className="underline decoration-1 underline-offset-4 font-semibold text-[#01261f]">USD 30 Billion</span> annually. When farms burn, nitrogen reserves perish and the skies of Northern India darken.
              </p>
            </div>
          </div>

          {/* Stats Sheet Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[#1A1A1A] bg-[#E9E5DC]/50">
            {/* Stat Box 1 */}
            <div className="p-10 border-r border-[#1A1A1A] flex flex-col justify-between min-h-[250px] last:border-r-0 md:border-b-0 border-b">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8C8880]">01 / Crop Scope</div>
              <div className="my-6">
                <div className="font-serif italic text-4xl font-normal text-[#01261f]">70 Lakh+ Acres</div>
                <div className="text-xs font-mono uppercase tracking-[0.1em] text-[#8C8880] mt-2">Active Stubble Land Punjab</div>
              </div>
              <p className="text-xs text-[#1A1A1A]/70 leading-relaxed">
                Yields up to 20 Million Metric Tonnes of rice paddy straw annually, which is traditionally incinerated open-air.
              </p>
            </div>

            {/* Stat Box 2 */}
            <div className="p-10 border-r border-[#1A1A1A] flex flex-col justify-between min-h-[250px] last:border-r-0 md:border-b-0 border-b">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8C8880]">02 / Chemical Damage</div>
              <div className="my-6">
                <div className="font-serif italic text-4xl text-red-950">16.8M Kilograms</div>
                <div className="text-xs font-mono uppercase tracking-[0.1em] text-[#8C8880] mt-2">Organic Carbon Purged</div>
              </div>
              <p className="text-xs text-[#1A1A1A]/70 leading-relaxed">
                The massive biological combustion processes destroy the topmost fertile layer of clay soil, stripping microbial life.
              </p>
            </div>

            {/* Stat Box 3 */}
            <div className="p-10 flex flex-col justify-between min-h-[250px]">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8C8880]">03 / Time Limit</div>
              <div className="my-6">
                <div className="font-serif italic text-4xl text-[#01261f]">50-Day Window</div>
                <div className="text-xs font-mono uppercase tracking-[0.1em] text-[#caee5d] bg-[#01261f] inline-block px-2 py-0.5 mt-2">CRITICAL TIMELINES</div>
              </div>
              <p className="text-xs text-[#1A1A1A]/70 leading-relaxed">
                The precise interval between harvesting and next-crop seeding. All mechanics must operate flawlessly within this window.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Technical Solutions Section - Elegant Catalogue Grid */}
      <section className="py-24 px-6 md:px-12 bg-[#F4F1EA] border-b border-[#1A1A1A]" id="solutions">
        <div className="max-w-7xl mx-auto">
          {/* Section Label */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#8C8880] mb-3 block">Industrial Catalog</span>
              <h2 className="font-serif italic text-5xl md:text-6xl text-[#01261f] leading-none">Engineering Bio-Energy Outcomes</h2>
            </div>
            <div className="font-mono text-xs uppercase text-[#8C8880] tracking-widest border-b border-[#1A1A1A] pb-1">
              8 Years R&amp;D Specification Sheet
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Product 1: Bio-Coal */}
            <div className="border border-[#1A1A1A] bg-[#E9E5DC]/30 flex flex-col justify-between group transition-all duration-300 hover:bg-[#E9E5DC]/60">
              <div>
                <div className="aspect-[16/10] overflow-hidden border-b border-[#1A1A1A] relative">
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                    alt="Close-up of high-quality bio-coal pellets"
                    referrerPolicy="no-referrer"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWwsuKruHjAVw3rnNMXs6ypu5XMAifdY-V2xTv2j84-mYP6S6qC7jfzVzBhvTYftCYd2Otc_N3Mjh1A0ifOKi7S09rMcFJ_wB6iWtboykiRzY8FPQiJAisqNrploYo5JS1OfT2XEdc0QjPVXG_pEnu28IB-fBsMROk1rZ0VSAEVTm9LnEMk5q7EMwWwn4RO3CMSpniM8yeSPJ2CA5JREmS0UHl-juRb3iZJP9p3RjojrGdp2SThS1RKFvK1iB3sLqSZyAuBO51Oe4"
                  />
                  <div className="absolute top-4 left-4 bg-[#1A1A1A] text-[#F4F1EA] font-mono text-[9px] uppercase tracking-widest px-2.5 py-1">
                    Roasted Fuels
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="font-serif italic text-3xl text-[#01261f] mb-3">Bio-Coal Pellets</h3>
                  <p className="text-sm text-[#1A1A1A]/80 leading-relaxed mb-6">
                    Thermally roasted (torrefied) biomass with high energy ratios. Torrefaction breaks long moisture-absorbing molecules, turning bio-coal highly hydrophobic (water-resistant) for long-term open-air stockpiles without decay, perfect for thermal plant co-firing.
                  </p>
                </div>
              </div>
              <div className="p-8 pt-0 flex justify-between items-center border-t border-[#1A1A1A]/10 mt-auto">
                <span className="font-mono text-[10px] uppercase text-[#8C8880] tracking-wider">Type // Solid Coal Replacement</span>
                <div className="text-[#01261f] group-hover:translate-x-1.5 transition-transform"><ArrowRight className="w-5 h-5" /></div>
              </div>
            </div>

            {/* Product 2: CBG */}
            <div className="border border-[#1A1A1A] bg-[#E9E5DC]/30 flex flex-col justify-between group transition-all duration-300 hover:bg-[#E9E5DC]/60">
              <div>
                <div className="aspect-[16/10] overflow-hidden border-b border-[#1A1A1A] relative">
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                    alt="Modern industrial biogas plant spherical tanks"
                    referrerPolicy="no-referrer"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDx6mhunSSpvNipa4imcTCKq24KQp-Jdwy2a4m6_Oz6EWAw1Pyn58x77jB5UjbkuzBWDb5eaKpD_lnNuA_ouhmzuME3yrq-TYL4kebKOWdy3cg-WWoZwdqgMY5lI2c_RbcKSRwQ4jMo0l2V86cT5EAGKH04kDFAf9qwbjvPl0dRfMBu12krYbedvNYcRl2MJMPtYOPaqaYzPXiPZfn_UgwS_L-bnIkVaBaUHWNrb5hTKia0SKPwdiGHjGnIZVqfnihB3J0o5uHHFmM"
                  />
                  <div className="absolute top-4 left-4 bg-[#1A1A1A] text-[#F4F1EA] font-mono text-[9px] uppercase tracking-widest px-2.5 py-1">
                    Gaseous High Octane
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="font-serif italic text-3xl text-[#01261f] mb-3">Compressed Biogas</h3>
                  <p className="text-sm text-[#1A1A1A]/80 leading-relaxed mb-6">
                    High methane content biomethane optimized to match regional SATAT standard expectations. Delivers standard renewable CNG alternatives for city-wide logistics and multi-axle heavy trucks seamlessly.
                  </p>
                </div>
              </div>
              <div className="p-8 pt-0 flex justify-between items-center border-t border-[#1A1A1A]/10 mt-auto">
                <span className="font-mono text-[10px] uppercase text-[#8C8880] tracking-wider">Type // Methane Bio-Gas</span>
                <div className="text-[#01261f] group-hover:translate-x-1.5 transition-transform"><ArrowRight className="w-5 h-5" /></div>
              </div>
            </div>

            {/* Product 3: Biochar */}
            <div className="border border-[#1A1A1A] bg-[#E9E5DC]/30 flex flex-col justify-between group transition-all duration-300 hover:bg-[#E9E5DC]/60">
              <div>
                <div className="aspect-[16/10] overflow-hidden border-b border-[#1A1A1A] relative">
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                    alt="Hands holding rich organic biochar soil"
                    referrerPolicy="no-referrer"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJmN8_Yjpvh7a8-Hbsvsc_5UcYJCN2Krh3o5mNG07bVH6yzWOxOK1SYutqs1Hkh4bkZ-Oa6SBS_G8VBNSMFzSMpAMcOlE51XZHgCulJRgHPZJvr6Ov5D2n2DundJqhtFBqjJMuERt5lnNkibCQrQTCgPlHvYJ6XUkJiR5w1CT6V8On_BCttSWj-sJWzg2xOSADT-GQHzosTHY80rzx9xgQEYEVDT3XUzgOOD16zHmV6DBwlTNkdKmh-WgC0dM_t_6JHYM4LK7aV9g"
                  />
                  <div className="absolute top-4 left-4 bg-[#1A1A1A] text-[#F4F1EA] font-mono text-[9px] uppercase tracking-widest px-2.5 py-1">
                    Carbon Fertilizer
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="font-serif italic text-3xl text-[#01261f] mb-3">Biochar Carbon</h3>
                  <p className="text-sm text-[#1A1A1A]/80 leading-relaxed mb-6">
                    Pyrolyzed biological carbon substrate to regenerate degraded agricultural soil. Acts as an underground sponge for minerals, locks gaseous Carbon into ground solids forever, and improves water holding qualities.
                  </p>
                </div>
              </div>
              <div className="p-8 pt-0 flex justify-between items-center border-t border-[#1A1A1A]/10 mt-auto">
                <span className="font-mono text-[10px] uppercase text-[#8C8880] tracking-wider">Type // Soil Enhancer</span>
                <div className="text-[#01261f] group-hover:translate-x-1.5 transition-transform"><ArrowRight className="w-5 h-5" /></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Napier Grass Section - Warm Sand Immersive Landscape Column */}
      <section className="py-24 bg-[#E9E5DC] border-b border-[#1A1A1A]" id="napier">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Visual Aspect */}
            <div className="lg:col-span-5 relative">
              <div className="relative border border-[#1A1A1A] bg-[#F4F1EA] p-3 shadow-lg">
                <img
                  className="w-full aspect-[4/5] object-cover border border-[#1A1A1A]/50"
                  alt="Lush green tall Napier grass stems"
                  referrerPolicy="no-referrer"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCk2ZG7zsyM7_Bz77IwvZRVnYm4qcG_HoKrSw5ir2qzYmpyJzUiDGmx7TCNJPK8RAb2YY5_J-pYyj6fLQ5HxwQUkamvpbmUm1po_yMiLXmjyTT3Zw0ZI5LnOU-4AOU7hgD0wAsKrk4ffkZFYKKBKhk44MSo1p6fpm0AV1xFSXGurNBeRsG5OurhTPBJu-iy0Wrj-0BcYjDh1XRaYbbOVvtOS3JpSBN5_-OEesNYU3t6hYjefpFt2OcYbNmPX1p5TF_pJNciCWUjzZ4"
                />
                <div className="text-center font-mono text-[8px] uppercase tracking-widest text-[#8C8880] mt-3">
                  Plate III // Napier Cultivation Zone Punjab
                </div>
              </div>
            </div>

            {/* Typography Aspect */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#8C8880] mb-4 block">Future Bio-Fuel Crop</span>
              <h2 className="font-serif italic text-4xl md:text-5xl text-[#01261f] leading-none mb-6">Napier Grass — The 80 Tonne Engine</h2>
              <p className="font-serif text-[#1A1A1A]/90 text-xl leading-relaxed italic mb-8 border-l border-[#1A1A1A] pl-4">
                Pennisetum purpureum is an agricultural titan. Boasting yields of up to 80 dry tonnes per hectare annually, it serves as the ultimate drought-resistant crop alternative with secure, predictable farmer revenues.
              </p>
              
              <div className="space-y-6 md:max-w-xl">
                <div className="flex gap-4 items-start py-3 border-b border-[#1A1A1A]/10">
                  <div className="w-8 h-8 rounded-none border border-[#1A1A1A] flex items-center justify-center shrink-0 bg-[#F4F1EA]">
                    <Leaf className="w-4 h-4 text-[#01261f]" />
                  </div>
                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-[0.1em] font-semibold">Reliable Agrarian Output</h4>
                    <p className="text-xs text-[#1A1A1A]/70 leading-relaxed mt-1">Grows beautifully across low-fertility zones with modest water intakes and simple standard farming tools.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start py-3 border-b border-[#1A1A1A]/10">
                  <div className="w-8 h-8 rounded-none border border-[#1A1A1A] flex items-center justify-center shrink-0 bg-[#F4F1EA]">
                    <Sprout className="w-4 h-4 text-[#01261f]" />
                  </div>
                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-[0.1em] font-semibold">Deep Nitrogen Interception</h4>
                    <p className="text-xs text-[#1A1A1A]/70 leading-relaxed mt-1">Vast underground fibrous root mesh captures runoff nitrates, stabilizing soil banks naturally.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start py-3">
                  <div className="w-8 h-8 rounded-none border border-[#1A1A1A] flex items-center justify-center shrink-0 bg-[#F4F1EA]">
                    <Users className="w-4 h-4 text-[#01261f]" />
                  </div>
                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-[0.1em] font-semibold">Prosperity Redistribution</h4>
                    <p className="text-xs text-[#1A1A1A]/70 leading-relaxed mt-1">Generates stable monthly incomes for contract farmer communities across Sadhugarh regional nodes.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={onEnterDashboard}
                  className="border border-[#1A1A1A] bg-[#1A1A1A] text-[#F4F1EA] hover:bg-transparent hover:text-[#1A1A1A] px-8 py-3.5 rounded-none font-mono text-[11px] uppercase tracking-[0.2em] font-semibold transition-all duration-200 cursor-pointer"
                >
                  Enter Operational Portal &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap - Two Column Journal Log Layout */}
      <section className="py-24 px-6 md:px-12 bg-[#F4F1EA] border-b border-[#1A1A1A]" id="scale">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#8C8880] mb-3 block">Scaling Milestones</span>
            <h2 className="font-serif italic text-4xl md:text-5xl text-[#01261f]">Harvest Potentials &amp; Projected Scope</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-[#1A1A1A]">
            {/* Column A (Present) */}
            <div className="p-10 border-r border-[#1A1A1A] bg-[#F4F1EA] flex flex-col justify-between min-h-[340px] md:border-b-0 border-b">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8C8880] bg-[#E9E5DC] px-2.5 py-1">2024 / ACTIVE POTENTIALS</span>
                <h3 className="font-serif italic text-4xl text-[#01261f] my-6">100 Metric Tonnes / day</h3>
                <p className="text-xs text-[#1A1A1A]/80 leading-relaxed max-w-md">
                  Our regional operational network harvests agricultural residues efficiently, averting 42,000 MT of toxic seasonal stubble burning across 16,800 active farm holdings in Sadhugarh.
                </p>
              </div>
              <div className="pt-8 border-t border-[#1A1A1A]/10 mt-6 flex items-center gap-3 font-mono text-[10px] text-[#01261f]">
                <Users className="w-4 h-4" />
                <span>Empowering ~2,100 Rural Families Monthly</span>
              </div>
            </div>

            {/* Column B (Future) */}
            <div className="p-10 bg-[#E9E5DC]/50 flex flex-col justify-between min-h-[340px]">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8C8880] bg-[#01261f] text-white px-2.5 py-1">2026 / REGIONAL EXPANSION</span>
                <h3 className="font-serif italic text-4xl text-[#01261f] my-6">300 Metric Tonnes / day</h3>
                <p className="text-xs text-[#1A1A1A]/80 leading-relaxed max-w-md">
                  Investing in high-capacity continuous reactors, upgrading torrefaction machinery and expanding harvesting networks to digest 126,000 MT of raw residue directly into high-octane fuels.
                </p>
              </div>
              <div className="pt-8 border-t border-[#1A1A1A]/10 mt-6 flex items-center gap-3 font-mono text-[10px] text-[#01261f]">
                <TrendingUp className="w-4 h-4" />
                <span>3&times; Total Regional Carbon Cleanup Efficiency</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Print Gazette Footer */}
      <footer className="bg-[#F4F1EA] border-t border-[#1A1A1A]/30 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 pb-16">
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <div className="font-serif italic text-3xl font-bold text-[#01261f] mb-4">RKTAS&reg;</div>
              <p className="text-xs text-[#1A1A1A]/70 leading-relaxed max-w-sm">
                Established Punjab &amp; Haryana, India. Dedicated to structural technical machinery innovations, bio-energy autonomy, and steadfast agrarian integration for cleaner winter skies.
              </p>
            </div>
            <div className="mt-8 font-mono text-[9px] uppercase tracking-widest text-[#8C8880]">
              SDG-7 &amp; SDG-13 Aligned Bio-Infrastructure
            </div>
          </div>

          <div className="md:col-span-2 flex flex-col gap-4">
            <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-[#1A1A1A]">Corporate</h4>
            <div className="flex flex-col gap-2.5 text-xs text-[#1A1A1A]/70 font-serif italic text-left">
              <a href="#" className="hover:text-[#01261f] transition-colors">Sustainability Audit</a>
              <a href="#" className="hover:text-[#01261f] transition-colors">Press Portfolio</a>
              <a href="#" className="hover:text-[#01261f] transition-colors">Founder Memoirs</a>
              <a href="#" className="hover:text-[#01261f] transition-colors">Investments</a>
            </div>
          </div>

          <div className="md:col-span-2 flex flex-col gap-4">
            <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-[#1A1A1A]">Operational</h4>
            <div className="flex flex-col gap-2.5 text-xs text-[#1A1A1A]/70 font-serif italic text-left">
              <button onClick={onEnterDashboard} className="hover:text-[#01261f] transition-colors text-left cursor-pointer bg-transparent">Executive Dashboard</button>
              <a href="#" className="hover:text-[#01261f] transition-colors">Napier Contracts</a>
              <a href="#" className="hover:text-[#01261f] transition-colors">Torrefaction Data</a>
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-[#1A1A1A] mb-4">Ambala Registry</h4>
            <p className="text-xs text-[#1A1A1A]/70 leading-relaxed font-serif">
              76, Ahluwalia Building, Ambala Cantt, Haryana, India.<br />
              <span className="italic mt-2 block text-[11px] text-[#A4C639]/90 font-mono bg-[#01261f] text-center py-1">Punjab Facility // Sadhugarh Regional Node</span>
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 border-t border-[#1A1A1A]/20 flex flex-col sm:flex-row justify-between text-[10px] font-mono tracking-wider uppercase text-[#1A1A1A]/60 gap-4">
          <p>&copy; 2026 RKTAS Agricultural Innovations. All Rights Reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-[#01261f] cursor-pointer">Terms of System</span>
            <span>&middot;</span>
            <span className="hover:text-[#01261f] cursor-pointer">Privacy Charter</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
