import React, { useState, useEffect, useRef } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import {
    Phone,
    Mail,
    MapPin,
    Clock,
    Check,
    ChevronDown,
    ChevronUp,
    Star,
    Search,
    Menu as MenuIcon,
    X,
    ArrowRight,
    Calendar,
    Users,
    Award,
    Sparkles,
    ChefHat,
    ShieldCheck,
    ExternalLink,
    FileCheck
} from 'lucide-react';

// Swiper CSS imports
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Types for Props from Laravel Controller
interface MenuItem {
    id: number;
    name: string;
    slug: string;
    category: string;
    description: string;
    price_from: number;
    image_path: string;
    is_best_seller: boolean;
    tags: string[];
}

interface PortfolioItem {
    id: number;
    title: string;
    category: string;
    image_path: string;
    description: string;
}

interface TestimonialItem {
    id: number;
    customer_name: string;
    customer_title: string;
    customer_photo: string;
    company_logo: string | null;
    rating: number;
    review: string;
}

interface FaqItem {
    id: number;
    question: string;
    answer: string;
    order_num: number;
}

interface ServiceItem {
    id: number;
    title: string;
    description: string;
    icon_name: string;
    order_num: number;
}

interface PartnerItem {
    id: number;
    name: string;
    logo_path: string | null;
    order_num: number;
}

interface CertificateItem {
    id: number;
    title: string;
    issuer: string;
    image_path: string;
    icon_name: string;
    order_num: number;
}

interface WelcomeProps {
    menus: MenuItem[];
    portfolios: PortfolioItem[];
    testimonials: TestimonialItem[];
    faqs: FaqItem[];
    services: ServiceItem[];
    partners: PartnerItem[];
    certificates: CertificateItem[];
    settings: Record<string, string>;
}

// Zod Validation Schema for Quote Form
const quoteSchema = z.object({
    name: z.string().min(3, { message: 'Nama minimal terdiri dari 3 karakter' }),
    email: z.string().email({ message: 'Alamat email tidak valid' }),
    phone: z.string().min(8, { message: 'Nomor telepon minimal 8 digit' }),
    event_type: z.string().min(1, { message: 'Silakan pilih jenis acara' }),
    event_date: z.string().min(1, { message: 'Silakan tentukan tanggal acara' }),
    guests_count: z.number().min(10, { message: 'Minimal 10 tamu undangan' }),
    notes: z.string().optional(),
});

type QuoteFormValues = z.infer<typeof quoteSchema>;

export default function Welcome({
    menus = [],
    portfolios = [],
    testimonials = [],
    faqs = [],
    services = [],
    partners = [],
    certificates = [],
    settings = {}
}: WelcomeProps) {
    // State management
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedMenuCategory, setSelectedMenuCategory] = useState('all');
    const [searchMenuQuery, setSearchMenuQuery] = useState('');
    const [selectedGalleryCategory, setSelectedGalleryCategory] = useState('all');
    const [lightboxImage, setLightboxImage] = useState<string | null>(null);
    const [selectedCertificate, setSelectedCertificate] = useState<CertificateItem | null>(null);
    const [activeDetailMenu, setActiveDetailMenu] = useState<MenuItem | null>(null);
    const [scrolled, setScrolled] = useState(false);

    // Before After Slider State
    const [sliderPosition, setSliderPosition] = useState(50);
    const sliderContainerRef = useRef<HTMLDivElement>(null);

    // Animate stats numbers
    const [stats, setStats] = useState({ years: 0, events: 0, partners: 0, sat: 0 });
    const statsRef = useRef<HTMLDivElement>(null);
    const [statsTriggered, setStatsTriggered] = useState(false);

    // Monitor scroll for sticky navbar
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Statistics Counter Animation Trigger
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !statsTriggered) {
                    setStatsTriggered(true);
                    let yearsVal = 0;
                    let eventsVal = 0;
                    let partnersVal = 0;
                    let satVal = 0;

                    const yearsTarget = Number(getSetting('stats_years', '40'));
                    const eventsTarget = Number(getSetting('stats_events', '5000'));
                    const partnersTarget = Number(getSetting('stats_partners', '300'));
                    const satTarget = Number(getSetting('stats_satisfaction', '98'));

                    const interval = setInterval(() => {
                        let completed = true;
                        if (yearsVal < yearsTarget) { yearsVal += 1; completed = false; }
                        if (eventsVal < eventsTarget) { eventsVal += Math.ceil(eventsTarget / 50); completed = false; }
                        if (partnersVal < partnersTarget) { partnersVal += Math.ceil(partnersTarget / 30); completed = false; }
                        if (satVal < satTarget) { satVal += 2; completed = false; }

                        if (yearsVal > yearsTarget) yearsVal = yearsTarget;
                        if (eventsVal > eventsTarget) eventsVal = eventsTarget;
                        if (partnersVal > partnersTarget) partnersVal = partnersTarget;
                        if (satVal > satTarget) satVal = satTarget;

                        setStats({ years: yearsVal, events: eventsVal, partners: partnersVal, sat: satVal });
                        if (completed) clearInterval(interval);
                    }, 30);
                }
            },
            { threshold: 0.2 }
        );

        if (statsRef.current) {
            observer.observe(statsRef.current);
        }
        return () => observer.disconnect();
    }, [statsTriggered, settings]);

    // Helper to get settings keys
    const getSetting = (key: string, defaultValue: string) => {
        return settings[key] !== undefined && settings[key] !== null ? settings[key] : defaultValue;
    };

    // Helper to map icon components
    const getIconComponent = (name: string) => {
        switch (name) {
            case 'Award':
                return <Award className="w-8 h-8 text-secondary" />;
            case 'Users':
                return <Users className="w-8 h-8 text-secondary" />;
            case 'Clock':
                return <Clock className="w-8 h-8 text-secondary" />;
            case 'ChefHat':
                return <ChefHat className="w-8 h-8 text-secondary" />;
            case 'Sparkles':
                return <Sparkles className="w-8 h-8 text-secondary" />;
            case 'ShieldCheck':
                return <ShieldCheck className="w-8 h-8 text-secondary" />;
            case 'Check':
                return <Check className="w-8 h-8 text-secondary" />;
            case 'Phone':
                return <Phone className="w-8 h-8 text-secondary" />;
            default:
                return <Sparkles className="w-8 h-8 text-secondary" />;
        }
    };

    // Handle Before-After Slider Drag
    const handleSliderMove = (clientX: number) => {
        if (!sliderContainerRef.current) return;
        const rect = sliderContainerRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
        setSliderPosition(percentage);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        handleSliderMove(e.touches[0].clientX);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (e.buttons === 1) {
            handleSliderMove(e.clientX);
        }
    };

    // React Hook Form for Quote Request
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<QuoteFormValues>({
        resolver: zodResolver(quoteSchema),
        defaultValues: {
            guests_count: 50,
        }
    });

    const onSubmit = (formData: QuoteFormValues) => {
        router.post('/quote-request', formData as any, {
            onSuccess: () => {
                // Save lead, then direct to WhatsApp
                const waNumber = getSetting('company_wa', '6281234567890');
                const message = `Halo Dapoer Ratu Catering, saya ingin meminta penawaran & berkonsultasi mengenai catering premium.

*Detail Acara:*
• *Nama:* ${formData.name}
• *Telepon:* ${formData.phone}
• *Email:* ${formData.email}
• *Jenis Acara:* ${formData.event_type}
• *Tanggal Acara:* ${formData.event_date}
• *Jumlah Tamu:* ${formData.guests_count} Pax
• *Catatan:* ${formData.notes || '-'}

Mohon segera hubungi saya kembali untuk mendiskusikan menu. Terima kasih!`;
                const encodedText = encodeURIComponent(message);
                window.open(`https://wa.me/${waNumber}?text=${encodedText}`, '_blank');
                reset();
            },
            onError: (err) => {
                alert('Terjadi kesalahan saat memproses data Anda. Silakan coba kembali.');
            }
        });
    };

    // Filtering menus
    const filteredMenus = menus.filter(menu => {
        const matchesCategory = selectedMenuCategory === 'all' || menu.category === selectedMenuCategory;
        const matchesSearch = menu.name.toLowerCase().includes(searchMenuQuery.toLowerCase()) ||
            menu.description.toLowerCase().includes(searchMenuQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Filtering portfolios
    const filteredPortfolios = portfolios.filter(port => {
        return selectedGalleryCategory === 'all' || port.category === selectedGalleryCategory;
    });

    // Format Rupiah function
    const formatIDR = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price);
    };

    return (
        <div className="min-h-screen bg-cream text-darktext font-sans scroll-smooth select-none selection:bg-secondary/30">
            <Head>
                <title>Dapoer Ratu Catering Premium - Wedding, Corporate & Private Event</title>
                <meta name="description" content="Menyajikan pengalaman kuliner premium. Catering bintang lima terbaik di Indonesia untuk pernikahan, event korporat, BUMN, dan private party." />
                <meta property="og:title" content="Dapoer Ratu Catering Premium" />
                <meta property="og:description" content="Kuliner premium untuk momen tak terlupakan. Layanan katering profesional di Indonesia." />
                <meta property="og:image" content="/images/hero_background.webp" />
                <meta name="robots" content="index, follow" />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FoodEstablishment",
                        "name": "Dapoer Ratu Catering Premium",
                        "image": "/images/hero_background.webp",
                        "@id": "https://dapoerratucatering.com",
                        "url": "https://dapoerratucatering.com",
                        "telephone": getSetting('company_phone', '+6281234567890'),
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "Jl. Senopati No.45, Kebayoran Baru",
                            "addressLocality": "Jakarta Selatan",
                            "postalCode": "12190",
                            "addressCountry": "ID"
                        },
                        "geo": {
                            "@type": "GeoCoordinates",
                            "latitude": -6.2235,
                            "longitude": 106.8085
                        },
                        "openingHoursSpecification": [
                            {
                                "@type": "OpeningHoursSpecification",
                                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                                "opens": "08:00",
                                "closes": "18:00"
                            },
                            {
                                "@type": "OpeningHoursSpecification",
                                "dayOfWeek": ["Saturday", "Sunday"],
                                "opens": "09:00",
                                "closes": "17:00"
                            }
                        ],
                        "menu": "https://dapoerratucatering.com#menu",
                        "acceptsReservations": "True"
                    })}
                </script>
            </Head>

            {/* Sticky Navigation Bar */}
            <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-primary/95 shadow-md py-4 backdrop-blur-md border-b border-secondary/20' : 'bg-transparent py-6'}`}>
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    <a href="#" className="flex items-center space-x-3 group">
                        <img src="/images/logo_original.png" alt="Dapoer Ratu Logo" className="w-10 h-10 object-contain group-hover:scale-105 transition-transform" />
                        <div className="flex flex-col">
                            <span className="font-playfair text-xl font-bold tracking-wider text-secondary leading-none">DAPOER RATU</span>
                            <span className="text-[9px] tracking-[0.25em] text-white font-light mt-1">PREMIUM CATERING</span>
                        </div>
                    </a>

                    {/* Desktop Navigation Links */}
                    <div className="hidden lg:flex items-center space-x-8">
                        <a href="#layanan" className="text-sm font-medium text-white hover:text-secondary transition-colors">Layanan</a>
                        <a href="#menu" className="text-sm font-medium text-white hover:text-secondary transition-colors">Menu Favorit</a>
                        <a href="#keunggulan" className="text-sm font-medium text-white hover:text-secondary transition-colors">Keunggulan</a>
                        <a href="#gallery" className="text-sm font-medium text-white hover:text-secondary transition-colors">Galeri</a>
                        <a href="#faq" className="text-sm font-medium text-white hover:text-secondary transition-colors">FAQ</a>
                        <a href="#quote" className="px-6 py-2.5 text-xs font-semibold text-primary bg-secondary rounded-full hover:bg-white hover:scale-103 transition-all">Pesan Sekarang</a>
                    </div>

                    {/* Mobile Menu Icon */}
                    <button className="lg:hidden text-white hover:text-secondary" onClick={() => setIsMenuOpen(true)}>
                        <MenuIcon className="w-6 h-6" />
                    </button>
                </div>
            </nav>

            {/* Mobile Navigation Drawer */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'tween', duration: 0.3 }}
                        className="fixed inset-0 z-50 bg-primary flex flex-col p-8 text-white lg:hidden"
                    >
                        <div className="flex justify-between items-center mb-12">
                            <div className="flex items-center space-x-2">
                                <img src="/images/logo_original.png" alt="Dapoer Ratu Logo" className="w-8 h-8 object-contain" />
                                <span className="font-playfair text-xl font-bold text-secondary tracking-widest">DAPOER RATU</span>
                            </div>
                            <button onClick={() => setIsMenuOpen(false)} className="text-white hover:text-secondary">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="flex flex-col space-y-6 text-lg font-light">
                            <a href="#layanan" onClick={() => setIsMenuOpen(false)} className="hover:text-secondary">Layanan Kami</a>
                            <a href="#menu" onClick={() => setIsMenuOpen(false)} className="hover:text-secondary">Menu Andalan</a>
                            <a href="#keunggulan" onClick={() => setIsMenuOpen(false)} className="hover:text-secondary">Kenapa Kami</a>
                            <a href="#gallery" onClick={() => setIsMenuOpen(false)} className="hover:text-secondary">Galeri Acara</a>
                            <a href="#faq" onClick={() => setIsMenuOpen(false)} className="hover:text-secondary">Pertanyaan Umum</a>
                            <a href="#quote" onClick={() => setIsMenuOpen(false)} className="inline-block text-center px-6 py-3 bg-secondary text-primary font-semibold rounded-full mt-8">Request a Quote</a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hero Section */}
            <header className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src={getSetting('hero_bg_image', '/images/hero_background.webp')}
                        alt="Ballroom buffet setup"
                        className="w-full h-full object-cover scale-105"
                        style={{ filter: 'brightness(0.65)' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/40 to-transparent" />
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white mt-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20">
                            <Sparkles className="w-4 h-4 text-secondary" />
                            <span className="text-[10px] tracking-wider font-semibold uppercase text-secondary">The Epitome of Fine Taste</span>
                        </div>

                        <h1 
                            className="font-playfair text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight"
                            dangerouslySetInnerHTML={{ __html: getSetting('hero_title', 'Catering Premium untuk <br /> <span class="text-secondary italic">Wedding, Corporate & Event</span>') }}
                        />

                        <p className="max-w-2xl mx-auto text-sm sm:text-lg font-light text-white/80 leading-relaxed">
                            {getSetting('hero_subtitle', 'Menyajikan pengalaman kuliner legendaris berkualitas bintang lima sejak 1984 dengan layanan profesional, higienis, dan menu berkelas yang dapat disesuaikan.')}
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
                            <a href="#quote" className="w-full sm:w-auto px-8 py-3.5 bg-accent text-white font-semibold rounded-full hover:bg-accent/90 transition-all hover:scale-103 shadow-lg shadow-accent/20">
                                Pesan Sekarang
                            </a>
                            <a href="#menu" className="w-full sm:w-auto px-8 py-3.5 bg-transparent border border-white/40 text-white font-medium rounded-full hover:bg-white/10 transition-all">
                                Lihat Menu Kami
                            </a>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-12 border-t border-white/10">
                            <div className="flex items-center justify-center space-x-2">
                                <Check className="w-4 h-4 text-secondary" />
                                <span className="text-xs font-medium text-white/90">✔ 100% Halal MUI</span>
                            </div>
                            <div className="flex items-center justify-center space-x-2">
                                <Check className="w-4 h-4 text-secondary" />
                                <span className="text-xs font-medium text-white/90">✔ Higienis Bersertifikat</span>
                            </div>
                            <div className="flex items-center justify-center space-x-2">
                                <Check className="w-4 h-4 text-secondary" />
                                <span className="text-xs font-medium text-white/90">✔ Tepat Waktu</span>
                            </div>
                            <div className="flex items-center justify-center space-x-2">
                                <Check className="w-4 h-4 text-secondary" />
                                <span className="text-xs font-medium text-white/90">✔ 40+ Tahun Pengalaman</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </header>

            {/* Trusted By Grid (Client Logos from Partners DB) */}
            <section className="bg-white py-12 border-b border-primary/10">
                <div className="max-w-7xl mx-auto px-6">
                    <p className="text-center text-[10px] uppercase tracking-[0.25em] text-darktext/50 mb-8 font-semibold">Telah Dipercaya Oleh Mitra Korporat & BUMN Terkemuka</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-60">
                        {partners.length > 0 ? (
                            partners.map((partner) => (
                                <div key={partner.id} className="font-bold text-lg text-primary tracking-wide text-center uppercase">
                                    {partner.name}
                                </div>
                            ))
                        ) : (
                            <>
                                <div className="font-bold text-lg text-primary tracking-wide">BANK MANDIRI</div>
                                <div className="font-bold text-lg text-primary tracking-wide">PERTAMINA</div>
                                <div className="font-bold text-lg text-primary tracking-wide">TELKOM INDONESIA</div>
                                <div className="font-bold text-lg text-primary tracking-wide">BANK BCA</div>
                                <div className="font-bold text-lg text-primary tracking-wide">PLN GROUP</div>
                                <div className="font-bold text-lg text-primary tracking-wide">KEMENTERIAN RI</div>
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* Layanan Kami (Dynamic Services categories from DB) */}
            <section id="layanan" className="py-24 max-w-7xl mx-auto px-6">
                <div className="text-center space-y-4 mb-16">
                    <span className="text-xs tracking-[0.2em] font-semibold text-secondary uppercase">Signature Services</span>
                    <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-primary">Layanan Katering Eksklusif Kami</h2>
                    <p className="max-w-lg mx-auto text-sm text-darktext/60 font-light">Kami menawarkan berbagai solusi kuliner bintang lima untuk segala skala acara besar Anda.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.length > 0 ? (
                        services.map((svc) => (
                            <motion.div
                                key={svc.id}
                                whileHover={{ scale: 1.03 }}
                                className="bg-white/70 backdrop-blur-md p-8 rounded-2xl border border-secondary/20 hover:border-secondary shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                            >
                                <div className="space-y-4">
                                    <div className="bg-primary/5 w-14 h-14 rounded-xl flex items-center justify-center">
                                        {getIconComponent(svc.icon_name)}
                                    </div>
                                    <h3 className="font-playfair text-xl font-bold text-primary">{svc.title}</h3>
                                    <p className="text-xs text-darktext/70 leading-relaxed font-light">{svc.description}</p>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full text-center text-darktext/50">Belum ada layanan tersedia.</div>
                    )}
                </div>
            </section>

            {/* Best Seller Menu Section */}
            <section id="menu" className="py-24 bg-white border-y border-primary/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
                        <div className="space-y-4">
                            <span className="text-xs tracking-[0.2em] font-semibold text-secondary uppercase">Signature Dishes</span>
                            <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-primary">Menu Best Seller Kami</h2>
                        </div>

                        {/* Search and Filters */}
                        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4">
                            <div className="relative">
                                <Search className="w-4 h-4 absolute left-3 top-3.5 text-darktext/40" />
                                <input
                                    type="text"
                                    placeholder="Cari hidangan..."
                                    value={searchMenuQuery}
                                    onChange={(e) => setSearchMenuQuery(e.target.value)}
                                    className="w-full sm:w-64 pl-10 pr-4 py-2.5 text-sm rounded-full border border-darktext/20 focus:border-secondary focus:ring-0 outline-none"
                                />
                            </div>
                            <select
                                value={selectedMenuCategory}
                                onChange={(e) => setSelectedMenuCategory(e.target.value)}
                                className="px-4 py-2.5 text-sm rounded-full border border-darktext/20 bg-white focus:border-secondary focus:ring-0 outline-none"
                            >
                                <option value="all">Semua Kategori</option>
                                <option value="buffet">Prasmanan / Buffet</option>
                                <option value="corporate">Korporat / Bisnis</option>
                                <option value="private-event">Private Event</option>
                                <option value="coffee-break">Coffee Break</option>
                                <option value="lunch-box">Lunch Box</option>
                                <option value="aqiqah">Aqiqah</option>
                                <option value="dessert">Pencuci Mulut</option>
                            </select>
                        </div>
                    </div>

                    {/* Menu Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <AnimatePresence>
                            {filteredMenus.map((menu) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    key={menu.id}
                                    className="group bg-cream/35 border border-primary/5 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
                                >
                                    <div className="relative h-60 overflow-hidden">
                                        <img
                                            src={menu.image_path}
                                            alt={menu.name}
                                            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                                        />
                                        {menu.is_best_seller && (
                                            <span className="absolute top-4 left-4 bg-secondary text-primary text-[9px] font-extrabold tracking-widest px-3 py-1 rounded-full uppercase shadow">
                                                Best Seller
                                            </span>
                                        )}
                                    </div>
                                    <div className="p-6 space-y-4">
                                        <div className="flex justify-between items-start gap-2">
                                            <h3 className="font-playfair text-lg font-bold text-primary leading-snug">{menu.name}</h3>
                                        </div>
                                        <p className="text-xs text-darktext/70 line-clamp-2 font-light leading-relaxed">{menu.description}</p>
                                        <div className="flex flex-wrap gap-1.5">
                                            {menu.tags?.map((tag, idx) => (
                                                <span key={idx} className="bg-primary/5 text-primary text-[9px] font-medium px-2 py-0.5 rounded">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex justify-between items-center pt-2 border-t border-primary/5">
                                            <div>
                                                <span className="text-[9px] uppercase tracking-wider text-darktext/40 block">Harga Mulai</span>
                                                <span className="text-sm font-bold text-secondary">{formatIDR(menu.price_from)}<span className="text-[10px] text-darktext/50 font-normal"> / pax</span></span>
                                            </div>
                                            <button
                                                onClick={() => setActiveDetailMenu(menu)}
                                                className="px-4 py-1.5 text-xs font-semibold text-primary border border-primary/10 hover:border-secondary hover:text-secondary rounded-full transition-all"
                                            >
                                                Detail
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            {/* Menu Details Modal */}
            <AnimatePresence>
                {activeDetailMenu && (
                    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white max-w-lg w-full rounded-2xl overflow-hidden shadow-2xl relative"
                        >
                            <button
                                onClick={() => setActiveDetailMenu(null)}
                                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                            <img
                                src={activeDetailMenu.image_path}
                                alt={activeDetailMenu.name}
                                className="w-full h-56 object-cover"
                            />
                            <div className="p-8 space-y-6">
                                <div className="space-y-2">
                                    <span className="text-[10px] uppercase font-bold text-secondary tracking-widest">{activeDetailMenu.category}</span>
                                    <h3 className="font-playfair text-2xl font-bold text-primary">{activeDetailMenu.name}</h3>
                                </div>
                                <p className="text-sm text-darktext/70 leading-relaxed font-light">{activeDetailMenu.description}</p>
                                <div className="space-y-2">
                                    <span className="text-xs font-semibold text-primary block">Keistimewaan Sajian:</span>
                                    <div className="flex flex-wrap gap-2">
                                        {activeDetailMenu.tags?.map((tag, idx) => (
                                            <span key={idx} className="bg-primary/5 text-primary text-xs px-3 py-1 rounded-full">
                                                ✔ {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex justify-between items-center pt-6 border-t border-primary/5">
                                    <div>
                                        <span className="text-xs text-darktext/40 block">Estimasi Investasi</span>
                                        <span className="text-xl font-bold text-secondary">{formatIDR(activeDetailMenu.price_from)} <span className="text-xs font-normal text-darktext/60">/ pax</span></span>
                                    </div>
                                    <a
                                        href="#quote"
                                        onClick={() => setActiveDetailMenu(null)}
                                        className="px-6 py-2.5 bg-primary text-white text-xs font-semibold rounded-full hover:bg-secondary transition-colors"
                                    >
                                        Pesan Sajian Ini
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Kenapa Memilih Kami & Statistics */}
            <section id="keunggulan" className="py-24 max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <span className="text-xs tracking-[0.2em] font-semibold text-secondary uppercase">{getSetting('advantages_badge', 'Why Choose Us')}</span>
                        <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-primary leading-tight">
                            {getSetting('advantages_title', 'Standar Pelayanan Katering Bintang Lima')}
                        </h2>
                        <p className="text-sm text-darktext/75 font-light leading-relaxed">
                            {getSetting('advantages_description', 'Kami percaya bahwa menyajikan makanan bukan sekadar perkara rasa, melainkan juga kehormatan untuk mendampingi momen spesial Anda.')}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {[
                                { title: getSetting('advantage_1_title', 'Bahan Berkualitas'), desc: getSetting('advantage_1_desc', 'Hanya menggunakan bahan segar organik dari pemasok terpercaya.') },
                                { title: getSetting('advantage_2_title', 'Executive Chef Profesional'), desc: getSetting('advantage_2_desc', 'Tim koki berpengalaman hotel bintang 5.') },
                                { title: getSetting('advantage_3_title', 'Jaminan 100% Halal'), desc: getSetting('advantage_3_desc', 'Telah terdaftar resmi dan bersertifikat Halal MUI.') },
                                { title: getSetting('advantage_4_title', 'Tepat Waktu & Higienis'), desc: getSetting('advantage_4_desc', 'Protokol ketat pengantaran tepat waktu dengan standar sanitasi tinggi.') },
                                { title: getSetting('advantage_5_title', 'Custom Menu Options'), desc: getSetting('advantage_5_desc', 'Kemudahan menyesuaikan menu sesuai preferensi rasa tamu Anda.') },
                                { title: getSetting('advantage_6_title', 'Harga Transparan'), desc: getSetting('advantage_6_desc', 'Tanpa biaya tersembunyi, semua rincian penawaran tercatat rapi.') }
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-start space-x-3">
                                    <div className="bg-secondary/15 p-1.5 rounded-full mt-1">
                                        <Check className="w-3.5 h-3.5 text-secondary" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-primary">{item.title}</h4>
                                        <p className="text-xs text-darktext/60 font-light mt-0.5 leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Statistics counters */}
                    <div ref={statsRef} className="bg-primary text-white p-12 rounded-3xl border border-secondary/20 space-y-12 relative overflow-hidden shadow-xl">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

                        <div className="grid grid-cols-2 gap-8">
                            <div className="text-center space-y-2">
                                <span className="block font-playfair text-4xl sm:text-5xl font-bold text-secondary">{stats.years}+</span>
                                <span className="text-[10px] tracking-wider uppercase font-semibold text-white/70 block">
                                    {getSetting('stats_years_label', 'Tahun Pengalaman')}
                                </span>
                            </div>
                            <div className="text-center space-y-2">
                                <span className="block font-playfair text-4xl sm:text-5xl font-bold text-secondary">{stats.events}+</span>
                                <span className="text-[10px] tracking-wider uppercase font-semibold text-white/70 block">
                                    {getSetting('stats_events_label', 'Event Sukses')}
                                </span>
                            </div>
                            <div className="text-center space-y-2">
                                <span className="block font-playfair text-4xl sm:text-5xl font-bold text-secondary">{stats.partners}+</span>
                                <span className="text-[10px] tracking-wider uppercase font-semibold text-white/70 block">
                                    {getSetting('stats_partners_label', 'Mitra Perusahaan')}
                                </span>
                            </div>
                            <div className="text-center space-y-2">
                                <span className="block font-playfair text-4xl sm:text-5xl font-bold text-secondary">{stats.sat}%</span>
                                <span className="text-[10px] tracking-wider uppercase font-semibold text-white/70 block">
                                    {getSetting('stats_satisfaction_label', 'Kepuasan Pelanggan')}
                                </span>
                            </div>
                        </div>

                        <div className="p-6 bg-white/5 rounded-2xl border border-white/10 text-center space-y-4">
                            <h3 className="font-playfair text-lg text-secondary">Butuh Survey Lokasi Acara?</h3>
                            <p className="text-xs text-white/80 font-light leading-relaxed">Kami menyediakan jasa survey lokasi gratis dan konsultasi menu face-to-face di Jabodetabek.</p>
                            <a href="#quote" className="inline-block text-xs font-semibold text-primary bg-secondary px-6 py-2.5 rounded-full hover:bg-white hover:scale-103 transition-all">Jadwalkan Survey</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Jaminan Mutu & Legalitas Section */}
            {certificates.length > 0 && (
                <section className="py-24 max-w-7xl mx-auto px-6 border-t border-white/5 relative">
                    <div className="text-center space-y-4 mb-16">
                        <span className="text-xs tracking-[0.2em] font-semibold text-secondary uppercase">Jaminan Kualitas & Komitmen</span>
                        <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-primary">Jaminan Mutu & Legalitas Resmi</h2>
                        <p className="max-w-xl mx-auto text-sm text-darktext/75 font-light leading-relaxed">
                            Kami berkomitmen penuh untuk menyajikan kualitas hidangan terbaik dengan standar higienitas tertinggi serta kepatuhan hukum resmi.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {certificates.map((cert) => {
                            let IconComponent = ShieldCheck;
                            if (cert.icon_name === 'Award') IconComponent = Award;
                            if (cert.icon_name === 'FileCheck') IconComponent = FileCheck;

                            return (
                                <div
                                    key={cert.id}
                                    onClick={() => setSelectedCertificate(cert)}
                                    className="group cursor-pointer bg-white/5 border border-white/10 p-8 rounded-2xl hover:border-secondary/40 hover:bg-white/[0.07] transition-all duration-300 relative overflow-hidden flex flex-col items-center text-center shadow-lg"
                                >
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-2xl group-hover:bg-secondary/10 transition-colors" />
                                    
                                    <div className="w-16 h-16 rounded-full bg-secondary/10 border border-secondary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <IconComponent className="w-8 h-8 text-secondary" />
                                    </div>

                                    <h3 className="font-playfair text-xl font-bold text-primary mb-2 group-hover:text-secondary transition-colors">
                                        {cert.title}
                                    </h3>
                                    
                                    <p className="text-xs text-darktext/50 font-light mb-6">
                                        Penerbit: {cert.issuer}
                                    </p>

                                    <span className="mt-auto text-xs font-semibold text-secondary hover:text-white flex items-center space-x-1 border-b border-secondary/30 pb-0.5 group-hover:border-white transition-all">
                                        <span>Lihat Dokumen Resmi</span>
                                        <ExternalLink className="w-3.5 h-3.5" />
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </section>
            )}

            {/* Before After Image Comparison Slider */}
            <section className="py-24 bg-white/60 border-t border-primary/5">
                <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
                    <div className="space-y-4">
                        <span className="text-xs tracking-[0.2em] font-semibold text-secondary uppercase">Visual Metamorphosis</span>
                        <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-primary">Saksikan Transformasi Layanan Kami</h2>
                        <p className="max-w-md mx-auto text-sm text-darktext/60 font-light">Geser slider untuk melihat perbandingan ruangan kosong sebelum dan sesudah disetup oleh kru catering profesional kami.</p>
                    </div>

                    {/* Interactive Slider */}
                    <div
                        ref={sliderContainerRef}
                        className="relative h-96 sm:h-[480px] w-full rounded-2xl overflow-hidden shadow-lg select-none cursor-ew-resize"
                        onMouseMove={handleMouseMove}
                        onTouchMove={handleTouchMove}
                    >
                        {/* Before Image */}
                        <div className="absolute inset-0">
                            <img
                                src={getSetting('slider_before_image', '/images/ballroom_empty.webp')}
                                alt="Ballroom Empty"
                                className="w-full h-full object-cover pointer-events-none"
                            />
                            <div className="absolute top-4 left-4 bg-black/60 text-white text-[10px] px-3 py-1.5 rounded-full backdrop-blur-md">
                                {getSetting('slider_before_label', 'Sebelum Setup')}
                            </div>
                        </div>

                        {/* After Image */}
                        <div
                            className="absolute inset-y-0 left-0 overflow-hidden"
                            style={{ width: `${sliderPosition}%` }}
                        >
                            <img
                                src={getSetting('slider_after_image', '/images/gallery_wedding_setup.webp')}
                                alt="Ballroom Set Up"
                                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                                style={{ width: sliderContainerRef.current?.getBoundingClientRect().width }}
                            />
                            <div className="absolute top-4 right-4 bg-secondary text-primary text-[10px] font-bold px-3 py-1.5 rounded-full shadow">
                                {getSetting('slider_after_label', 'Sesudah Setup')}
                            </div>
                        </div>

                        {/* Divider Line & Handle */}
                        <div
                            className="absolute inset-y-0 w-1 bg-white cursor-ew-resize z-20 flex items-center justify-center"
                            style={{ left: `${sliderPosition}%` }}
                        >
                            <div className="w-8 h-8 rounded-full bg-secondary border-2 border-white flex items-center justify-center shadow-lg">
                                <span className="text-primary text-xs font-black">↔</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery (Masonry Layout) */}
            <section id="gallery" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center space-y-4 mb-16">
                        <span className="text-xs tracking-[0.2em] font-semibold text-secondary uppercase">Event Gallery</span>
                        <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-primary">Portofolio Acara Sukses Kami</h2>
                        <p className="max-w-md mx-auto text-sm text-darktext/60 font-light">Dokumentasi nyata keanggunan hidangan dan kerapihan kru katering kami di berbagai perayaan terbaik.</p>

                        {/* Category filter buttons */}
                        <div className="flex flex-wrap justify-center gap-3 pt-6">
                            {[
                                { id: 'all', name: 'Semua Portofolio' },
                                { id: 'wedding', name: 'Wedding' },
                                { id: 'corporate', name: 'Corporate' },
                                { id: 'private-event', name: 'Private Event' },
                                { id: 'coffee-break', name: 'Coffee Break' },
                                { id: 'buffet', name: 'Buffet Setup' },
                                { id: 'kitchen', name: 'Behind Kitchen' }
                            ].map((btn) => (
                                <button
                                    key={btn.id}
                                    onClick={() => setSelectedGalleryCategory(btn.id)}
                                    className={`px-5 py-2 text-xs font-semibold rounded-full transition-all ${selectedGalleryCategory === btn.id ? 'bg-primary text-white' : 'bg-cream text-primary border border-primary/10 hover:border-secondary'}`}
                                >
                                    {btn.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Gallery Grid */}
                    <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
                        {filteredPortfolios.map((port) => (
                            <div
                                key={port.id}
                                onClick={() => setLightboxImage(port.image_path)}
                                className="break-inside-avoid bg-cream/10 border border-primary/5 rounded-2xl overflow-hidden group cursor-zoom-in shadow-sm hover:shadow-lg transition-all"
                            >
                                <div className="relative overflow-hidden">
                                    <img
                                        src={port.image_path}
                                        alt={port.title}
                                        className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <ExternalLink className="w-8 h-8 text-white" />
                                    </div>
                                </div>
                                <div className="p-6">
                                    <span className="text-[9px] uppercase tracking-wider text-secondary block font-bold mb-1">{port.category}</span>
                                    <h4 className="font-playfair text-lg font-bold text-primary leading-tight">{port.title}</h4>
                                    <p className="text-xs text-darktext/50 font-light mt-1">{port.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lightbox Zoom overlay */}
            <AnimatePresence>
                {lightboxImage && (
                    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setLightboxImage(null)}>
                        <button className="absolute top-6 right-6 text-white hover:text-secondary">
                            <X className="w-8 h-8" />
                        </button>
                        <motion.img
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            src={lightboxImage}
                            alt="Gallery zoom"
                            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                        />
                    </div>
                )}

                {selectedCertificate && (
                    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer" onClick={() => setSelectedCertificate(null)}>
                        <button className="absolute top-6 right-6 text-white hover:text-secondary z-10 cursor-pointer">
                            <X className="w-8 h-8" />
                        </button>
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-[#0b1313]/95 border border-secondary/30 p-6 rounded-2xl max-w-2xl w-full flex flex-col items-center gap-4 shadow-2xl relative cursor-default"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="text-center space-y-1 mb-2">
                                <h3 className="font-playfair text-xl font-bold text-white tracking-wide">
                                    {selectedCertificate.title}
                                </h3>
                                <p className="text-xs text-secondary">
                                    Penerbit Resmi: {selectedCertificate.issuer}
                                </p>
                            </div>
                            
                            <img
                                src={selectedCertificate.image_path}
                                alt={selectedCertificate.title}
                                className="max-w-full max-h-[70vh] object-contain rounded-lg border border-white/10 shadow-lg"
                            />
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Testimonials */}
            <section className="py-24 bg-cream/65 border-t border-primary/5">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="text-center space-y-4 mb-16">
                        <span className="text-xs tracking-[0.2em] font-semibold text-secondary uppercase">Guest Experience</span>
                        <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-primary">Apa Kata Mereka</h2>
                    </div>

                    <Swiper
                        modules={[Autoplay, Pagination, Navigation]}
                        spaceBetween={40}
                        slidesPerView={1}
                        loop={true}
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                        pagination={{ clickable: true }}
                        className="pb-16"
                    >
                        {testimonials.map((test) => (
                            <SwiperSlide key={test.id}>
                                <div className="bg-white p-10 sm:p-12 rounded-3xl border border-secondary/20 shadow-sm space-y-6 text-center max-w-3xl mx-auto">
                                    <div className="flex justify-center space-x-1">
                                        {[...Array(test.rating)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                                        ))}
                                    </div>
                                    <p className="text-sm sm:text-lg italic font-light text-darktext/80 leading-relaxed">
                                        "{test.review}"
                                    </p>
                                    <div className="flex flex-col items-center space-y-2">
                                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center border-2 border-secondary font-playfair text-xl font-bold text-primary">
                                            {test.customer_name[0]}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-primary text-base">{test.customer_name}</h4>
                                            <p className="text-xs text-darktext/50 font-light mt-0.5">{test.customer_title}</p>
                                        </div>
                                        {test.company_logo && (
                                            <span className="text-[10px] uppercase tracking-wider font-extrabold text-secondary mt-1 block">
                                                🏢 VIP CLIENT
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>

            {/* FAQ Accordion (Dynamic from FAQS DB) */}
            <section id="faq" className="py-24 bg-white border-t border-primary/5">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center space-y-4 mb-16">
                        <span className="text-xs tracking-[0.2em] font-semibold text-secondary uppercase">Got Questions?</span>
                        <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-primary">Pertanyaan yang Sering Diajukan</h2>
                    </div>

                    <div className="space-y-6">
                        {faqs.length > 0 ? (
                            faqs.map((faq) => (
                                <details key={faq.id} className="group bg-cream/25 border border-primary/5 rounded-2xl p-6 [&_summary::-webkit-details-marker]:hidden border-secondary/20">
                                    <summary className="flex justify-between items-center font-playfair text-lg font-bold text-primary cursor-pointer list-none">
                                        <span>{faq.question}</span>
                                        <span className="transition group-open:rotate-180 text-secondary">
                                            <ChevronDown className="w-5 h-5" />
                                        </span>
                                    </summary>
                                    <p className="text-sm text-darktext/75 leading-relaxed font-light mt-4 pt-4 border-t border-primary/5">
                                        {faq.answer}
                                    </p>
                                </details>
                            ))
                        ) : (
                            <div className="text-center text-darktext/50">Belum ada FAQ tersedia.</div>
                        )}
                    </div>
                </div>
            </section>

            {/* Quote Form & Lead Capture Section */}
            <section id="quote" className="relative py-24 bg-primary text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C7A856_1px,transparent_1px)] [background-size:16px_16px]" />

                <div className="relative z-10 max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-6">
                        <div className="inline-flex items-center space-x-2 bg-white/10 px-4 py-1.5 rounded-full border border-white/10">
                            <Sparkles className="w-4 h-4 text-secondary" />
                            <span className="text-[10px] tracking-wider font-semibold uppercase text-secondary">Free Consultation</span>
                        </div>
                        <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-white">Siap Menyajikan Acara Terbaik Anda</h2>
                        <p className="text-sm text-white/80 font-light leading-relaxed">
                            Rancang menu impian Anda bersama konsultan menu profesional kami. Isi formulir konsultasi ini untuk mendapatkan proposal penawaran harga detail secara cuma-cuma dalam waktu 1x24 jam.
                        </p>
                        <div className="space-y-4 pt-6">
                            <div className="flex items-center space-x-3">
                                <Phone className="w-5 h-5 text-secondary" />
                                <span className="text-sm font-light">{getSetting('company_phone', '+62 812-3456-7890')}</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Mail className="w-5 h-5 text-secondary" />
                                <span className="text-sm font-light">{getSetting('company_email', 'info@dapoerratucatering.com')}</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <MapPin className="w-5 h-5 text-secondary" />
                                <span className="text-sm font-light">{getSetting('company_address', 'Jl. Senopati No.45, Kebayoran Baru, Jakarta Selatan')}</span>
                            </div>
                        </div>
                    </div>

                    {/* Quote Request Form */}
                    <div className="bg-white text-darktext p-8 sm:p-10 rounded-3xl border border-secondary/20 shadow-xl space-y-6">
                        <h3 className="font-playfair text-2xl font-bold text-primary text-center">Permintaan Penawaran Harga</h3>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-primary mb-1">Nama Lengkap Anda</label>
                                <input
                                    type="text"
                                    placeholder="Masukkan nama lengkap"
                                    {...register('name')}
                                    className={`w-full px-4 py-2.5 text-sm rounded-lg border ${errors.name ? 'border-accent' : 'border-darktext/20'} outline-none focus:border-secondary`}
                                />
                                {errors.name && <p className="text-accent text-[10px] mt-1">{errors.name.message}</p>}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-primary mb-1">Nomor WhatsApp</label>
                                    <input
                                        type="tel"
                                        placeholder="Contoh: 0812345678"
                                        {...register('phone')}
                                        className={`w-full px-4 py-2.5 text-sm rounded-lg border ${errors.phone ? 'border-accent' : 'border-darktext/20'} outline-none focus:border-secondary`}
                                    />
                                    {errors.phone && <p className="text-accent text-[10px] mt-1">{errors.phone.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-primary mb-1">Alamat Email</label>
                                    <input
                                        type="email"
                                        placeholder="nama@email.com"
                                        {...register('email')}
                                        className={`w-full px-4 py-2.5 text-sm rounded-lg border ${errors.email ? 'border-accent' : 'border-darktext/20'} outline-none focus:border-secondary`}
                                    />
                                    {errors.email && <p className="text-accent text-[10px] mt-1">{errors.email.message}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-semibold text-primary mb-1">Jenis Acara</label>
                                    <select
                                        {...register('event_type')}
                                        className="w-full px-4 py-2.5 text-sm rounded-lg border border-darktext/20 outline-none focus:border-secondary bg-white"
                                    >
                                        <option value="">-- Pilih Acara --</option>
                                        <option value="Wedding Reception">Wedding / Pernikahan</option>
                                        <option value="Corporate Event">Rapat / Acara Kantor</option>
                                        <option value="Gathering / Seminar">Gathering / Seminar</option>
                                        <option value="Private Dinner Party">Private Event / Ulang Tahun</option>
                                        <option value="Aqiqah Syukuran">Aqiqah / Syukuran</option>
                                        <option value="Coffee Break Service">Coffee Break Service</option>
                                    </select>
                                    {errors.event_type && <p className="text-accent text-[10px] mt-1">{errors.event_type.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-primary mb-1">Jumlah Tamu</label>
                                    <input
                                        type="number"
                                        placeholder="Min 10"
                                        {...register('guests_count', { valueAsNumber: true })}
                                        className={`w-full px-4 py-2.5 text-sm rounded-lg border ${errors.guests_count ? 'border-accent' : 'border-darktext/20'} outline-none focus:border-secondary`}
                                    />
                                    {errors.guests_count && <p className="text-accent text-[10px] mt-1">{errors.guests_count.message}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-primary mb-1">Tanggal Rencana Acara</label>
                                <input
                                    type="date"
                                    {...register('event_date')}
                                    className={`w-full px-4 py-2.5 text-sm rounded-lg border ${errors.event_date ? 'border-accent' : 'border-darktext/20'} outline-none focus:border-secondary`}
                                />
                                {errors.event_date && <p className="text-accent text-[10px] mt-1">{errors.event_date.message}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-primary mb-1">Catatan Khusus (Optional)</label>
                                <textarea
                                    rows={3}
                                    placeholder="Tuliskan jika ada kebutuhan menu khusus, alergi, atau request survey lokasi..."
                                    {...register('notes')}
                                    className="w-full px-4 py-2.5 text-sm rounded-lg border border-darktext/20 outline-none focus:border-secondary resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-3.5 bg-accent hover:bg-accent/90 text-white font-bold rounded-lg transition-all hover:scale-102 flex items-center justify-center space-x-2 text-sm mt-4 cursor-pointer shadow-lg shadow-accent/15"
                            >
                                {isSubmitting ? 'Memproses...' : 'Kirim Proposal & Hubungi WhatsApp'}
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Static Footer */}
            <footer className="bg-primary text-white border-t border-white/10">
                <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand column */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <img src="/images/logo_original.png" alt="Dapoer Ratu Logo" className="w-10 h-10 object-contain" />
                            <span className="font-playfair text-2xl font-bold tracking-wider text-secondary block leading-none">DAPOER RATU</span>
                        </div>
                        <p className="text-xs text-white/70 font-light leading-relaxed">
                            Catering premium bercitarasa bintang lima yang menyajikan sajian berkelas dan pelayanan profesional untuk perayaan terbaik Anda di Indonesia.
                        </p>
                        <div className="flex space-x-4 pt-2">
                            <a href={`https://instagram.com/${getSetting('company_instagram', '@dapoerratucatering').replace('@', '')}`} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary text-white transition-colors text-xs font-bold">IG</a>
                            <a href={`https://facebook.com/${getSetting('company_facebook', 'dapoerratucatering')}`} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary text-white transition-colors text-xs font-bold">FB</a>
                            <a href={`https://youtube.com/c/${getSetting('company_youtube', 'DapoerRatuCatering')}`} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary text-white transition-colors text-xs font-bold">YT</a>
                        </div>
                    </div>

                    {/* Quick links */}
                    <div className="space-y-4">
                        <h4 className="font-playfair text-lg text-secondary font-bold">Navigasi Cepat</h4>
                        <ul className="space-y-2 text-xs text-white/70 font-light">
                            <li><a href="#layanan" className="hover:text-secondary">Layanan Kami</a></li>
                            <li><a href="#menu" className="hover:text-secondary">Menu Andalan</a></li>
                            <li><a href="#keunggulan" className="hover:text-secondary">Keunggulan Katering</a></li>
                            <li><a href="#gallery" className="hover:text-secondary">Galeri Portofolio</a></li>
                            <li><a href="#faq" className="hover:text-secondary">FAQ (Tanya Jawab)</a></li>
                        </ul>
                    </div>

                    {/* Hours & Info */}
                    <div className="space-y-4">
                        <h4 className="font-playfair text-lg text-secondary font-bold">Jam Operasional</h4>
                        <ul className="space-y-2 text-xs text-white/70 font-light">
                            <li className="flex items-center space-x-2">
                                <Clock className="w-3.5 h-3.5 text-secondary" />
                                <span>{getSetting('operational_hours_weekday', 'Senin - Jumat: 08.00 - 18.00 WIB')}</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <Clock className="w-3.5 h-3.5 text-secondary" />
                                <span>{getSetting('operational_hours_weekend', 'Sabtu - Minggu: 09.00 - 17.00 WIB')}</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <Mail className="w-3.5 h-3.5 text-secondary" />
                                <span>{getSetting('company_email', 'info@dapoerratucatering.com')}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Google Maps embed */}
                    <div className="space-y-4">
                        <h4 className="font-playfair text-lg text-secondary font-bold">Lokasi Kami</h4>
                        <div className="w-full h-36 rounded-xl overflow-hidden border border-white/10 shadow-md">
                            <iframe
                                src={getSetting('google_maps_url', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m4!2s-6.2235!3d106.8085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f1505c09191d%3A0x959779cb25662a5b!2sSenopati%2C%20Kebayoran%20Baru%2C%20Jakarta%20Selatan!5e0!3m2!1sid!2sid!4v1622350000000')}
                                className="w-full h-full border-0 grayscale opacity-80 hover:opacity-100 transition-opacity"
                                allowFullScreen={false}
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 py-6 text-center text-[10px] text-white/50 font-light flex flex-col sm:flex-row justify-between items-center max-w-7xl mx-auto px-6 gap-2">
                    <span>© 2026 Dapoer Ratu Catering Premium Indonesia. All Rights Reserved.</span>
                    <span>Developed by <a href="https://dataciptacelebes.com" target="_blank" rel="noreferrer" className="text-secondary hover:underline">CV. Data Cipta Celebes</a></span>
                </div>
            </footer>

            {/* Sticky WhatsApp Button */}
            <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3">
                <a
                    href={`https://wa.me/${getSetting('company_wa', '6281234567890')}?text=Halo%20Dapoer%20Ratu%20Catering%2C%20saya%20tertarik%20dengan%20layanan%20katering%20premium%20Anda.`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-lg hover:scale-108 transition-all relative group cursor-pointer"
                >
                    <span className="absolute right-16 bg-primary text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-md border border-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Konsultasi WhatsApp
                    </span>
                    <span className="font-bold text-base">WA</span>
                </a>
            </div>
        </div>
    );
}
