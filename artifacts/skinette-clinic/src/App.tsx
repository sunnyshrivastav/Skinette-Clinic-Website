import { useEffect, useState, type FormEvent } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  HeartHandshake,
  MapPin,
  Menu,
  MessageCircle,
  Minus,
  Phone,
  Plus,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
  X,
  type LucideIcon,
} from 'lucide-react';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';

const queryClient = new QueryClient();
const phone = '09582108622';
const whatsapp = `https://wa.me/919582108622?text=${encodeURIComponent("Hello Skinette Clinic, I'd like to request a consultation.")}`;

const treatments = [
  { id: 'hair', number: '01', title: 'Laser hair reduction', copy: 'A considered plan to reduce unwanted hair over time, with skin comfort and your routine in mind.', tag: 'Most requested' },
  { id: 'acne', number: '02', title: 'Acne & acne marks', copy: 'Support for active breakouts, lingering marks and the confidence that comes with a calmer complexion.', tag: 'Skin health' },
  { id: 'pigmentation', number: '03', title: 'Pigmentation care', copy: 'Thoughtful treatment planning for uneven tone, sun spots and post-inflammatory marks.', tag: 'Targeted care' },
  { id: 'rejuvenation', number: '04', title: 'Skin rejuvenation', copy: 'Gentle, progressive options for texture, dullness and a more rested-looking complexion.', tag: 'Fresh skin' },
];

const faqs = [
  { q: 'Will laser hair reduction remove hair permanently?', a: 'Laser hair reduction can help reduce hair growth progressively, but results vary by area, hair and skin type. Most people need a course of sessions and occasional maintenance. A consultation is the right place to discuss what may be realistic for you.' },
  { q: 'Is a consultation required before treatment?', a: 'Yes. We prefer to understand your skin, concerns, relevant medical history and expectations before suggesting any treatment. This keeps the plan personal and helps you make an informed decision.' },
  { q: 'How should I prepare for my first visit?', a: 'Bring a list of current skin products and medicines, and avoid making major changes just before your appointment. We will share any area-specific preparation guidance after understanding your concern.' },
  { q: 'Can I visit if I have sensitive skin?', a: 'Sensitive skin does not automatically rule out treatment. It does mean your plan should be paced carefully. We assess your skin in person and explain possible irritation, downtime and aftercare before proceeding.' },
  { q: 'How do I know which treatment is right for me?', a: 'There is no universal best treatment. The right option depends on your concern, skin type, history, time and comfort with downtime. Start with a consultation rather than choosing by a machine name or trend.' },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function AppContent() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [expandedTreatment, setExpandedTreatment] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', phone: '', concern: '', preferred: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = 'Skinette Clinic | Advanced Laser & Skin Care in Faridabad';
    const description = 'Skinette Clinic offers considered laser and skin care in Sector 16, Faridabad. Request a consultation for a personal treatment plan.';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement('meta'); meta.setAttribute('name', 'description'); document.head.appendChild(meta); }
    meta.setAttribute('content', description);
    const schema = {
      '@context': 'https://schema.org',
      '@type': ['MedicalBusiness', 'LocalBusiness'],
      name: 'Skinette Clinic',
      description,
      telephone: `+91-${phone}`,
      url: window.location.origin,
      priceRange: '₹₹',
      address: { '@type': 'PostalAddress', streetAddress: '2546 Opposite Sagar Cinema, HUDA Staff Colony, Sector 16', addressLocality: 'Faridabad', addressRegion: 'Haryana', postalCode: '121002', addressCountry: 'IN' },
      areaServed: 'Faridabad',
      aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: '255' },
    };
    let script = document.getElementById('skinette-schema') as HTMLScriptElement | null;
    if (!script) { script = document.createElement('script'); script.id = 'skinette-schema'; script.type = 'application/ld+json'; document.head.appendChild(script); }
    script.textContent = JSON.stringify(schema);
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const updateForm = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = 'Please share your name.';
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\D/g, ''))) next.phone = 'Enter a valid 10-digit mobile number.';
    if (!form.concern) next.concern = 'Choose a primary concern.';
    if (!form.preferred) next.preferred = 'Choose a preferred time.';
    setErrors(next);
    if (Object.keys(next).length === 0) setSubmitted(true);
  };

  return (
    <div className="clinic-shell grain min-h-[100dvh]">
      <div className="bg-primary px-4 py-2 text-center text-[11px] tracking-[.08em] text-primary-foreground">
        Consultations by appointment · Sector 16, Faridabad <span className="mx-2 text-secondary">/</span> <a data-testid="link-top-phone" href={`tel:${phone}`} className="underline-offset-4 hover:underline">Call {phone}</a>
      </div>
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex h-[76px] max-w-[1240px] items-center justify-between px-5 lg:px-8">
          <button data-testid="button-brand-home" onClick={() => scrollToId('home')} className="group text-left">
            <span className="block font-display text-[29px] leading-none tracking-[-.03em] text-primary">Skinette<span className="text-secondary">.</span></span>
            <span className="mt-1 block font-mono text-[8px] uppercase tracking-[.22em] text-muted-foreground">Advanced Laser &amp; Skin Care</span>
          </button>
           <nav aria-label="Primary navigation" className="hidden items-center gap-7 lg:flex">
            {[['Home', 'home'], ['About', 'about'], ['Treatments', 'treatments'], ['Why Skinette', 'why'], ['Reviews', 'reviews'], ['FAQ', 'faqs'], ['Contact', 'contact']].map(([label, id]) => <button data-testid={`button-nav-${id}`} key={id} onClick={() => scrollToId(id)} className="text-[13px] font-medium text-muted-foreground transition-colors hover:text-primary">{label}</button>)}
          </nav>
          <div className="hidden items-center gap-3 sm:flex">
            <a data-testid="link-header-whatsapp" href={whatsapp} target="_blank" rel="noreferrer" aria-label="Message Skinette Clinic on WhatsApp" className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-primary transition-colors hover:border-secondary hover:text-secondary"><MessageCircle size={17} /></a>
            <button data-testid="button-header-consultation" onClick={() => scrollToId('request')} className="rounded-full bg-primary px-5 py-3 text-[12px] font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5">Request a consultation <ArrowRight className="ml-2 inline" size={14} /></button>
          </div>
          <button data-testid="button-mobile-menu" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen((open) => !open)} className="rounded-full border border-border p-2 text-primary lg:hidden">{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
        {menuOpen && <div className="border-t border-border bg-background px-5 py-5 lg:hidden">
          <nav className="flex flex-col gap-4">
             {[['Home', 'home'], ['About', 'about'], ['Treatments', 'treatments'], ['Why Skinette', 'why'], ['Reviews', 'reviews'], ['FAQ', 'faqs'], ['Contact', 'contact']].map(([label, id]) => <button data-testid={`button-mobile-nav-${id}`} key={id} onClick={() => { closeMenu(); scrollToId(id); }} className="text-left text-lg text-primary">{label}</button>)}
            <button data-testid="button-mobile-consultation" onClick={() => { closeMenu(); scrollToId('request'); }} className="mt-2 w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground">Request a consultation</button>
          </nav>
        </div>}
      </header>

      <main>
        <section id="home" className="relative overflow-hidden">
          <div className="mx-auto grid max-w-[1240px] items-center gap-10 px-5 pb-20 pt-14 lg:grid-cols-[1.02fr_.98fr] lg:gap-16 lg:px-8 lg:pb-28 lg:pt-24">
            <div className="relative z-10 reveal">
              <div className="mb-7 flex items-center gap-3"><span className="h-px w-10 bg-secondary"></span><span className="eyebrow">A quieter way to care for your skin</span></div>
              <h1 className="max-w-[650px] font-display text-[clamp(3.6rem,7.4vw,7.1rem)] leading-[.89] tracking-[-.055em] text-primary">Skin confidence,<br /><em className="text-secondary">thoughtfully</em> treated.</h1>
              <p className="mt-8 max-w-[480px] text-[16px] leading-7 text-muted-foreground">Advanced laser and skin care in Faridabad, with plans shaped around your skin, your pace and what you want to feel comfortable in.</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <button data-testid="button-hero-consultation" onClick={() => scrollToId('request')} className="rounded-full bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5">Start with a consultation <ArrowRight className="ml-2 inline" size={15} /></button>
                <a data-testid="link-hero-whatsapp" href={whatsapp} target="_blank" rel="noreferrer" className="rounded-full border border-primary/20 px-6 py-4 text-center text-sm font-semibold text-primary transition-colors hover:border-secondary hover:text-secondary"><MessageCircle className="mr-2 inline" size={15} /> WhatsApp us</a>
              </div>
              <div className="mt-12 flex items-center gap-6 border-t border-border pt-5">
                <div><div className="font-display text-3xl text-primary">4.8<span className="text-secondary">/5</span></div><div className="mt-1 text-[11px] text-muted-foreground">Google rating</div></div>
                <div className="h-9 w-px bg-border"></div>
                <div><div className="font-display text-3xl text-primary">255</div><div className="mt-1 text-[11px] text-muted-foreground">Google reviews</div></div>
                <div className="h-9 w-px bg-border"></div>
                <div><div className="flex gap-1 text-secondary" aria-label="4.8 out of 5 stars"><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} className="text-secondary/50" /></div><div className="mt-2 text-[11px] text-muted-foreground">Community trust</div></div>
              </div>
            </div>
            <div className="relative reveal reveal-delay-2">
              <div className="absolute -right-12 -top-12 h-52 w-52 rounded-full bg-accent/70 blur-3xl"></div>
              <div className="relative ml-auto max-w-[540px] overflow-hidden rounded-[180px_180px_18px_18px] bg-muted shadow-2xl shadow-primary/10">
                <img data-testid="img-hero-skin" src="/skinette-hero.jpg" alt="Woman with naturally luminous skin in soft, warm clinic light" className="h-[580px] w-full object-cover object-center lg:h-[690px]" />
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-xl border border-white/30 bg-primary/80 p-4 text-primary-foreground backdrop-blur-md">
                  <div><div className="font-display text-xl">Care, without the noise.</div><div className="mt-1 text-[11px] text-primary-foreground/70">Personalised plans. Honest conversations.</div></div>
                  <Sparkles className="text-secondary" size={21} />
                </div>
              </div>
              <div className="absolute -bottom-5 -left-2 rounded-xl border border-border bg-background px-4 py-3 shadow-xl shadow-primary/5 sm:-left-12"><div className="flex items-center gap-2 text-primary"><ShieldCheck size={16} className="text-secondary" /><span className="text-xs font-semibold">Appointment-led care</span></div><div className="mt-1 pl-6 text-[10px] text-muted-foreground">A plan before a procedure</div></div>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-accent/45">
          <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-6 px-5 py-7 sm:grid-cols-3 lg:px-8">
            {[['01', 'Listen first', 'We begin with your concern, not a package.'], ['02', 'Explain clearly', 'You will know what to expect before you decide.'], ['03', 'Go at your pace', 'Your skin and comfort set the rhythm.']].map(([number, title, copy]) => <div data-testid={`trust-item-${number}`} key={number} className="flex gap-4"><span className="font-mono text-[10px] text-secondary">{number}</span><div><h2 className="text-sm font-semibold text-primary">{title}</h2><p className="mt-1 text-xs leading-5 text-muted-foreground">{copy}</p></div></div>)}
          </div>
        </section>

        <section id="about" className="mx-auto max-w-[1240px] px-5 py-24 lg:px-8 lg:py-36">
          <div className="grid gap-14 lg:grid-cols-[.76fr_1.24fr] lg:gap-28">
            <div><span className="eyebrow">01 / About Skinette</span><h2 className="mt-6 font-display text-5xl leading-[.95] tracking-[-.04em] text-primary lg:text-7xl">A clinic that makes room <em className="text-secondary">for you.</em></h2></div>
            <div className="pt-2"><p className="max-w-[600px] text-[21px] leading-[1.35] text-primary">Skin care is personal. We built Skinette to feel that way — unhurried, discreet and grounded in an honest assessment of your skin.</p><p className="mt-7 max-w-[560px] text-[15px] leading-7 text-muted-foreground">Our role is to help you understand your options, set realistic expectations and choose care that fits your life. No pressure to bundle treatments. No one-size-fits-all promises. Just a considered next step, in a warm private clinic in Sector 16.</p><button data-testid="button-about-treatments" onClick={() => scrollToId('treatments')} className="mt-8 border-b border-secondary pb-2 text-sm font-semibold text-primary">Explore our approach <ArrowRight className="ml-2 inline" size={14} /></button></div>
          </div>
        </section>

        <section id="treatments" className="bg-primary px-5 py-24 text-primary-foreground lg:px-8 lg:py-32">
          <div className="mx-auto max-w-[1240px]">
            <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end"><div><span className="eyebrow text-primary-foreground/60">02 / Treatment menu</span><h2 className="mt-5 max-w-[570px] font-display text-5xl leading-[.95] tracking-[-.04em] lg:text-7xl">Care with a <em className="text-secondary">point of view.</em></h2></div><p className="max-w-[300px] text-sm leading-6 text-primary-foreground/60">Every treatment begins with a conversation. Options depend on your skin, history and goals.</p></div>
            <div className="mt-16 border-t border-primary-foreground/20">
              {treatments.map((treatment) => <div data-testid={`treatment-row-${treatment.id}`} key={treatment.id} className="border-b border-primary-foreground/20">
                <button data-testid={`button-treatment-${treatment.id}`} onClick={() => setExpandedTreatment(expandedTreatment === treatment.id ? null : treatment.id)} className="flex w-full items-center justify-between py-6 text-left transition-colors hover:text-secondary">
                  <div className="flex items-center gap-5 sm:gap-10"><span className="font-mono text-[10px] text-secondary">{treatment.number}</span><span className="font-display text-3xl sm:text-4xl">{treatment.title}</span><span className="hidden rounded-full border border-primary-foreground/25 px-3 py-1 font-mono text-[9px] uppercase tracking-[.12em] text-primary-foreground/60 md:block">{treatment.tag}</span></div>
                  <span className="ml-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary-foreground/30">{expandedTreatment === treatment.id ? <Minus size={15} /> : <Plus size={15} />}</span>
                </button>
                {expandedTreatment === treatment.id && <div className="max-w-[610px] pb-7 pl-9 text-sm leading-6 text-primary-foreground/65 sm:pl-[76px]">{treatment.copy} <button data-testid={`button-treatment-request-${treatment.id}`} onClick={() => scrollToId('request')} className="ml-1 font-semibold text-secondary underline-offset-4 hover:underline">Discuss this with us <ArrowRight className="ml-1 inline" size={13} /></button></div>}
              </div>)}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1240px] px-5 py-24 lg:px-8 lg:py-32">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
            <div className="relative"><div className="absolute -left-5 -top-5 h-32 w-32 rounded-full border border-secondary/40"></div><img data-testid="img-treatment-feature" src="/skinette-clinic-interior.jpg" alt="Sunlit interior detail of Skinette Clinic with a plum chair and warm rose-gold light" className="relative h-[470px] w-full rounded-[16px_140px_16px_16px] object-cover" /><span className="absolute bottom-5 left-5 rounded-full bg-background/90 px-4 py-2 font-mono text-[9px] uppercase tracking-[.12em] text-primary">Featured care</span></div>
            <div><span className="eyebrow">03 / Featured treatment</span><h2 className="mt-5 font-display text-5xl leading-[.94] tracking-[-.04em] text-primary lg:text-7xl">Laser hair reduction, <em className="text-secondary">without the rush.</em></h2><p className="mt-7 max-w-[520px] text-[15px] leading-7 text-muted-foreground">We focus on a tailored course rather than a quick promise. During your consultation, we discuss the area, your hair and skin type, likely number of sessions, preparation and aftercare.</p><div className="mt-8 grid max-w-[520px] gap-4 sm:grid-cols-2">{['Personal area assessment', 'Clear session guidance', 'Comfort-led pacing', 'Aftercare you can follow'].map((item) => <div data-testid={`feature-check-${item.replaceAll(' ', '-')}`} key={item} className="flex items-center gap-3 text-sm text-primary"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-secondary"><Check size={12} /></span>{item}</div>)}</div><button data-testid="button-feature-consultation" onClick={() => scrollToId('request')} className="mt-9 rounded-full bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground">See if it is right for you <ArrowRight className="ml-2 inline" size={14} /></button></div>
          </div>
        </section>

        <section id="why" className="border-y border-border bg-accent/35">
          <div className="mx-auto max-w-[1240px] px-5 py-24 lg:px-8 lg:py-32"><div className="grid gap-14 lg:grid-cols-[.9fr_1.1fr]"><div><span className="eyebrow">04 / Why Skinette</span><h2 className="mt-5 font-display text-5xl leading-[.95] tracking-[-.04em] text-primary lg:text-7xl">The details matter <em className="text-secondary">here.</em></h2></div><div className="grid gap-0 sm:grid-cols-2">{[['01', Stethoscope, 'Assessment over assumption', 'We take time to understand the concern before suggesting a path.'], ['02', HeartHandshake, 'Comfort is part of care', 'We talk through sensations, downtime and aftercare without glossing over them.'], ['03', ShieldCheck, 'Expectations stay honest', 'Progress can take time. We explain what may help and what cannot be promised.'], ['04', Clock3, 'Your time is respected', 'Appointment-led visits, clear guidance and space for your questions.']].map(([num, Icon, title, copy]: [string, LucideIcon, string, string]) => <div data-testid={`reason-${num}`} key={num} className="border-t border-border py-7 sm:px-7 sm:first:pl-0 sm:nth-odd:pl-0"><div className="flex items-center justify-between"><span className="font-mono text-[10px] text-secondary">{num}</span><Icon size={20} strokeWidth={1.4} className="text-secondary" /></div><h3 className="mt-7 font-display text-2xl text-primary">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p></div>)}</div></div></div>
        </section>

        <section id="process" className="mx-auto max-w-[1240px] px-5 py-24 lg:px-8 lg:py-32">
          <div className="mb-14 flex flex-col justify-between gap-5 lg:flex-row lg:items-end"><div><span className="eyebrow">05 / Your first visit</span><h2 className="mt-5 font-display text-5xl leading-[.95] tracking-[-.04em] text-primary lg:text-7xl">A simple place <em className="text-secondary">to begin.</em></h2></div><p className="max-w-[320px] text-sm leading-6 text-muted-foreground">No homework. No pressure. Just a thoughtful conversation about your skin.</p></div>
          <div className="grid gap-0 border-y border-border md:grid-cols-3">{[['01', 'Request a time', 'Send us your details through the form or WhatsApp. We will get back to confirm your visit.'], ['02', 'Meet & understand', 'We listen to your concern, assess your skin and discuss options in plain language.'], ['03', 'Leave with clarity', 'You will have a considered next step — and the space to decide if and when to take it.']].map(([num, title, copy]) => <div data-testid={`process-step-${num}`} key={num} className="border-b border-border py-8 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0"><span className="font-mono text-[10px] text-secondary">{num}</span><h3 className="mt-8 font-display text-3xl text-primary">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p></div>)}</div>
        </section>

        <section id="technology" className="bg-primary px-5 py-24 text-primary-foreground lg:px-8 lg:py-28"><div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-24"><div><span className="eyebrow text-primary-foreground/60">06 / Technology</span><h2 className="mt-5 font-display text-5xl leading-[.95] tracking-[-.04em] lg:text-6xl">Tools are important.<br /><em className="text-secondary">Judgement is too.</em></h2></div><div className="border-t border-primary-foreground/20 pt-7"><p className="max-w-[610px] text-xl leading-8 text-primary-foreground/80">We use technology as part of a wider clinical conversation — never as a substitute for looking, listening and adapting the plan to you.</p><p className="mt-6 max-w-[580px] text-sm leading-6 text-primary-foreground/55">During your consultation, we can explain which approach may be appropriate for your concern, what it involves and what kind of improvement may be realistic. Technology and treatment suitability are assessed individually.</p><div className="mt-10 flex flex-wrap gap-3">{['Tailored protocols', 'Skin-first assessment', 'Clear aftercare', 'Progress over promises'].map((item) => <span data-testid={`technology-pill-${item.replaceAll(' ', '-')}`} key={item} className="rounded-full border border-primary-foreground/20 px-4 py-2 font-mono text-[10px] uppercase tracking-[.1em] text-primary-foreground/70">{item}</span>)}</div></div></div></section>

        <section id="reviews" className="mx-auto max-w-[1240px] px-5 py-24 lg:px-8 lg:py-32"><div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr]"><div><span className="eyebrow">07 / From the community</span><div className="mt-7 font-display text-7xl text-primary">4.8<span className="text-secondary">/5</span></div><p className="mt-2 text-sm text-muted-foreground">Based on 255 Google reviews</p><div className="mt-5 flex gap-1 text-secondary"><Star size={15} fill="currentColor" /><Star size={15} fill="currentColor" /><Star size={15} fill="currentColor" /><Star size={15} fill="currentColor" /><Star size={15} className="text-secondary/45" /></div></div><div><div className="mb-5 flex items-center justify-between border-b border-border pb-4"><h2 className="font-display text-4xl text-primary">A few words, <em className="text-secondary">soon.</em></h2><span className="rounded-full bg-accent px-3 py-1 font-mono text-[9px] uppercase tracking-[.1em] text-primary">Placeholder</span></div><div className="grid gap-5 md:grid-cols-2"><div data-testid="review-placeholder-1" className="rounded-2xl border border-dashed border-secondary/60 bg-accent/30 p-7"><MessageCircle className="text-secondary" size={20} /><p className="mt-5 text-sm leading-6 text-muted-foreground">Verified review excerpts will appear here once approved for publication. We do not invent patient stories.</p></div><div data-testid="review-placeholder-2" className="rounded-2xl border border-dashed border-secondary/60 bg-accent/30 p-7"><HeartHandshake className="text-secondary" size={20} /><p className="mt-5 text-sm leading-6 text-muted-foreground">We are collecting permission to share real experiences in this space, with context and care.</p></div></div></div></div></section>

        <section id="results" className="bg-accent/35 px-5 py-24 lg:px-8 lg:py-28"><div className="mx-auto max-w-[1240px]"><div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end"><div><span className="eyebrow">08 / What progress can look like</span><h2 className="mt-5 font-display text-5xl leading-[.95] tracking-[-.04em] text-primary lg:text-6xl">No before-and-after<br /><em className="text-secondary">shortcuts.</em></h2></div><p className="max-w-[360px] text-sm leading-6 text-muted-foreground">Real results vary. We will only share patient imagery with consent and useful context.</p></div><div className="mt-14 grid gap-5 md:grid-cols-2"><div data-testid="before-after-placeholder-1" className="relative grid h-[260px] grid-cols-2 overflow-hidden rounded-2xl border border-dashed border-secondary/70 bg-background"><div className="flex items-center justify-center border-r border-dashed border-secondary/50"><span className="font-mono text-[10px] uppercase tracking-[.14em] text-muted-foreground">Before image<br />placeholder</span></div><div className="flex items-center justify-center"><span className="font-mono text-[10px] uppercase tracking-[.14em] text-muted-foreground">After image<br />placeholder</span></div><span className="absolute left-1/2 top-4 -translate-x-1/2 rounded-full bg-secondary px-3 py-1 font-mono text-[9px] uppercase tracking-[.1em] text-primary">Illustrative placeholder</span></div><div className="flex flex-col justify-center rounded-2xl bg-primary p-8 text-primary-foreground"><Sparkles className="text-secondary" size={22} /><h3 className="mt-6 font-display text-3xl">Your skin has a story.</h3><p className="mt-3 max-w-[430px] text-sm leading-6 text-primary-foreground/65">Outcomes depend on your starting point, treatment plan, skin response and consistency. A consultation helps replace guesswork with context.</p><p className="mt-6 font-mono text-[9px] uppercase tracking-[.12em] text-primary-foreground/45">Images shown on this page are placeholders, not patient results.</p></div></div></div></section>

        <section id="faqs" className="mx-auto max-w-[1000px] px-5 py-24 lg:py-32"><div className="text-center"><span className="eyebrow">09 / Questions, answered</span><h2 className="mt-5 font-display text-5xl leading-[.95] tracking-[-.04em] text-primary lg:text-7xl">A little more <em className="text-secondary">clarity.</em></h2><p className="mx-auto mt-6 max-w-[470px] text-sm leading-6 text-muted-foreground">Educational guidance to help you prepare. It is not a diagnosis or a substitute for an in-person consultation.</p></div><div className="mt-14 border-t border-border">{faqs.map((faq, index) => <div data-testid={`faq-item-${index}`} key={faq.q} className="border-b border-border"><button data-testid={`button-faq-${index}`} onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index} className="flex w-full items-center justify-between gap-5 py-6 text-left"><span className="font-display text-2xl text-primary">{faq.q}</span>{openFaq === index ? <ChevronDown className="shrink-0 text-secondary" size={20} /> : <ChevronDown className="shrink-0 rotate-[-90deg] text-muted-foreground" size={20} />}</button>{openFaq === index && <p data-testid={`faq-answer-${index}`} className="max-w-[760px] pb-7 pr-10 text-sm leading-7 text-muted-foreground">{faq.a}</p>}</div>)}</div></section>

        <section id="request" className="bg-secondary/25 px-5 py-24 lg:px-8 lg:py-32"><div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-24"><div><span className="eyebrow">10 / Request a consultation</span><h2 className="mt-5 font-display text-5xl leading-[.94] tracking-[-.04em] text-primary lg:text-7xl">Ready when<br /><em className="text-secondary">you are.</em></h2><p className="mt-7 max-w-[360px] text-sm leading-6 text-muted-foreground">Share a few details and our team will get back to confirm a suitable time. This is a request, not an instant booking.</p><div className="mt-10 flex flex-col gap-4 text-sm text-primary"><a data-testid="link-request-phone" href={`tel:${phone}`} className="flex items-center gap-3 hover:text-secondary"><Phone size={16} className="text-secondary" /> {phone}</a><a data-testid="link-request-whatsapp" href={whatsapp} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-secondary"><MessageCircle size={16} className="text-secondary" /> Message on WhatsApp</a></div></div><div className="rounded-2xl bg-background p-6 shadow-xl shadow-primary/5 sm:p-9">{submitted ? <div data-testid="status-form-success" className="flex min-h-[390px] flex-col items-start justify-center"><div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-secondary"><Check size={22} /></div><h3 className="mt-7 font-display text-4xl text-primary">Request received.</h3><p className="mt-3 max-w-[390px] text-sm leading-6 text-muted-foreground">Thank you, {form.name.split(' ')[0] || 'there'}. This demo form has captured your request locally. To confirm your appointment, please call or WhatsApp us directly.</p><div className="mt-7 flex flex-wrap gap-3"><a data-testid="link-success-call" href={`tel:${phone}`} className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">Call the clinic</a><button data-testid="button-new-request" onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', concern: '', preferred: '' }); }} className="rounded-full border border-border px-5 py-3 text-sm font-semibold text-primary">Send another request</button></div></div> : <form onSubmit={submitForm} noValidate><div className="grid gap-5 sm:grid-cols-2"><label className="block sm:col-span-2"><span className="mb-2 block text-xs font-semibold text-primary">Your name</span><input data-testid="input-name" value={form.name} onChange={(event) => updateForm('name', event.target.value)} className={`w-full rounded-lg border bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-secondary ${errors.name ? 'border-destructive' : 'border-border'}`} placeholder="How should we address you?" />{errors.name && <span data-testid="error-name" className="mt-1 block text-xs text-destructive">{errors.name}</span>}</label><label className="block"><span className="mb-2 block text-xs font-semibold text-primary">Mobile number</span><input data-testid="input-phone" inputMode="numeric" value={form.phone} onChange={(event) => updateForm('phone', event.target.value)} className={`w-full rounded-lg border bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-secondary ${errors.phone ? 'border-destructive' : 'border-border'}`} placeholder="10-digit number" />{errors.phone && <span data-testid="error-phone" className="mt-1 block text-xs text-destructive">{errors.phone}</span>}</label><label className="block"><span className="mb-2 block text-xs font-semibold text-primary">Primary concern</span><select data-testid="select-concern" value={form.concern} onChange={(event) => updateForm('concern', event.target.value)} className={`w-full appearance-none rounded-lg border bg-background px-4 py-3 text-sm outline-none focus:border-secondary ${errors.concern ? 'border-destructive' : 'border-border'}`}><option value="">Select one</option>{treatments.map((item) => <option key={item.id} value={item.title}>{item.title}</option>)}<option value="Not sure yet">Not sure yet</option></select>{errors.concern && <span data-testid="error-concern" className="mt-1 block text-xs text-destructive">{errors.concern}</span>}</label><label className="block sm:col-span-2"><span className="mb-2 block text-xs font-semibold text-primary">Preferred time</span><select data-testid="select-preferred-time" value={form.preferred} onChange={(event) => updateForm('preferred', event.target.value)} className={`w-full appearance-none rounded-lg border bg-background px-4 py-3 text-sm outline-none focus:border-secondary ${errors.preferred ? 'border-destructive' : 'border-border'}`}><option value="">Choose a broad preference</option><option value="Morning">Morning</option><option value="Afternoon">Afternoon</option><option value="Evening">Evening</option></select>{errors.preferred && <span data-testid="error-preferred" className="mt-1 block text-xs text-destructive">{errors.preferred}</span>}</label></div><button data-testid="button-submit-consultation" type="submit" className="mt-7 w-full rounded-full bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5">Request a consultation <ArrowRight className="ml-2 inline" size={14} /></button><p className="mt-4 text-center text-[11px] leading-5 text-muted-foreground">We will use these details only to respond to your request. No instant payment or treatment commitment.</p></form>}</div></div></section>

        <section id="contact" className="mx-auto max-w-[1240px] px-5 py-24 lg:px-8 lg:py-32"><div className="grid gap-12 lg:grid-cols-[1fr_1fr]"><div><span className="eyebrow">11 / Find us</span><h2 className="mt-5 max-w-[520px] font-display text-5xl leading-[.94] tracking-[-.04em] text-primary lg:text-7xl">Close to home.<br /><em className="text-secondary">Easy to reach.</em></h2><address className="mt-8 flex max-w-[390px] gap-4 not-italic text-sm leading-6 text-muted-foreground"><MapPin className="mt-1 shrink-0 text-secondary" size={18} />2546 Opposite Sagar Cinema, HUDA Staff Colony, Sector 16, Faridabad, Haryana 121002</address><div className="mt-7 flex flex-wrap gap-3"><a data-testid="link-contact-call" href={`tel:${phone}`} className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"><Phone className="mr-2 inline" size={14} /> Call clinic</a><a data-testid="link-contact-whatsapp" href={whatsapp} target="_blank" rel="noreferrer" className="rounded-full border border-border px-5 py-3 text-sm font-semibold text-primary"><MessageCircle className="mr-2 inline" size={14} /> WhatsApp</a></div></div><div className="relative min-h-[330px] overflow-hidden rounded-2xl bg-primary p-8 text-primary-foreground"><div className="absolute right-[-5%] top-[-22%] h-80 w-80 rounded-full border border-secondary/30"></div><div className="absolute right-[9%] top-[-8%] h-60 w-60 rounded-full border border-secondary/20"></div><div className="relative flex h-full flex-col justify-between"><div><span className="eyebrow text-primary-foreground/55">Skinette Clinic / Sector 16</span><h3 className="mt-6 max-w-[300px] font-display text-4xl leading-none">A warm room for honest skin conversations.</h3></div><div className="flex flex-wrap gap-x-8 gap-y-3 border-t border-primary-foreground/20 pt-5 text-xs text-primary-foreground/65"><span className="flex items-center gap-2"><CalendarDays size={14} className="text-secondary" /> Appointment-led</span><span className="flex items-center gap-2"><MapPin size={14} className="text-secondary" /> Faridabad</span></div></div></div></div></section>
      </main>
       <footer className="bg-primary px-5 py-12 text-primary-foreground lg:px-8"><div className="mx-auto max-w-[1240px]"><div className="flex flex-col justify-between gap-10 border-b border-primary-foreground/20 pb-10 lg:flex-row"><div><button data-testid="button-footer-home" onClick={() => scrollToId('home')} className="text-left"><span className="block font-display text-4xl leading-none">Skinette<span className="text-secondary">.</span></span><span className="mt-2 block font-mono text-[8px] uppercase tracking-[.22em] text-primary-foreground/55">Advanced Laser &amp; Skin Care</span></button><p className="mt-6 max-w-[300px] text-sm leading-6 text-primary-foreground/55">A calm, considered skin clinic in the heart of Sector 16, Faridabad.</p></div><div className="grid grid-cols-2 gap-x-14 gap-y-4 text-sm text-primary-foreground/65"><button data-testid="button-footer-treatments" onClick={() => scrollToId('treatments')} className="text-left hover:text-secondary">Treatments</button><button data-testid="button-footer-reviews" onClick={() => scrollToId('reviews')} className="text-left hover:text-secondary">Reviews</button><button data-testid="button-footer-faqs" onClick={() => scrollToId('faqs')} className="text-left hover:text-secondary">FAQs</button><button data-testid="button-footer-contact" onClick={() => scrollToId('contact')} className="text-left hover:text-secondary">Contact</button></div></div><div className="flex flex-col justify-between gap-4 pt-6 text-[11px] text-primary-foreground/45 sm:flex-row"><span>© {new Date().getFullYear()} Skinette Clinic. All rights reserved.</span><span>Information on this website is educational and not a diagnosis.</span></div></div></footer>
      <a data-testid="link-floating-whatsapp" href={whatsapp} target="_blank" rel="noreferrer" aria-label="Message Skinette Clinic on WhatsApp" className="fixed bottom-5 right-5 z-30 flex items-center gap-2 rounded-full bg-secondary px-4 py-3 text-xs font-semibold text-primary shadow-xl shadow-primary/20 transition-transform hover:-translate-y-1"><MessageCircle size={17} /> <span className="hidden sm:inline">WhatsApp us</span></a>
    </div>
  );
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><AppContent /><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;