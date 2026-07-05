import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

// Loading Screen Component
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.8,
          onComplete,
        });
      },
    });

    // Golden dust particles appear
    tl.fromTo('.gold-particle', { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.02 }, 0.5);

    // Logo appears from darkness
    tl.fromTo(logoRef.current, { opacity: 0, scale: 0.8, filter: 'blur(10px)' }, { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.5, ease: 'power2.out' }, 1);

    // Logo glow
    tl.to(logoRef.current, { boxShadow: '0 0 60px rgba(212, 175, 55, 0.5)', duration: 0.8 }, 2);

    // Progress bar
    tl.to(progressRef.current, { width: '100%', duration: 3, ease: 'linear' }, 0);

    // Doors open
    tl.to('.door-left', { x: '-100%', duration: 1.2, ease: 'power3.inOut' }, 4);
    tl.to('.door-right', { x: '100%', duration: 1.2, ease: 'power3.inOut' }, '<');

    // Logo transforms and zooms through the doorway
    tl.to(logoRef.current, { scale: 15, opacity: 0, duration: 1, ease: 'power2.in' }, 5);

  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100] bg-[#090909] flex flex-col items-center justify-center overflow-hidden">
      {/* Gold particles */}
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="gold-particle absolute w-1 h-1 bg-[#D4AF37] rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            boxShadow: '0 0 10px rgba(212, 175, 55, 0.8)',
          }}
        />
      ))}

      {/* Logo */}
      <div ref={logoRef} className="relative z-10 text-center">
        <div className="text-[#D4AF37] font-heading text-6xl md:text-8xl tracking-[0.3em] mb-4">
          LUCKNOWALA
        </div>
        <div className="text-[#A67C00] font-heading-alt text-xl md:text-2xl tracking-[0.2em] italic">
          Royal Nawabi Cuisine
        </div>
      </div>

      {/* Palace doors overlay */}
      <div className="absolute inset-0 flex pointer-events-none">
        <div className="door-left w-1/2 h-full bg-[#090909] border-r border-[#D4AF37]/30 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#D4AF37]/5" />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-32 bg-[#D4AF37]/20 rounded-full" />
        </div>
        <div className="door-right w-1/2 h-full bg-[#090909] border-l border-[#D4AF37]/30 relative">
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#D4AF37]/5" />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 w-2 h-32 bg-[#D4AF37]/20 rounded-full" />
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-12 w-48 h-0.5 bg-[#D4AF37]/20 rounded-full overflow-hidden">
        <div ref={progressRef} className="h-full bg-[#D4AF37] w-0 rounded-full" />
      </div>

      {/* Loading text */}
      <div className="absolute bottom-20 text-[#D4AF37]/60 font-body text-sm tracking-[0.2em] uppercase">
        Entering the Royal Court
      </div>
    </div>
  );
}

// Navbar Component
function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-500 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="glassmorphism mx-4 mt-4 rounded-full">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="font-heading text-[#D4AF37] text-xl tracking-[0.2em]">LUCKNOWALA</div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {['Our Story', 'Menu', 'Gallery', 'Reviews', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="text-[#F8F4EC]/80 hover:text-[#D4AF37] font-body text-sm tracking-wider transition-colors duration-300"
                >
                  {item}
                </a>
              ))}
              <button className="btn-gold text-sm py-2 px-6">Order Now</button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-[#D4AF37]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden glassmorphism mx-4 mt-2 rounded-2xl overflow-hidden">
            <div className="p-6 flex flex-col gap-4">
              {['Our Story', 'Menu', 'Gallery', 'Reviews', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="text-[#F8F4EC]/80 hover:text-[#D4AF37] font-body text-lg tracking-wider transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <button className="btn-gold text-sm py-3 mt-4">Order Now</button>
            </div>
          </div>
        )}
      </nav>

      {/* Scroll Progress */}
      <div className="fixed top-0 left-0 right-0 h-1 z-[60] pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#A67C00] to-[#D4AF37]"
          style={{ width: '0%' }}
          ref={(el) => {
            if (el) {
              gsap.to(el, {
                width: '100%',
                ease: 'none',
                scrollTrigger: {
                  trigger: document.body,
                  start: 'top top',
                  end: 'bottom bottom',
                  scrub: 0.3,
                },
              });
            }
          }}
        />
      </div>
    </>
  );
}

// Hero Section
function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title word-by-word reveal
      const words = titleRef.current?.querySelectorAll('.title-word');
      if (words) {
        gsap.fromTo(words, { opacity: 0, y: 100, rotateX: -45 }, {
          opacity: 1, y: 0, rotateX: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          delay: 0.5,
        });
      }

      // Parallax on scroll
      gsap.to('.hero-content', {
        yPercent: 50,
        opacity: 0,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Golden particles float
      gsap.to('.hero-particle', {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: {
          amount: 2,
          from: 'random',
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#090909]">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/9418697/pexels-photo-9418697.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Royal Dining"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#090909] via-[#090909]/70 to-[#090909]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#090909]/80 via-transparent to-[#090909]/80" />
      </div>

      {/* Floating particles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="hero-particle absolute w-1 h-1 bg-[#D4AF37] rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.3,
            boxShadow: '0 0 10px rgba(212, 175, 55, 0.8)',
          }}
        />
      ))}

      {/* Content */}
      <div className="hero-content relative z-10 text-center px-4">
        <div className="overflow-hidden mb-6">
          <div className="text-[#D4AF37]/60 font-heading-alt text-xl md:text-2xl tracking-[0.3em] italic">
            Est. 1952
          </div>
        </div>

        <h1 ref={titleRef} className="font-heading text-5xl md:text-7xl lg:text-8xl text-[#F8F4EC] mb-8 leading-tight">
          <span className="title-word inline-block">Royal</span>{' '}
          <span className="title-word inline-block text-[#D4AF37]">Flavours.</span>
          <br />
          <span className="title-word inline-block">Timeless</span>{' '}
          <span className="title-word inline-block text-[#D4AF37]">Traditions.</span>
        </h1>

        <div className="divider-gold mx-auto mb-12" />

        <p className="font-body text-[#F8F4EC]/70 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
          Experience the grandeur of authentic Nawabi cuisine, crafted with recipes passed down through generations of royal chefs.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="btn-gold">Order Online</button>
          <button className="btn-outline-gold">View Menu</button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-[#D4AF37]/60 font-body text-sm tracking-widest uppercase">Scroll</span>
        <svg className="w-6 h-6 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>

      {/* Decorative borders */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l border-t border-[#D4AF37]/20" />
      <div className="absolute top-0 right-0 w-32 h-32 border-r border-t border-[#D4AF37]/20" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-l border-b border-[#D4AF37]/20" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r border-b border-[#D4AF37]/20" />
    </section>
  );
}

// Our Story Section
function OurStory() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.story-image', { clipPath: 'inset(0 100% 0 0)' }, {
        clipPath: 'inset(0 0% 0 0)',
        duration: 1.5,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'top 30%',
          scrub: 1,
        },
      });

      gsap.fromTo('.story-text', { opacity: 0, x: 100 }, {
        opacity: 1,
        x: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="our-story" className="relative py-32 bg-[#090909] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div className="story-image relative aspect-[4/5] rounded-lg overflow-hidden">
              <img
                src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Traditional Cooking"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent" />
            </div>

            {/* Decorative frame */}
            <div className="absolute -top-4 -left-4 w-full h-full border border-[#D4AF37]/30 rounded-lg pointer-events-none" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r border-b border-[#D4AF37]/50 pointer-events-none" />

            {/* Floating accent */}
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-[#D4AF37]/5 rounded-full blur-3xl" />
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2 lg:pl-8">
            <div className="story-text text-[#D4AF37] font-heading-alt text-xl tracking-[0.3em] italic mb-4">
              Our Heritage
            </div>
            <h2 className="story-text font-heading text-4xl md:text-5xl text-[#F8F4EC] mb-8 leading-tight">
              A Legacy of <span className="text-[#D4AF37]">Royal Cuisine</span>
            </h2>
            <div className="divider-gold mb-8" />
            <p className="story-text text-[#F8F4EC]/70 text-lg leading-relaxed mb-6">
              In 1952, our forefathers brought the secrets of the Nawabi kitchen from the grand palaces of Lucknow to share with the world. Each recipe tells a story of opulence, artistry, and devotion.
            </p>
            <p className="story-text text-[#F8F4EC]/70 text-lg leading-relaxed mb-8">
              Today, we honour that legacy by preparing every dish with the same meticulous care, using recipes passed down through four generations of master chefs.
            </p>
            <div className="story-text flex items-center gap-8">
              <div className="text-center">
                <div className="font-heading text-4xl text-[#D4AF37]">70+</div>
                <div className="text-[#F8F4EC]/50 font-body text-sm">Years of Excellence</div>
              </div>
              <div className="w-px h-16 bg-[#D4AF37]/20" />
              <div className="text-center">
                <div className="font-heading text-4xl text-[#D4AF37]">4th</div>
                <div className="text-[#F8F4EC]/50 font-body text-sm">Generation Chefs</div>
              </div>
              <div className="w-px h-16 bg-[#D4AF37]/20" />
              <div className="text-center">
                <div className="font-heading text-4xl text-[#D4AF37]">100+</div>
                <div className="text-[#F8F4EC]/50 font-body text-sm">Signature Dishes</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background accent */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#D4AF37]/3 rounded-full blur-3xl -translate-y-1/2" />
    </section>
  );
}

// Royal Ingredients Section
function RoyalIngredients() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const ingredients = [
    { name: 'Saffron', origin: 'Kashmir', image: 'https://images.pexels.com/photos/6185/sarah-dunn-restaurant-kitchen-cooking.jpg?auto=compress&cs=tinysrgb&w=600', desc: 'Premium Kashmiri saffron, harvested at dawn' },
    { name: 'Cardamom', origin: 'Kerala', image: 'https://images.pexels.com/photos/1397589/pexels-photo-1397589.jpeg?auto=compress&cs=tinysrgb&w=600', desc: 'Royal green cardamom from misty hills' },
    { name: 'Ghee', origin: 'Punjab', image: 'https://images.pexels.com/photos/4229925/pexels-photo-4229925.jpeg?auto=compress&cs=tinysrgb&w=600', desc: 'Pure buffalo ghee, churned traditionally' },
    { name: 'Basmati', origin: 'Himalayas', image: 'https://images.pexels.com/photos/4110251/pexels-photo-4110251.jpeg?auto=compress&cs=tinysrgb&w=600', desc: 'Aged long-grain basmati from the foothills' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.ingredient-card', { opacity: 0, y: 80 }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 bg-gradient-to-b from-[#090909] via-[#0c0c0c] to-[#090909]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="text-[#D4AF37] font-heading-alt text-xl tracking-[0.3em] italic mb-4">
            Pure & Precious
          </div>
          <h2 className="font-heading text-4xl md:text-5xl text-[#F8F4EC] mb-6">
            Royal <span className="text-[#D4AF37]">Ingredients</span>
          </h2>
          <div className="divider-gold mx-auto mb-8" />
          <p className="text-[#F8F4EC]/60 max-w-2xl mx-auto font-body text-lg">
            We source only the finest ingredients from their native lands, ensuring each dish carries the authentic essence of Nawabi tradition.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ingredients.map((item, index) => (
            <div
              key={index}
              className="ingredient-card group relative overflow-hidden rounded-lg cursor-pointer"
            >
              <div className="aspect-[3/4] relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-[#090909]/50 to-transparent" />
                <div className="absolute inset-0 bg-[#090909]/0 group-hover:bg-[#D4AF37]/10 transition-colors duration-500" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <div className="text-[#D4AF37]/70 font-body text-xs tracking-widest uppercase mb-1">
                  {item.origin}
                </div>
                <h3 className="font-heading text-xl text-[#F8F4EC] mb-2">{item.name}</h3>
                <p className="text-[#F8F4EC]/60 font-body text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.desc}
                </p>
              </div>

              {/* Corner accent */}
              <div className="absolute top-4 right-4 w-8 h-8 border-r border-t border-[#D4AF37]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>

      {/* Decorative */}
      <div className="absolute right-0 top-1/3 w-px h-40 bg-gradient-to-b from-transparent via-[#D4AF37]/30 to-transparent" />
      <div className="absolute left-0 bottom-1/4 w-px h-40 bg-gradient-to-b from-transparent via-[#D4AF37]/30 to-transparent" />
    </section>
  );
}

// Signature Dishes Section
function SignatureDishes() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const dishes = [
    {
      name: 'Dum Pukht Biryani',
      desc: 'Slow-cooked aromatic rice with tender meat, sealed with tradition',
      price: '₹895',
      image: 'https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?auto=compress&cs=tinysrgb&w=800',
      tag: 'Chef\'s Signature',
    },
    {
      name: 'Galouti Kebab',
      desc: 'Minced meat kebabs so tender they melt on your tongue',
      price: '₹695',
      image: 'https://images.pexels.com/photos/5518068/pexels-photo-5518068.jpeg?auto=compress&cs=tinysrgb&w=800',
      tag: 'Royal Favourite',
    },
    {
      name: 'Nihari',
      desc: 'Overnight slow-cooked stew with aromatic spices',
      price: '₹745',
      image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800',
      tag: 'Breakfast of Nawabs',
    },
    {
      name: 'Sheermal',
      desc: 'Saffron-infused sweet bread with golden crust',
      price: '₹195',
      image: 'https://images.pexels.com/photos/8107758/pexels-photo-8107758.jpeg?auto=compress&cs=tinysrgb&w=800',
      tag: 'Traditional Bread',
    },
    {
      name: 'Korma',
      desc: 'Creamy cashew-based curry with royal aromatic blend',
      price: '₹795',
      image: 'https://images.pexels.com/photos/5638732/pexels-photo-5638732.jpeg?auto=compress&cs=tinysrgb&w=800',
      tag: 'Palace Special',
    },
    {
      name: 'Phirni',
      desc: 'Creamy rice pudding infused with rose and cardamom',
      price: '₹345',
      image: 'https://images.pexels.com/photos/3712845/pexels-photo-3712845.jpeg?auto=compress&cs=tinysrgb&w=800',
      tag: 'Royal Dessert',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.dish-card', { opacity: 0, y: 60, rotateY: -10 }, {
        opacity: 1,
        y: 0,
        rotateY: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="menu" className="relative py-32 bg-[#090909]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="text-[#D4AF37] font-heading-alt text-xl tracking-[0.3em] italic mb-4">
            Culinary Masterpieces
          </div>
          <h2 className="font-heading text-4xl md:text-5xl text-[#F8F4EC] mb-6">
            Signature <span className="text-[#D4AF37]">Dishes</span>
          </h2>
          <div className="divider-gold mx-auto mb-8" />
          <p className="text-[#F8F4EC]/60 max-w-2xl mx-auto font-body text-lg">
            Each dish is a work of art, prepared with recipes that once graced the tables of Nawabs.
          </p>
        </div>

        {/* Dishes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dishes.map((dish, index) => (
            <div
              key={index}
              className="dish-card group relative bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] rounded-lg overflow-hidden border border-[#D4AF37]/10 hover:border-[#D4AF37]/30 transition-all duration-500"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-[#090909]/30 to-transparent" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-20 bg-gradient-to-t from-[#F8F4EC]/10 to-transparent blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[#D4AF37]/80 font-body text-xs tracking-widest uppercase">
                    {dish.tag}
                  </span>
                  <span className="font-heading text-lg text-[#D4AF37]">{dish.price}</span>
                </div>
                <h3 className="font-heading text-xl text-[#F8F4EC] mb-2 group-hover:text-[#D4AF37] transition-colors duration-300">
                  {dish.name}
                </h3>
                <p className="text-[#F8F4EC]/50 font-body text-sm leading-relaxed">
                  {dish.desc}
                </p>
              </div>

              {/* Corner accent */}
              <div className="absolute top-3 right-3 w-6 h-6 border-r border-t border-[#D4AF37]/20" />
              <div className="absolute bottom-3 left-3 w-6 h-6 border-l border-b border-[#D4AF37]/20" />
            </div>
          ))}
        </div>

        {/* View Full Menu */}
        <div className="text-center mt-16">
          <button className="btn-outline-gold">View Full Menu</button>
        </div>
      </div>
    </section>
  );
}

// Chef's Kitchen Section
function ChefsKitchen() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.kitchen-img', { scale: 1.2, filter: 'blur(10px)' }, {
        scale: 1,
        filter: 'blur(0px)',
        duration: 1.5,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1,
        },
      });

      gsap.fromTo('.kitchen-content', { opacity: 0, y: 50 }, {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 50%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/2291462/pexels-photo-2291462.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Chef's Kitchen"
          className="kitchen-img w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-[#090909]/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#090909] via-transparent to-[#090909]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <div className="kitchen-content">
          <div className="text-[#D4AF37] font-heading-alt text-xl tracking-[0.3em] italic mb-4">
            Behind the Scenes
          </div>
          <h2 className="font-heading text-4xl md:text-6xl text-[#F8F4EC] mb-6">
            The Chef's <span className="text-[#D4AF37]">Kitchen</span>
          </h2>
          <div className="divider-gold mx-auto mb-8" />
          <p className="text-[#F8F4EC]/70 font-body text-lg md:text-xl leading-relaxed mb-8">
            "Every dish we create is a tribute to the royal kitchens of Awadh. We don't just cook; we sculpt memories with fire, spice, and devotion."
          </p>
          <div className="text-[#D4AF37] font-heading text-xl">Chef Mohammad Imran</div>
          <div className="text-[#F8F4EC]/50 font-body text-sm mt-1">Executive Chef, 4th Generation</div>
        </div>
      </div>

      {/* Floating decorations */}
      <div className="absolute top-1/4 left-8 w-20 h-20 border border-[#D4AF37]/20 rotate-45 animate-float" />
      <div className="absolute bottom-1/4 right-8 w-16 h-16 border border-[#D4AF37]/20 rotate-12 animate-float-slow" />
    </section>
  );
}

// Gallery Section
function Gallery() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const images = [
    'https://images.pexels.com/photos/9418697/pexels-photo-9418697.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3239091/pexels-photo-3239091.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/2608049/pexels-photo-2608049.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/2147463/pexels-photo-2147463.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/10954148/pexels-photo-10954148.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/7697573/pexels-photo-7697573.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/5553028/pexels-photo-5553028.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/7765380/pexels-photo-7765380.jpeg?auto=compress&cs=tinysrgb&w=800',
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollContainer = containerRef.current;
      if (scrollContainer) {
        gsap.to(scrollContainer, {
          x: () => -(scrollContainer.scrollWidth - window.innerWidth + 100),
          ease: 'none',
          scrollTrigger: {
            trigger: galleryRef.current,
            start: 'top 20%',
            end: () => `+=${scrollContainer.scrollWidth}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        });
      }
    }, galleryRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={galleryRef} id="gallery" className="relative py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12">
        <div className="text-center">
          <div className="text-[#D4AF37] font-heading-alt text-xl tracking-[0.3em] italic mb-4">
            Visual Journey
          </div>
          <h2 className="font-heading text-4xl md:text-5xl text-[#F8F4EC]">
            Royal <span className="text-[#D4AF37]">Gallery</span>
          </h2>
        </div>
      </div>

      <div ref={containerRef} className="flex gap-6 pl-6 lg:pl-[10vw]" style={{ width: 'fit-content' }}>
        {images.map((img, index) => (
          <div
            key={index}
            className="relative flex-shrink-0 h-[60vh] w-[40vh] rounded-lg overflow-hidden group"
          >
            <img
              src={img}
              alt={`Gallery ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
              <div className="text-[#D4AF37] font-heading text-lg">Royal Ambiance</div>
            </div>

            {/* Corner accents */}
            <div className="absolute top-4 left-4 w-8 h-8 border-l border-t border-[#D4AF37]/30" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r border-b border-[#D4AF37]/30" />
          </div>
        ))}
      </div>

      {/* Horizontal scroll hint */}
      <div className="text-center mt-12 text-[#D4AF37]/50 font-body text-sm tracking-widest uppercase">
        Scroll to Explore
      </div>
    </section>
  );
}

// Reviews Section
function Reviews() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const reviews = [
    {
      name: 'Priya Mehra',
      role: 'Food Critic',
      text: 'Every bite transported me to the royal courts of Lucknow. The Galouti Kebabs are simply divine.',
      rating: 5,
    },
    {
      name: 'Arjun Singh',
      role: 'Heritage Enthusiast',
      text: 'An authentic experience that honours the traditions of Nawabi cuisine. The ambiance is breathtaking.',
      rating: 5,
    },
    {
      name: 'Sara Williams',
      role: 'Travel Blogger',
      text: 'The best biryani I have ever tasted. The slow-cooking method truly makes a difference.',
      rating: 5,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.review-card', { opacity: 0, y: 60, scale: 0.95 }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="reviews" className="relative py-32 bg-gradient-to-b from-[#090909] via-[#0c0c0c] to-[#090909]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="text-[#D4AF37] font-heading-alt text-xl tracking-[0.3em] italic mb-4">
            Words of Praise
          </div>
          <h2 className="font-heading text-4xl md:text-5xl text-[#F8F4EC] mb-6">
            Guest <span className="text-[#D4AF37]">Reviews</span>
          </h2>
          <div className="divider-gold mx-auto" />
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="review-card relative p-8 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] rounded-lg border border-[#D4AF37]/10 hover:border-[#D4AF37]/30 transition-all duration-300"
            >
              {/* Quote */}
              <div className="text-[#D4AF37]/30 font-heading text-6xl absolute top-4 left-6">"</div>

              {/* Stars */}
              <div className="flex gap-1 mb-6 mt-8">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Text */}
              <p className="text-[#F8F4EC]/70 font-body text-lg leading-relaxed mb-8 italic">
                {review.text}
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#A67C00] flex items-center justify-center">
                  <span className="font-heading text-[#090909] text-lg">{review.name[0]}</span>
                </div>
                <div>
                  <div className="text-[#F8F4EC] font-heading text-sm">{review.name}</div>
                  <div className="text-[#D4AF37]/70 font-body text-sm">{review.role}</div>
                </div>
              </div>

              {/* Corner accent */}
              <div className="absolute bottom-4 right-4 w-6 h-6 border-r border-b border-[#D4AF37]/20" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Visit Us Section
function VisitUs() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.visit-content', { opacity: 0, x: -50 }, {
        opacity: 1,
        x: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="relative py-32 bg-[#090909]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Map/Image */}
          <div className="relative">
            <div className="aspect-square rounded-lg overflow-hidden bg-[#1a1a1a]">
              <img
                src="https://images.pexels.com/photos/2382983/pexels-photo-2382983.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Restaurant Interior"
                className="w-full h-full object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent" />
            </div>

            {/* Info overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="glassmorphism rounded-lg p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-3 h-3 bg-[#D4AF37] rounded-full animate-pulse" />
                  <span className="text-[#F8F4EC] font-body">We are Open</span>
                </div>
                <div className="text-[#F8F4EC]/70 font-body text-sm space-y-1">
                  <p>Mon - Thu: 12:00 PM - 11:00 PM</p>
                  <p>Fri - Sun: 12:00 PM - 12:00 AM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <div className="visit-content text-[#D4AF37] font-heading-alt text-xl tracking-[0.3em] italic mb-4">
              Pay Us a Visit
            </div>
            <h2 className="visit-content font-heading text-4xl md:text-5xl text-[#F8F4EC] mb-8 leading-tight">
              Visit <span className="text-[#D4AF37]">Lucknowala</span>
            </h2>
            <div className="divider-gold mb-12" />

            <div className="visit-content space-y-8">
              {/* Address */}
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-[#D4AF37] font-heading text-sm mb-1">Address</div>
                  <div className="text-[#F8F4EC]/70 font-body">
                    42 Royal Avenue, Hazratganj<br />
                    Lucknow, Uttar Pradesh 226001
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <div className="text-[#D4AF37] font-heading text-sm mb-1">Reservations</div>
                  <div className="text-[#F8F4EC]/70 font-body">+91 522 234 5678</div>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-[#D4AF37] font-heading text-sm mb-1">Email</div>
                  <div className="text-[#F8F4EC]/70 font-body">reservations@lucknowala.com</div>
                </div>
              </div>
            </div>

            <button className="btn-gold mt-12">Reserve a Table</button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Connect Section
function Connect() {
  return (
    <section className="relative py-20 bg-[#090909]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="text-[#D4AF37] font-heading-alt text-xl tracking-[0.3em] italic mb-4">
            Stay Connected
          </div>
          <h2 className="font-heading text-3xl md:text-4xl text-[#F8F4EC]">
            Follow Our <span className="text-[#D4AF37]">Journey</span>
          </h2>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4 mb-12">
          {[
            { name: 'Instagram', icon: 'M12 2.163c3.244 0 3.63.012 4.849.07 1.171.05 1.79.252 2.239.431.558.213 1.126.508 1.548.931.423.423.718.99.931 1.548.18.449.301 1.068.431 2.239.06 1.219.07 1.605.07 4.849s-.012 3.63-.07 4.849c-.05 1.171-.252 1.79-.431 2.239-.213.558-.508 1.126-.931 1.548-.423.423-.99.718-1.548.931-.449.18-1.068.301-2.239.431-1.219.06-1.605.07-4.849.07s-3.632-.012-4.849-.07c-1.171-.05-1.79-.252-2.239-.431-.558-.213-1.126-.508-1.548-.931-.423-.423-.718-.99-.931-1.548-.18-.449-.301-1.068-.431-2.239-.06-1.219-.07-1.605-.07-4.849s.012-3.63.07-4.849c.05-1.171.252-1.79.431-2.239.213-.558.508-1.126.931-1.548.423-.423.99-.718 1.548-.931.449-.18 1.068-.301 2.239-.431 1.219-.06 1.605-.07 4.849-.07M12 0C8.741 0 8.333.012 7.053.07 5.776.13 4.91.357 4.176.6c-.75.276-1.4.655-2.04 1.296C1.495 2.536 1.116 3.185.84 3.935c-.243.734-.47 1.6-.52 2.877-.06 1.28-.07 1.688-.07 5.047s.012 3.767.07 5.047c.05 1.277.277 2.14.52 2.876.276.75.655 1.4 1.296 2.04.64.64 1.29 1.019 2.04 1.296.734.243 1.6.47 2.877.52 1.28.06 1.688.07 5.047.07s3.767-.012 5.047-.07c1.277-.05 2.14-.277 2.876-.52.75-.277 1.4-.655 2.04-1.296.64-.64 1.019-1.29 1.296-2.04.243-.736.47-1.6.52-2.877.06-1.28.07-1.688.07-5.047s-.012-3.767-.07-5.047c-.05-1.277-.277-2.14-.52-2.876-.276-.75-.655-1.4-1.296-2.04a5.536 5.536 0 00-2.04-1.296c-.736-.243-1.6-.47-2.877-.52C15.767.012 15.359 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
            { name: 'Swiggy', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.51c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.18 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.43z' },
            { name: 'Zomato', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z' },
            { name: 'Call', icon: 'M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.97.97 0 00-1.02.24l-1.57 1.97c-2.52-1.2-4.64-3.31-5.85-5.86l1.97-1.57c.29-.28.38-.71.24-1.02-.37-1.14-.56-2.32-.56-3.54 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.17v-3.47c0-.54-.45-.99-.99-.99z' },
          ].map((item, index) => (
            <button
              key={index}
              className="group flex items-center gap-3 px-6 py-3 rounded-full bg-[#1a1a1a] border border-[#D4AF37]/20 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all duration-300"
            >
              <svg className="w-5 h-5 text-[#D4AF37]" fill="currentColor" viewBox="0 0 24 24">
                <path d={item.icon} />
              </svg>
              <span className="text-[#F8F4EC] font-body text-sm group-hover:text-[#D4AF37] transition-colors duration-300">
                {item.name}
              </span>
            </button>
          ))}
        </div>

        {/* Floating Dock for Mobile */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 md:hidden">
          <div className="glassmorphism rounded-full px-4 py-3 flex gap-6">
            {['Instagram', 'Swiggy', 'Zomato', 'Call'].map((name, i) => (
              <button key={i} className="text-[#D4AF37] hover:text-[#F8F4EC] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="4" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Infinite Marquee
function Marquee() {
  return (
    <div className="relative py-12 overflow-hidden bg-[#090909] border-y border-[#D4AF37]/10">
      <div className="animate-marquee flex whitespace-nowrap">
        {Array.from({ length: 2 }).map((_, set) => (
          <div key={set} className="flex items-center gap-8 px-4">
            {['Royal Nawabi Cuisine', 'Est. 1952', 'Lucknow, India', 'Signature Dishes', 'Heritage Recipes', 'Traditional Flavors'].map((text, i) => (
              <span key={i} className="font-heading text-2xl md:text-3xl text-[#D4AF37]/30 tracking-wider">
                {text} <span className="text-[#D4AF37]/20 mx-4">&#10022;</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// Footer
function Footer() {
  return (
    <footer className="relative py-16 bg-[#090909] border-t border-[#D4AF37]/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="font-heading text-3xl text-[#D4AF37] tracking-[0.2em] mb-4">
              LUCKNOWALA
            </div>
            <div className="text-[#F8F4EC]/50 font-body text-sm leading-relaxed max-w-md">
              Preserving the royal heritage of Nawabi cuisine since 1952. Every dish tells a story of tradition, craftsmanship, and devotion to the art of cooking.
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="text-[#D4AF37] font-heading text-sm tracking-widest mb-4">QUICK LINKS</div>
            <div className="space-y-2">
              {['Our Story', 'Menu', 'Gallery', 'Reviews', 'Contact'].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace(' ', '-')}`}
                  className="block text-[#F8F4EC]/50 hover:text-[#D4AF37] font-body text-sm transition-colors duration-300"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Hours */}
          <div>
            <div className="text-[#D4AF37] font-heading text-sm tracking-widest mb-4">OPENING HOURS</div>
            <div className="space-y-2 text-[#F8F4EC]/50 font-body text-sm">
              <p>Mon - Thu: 12PM - 11PM</p>
              <p>Fri - Sun: 12PM - 12AM</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-[#D4AF37]/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-[#F8F4EC]/30 font-body text-sm">
            &copy; 2024 Lucknowala Restaurant. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-[#D4AF37]/50 hover:text-[#D4AF37] font-body text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-[#D4AF37]/50 hover:text-[#D4AF37] font-body text-sm transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>

      {/* Decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
    </footer>
  );
}

// Main App
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Update ScrollTrigger on Lenis scroll
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, [loading]);

  return (
    <>
      {/* Noise Overlay */}
      <div className="noise-overlay" />

      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      <div className={`relative ${loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-1000`}>
        <Navbar />
        <Hero />
        <OurStory />
        <RoyalIngredients />
        <SignatureDishes />
        <ChefsKitchen />
        <Marquee />
        <Gallery />
        <Reviews />
        <VisitUs />
        <Connect />
        <Footer />
      </div>
    </>
  );
}

export default App;
