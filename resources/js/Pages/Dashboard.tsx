import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import React, { useState } from 'react';
import {
    Phone, Mail, Calendar, Users, FileText, CheckCircle,
    Plus, Edit, Trash2, Settings as SettingsIcon, MessageSquare,
    HelpCircle, ChefHat, Building, Star, Award, ShieldCheck, Sparkles, Check, X, Sliders
} from 'lucide-react';

interface QuoteRequest {
    id: number;
    name: string;
    email: string;
    phone: string;
    event_type: string;
    event_date: string;
    guests_count: number;
    notes: string | null;
    status: 'pending' | 'contacted' | 'closed';
    created_at: string;
}

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

interface DashboardProps {
    quoteRequests: QuoteRequest[];
    stats: {
        total_leads: number;
        pending_leads: number;
        contacted_leads: number;
        closed_leads: number;
    };
    menus: MenuItem[];
    testimonials: TestimonialItem[];
    faqs: FaqItem[];
    services: ServiceItem[];
    partners: PartnerItem[];
    settings: Record<string, string>;
}

export default function Dashboard({
    quoteRequests = [],
    stats,
    menus = [],
    testimonials = [],
    faqs = [],
    services = [],
    partners = [],
    settings = {}
}: DashboardProps) {
    const [activeTab, setActiveTab] = useState<string>('leads');

    // CRUD State
    const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
    const [editingMenu, setEditingMenu] = useState<MenuItem | null>(null);
    const [menuForm, setMenuForm] = useState({
        name: '', category: 'buffet', description: '', price_from: 0, is_best_seller: false, tagsString: ''
    });

    const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);
    const [editingTestimonial, setEditingTestimonial] = useState<TestimonialItem | null>(null);
    const [testimonialForm, setTestimonialForm] = useState({
        customer_name: '', customer_title: '', review: '', rating: 5
    });

    const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);
    const [editingFaq, setEditingFaq] = useState<FaqItem | null>(null);
    const [faqForm, setFaqForm] = useState({
        question: '', answer: '', order_num: 1
    });

    const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
    const [editingService, setEditingService] = useState<ServiceItem | null>(null);
    const [serviceForm, setServiceForm] = useState({
        title: '', description: '', icon_name: 'Sparkles', order_num: 1
    });

    const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
    const [editingPartner, setEditingPartner] = useState<PartnerItem | null>(null);
    const [partnerForm, setPartnerForm] = useState({
        name: '', order_num: 1
    });

    // settingsForm state
    const [settingsForm, setSettingsForm] = useState({
        company_phone: settings.company_phone || '',
        company_email: settings.company_email || '',
        company_address: settings.company_address || '',
        company_wa: settings.company_wa || '',
        company_instagram: settings.company_instagram || '',
        company_facebook: settings.company_facebook || '',
        company_youtube: settings.company_youtube || '',
        google_maps_url: settings.google_maps_url || '',
        operational_hours_weekday: settings.operational_hours_weekday || '',
        operational_hours_weekend: settings.operational_hours_weekend || '',
        hero_title: settings.hero_title || '',
        hero_subtitle: settings.hero_subtitle || '',
        hero_bg_image: settings.hero_bg_image || '',
        slider_before_image: settings.slider_before_image || '',
        slider_after_image: settings.slider_after_image || '',
        slider_before_label: settings.slider_before_label || '',
        slider_after_label: settings.slider_after_label || '',
        
        // Dynamic Advantages & Stats
        advantages_badge: settings.advantages_badge || '',
        advantages_title: settings.advantages_title || '',
        advantages_description: settings.advantages_description || '',
        advantage_1_title: settings.advantage_1_title || '',
        advantage_1_desc: settings.advantage_1_desc || '',
        advantage_2_title: settings.advantage_2_title || '',
        advantage_2_desc: settings.advantage_2_desc || '',
        advantage_3_title: settings.advantage_3_title || '',
        advantage_3_desc: settings.advantage_3_desc || '',
        advantage_4_title: settings.advantage_4_title || '',
        advantage_4_desc: settings.advantage_4_desc || '',
        advantage_5_title: settings.advantage_5_title || '',
        advantage_5_desc: settings.advantage_5_desc || '',
        advantage_6_title: settings.advantage_6_title || '',
        advantage_6_desc: settings.advantage_6_desc || '',
        stats_years: settings.stats_years || '',
        stats_years_label: settings.stats_years_label || '',
        stats_events: settings.stats_events || '',
        stats_events_label: settings.stats_events_label || '',
        stats_partners: settings.stats_partners || '',
        stats_partners_label: settings.stats_partners_label || '',
        stats_satisfaction: settings.stats_satisfaction || '',
        stats_satisfaction_label: settings.stats_satisfaction_label || '',
    });

    const [heroBgFile, setHeroBgFile] = useState<File | null>(null);
    const [sliderBeforeFile, setSliderBeforeFile] = useState<File | null>(null);
    const [sliderAfterFile, setSliderAfterFile] = useState<File | null>(null);
    const [menuImageFile, setMenuImageFile] = useState<File | null>(null);

    // Quote actions
    const updateQuoteStatus = (id: number, status: 'pending' | 'contacted' | 'closed') => {
        router.patch(`/admin/quotes/${id}`, { status });
    };

    // Menu CRUD Handlers
    const openMenuModal = (menu: MenuItem | null = null) => {
        setMenuImageFile(null);
        if (menu) {
            setEditingMenu(menu);
            setMenuForm({
                name: menu.name,
                category: menu.category,
                description: menu.description,
                price_from: menu.price_from,
                is_best_seller: menu.is_best_seller,
                tagsString: menu.tags ? menu.tags.join(', ') : ''
            });
        } else {
            setEditingMenu(null);
            setMenuForm({ name: '', category: 'buffet', description: '', price_from: 0, is_best_seller: false, tagsString: '' });
        }
        setIsMenuModalOpen(true);
    };

    const handleMenuSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const formData = new FormData();
        if (editingMenu) {
            formData.append('_method', 'PUT');
        }
        
        formData.append('name', menuForm.name);
        formData.append('category', menuForm.category);
        formData.append('description', menuForm.description);
        formData.append('price_from', String(menuForm.price_from));
        formData.append('is_best_seller', menuForm.is_best_seller ? 'true' : 'false');
        
        const tags = menuForm.tagsString.split(',').map(s => s.trim()).filter(Boolean);
        tags.forEach((tag, idx) => {
            formData.append(`tags[${idx}]`, tag);
        });

        if (menuImageFile) {
            formData.append('image', menuImageFile);
        }

        const url = editingMenu ? `/admin/menus/${editingMenu.id}` : '/admin/menus';

        router.post(url, formData, {
            forceFormData: true,
            onSuccess: () => {
                setIsMenuModalOpen(false);
                setMenuImageFile(null);
            }
        });
    };

    const deleteMenu = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus menu ini?')) {
            router.delete(`/admin/menus/${id}`);
        }
    };

    // Testimonial CRUD Handlers
    const openTestimonialModal = (test: TestimonialItem | null = null) => {
        if (test) {
            setEditingTestimonial(test);
            setTestimonialForm({
                customer_name: test.customer_name,
                customer_title: test.customer_title,
                review: test.review,
                rating: test.rating
            });
        } else {
            setEditingTestimonial(null);
            setTestimonialForm({ customer_name: '', customer_title: '', review: '', rating: 5 });
        }
        setIsTestimonialModalOpen(true);
    };

    const handleTestimonialSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingTestimonial) {
            router.put(`/admin/testimonials/${editingTestimonial.id}`, testimonialForm, {
                onSuccess: () => setIsTestimonialModalOpen(false)
            });
        } else {
            router.post('/admin/testimonials', testimonialForm, {
                onSuccess: () => setIsTestimonialModalOpen(false)
            });
        }
    };

    const deleteTestimonial = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus testimoni ini?')) {
            router.delete(`/admin/testimonials/${id}`);
        }
    };

    // FAQ CRUD Handlers
    const openFaqModal = (faq: FaqItem | null = null) => {
        if (faq) {
            setEditingFaq(faq);
            setFaqForm({ question: faq.question, answer: faq.answer, order_num: faq.order_num });
        } else {
            setEditingFaq(null);
            setFaqForm({ question: '', answer: '', order_num: faqs.length + 1 });
        }
        setIsFaqModalOpen(true);
    };

    const handleFaqSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingFaq) {
            router.put(`/admin/faqs/${editingFaq.id}`, faqForm, {
                onSuccess: () => setIsFaqModalOpen(false)
            });
        } else {
            router.post('/admin/faqs', faqForm, {
                onSuccess: () => setIsFaqModalOpen(false)
            });
        }
    };

    const deleteFaq = (id: number) => {
        if (confirm('Hapus FAQ ini?')) {
            router.delete(`/admin/faqs/${id}`);
        }
    };

    // Service CRUD Handlers
    const openServiceModal = (svc: ServiceItem | null = null) => {
        if (svc) {
            setEditingService(svc);
            setServiceForm({ title: svc.title, description: svc.description, icon_name: svc.icon_name, order_num: svc.order_num });
        } else {
            setEditingService(null);
            setServiceForm({ title: '', description: '', icon_name: 'Sparkles', order_num: services.length + 1 });
        }
        setIsServiceModalOpen(true);
    };

    const handleServiceSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingService) {
            router.put(`/admin/services/${editingService.id}`, serviceForm, {
                onSuccess: () => setIsServiceModalOpen(false)
            });
        } else {
            router.post('/admin/services', serviceForm, {
                onSuccess: () => setIsServiceModalOpen(false)
            });
        }
    };

    const deleteService = (id: number) => {
        if (confirm('Hapus kategori layanan ini?')) {
            router.delete(`/admin/services/${id}`);
        }
    };

    // Partner CRUD Handlers
    const openPartnerModal = (part: PartnerItem | null = null) => {
        if (part) {
            setEditingPartner(part);
            setPartnerForm({ name: part.name, order_num: part.order_num });
        } else {
            setEditingPartner(null);
            setPartnerForm({ name: '', order_num: partners.length + 1 });
        }
        setIsPartnerModalOpen(true);
    };

    const handlePartnerSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingPartner) {
            router.put(`/admin/partners/${editingPartner.id}`, partnerForm, {
                onSuccess: () => setIsPartnerModalOpen(false)
            });
        } else {
            router.post('/admin/partners', partnerForm, {
                onSuccess: () => setIsPartnerModalOpen(false)
            });
        }
    };

    const deletePartner = (id: number) => {
        if (confirm('Hapus mitra/klien ini?')) {
            router.delete(`/admin/partners/${id}`);
        }
    };

    // Settings Form submit
    const handleSettingsSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('_method', 'PATCH');
        
        Object.entries(settingsForm).forEach(([key, val]) => {
            if (key === 'hero_bg_image' && heroBgFile) return;
            if (key === 'slider_before_image' && sliderBeforeFile) return;
            if (key === 'slider_after_image' && sliderAfterFile) return;
            
            formData.append(`settings[${key}]`, String(val));
        });
        
        if (heroBgFile) {
            formData.append('settings[hero_bg_image]', heroBgFile);
        }
        if (sliderBeforeFile) {
            formData.append('settings[slider_before_image]', sliderBeforeFile);
        }
        if (sliderAfterFile) {
            formData.append('settings[slider_after_image]', sliderAfterFile);
        }
        
        router.post('/admin/settings', formData, {
            forceFormData: true,
            onSuccess: () => {
                setHeroBgFile(null);
                setSliderBeforeFile(null);
                setSliderAfterFile(null);
                alert('Pengaturan dan gambar berhasil diperbarui!');
            }
        });
    };

    // Format Rupiah
    const formatIDR = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price);
    };

    const sidebarItems = [
        { id: 'leads', label: 'Active Inquiries', icon: <MessageSquare className="w-4 h-4" />, onClick: () => setActiveTab('leads'), active: activeTab === 'leads' },
        { id: 'menus', label: 'Menu Catalog', icon: <ChefHat className="w-4 h-4" />, onClick: () => setActiveTab('menus'), active: activeTab === 'menus' },
        { id: 'testimonials', label: 'Testimonials', icon: <Star className="w-4 h-4" />, onClick: () => setActiveTab('testimonials'), active: activeTab === 'testimonials' },
        { id: 'faqs', label: 'FAQs & QAs', icon: <HelpCircle className="w-4 h-4" />, onClick: () => setActiveTab('faqs'), active: activeTab === 'faqs' },
        { id: 'services', label: 'Layanan Kami', icon: <Award className="w-4 h-4" />, onClick: () => setActiveTab('services'), active: activeTab === 'services' },
        { id: 'partners', label: 'Mitra / Klien', icon: <Building className="w-4 h-4" />, onClick: () => setActiveTab('partners'), active: activeTab === 'partners' },
        {
            id: 'settings',
            label: 'Web Settings',
            icon: <SettingsIcon className="w-4 h-4" />,
            active: activeTab.startsWith('settings'),
            subItems: [
                { id: 'settings-hero', label: 'Hero & Slider', icon: <Sliders className="w-4 h-4" />, onClick: () => setActiveTab('settings-hero'), active: activeTab === 'settings-hero' },
                { id: 'settings-contact', label: 'Kontak & Sosmed', icon: <Phone className="w-4 h-4" />, onClick: () => setActiveTab('settings-contact'), active: activeTab === 'settings-contact' },
                { id: 'settings-features', label: 'Keunggulan & Stats', icon: <Sparkles className="w-4 h-4" />, onClick: () => setActiveTab('settings-features'), active: activeTab === 'settings-features' },
            ]
        }
    ];

    return (
        <AuthenticatedLayout
            sidebarItems={sidebarItems}
            header={
                <h2 className="text-sm font-bold tracking-tight text-gray-800 dark:text-gray-200">
                    {activeTab === 'leads' && 'Active Inquiries'}
                    {activeTab === 'menus' && 'Menu Catalog'}
                    {activeTab === 'testimonials' && 'Client Testimonials'}
                    {activeTab === 'faqs' && 'Frequently Asked Questions'}
                    {activeTab === 'services' && 'Layanan Catering'}
                    {activeTab === 'partners' && 'Mitra & Klien'}
                    {activeTab === 'settings-hero' && 'Web Settings > Hero & Slider'}
                    {activeTab === 'settings-contact' && 'Web Settings > Kontak & Sosmed'}
                    {activeTab === 'settings-features' && 'Web Settings > Keunggulan & Stats'}
                </h2>
            }
        >
            <Head title="Catering Admin Dashboard" />

            <div className="py-6 sm:py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">

                    {/* Active Inquiries Tab */}
                    {activeTab === 'leads' && (
                        <div className="space-y-6">
                            {/* Stats */}
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
                                <div className="rounded-xl bg-white px-5 py-6 shadow-xs dark:bg-gray-800 border-t-4 border-[#C7A856] border-x border-b border-gray-100 dark:border-gray-700 relative overflow-hidden transition-all hover:shadow-md">
                                    <dt className="truncate text-xs font-semibold text-gray-400 dark:text-gray-400 uppercase tracking-wider">Total Inquiries</dt>
                                    <dd className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white font-serif">{stats.total_leads}</dd>
                                </div>
                                <div className="rounded-xl bg-white px-5 py-6 shadow-xs dark:bg-gray-800 border-t-4 border-amber-500 border-x border-b border-gray-100 dark:border-gray-700 relative overflow-hidden transition-all hover:shadow-md">
                                    <dt className="truncate text-xs font-semibold text-gray-400 dark:text-gray-400 uppercase tracking-wider">Pending</dt>
                                    <dd className="mt-2 text-3xl font-extrabold text-amber-600 dark:text-amber-400 font-serif">{stats.pending_leads}</dd>
                                </div>
                                <div className="rounded-xl bg-white px-5 py-6 shadow-xs dark:bg-gray-800 border-t-4 border-cyan-500 border-x border-b border-gray-100 dark:border-gray-700 relative overflow-hidden transition-all hover:shadow-md">
                                    <dt className="truncate text-xs font-semibold text-gray-400 dark:text-gray-400 uppercase tracking-wider">Contacted</dt>
                                    <dd className="mt-2 text-3xl font-extrabold text-cyan-600 dark:text-cyan-400 font-serif">{stats.contacted_leads}</dd>
                                </div>
                                <div className="rounded-xl bg-white px-5 py-6 shadow-xs dark:bg-gray-800 border-t-4 border-emerald-600 border-x border-b border-gray-100 dark:border-gray-700 relative overflow-hidden transition-all hover:shadow-md">
                                    <dt className="truncate text-xs font-semibold text-gray-400 dark:text-gray-400 uppercase tracking-wider">Closed</dt>
                                    <dd className="mt-2 text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-serif">{stats.closed_leads}</dd>
                                </div>
                            </div>

                            <div className="bg-white shadow sm:rounded-lg dark:bg-gray-800 overflow-hidden border border-gray-100 dark:border-gray-700">
                                <div className="border-b border-gray-200 px-6 py-5 dark:border-gray-700">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Customer Consultation Quotes</h3>
                                </div>
                                <div className="px-6 py-6 overflow-x-auto">
                                    {quoteRequests.length === 0 ? (
                                        <div className="text-center py-12 text-gray-500">Belum ada inquiry masuk.</div>
                                    ) : (
                                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
                                            <thead className="bg-emerald-50/30 dark:bg-emerald-950/10">
                                                <tr className="text-left text-gray-550 dark:text-gray-400 font-bold uppercase tracking-wider text-[10px]">
                                                    <th className="px-4 py-3">Tanggal</th>
                                                    <th className="px-4 py-3">Klien</th>
                                                    <th className="px-4 py-3">Acara</th>
                                                    <th className="px-4 py-3">Catatan</th>
                                                    <th className="px-4 py-3 text-center">Status</th>
                                                    <th className="px-4 py-3 text-right">Aksi</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-gray-700 dark:text-gray-300">
                                                {quoteRequests.map((lead) => (
                                                    <tr key={lead.id} className="align-top hover:bg-gray-50 dark:hover:bg-gray-900/30">
                                                        <td className="px-4 py-4 text-xs text-gray-400">
                                                            {new Date(lead.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                                                        </td>
                                                        <td className="px-4 py-4">
                                                            <div className="font-bold text-gray-900 dark:text-white">{lead.name}</div>
                                                            <div className="text-xs text-gray-500"><a href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="text-[#C7A856] dark:text-emerald-400 hover:text-emerald-700 hover:underline">{lead.phone}</a></div>
                                                            <div className="text-xs text-gray-400">{lead.email}</div>
                                                        </td>
                                                        <td className="px-4 py-4">
                                                            <div className="font-semibold text-gray-900 dark:text-white">{lead.event_type}</div>
                                                            <div className="text-xs text-gray-500">{new Date(lead.event_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                                                            <div className="text-xs text-gray-500">{lead.guests_count} Pax</div>
                                                        </td>
                                                        <td className="px-4 py-4 text-xs italic text-gray-500 max-w-xs">{lead.notes || '-'}</td>
                                                        <td className="px-4 py-4 text-center">
                                                            {lead.status === 'pending' && <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>}
                                                            {lead.status === 'contacted' && <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">Contacted</span>}
                                                            {lead.status === 'closed' && <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-green-100 text-green-800">Closed</span>}
                                                        </td>
                                                        <td className="px-4 py-4 text-right whitespace-nowrap space-x-1.5">
                                                            {lead.status !== 'contacted' && <button onClick={() => updateQuoteStatus(lead.id, 'contacted')} className="px-2.5 py-1 text-xs bg-cyan-50 text-cyan-700 dark:bg-cyan-950/20 dark:text-cyan-400 rounded hover:bg-cyan-100/85">Hubungi</button>}
                                                            {lead.status !== 'closed' && <button onClick={() => updateQuoteStatus(lead.id, 'closed')} className="px-2.5 py-1 text-xs bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400 rounded hover:bg-emerald-100/85">Selesai</button>}
                                                            {lead.status !== 'pending' && <button onClick={() => updateQuoteStatus(lead.id, 'pending')} className="px-2.5 py-1 text-xs bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-400 rounded hover:bg-gray-150">Reset</button>}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Menus CRUD Tab */}
                    {activeTab === 'menus' && (
                        <div className="bg-white shadow sm:rounded-lg dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                            <div className="flex justify-between items-center border-b border-gray-200 px-6 py-5 dark:border-gray-700">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Daftar Menu Hidangan</h3>
                                <button onClick={() => openMenuModal()} className="flex items-center space-x-1.5 px-4 py-2 bg-[#C7A856] text-white text-xs font-bold rounded-lg hover:bg-[#b09245] shadow-sm transition-all">
                                    <Plus className="w-4 h-4" />
                                    <span>Tambah Menu</span>
                                </button>
                            </div>
                            <div className="px-6 py-6 overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
                                    <thead className="bg-emerald-50/30 dark:bg-emerald-950/10">
                                        <tr className="text-left text-gray-500 dark:text-gray-455 font-bold uppercase tracking-wider text-[10px]">
                                            <th className="px-4 py-3">Gambar</th>
                                            <th className="px-4 py-3">Nama Menu</th>
                                            <th className="px-4 py-3">Kategori</th>
                                            <th className="px-4 py-3">Harga Mulai</th>
                                            <th className="px-4 py-3 text-center">Best Seller</th>
                                            <th className="px-4 py-3 text-right">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-gray-700 dark:text-gray-300">
                                        {menus.map((menu) => (
                                            <tr key={menu.id} className="align-middle hover:bg-gray-50 dark:hover:bg-gray-900/30">
                                                <td className="px-4 py-3 whitespace-nowrap">
                                                    {menu.image_path ? (
                                                        <img src={menu.image_path} alt={menu.name} className="w-12 h-10 object-cover rounded-lg shadow-xs border dark:border-gray-700" />
                                                    ) : (
                                                        <div className="w-12 h-10 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300 rounded-lg flex items-center justify-center font-bold text-[10px]">NO IMG</div>
                                                    )}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="font-bold text-gray-900 dark:text-white">{menu.name}</div>
                                                    <p className="text-xs text-gray-450 font-light truncate max-w-xs mt-0.5">{menu.description}</p>
                                                </td>
                                                <td className="px-4 py-3 capitalize text-gray-600 dark:text-gray-300">{menu.category}</td>
                                                <td className="px-4 py-3 font-semibold text-[#C7A856]">{formatIDR(menu.price_from)}</td>
                                                <td className="px-4 py-3 text-center">
                                                    {menu.is_best_seller ? <span className="px-2 py-0.5 text-[9px] font-bold rounded bg-yellow-100 text-yellow-800 uppercase">Yes</span> : <span className="text-gray-400">-</span>}
                                                </td>
                                                <td className="px-4 py-3 text-right space-x-1.5 whitespace-nowrap">
                                                    <button onClick={() => openMenuModal(menu)} className="p-1.5 text-gray-400 hover:text-[#C7A856] dark:hover:text-[#C7A856] transition-colors"><Edit className="w-4 h-4" /></button>
                                                    <button onClick={() => deleteMenu(menu.id)} className="p-1.5 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Testimonials CRUD Tab */}
                    {activeTab === 'testimonials' && (
                        <div className="bg-white shadow sm:rounded-lg dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                            <div className="flex justify-between items-center border-b border-gray-200 px-6 py-5 dark:border-gray-700">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Kelola Testimonial</h3>
                                <button onClick={() => openTestimonialModal()} className="flex items-center space-x-1.5 px-4 py-2 bg-[#C7A856] text-white text-xs font-bold rounded-lg hover:bg-[#b09245] shadow-sm transition-all">
                                    <Plus className="w-4 h-4" />
                                    <span>Tambah Testimoni</span>
                                </button>
                            </div>
                            <div className="px-6 py-6 overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
                                    <thead className="bg-emerald-50/30 dark:bg-emerald-950/10">
                                        <tr className="text-left text-gray-500 dark:text-gray-455 font-bold uppercase tracking-wider text-[10px]">
                                            <th className="px-4 py-3">Customer</th>
                                            <th className="px-4 py-3">Acara/Jabatan</th>
                                            <th className="px-4 py-3">Rating</th>
                                            <th className="px-4 py-3">Ulasan</th>
                                            <th className="px-4 py-3 text-right">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-gray-700 dark:text-gray-300">
                                        {testimonials.map((test) => (
                                            <tr key={test.id} className="align-top hover:bg-gray-50 dark:hover:bg-gray-900/30">
                                                <td className="px-4 py-4 font-bold text-gray-900 dark:text-white">{test.customer_name}</td>
                                                <td className="px-4 py-4 text-gray-500">{test.customer_title}</td>
                                                <td className="px-4 py-4 text-yellow-500">{'★'.repeat(test.rating)}</td>
                                                <td className="px-4 py-4 text-xs max-w-xs italic text-gray-600 dark:text-gray-400">{test.review}</td>
                                                <td className="px-4 py-4 text-right space-x-1.5 whitespace-nowrap">
                                                    <button onClick={() => openTestimonialModal(test)} className="p-1.5 text-gray-400 hover:text-[#C7A856] dark:hover:text-[#C7A856] transition-colors"><Edit className="w-4 h-4" /></button>
                                                    <button onClick={() => deleteTestimonial(test.id)} className="p-1.5 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* FAQs CRUD Tab */}
                    {activeTab === 'faqs' && (
                        <div className="bg-white shadow sm:rounded-lg dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                            <div className="flex justify-between items-center border-b border-gray-200 px-6 py-5 dark:border-gray-700">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Kelola Pertanyaan FAQ</h3>
                                <button onClick={() => openFaqModal()} className="flex items-center space-x-1.5 px-4 py-2 bg-[#C7A856] text-white text-xs font-bold rounded-lg hover:bg-[#b09245] shadow-sm transition-all">
                                    <Plus className="w-4 h-4" />
                                    <span>Tambah FAQ</span>
                                </button>
                            </div>
                            <div className="px-6 py-6 overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
                                    <thead className="bg-emerald-50/30 dark:bg-emerald-950/10">
                                        <tr className="text-left text-gray-500 dark:text-gray-455 font-bold uppercase tracking-wider text-[10px]">
                                            <th className="px-4 py-3 w-16">Urutan</th>
                                            <th className="px-4 py-3">Pertanyaan</th>
                                            <th className="px-4 py-3">Jawaban</th>
                                            <th className="px-4 py-3 text-right">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-gray-700 dark:text-gray-300">
                                        {faqs.map((faq) => (
                                            <tr key={faq.id} className="align-top hover:bg-gray-50 dark:hover:bg-gray-900/30">
                                                <td className="px-4 py-4 font-bold text-gray-500">{faq.order_num}</td>
                                                <td className="px-4 py-4 font-semibold text-gray-900 dark:text-white">{faq.question}</td>
                                                <td className="px-4 py-4 text-xs text-gray-600 dark:text-gray-400 max-w-sm">{faq.answer}</td>
                                                <td className="px-4 py-4 text-right space-x-1.5 whitespace-nowrap">
                                                    <button onClick={() => openFaqModal(faq)} className="p-1.5 text-gray-400 hover:text-[#C7A856] dark:hover:text-[#C7A856] transition-colors"><Edit className="w-4 h-4" /></button>
                                                    <button onClick={() => deleteFaq(faq.id)} className="p-1.5 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Services CRUD Tab */}
                    {activeTab === 'services' && (
                        <div className="bg-white shadow sm:rounded-lg dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                            <div className="flex justify-between items-center border-b border-gray-200 px-6 py-5 dark:border-gray-700">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Kelola Kategori Layanan</h3>
                                <button onClick={() => openServiceModal()} className="flex items-center space-x-1.5 px-4 py-2 bg-[#C7A856] text-white text-xs font-bold rounded-lg hover:bg-[#b09245] shadow-sm transition-all">
                                    <Plus className="w-4 h-4" />
                                    <span>Tambah Layanan</span>
                                </button>
                            </div>
                            <div className="px-6 py-6 overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
                                    <thead className="bg-emerald-50/30 dark:bg-emerald-950/10">
                                        <tr className="text-left text-gray-500 dark:text-gray-455 font-bold uppercase tracking-wider text-[10px]">
                                            <th className="px-4 py-3 w-16">Urutan</th>
                                            <th className="px-4 py-3">Nama Layanan</th>
                                            <th className="px-4 py-3">Deskripsi</th>
                                            <th className="px-4 py-3">Ikon Lucide</th>
                                            <th className="px-4 py-3 text-right">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-gray-700 dark:text-gray-300">
                                        {services.map((svc) => (
                                            <tr key={svc.id} className="align-top hover:bg-gray-50 dark:hover:bg-gray-900/30">
                                                <td className="px-4 py-4 font-bold text-gray-500">{svc.order_num}</td>
                                                <td className="px-4 py-4 font-bold text-gray-900 dark:text-white">{svc.title}</td>
                                                <td className="px-4 py-4 text-xs text-gray-600 dark:text-gray-400 max-w-sm">{svc.description}</td>
                                                <td className="px-4 py-4 text-xs font-mono">{svc.icon_name}</td>
                                                <td className="px-4 py-4 text-right space-x-1.5 whitespace-nowrap">
                                                    <button onClick={() => openServiceModal(svc)} className="p-1.5 text-gray-400 hover:text-[#C7A856] dark:hover:text-[#C7A856] transition-colors"><Edit className="w-4 h-4" /></button>
                                                    <button onClick={() => deleteService(svc.id)} className="p-1.5 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Partners CRUD Tab */}
                    {activeTab === 'partners' && (
                        <div className="bg-white shadow sm:rounded-lg dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                            <div className="flex justify-between items-center border-b border-gray-200 px-6 py-5 dark:border-gray-700">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Mitra / Klien Logo</h3>
                                <button onClick={() => openPartnerModal()} className="flex items-center space-x-1.5 px-4 py-2 bg-[#C7A856] text-white text-xs font-bold rounded-lg hover:bg-[#b09245] shadow-sm transition-all">
                                    <Plus className="w-4 h-4" />
                                    <span>Tambah Mitra</span>
                                </button>
                            </div>
                            <div className="px-6 py-6 overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
                                    <thead className="bg-emerald-50/30 dark:bg-emerald-950/10">
                                        <tr className="text-left text-gray-500 dark:text-gray-455 font-bold uppercase tracking-wider text-[10px]">
                                            <th className="px-4 py-3 w-16">Urutan</th>
                                            <th className="px-4 py-3">Nama Mitra</th>
                                            <th className="px-4 py-3 text-right">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-gray-700 dark:text-gray-300">
                                        {partners.map((p) => (
                                            <tr key={p.id} className="align-middle hover:bg-gray-50 dark:hover:bg-gray-900/30">
                                                <td className="px-4 py-3 font-bold text-gray-500">{p.order_num}</td>
                                                <td className="px-4 py-3 font-bold text-gray-900 dark:text-white">{p.name}</td>
                                                <td className="px-4 py-3 text-right space-x-1.5 whitespace-nowrap">
                                                    <button onClick={() => openPartnerModal(p)} className="p-1.5 text-gray-400 hover:text-[#C7A856] dark:hover:text-[#C7A856] transition-colors"><Edit className="w-4 h-4" /></button>
                                                    <button onClick={() => deletePartner(p.id)} className="p-1.5 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Web Settings - Hero & Slider Tab */}
                    {activeTab === 'settings-hero' && (
                        <div className="bg-white shadow sm:rounded-lg dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-8">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white border-b pb-4 mb-6">Pengaturan Banner Utama & Slider Before-After</h3>
                            <form onSubmit={handleSettingsSubmit} className="space-y-6 max-w-2xl">
                                <h4 className="text-sm font-semibold text-gray-900 dark:text-white border-b pb-2">Pengaturan Hero Banner</h4>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Judul Hero (Dukung tag HTML seperti &lt;br /&gt; atau &lt;span class="text-secondary italic"&gt;)</label>
                                        <input
                                            type="text"
                                            value={settingsForm.hero_title}
                                            onChange={(e) => setSettingsForm({ ...settingsForm, hero_title: e.target.value })}
                                            className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 outline-none focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132] text-gray-900 dark:text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Sub-judul Hero (Deskripsi Singkat)</label>
                                        <textarea
                                            rows={2}
                                            value={settingsForm.hero_subtitle}
                                            onChange={(e) => setSettingsForm({ ...settingsForm, hero_subtitle: e.target.value })}
                                            className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 outline-none focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132] text-gray-900 dark:text-white resize-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Gambar Background Hero (Resolusi Rekomendasi: 1920x1080px, format .webp/.jpg)</label>
                                        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                                            {settingsForm.hero_bg_image && (
                                                <img src={settingsForm.hero_bg_image} alt="Hero background preview" className="w-24 h-16 object-cover rounded-lg shadow-xs border dark:border-gray-700" />
                                            )}
                                            <div className="flex-1 w-full">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => setHeroBgFile(e.target.files ? e.target.files[0] : null)}
                                                    className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-[#0F5132] hover:file:bg-emerald-100 dark:file:bg-emerald-950/20 dark:file:text-[#C7A856]"
                                                />
                                                {heroBgFile && <p className="text-[10px] text-green-600 mt-1">✔ File terpilih: {heroBgFile.name}</p>}
                                                <p className="text-[10px] text-gray-400 mt-1">Current path: {settingsForm.hero_bg_image || '-'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <h4 className="text-sm font-semibold text-gray-900 dark:text-white border-b pb-2 pt-4">Pengaturan Before-After Slider</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Gambar Sebelum Setup (Resolusi Rekomendasi: 1920x1080px)</label>
                                            <div className="flex flex-col gap-2">
                                                {settingsForm.slider_before_image && (
                                                    <img src={settingsForm.slider_before_image} alt="Slider before preview" className="w-24 h-16 object-cover rounded-lg shadow-xs border dark:border-gray-700" />
                                                )}
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => setSliderBeforeFile(e.target.files ? e.target.files[0] : null)}
                                                    className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-[#0F5132] hover:file:bg-emerald-100 dark:file:bg-emerald-950/20 dark:file:text-[#C7A856]"
                                                />
                                                {sliderBeforeFile && <p className="text-[10px] text-green-600 mt-1">✔ File terpilih: {sliderBeforeFile.name}</p>}
                                                <p className="text-[10px] text-gray-400 mt-1">Current: {settingsForm.slider_before_image || '-'}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Label Sebelum Setup</label>
                                            <input
                                                type="text"
                                                value={settingsForm.slider_before_label}
                                                onChange={(e) => setSettingsForm({ ...settingsForm, slider_before_label: e.target.value })}
                                                className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 outline-none focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132] text-gray-900 dark:text-white"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Gambar Sesudah Setup (Resolusi Rekomendasi: 1920x1080px)</label>
                                            <div className="flex flex-col gap-2">
                                                {settingsForm.slider_after_image && (
                                                    <img src={settingsForm.slider_after_image} alt="Slider after preview" className="w-24 h-16 object-cover rounded-lg shadow-xs border dark:border-gray-700" />
                                                )}
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => setSliderAfterFile(e.target.files ? e.target.files[0] : null)}
                                                    className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-[#0F5132] hover:file:bg-emerald-100 dark:file:bg-emerald-950/20 dark:file:text-[#C7A856]"
                                                />
                                                {sliderAfterFile && <p className="text-[10px] text-green-600 mt-1">✔ File terpilih: {sliderAfterFile.name}</p>}
                                                <p className="text-[10px] text-gray-400 mt-1">Current: {settingsForm.slider_after_image || '-'}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Label Sesudah Setup</label>
                                            <input
                                                type="text"
                                                value={settingsForm.slider_after_label}
                                                onChange={(e) => setSettingsForm({ ...settingsForm, slider_after_label: e.target.value })}
                                                className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 outline-none focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132] text-gray-900 dark:text-white"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="px-6 py-2.5 bg-[#C7A856] hover:bg-[#b09245] text-white font-bold text-xs rounded-lg shadow-md shadow-amber-500/5 transition-all cursor-pointer animate-fadeIn"
                                >
                                    Simpan Banner & Slider
                                </button>
                            </form>
                        </div>
                    )}

                    {/* Web Settings - Kontak & Sosmed Tab */}
                    {activeTab === 'settings-contact' && (
                        <div className="bg-white shadow sm:rounded-lg dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-8">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white border-b pb-4 mb-6">Pengaturan Kontak & Media Sosial</h3>
                            <form onSubmit={handleSettingsSubmit} className="space-y-6 max-w-2xl">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">WhatsApp number (Hanya angka, e.g. 628123456)</label>
                                        <input
                                            type="text"
                                            value={settingsForm.company_wa}
                                            onChange={(e) => setSettingsForm({ ...settingsForm, company_wa: e.target.value })}
                                            className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 outline-none focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132] text-gray-900 dark:text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Telepon Tampil Kantor</label>
                                        <input
                                            type="text"
                                            value={settingsForm.company_phone}
                                            onChange={(e) => setSettingsForm({ ...settingsForm, company_phone: e.target.value })}
                                            className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 outline-none focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132] text-gray-900 dark:text-white"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Email Kontak</label>
                                        <input
                                            type="email"
                                            value={settingsForm.company_email}
                                            onChange={(e) => setSettingsForm({ ...settingsForm, company_email: e.target.value })}
                                            className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 outline-none focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132] text-gray-900 dark:text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Alamat Kantor Lengkap</label>
                                        <input
                                            type="text"
                                            value={settingsForm.company_address}
                                            onChange={(e) => setSettingsForm({ ...settingsForm, company_address: e.target.value })}
                                            className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 outline-none focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132] text-gray-900 dark:text-white"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Operasional Hari Kerja</label>
                                        <input
                                            type="text"
                                            value={settingsForm.operational_hours_weekday}
                                            onChange={(e) => setSettingsForm({ ...settingsForm, operational_hours_weekday: e.target.value })}
                                            className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 outline-none focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132] text-gray-900 dark:text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Operasional Hari Libur</label>
                                        <input
                                            type="text"
                                            value={settingsForm.operational_hours_weekend}
                                            onChange={(e) => setSettingsForm({ ...settingsForm, operational_hours_weekend: e.target.value })}
                                            className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 outline-none focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132] text-gray-900 dark:text-white"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Instagram (@Username)</label>
                                        <input
                                            type="text"
                                            value={settingsForm.company_instagram}
                                            onChange={(e) => setSettingsForm({ ...settingsForm, company_instagram: e.target.value })}
                                            className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 outline-none focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132] text-gray-900 dark:text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Facebook</label>
                                        <input
                                            type="text"
                                            value={settingsForm.company_facebook}
                                            onChange={(e) => setSettingsForm({ ...settingsForm, company_facebook: e.target.value })}
                                            className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 outline-none focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132] text-gray-900 dark:text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">YouTube</label>
                                        <input
                                            type="text"
                                            value={settingsForm.company_youtube}
                                            onChange={(e) => setSettingsForm({ ...settingsForm, company_youtube: e.target.value })}
                                            className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 outline-none focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132] text-gray-900 dark:text-white"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Embed Google Maps Link (Iframe Src)</label>
                                    <textarea
                                        rows={3}
                                        value={settingsForm.google_maps_url}
                                        onChange={(e) => setSettingsForm({ ...settingsForm, google_maps_url: e.target.value })}
                                        className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 outline-none focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132] text-gray-900 dark:text-white resize-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="px-6 py-2.5 bg-[#C7A856] hover:bg-[#b09245] text-white font-bold text-xs rounded-lg shadow-md shadow-amber-500/5 transition-all cursor-pointer"
                                >
                                    Simpan Kontak & Sosmed
                                </button>
                            </form>
                        </div>
                    )}

                    {/* Web Settings - Keunggulan & Stats Tab */}
                    {activeTab === 'settings-features' && (
                        <div className="bg-white shadow sm:rounded-lg dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-8">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white border-b pb-4 mb-6">Pengaturan Keunggulan & Angka Statistik</h3>
                            <form onSubmit={handleSettingsSubmit} className="space-y-6">
                                <h4 className="text-sm font-semibold text-gray-900 dark:text-white border-b pb-2">Pengaturan Seksi Keunggulan</h4>
                                <div className="space-y-4 max-w-2xl">
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Badge Keunggulan</label>
                                            <input
                                                type="text"
                                                value={settingsForm.advantages_badge}
                                                onChange={(e) => setSettingsForm({ ...settingsForm, advantages_badge: e.target.value })}
                                                placeholder="e.g. Why Choose Us"
                                                className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 outline-none focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132] text-gray-900 dark:text-white"
                                            />
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Judul Seksi Keunggulan</label>
                                            <input
                                                type="text"
                                                value={settingsForm.advantages_title}
                                                onChange={(e) => setSettingsForm({ ...settingsForm, advantages_title: e.target.value })}
                                                placeholder="e.g. Standar Pelayanan Katering Bintang Lima"
                                                className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 outline-none focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132] text-gray-900 dark:text-white"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Deskripsi Seksi Keunggulan</label>
                                        <textarea
                                            rows={2}
                                            value={settingsForm.advantages_description}
                                            onChange={(e) => setSettingsForm({ ...settingsForm, advantages_description: e.target.value })}
                                            placeholder="Deskripsi singkat seksi keunggulan..."
                                            className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 outline-none focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132] text-gray-900 dark:text-white resize-none"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t pt-4 dark:border-gray-700">
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Keunggulan 1: Judul</label>
                                                <input type="text" value={settingsForm.advantage_1_title} onChange={(e) => setSettingsForm({ ...settingsForm, advantage_1_title: e.target.value })} className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 outline-none focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132] text-gray-900 dark:text-white" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Keunggulan 1: Deskripsi</label>
                                                <input type="text" value={settingsForm.advantage_1_desc} onChange={(e) => setSettingsForm({ ...settingsForm, advantage_1_desc: e.target.value })} className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 outline-none focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132] text-gray-900 dark:text-white" />
                                            </div>

                                            <div>
                                                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Keunggulan 2: Judul</label>
                                                <input type="text" value={settingsForm.advantage_2_title} onChange={(e) => setSettingsForm({ ...settingsForm, advantage_2_title: e.target.value })} className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 outline-none focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132] text-gray-900 dark:text-white" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Keunggulan 2: Deskripsi</label>
                                                <input type="text" value={settingsForm.advantage_2_desc} onChange={(e) => setSettingsForm({ ...settingsForm, advantage_2_desc: e.target.value })} className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 outline-none focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132] text-gray-900 dark:text-white" />
                                            </div>

                                            <div>
                                                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Keunggulan 3: Judul</label>
                                                <input type="text" value={settingsForm.advantage_3_title} onChange={(e) => setSettingsForm({ ...settingsForm, advantage_3_title: e.target.value })} className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 outline-none focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132] text-gray-900 dark:text-white" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Keunggulan 3: Deskripsi</label>
                                                <input type="text" value={settingsForm.advantage_3_desc} onChange={(e) => setSettingsForm({ ...settingsForm, advantage_3_desc: e.target.value })} className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 outline-none focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132] text-gray-900 dark:text-white" />
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Keunggulan 4: Judul</label>
                                                <input type="text" value={settingsForm.advantage_4_title} onChange={(e) => setSettingsForm({ ...settingsForm, advantage_4_title: e.target.value })} className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 outline-none focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132] text-gray-900 dark:text-white" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Keunggulan 4: Deskripsi</label>
                                                <input type="text" value={settingsForm.advantage_4_desc} onChange={(e) => setSettingsForm({ ...settingsForm, advantage_4_desc: e.target.value })} className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 outline-none focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132] text-gray-900 dark:text-white" />
                                            </div>

                                            <div>
                                                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Keunggulan 5: Judul</label>
                                                <input type="text" value={settingsForm.advantage_5_title} onChange={(e) => setSettingsForm({ ...settingsForm, advantage_5_title: e.target.value })} className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 outline-none focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132] text-gray-900 dark:text-white" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Keunggulan 5: Deskripsi</label>
                                                <input type="text" value={settingsForm.advantage_5_desc} onChange={(e) => setSettingsForm({ ...settingsForm, advantage_5_desc: e.target.value })} className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 outline-none focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132] text-gray-900 dark:text-white" />
                                            </div>

                                            <div>
                                                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Keunggulan 6: Judul</label>
                                                <input type="text" value={settingsForm.advantage_6_title} onChange={(e) => setSettingsForm({ ...settingsForm, advantage_6_title: e.target.value })} className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 outline-none focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132] text-gray-900 dark:text-white" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Keunggulan 6: Deskripsi</label>
                                                <input type="text" value={settingsForm.advantage_6_desc} onChange={(e) => setSettingsForm({ ...settingsForm, advantage_6_desc: e.target.value })} className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 outline-none focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132] text-gray-900 dark:text-white" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <h4 className="text-sm font-semibold text-gray-900 dark:text-white border-b pb-2 pt-6">Pengaturan Angka Statistik</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="col-span-1">
                                                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Tahun (Angka)</label>
                                                <input type="number" value={settingsForm.stats_years} onChange={(e) => setSettingsForm({ ...settingsForm, stats_years: e.target.value })} className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 outline-none focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132] text-gray-900 dark:text-white" />
                                            </div>
                                            <div className="col-span-2">
                                                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Label Tahun</label>
                                                <input type="text" value={settingsForm.stats_years_label} onChange={(e) => setSettingsForm({ ...settingsForm, stats_years_label: e.target.value })} className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 outline-none focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132] text-gray-900 dark:text-white" />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="col-span-1">
                                                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Event (Angka)</label>
                                                <input type="number" value={settingsForm.stats_events} onChange={(e) => setSettingsForm({ ...settingsForm, stats_events: e.target.value })} className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 outline-none focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132] text-gray-900 dark:text-white" />
                                            </div>
                                            <div className="col-span-2">
                                                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Label Event</label>
                                                <input type="text" value={settingsForm.stats_events_label} onChange={(e) => setSettingsForm({ ...settingsForm, stats_events_label: e.target.value })} className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 outline-none focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132] text-gray-900 dark:text-white" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="col-span-1">
                                                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Mitra (Angka)</label>
                                                <input type="number" value={settingsForm.stats_partners} onChange={(e) => setSettingsForm({ ...settingsForm, stats_partners: e.target.value })} className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 outline-none focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132] text-gray-900 dark:text-white" />
                                            </div>
                                            <div className="col-span-2">
                                                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Label Mitra</label>
                                                <input type="text" value={settingsForm.stats_partners_label} onChange={(e) => setSettingsForm({ ...settingsForm, stats_partners_label: e.target.value })} className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 outline-none focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132] text-gray-900 dark:text-white" />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="col-span-1">
                                                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Puas % (Angka)</label>
                                                <input type="number" value={settingsForm.stats_satisfaction} onChange={(e) => setSettingsForm({ ...settingsForm, stats_satisfaction: e.target.value })} className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 outline-none focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132] text-gray-900 dark:text-white" />
                                            </div>
                                            <div className="col-span-2">
                                                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Label Kepuasan</label>
                                                <input type="text" value={settingsForm.stats_satisfaction_label} onChange={(e) => setSettingsForm({ ...settingsForm, stats_satisfaction_label: e.target.value })} className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 outline-none focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132] text-gray-900 dark:text-white" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="px-6 py-2.5 bg-[#C7A856] hover:bg-[#b09245] text-white font-bold text-xs rounded-lg shadow-md shadow-amber-500/5 transition-all cursor-pointer"
                                >
                                    Simpan Keunggulan & Stats
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>

            {/* Menu CRUD Modal */}
            {isMenuModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-gray-800 max-w-md w-full rounded-xl overflow-hidden shadow-2xl p-6 relative">
                        <button onClick={() => setIsMenuModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-white"><X className="w-5 h-5" /></button>
                        <h4 className="font-playfair text-xl font-bold text-gray-900 dark:text-white mb-4">{editingMenu ? 'Edit Menu' : 'Tambah Menu Baru'}</h4>
                        <form onSubmit={handleMenuSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Nama Hidangan</label>
                                <input type="text" required value={menuForm.name} onChange={(e) => setMenuForm({ ...menuForm, name: e.target.value })} className="w-full px-3 py-2 text-sm rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-900 outline-none focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132] text-gray-900 dark:text-white" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Kategori</label>
                                    <select value={menuForm.category} onChange={(e) => setMenuForm({ ...menuForm, category: e.target.value })} className="w-full px-3 py-2 text-sm rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-900 outline-none focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132] text-gray-900 dark:text-white">
                                        <option value="buffet">Prasmanan / Buffet</option>
                                        <option value="corporate">Korporat / Bisnis</option>
                                        <option value="private-event">Private Event</option>
                                        <option value="coffee-break">Coffee Break</option>
                                        <option value="lunch-box">Lunch Box</option>
                                        <option value="aqiqah">Aqiqah</option>
                                        <option value="dessert">Pencuci Mulut</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Harga Mulai (IDR)</label>
                                    <input type="number" required value={menuForm.price_from} onChange={(e) => setMenuForm({ ...menuForm, price_from: Number(e.target.value) })} className="w-full px-3 py-2 text-sm rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-900 outline-none focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132] text-gray-900 dark:text-white" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Deskripsi Menu</label>
                                <textarea rows={3} required value={menuForm.description} onChange={(e) => setMenuForm({ ...menuForm, description: e.target.value })} className="w-full px-3 py-2 text-sm rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-900 outline-none focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132] text-gray-900 dark:text-white resize-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Tags / Keistimewaan (Pisahkan dengan koma)</label>
                                <input type="text" value={menuForm.tagsString} onChange={(e) => setMenuForm({ ...menuForm, tagsString: e.target.value })} placeholder="e.g. Halal, Tradisional, Pedas" className="w-full px-3 py-2 text-sm rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-900 outline-none focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132] text-gray-900 dark:text-white" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Foto Hidangan (Rekomendasi: 800x600px)</label>
                                <div className="flex items-center gap-3">
                                    {editingMenu && editingMenu.image_path && (
                                        <img src={editingMenu.image_path} alt="Preview" className="w-16 h-12 object-cover rounded-lg border dark:border-gray-700 shadow-xs" />
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setMenuImageFile(e.target.files ? e.target.files[0] : null)}
                                        className="w-full text-xs text-gray-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-[#0F5132] hover:file:bg-emerald-100 dark:file:bg-emerald-950/20 dark:file:text-[#C7A856]"
                                    />
                                </div>
                                {menuImageFile && <p className="text-[10px] text-green-600 mt-1">✔ File terpilih: {menuImageFile.name}</p>}
                            </div>
                            <div className="flex items-center space-x-2">
                                <input type="checkbox" id="best_seller" checked={menuForm.is_best_seller} onChange={(e) => setMenuForm({ ...menuForm, is_best_seller: e.target.checked })} className="rounded text-[#0F5132] focus:ring-[#0F5132]" />
                                <label htmlFor="best_seller" className="text-xs text-gray-700 dark:text-gray-300">Set sebagai Menu Best Seller</label>
                            </div>
                            <button type="submit" className="w-full py-2.5 bg-[#C7A856] hover:bg-[#b09245] text-white font-bold text-xs rounded transition-all shadow-md">Simpan Menu</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Testimonial CRUD Modal */}
            {isTestimonialModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-gray-800 max-w-md w-full rounded-xl overflow-hidden shadow-2xl p-6 relative">
                        <button onClick={() => setIsTestimonialModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-white"><X className="w-5 h-5" /></button>
                        <h4 className="font-playfair text-xl font-bold text-gray-900 dark:text-white mb-4">{editingTestimonial ? 'Edit Testimonial' : 'Tambah Testimoni'}</h4>
                        <form onSubmit={handleTestimonialSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Nama Customer</label>
                                <input type="text" required value={testimonialForm.customer_name} onChange={(e) => setTestimonialForm({ ...testimonialForm, customer_name: e.target.value })} className="w-full px-3 py-2 text-sm rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-900 outline-none focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132] text-gray-900 dark:text-white" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Acara / Keterangan (e.g. Wedding di Hotel A)</label>
                                <input type="text" required value={testimonialForm.customer_title} onChange={(e) => setTestimonialForm({ ...testimonialForm, customer_title: e.target.value })} className="w-full px-3 py-2 text-sm rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-900 outline-none focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132] text-gray-900 dark:text-white" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Rating Bintang (1-5)</label>
                                    <input type="number" min={1} max={5} required value={testimonialForm.rating} onChange={(e) => setTestimonialForm({ ...testimonialForm, rating: Number(e.target.value) })} className="w-full px-3 py-2 text-sm rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-900 outline-none focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132] text-gray-900 dark:text-white" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Isi Review Ulasan</label>
                                <textarea rows={3} required value={testimonialForm.review} onChange={(e) => setTestimonialForm({ ...testimonialForm, review: e.target.value })} className="w-full px-3 py-2 text-sm rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-900 outline-none focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132] text-gray-900 dark:text-white resize-none" />
                            </div>
                            <button type="submit" className="w-full py-2.5 bg-[#C7A856] hover:bg-[#b09245] text-white font-bold text-xs rounded transition-all shadow-md">Simpan Testimoni</button>
                        </form>
                    </div>
                </div>
            )}

            {/* FAQ CRUD Modal */}
            {isFaqModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-gray-800 max-w-md w-full rounded-xl overflow-hidden shadow-2xl p-6 relative">
                        <button onClick={() => setIsFaqModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-white"><X className="w-5 h-5" /></button>
                        <h4 className="font-playfair text-xl font-bold text-gray-900 dark:text-white mb-4">{editingFaq ? 'Edit FAQ' : 'Tambah FAQ'}</h4>
                        <form onSubmit={handleFaqSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Pertanyaan</label>
                                <input type="text" required value={faqForm.question} onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })} className="w-full px-3 py-2 text-sm rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-900 outline-none focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132] text-gray-900 dark:text-white" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Jawaban</label>
                                <textarea rows={4} required value={faqForm.answer} onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })} className="w-full px-3 py-2 text-sm rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-900 outline-none focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132] text-gray-900 dark:text-white resize-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Urutan Tampil (Angka)</label>
                                <input type="number" required value={faqForm.order_num} onChange={(e) => setFaqForm({ ...faqForm, order_num: Number(e.target.value) })} className="w-full px-3 py-2 text-sm rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-900 outline-none focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132] text-gray-900 dark:text-white" />
                            </div>
                            <button type="submit" className="w-full py-2.5 bg-[#C7A856] hover:bg-[#b09245] text-white font-bold text-xs rounded transition-all shadow-md">Simpan FAQ</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Service CRUD Modal */}
            {isServiceModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-gray-800 max-w-md w-full rounded-xl overflow-hidden shadow-2xl p-6 relative">
                        <button onClick={() => setIsServiceModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-white"><X className="w-5 h-5" /></button>
                        <h4 className="font-playfair text-xl font-bold text-gray-900 dark:text-white mb-4">{editingService ? 'Edit Layanan' : 'Tambah Layanan Baru'}</h4>
                        <form onSubmit={handleServiceSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Nama Layanan</label>
                                <input type="text" required value={serviceForm.title} onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })} className="w-full px-3 py-2 text-sm rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-900 outline-none focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132] text-gray-900 dark:text-white" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Deskripsi Singkat</label>
                                <textarea rows={3} required value={serviceForm.description} onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })} className="w-full px-3 py-2 text-sm rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-900 outline-none focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132] text-gray-900 dark:text-white resize-none" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Ikon Lucide (e.g. Award, Users, Clock)</label>
                                    <select value={serviceForm.icon_name} onChange={(e) => setServiceForm({ ...serviceForm, icon_name: e.target.value })} className="w-full px-3 py-2 text-sm rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-900 outline-none focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132] text-gray-900 dark:text-white">
                                        <option value="Award">Award (Bintang / Trophy)</option>
                                        <option value="Users">Users (Grup / Pelanggan)</option>
                                        <option value="Clock">Clock (Waktu / On-Time)</option>
                                        <option value="ChefHat">ChefHat (Koki / Dapur)</option>
                                        <option value="Sparkles">Sparkles (Spesial / Premium)</option>
                                        <option value="ShieldCheck">ShieldCheck (Higienis / Keamanan)</option>
                                        <option value="Check">Check (Centang)</option>
                                        <option value="Phone">Phone (Privat Dining)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Urutan Tampil</label>
                                    <input type="number" required value={serviceForm.order_num} onChange={(e) => setServiceForm({ ...serviceForm, order_num: Number(e.target.value) })} className="w-full px-3 py-2 text-sm rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-900 outline-none focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132] text-gray-900 dark:text-white" />
                                </div>
                            </div>
                            <button type="submit" className="w-full py-2.5 bg-[#C7A856] hover:bg-[#b09245] text-white font-bold text-xs rounded transition-all shadow-md">Simpan Layanan</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Partner CRUD Modal */}
            {isPartnerModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-gray-800 max-w-md w-full rounded-xl overflow-hidden shadow-2xl p-6 relative">
                        <button onClick={() => setIsPartnerModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-white"><X className="w-5 h-5" /></button>
                        <h4 className="font-playfair text-xl font-bold text-gray-900 dark:text-white mb-4">{editingPartner ? 'Edit Mitra' : 'Tambah Mitra Baru'}</h4>
                        <form onSubmit={handlePartnerSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Nama Mitra / Klien (Text Logo)</label>
                                <input type="text" required value={partnerForm.name} onChange={(e) => setPartnerForm({ ...partnerForm, name: e.target.value })} className="w-full px-3 py-2 text-sm rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-900 outline-none focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132] text-gray-900 dark:text-white" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Urutan Tampil</label>
                                <input type="number" required value={partnerForm.order_num} onChange={(e) => setPartnerForm({ ...partnerForm, order_num: Number(e.target.value) })} className="w-full px-3 py-2 text-sm rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-900 outline-none focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132] text-gray-900 dark:text-white" />
                            </div>
                            <button type="submit" className="w-full py-2.5 bg-[#C7A856] hover:bg-[#b09245] text-white font-bold text-xs rounded transition-all shadow-md">Simpan Mitra</button>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
