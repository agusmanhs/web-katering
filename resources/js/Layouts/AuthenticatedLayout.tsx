import Dropdown from '@/Components/Dropdown';
import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useState, useEffect } from 'react';
import { Menu, X, Sparkles, LogOut, User, LayoutDashboard, Settings, Sun, Moon, Monitor, ChevronDown, ChevronRight } from 'lucide-react';

export interface SidebarItem {
    id: string;
    label: string;
    icon: ReactNode;
    onClick?: () => void;
    active: boolean;
    href?: string;
    indent?: boolean;
    subItems?: SidebarItem[];
}

function SidebarCollapseItem({ item, isMobileOpen, setIsMobileOpen }: { item: SidebarItem; isMobileOpen?: boolean; setIsMobileOpen?: (val: boolean) => void }) {
    const hasActiveSub = item.subItems?.some(sub => sub.active);
    const [isOpen, setIsOpen] = useState(item.active || !!hasActiveSub);

    useEffect(() => {
        if (item.active || hasActiveSub) {
            setIsOpen(true);
        }
    }, [item.active, hasActiveSub]);

    const handleToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsOpen(!isOpen);
        if (item.onClick) {
            item.onClick();
        }
    };

    const parentClassName = `w-full group flex items-center justify-between px-5 py-3 text-xs font-bold transition-all duration-200 border-l-4 cursor-pointer ${
        item.active
            ? 'bg-gradient-to-r from-emerald-900/40 to-transparent border-[#C7A856] text-[#C7A856]'
            : 'border-transparent text-red-200 hover:bg-red-900/20 hover:text-white hover:border-red-800/30'
    }`;

    return (
        <div className="space-y-1">
            <button onClick={handleToggle} className={parentClassName}>
                <div className="flex items-center space-x-3">
                    <span className={item.active ? 'text-[#C7A856]' : 'text-red-400 group-hover:text-red-100'}>
                        {item.icon}
                    </span>
                    <span>{item.label}</span>
                </div>
                <span>
                    {isOpen ? (
                        <ChevronDown className="w-3.5 h-3.5 text-red-400 group-hover:text-red-100" />
                    ) : (
                        <ChevronRight className="w-3.5 h-3.5 text-red-400 group-hover:text-red-100" />
                    )}
                </span>
            </button>
            
            {isOpen && item.subItems && (
                <div className="space-y-1 pl-4 border-l border-red-900/30 ml-6">
                    {item.subItems.map(sub => {
                        const isLink = !!sub.href;
                        const subClassName = `w-full group flex items-center space-x-3 pl-4 pr-5 py-2 text-[11px] font-medium transition-all duration-200 border-l-2 ${
                            sub.active
                                ? 'bg-gradient-to-r from-emerald-900/30 to-transparent border-[#C7A856] text-[#C7A856]'
                                : 'border-transparent text-red-300 hover:bg-red-900/10 hover:text-white hover:border-emerald-800/30'
                        }`;
                        
                        const handleSubClick = () => {
                            if (sub.onClick) sub.onClick();
                            if (setIsMobileOpen) setIsMobileOpen(false);
                        };

                        if (isLink) {
                            return (
                                <Link key={sub.id} href={sub.href!} className={subClassName} onClick={() => setIsMobileOpen && setIsMobileOpen(false)}>
                                    <span className={sub.active ? 'text-[#C7A856]' : 'text-red-500 group-hover:text-red-100'}>
                                        {sub.icon}
                                    </span>
                                    <span>{sub.label}</span>
                                </Link>
                            );
                        } else {
                            return (
                                <button key={sub.id} onClick={handleSubClick} className={subClassName}>
                                    <span className={sub.active ? 'text-[#C7A856]' : 'text-red-500 group-hover:text-red-100'}>
                                        {sub.icon}
                                    </span>
                                    <span>{sub.label}</span>
                                </button>
                            );
                        }
                    })}
                </div>
            )}
        </div>
    );
}

export default function Authenticated({
    header,
    sidebarItems,
    children,
}: PropsWithChildren<{
    header?: ReactNode;
    sidebarItems?: SidebarItem[];
}>) {
    const user = usePage().props.auth.user;
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(() => {
        if (typeof window !== 'undefined') {
            return (localStorage.getItem('theme') as any) || 'system';
        }
        return 'system';
    });

    useEffect(() => {
        const root = window.document.documentElement;
        
        const applyTheme = () => {
            root.classList.remove('light', 'dark');
            
            if (theme === 'dark') {
                root.classList.add('dark');
            } else if (theme === 'light') {
                root.classList.add('light');
            } else {
                const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                root.classList.add(systemDark ? 'dark' : 'light');
            }
        };

        applyTheme();

        if (theme === 'system') {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const handleChange = () => applyTheme();
            mediaQuery.addEventListener('change', handleChange);
            return () => mediaQuery.removeEventListener('change', handleChange);
        }
    }, [theme]);

    const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
        setTheme(newTheme);
        if (typeof window !== 'undefined') {
            if (newTheme === 'system') {
                localStorage.removeItem('theme');
            } else {
                localStorage.setItem('theme', newTheme);
            }
        }
    };

    // Default sidebar navigation if none provided (e.g., on Profile page)
    const defaultItems: SidebarItem[] = [
        {
            id: 'dashboard',
            label: 'Dashboard',
            icon: <LayoutDashboard className="w-4 h-4" />,
            active: route().current('dashboard'),
            href: route('dashboard'),
        },
        {
            id: 'profile',
            label: 'Admin Profile',
            icon: <User className="w-4 h-4" />,
            active: route().current('profile.edit'),
            href: route('profile.edit'),
        },
    ];

    const activeNavigation = sidebarItems || defaultItems;

    return (
        <div className="min-h-screen bg-[#FCF9F9] dark:bg-[#150A0B] flex text-gray-800 dark:text-gray-100">
            
            {/* Desktop Sidebar (Persistent) */}
            <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 bg-gradient-to-b from-[#1a0406] via-[#33070b] to-[#120102] border-r border-red-900/30 z-30">
                {/* Brand Logo Header */}
                <div className="flex h-16 shrink-0 items-center px-6 border-b border-red-900/30 bg-black/10">
                    <Link href="/" className="flex items-center space-x-2.5">
                        <img src="/images/logo_original.png" alt="Dapoer Ratu Logo" className="w-8 h-8 object-contain" />
                        <span className="text-lg font-bold tracking-wider text-red-400 font-serif leading-none">DAPOER RATU</span>
                    </Link>
                </div>

                {/* Sidebar Navigation Links */}
                <nav className="flex-1 overflow-y-auto py-6 space-y-1">
                    {activeNavigation.map((item) => {
                        if (item.subItems && item.subItems.length > 0) {
                            return <SidebarCollapseItem key={item.id} item={item} />;
                        }

                        const isLink = !!item.href;
                        const className = `w-full group flex items-center space-x-3 py-2.5 text-xs font-bold transition-all duration-200 border-l-4 ${
                            item.indent ? 'pl-9 pr-5 font-medium text-[11px]' : 'px-5 font-bold'
                        } ${
                            item.active
                                ? 'bg-gradient-to-r from-emerald-900/40 to-transparent border-[#C7A856] text-[#C7A856]'
                                : 'border-transparent text-red-200 hover:bg-red-900/20 hover:text-white hover:border-red-800/30'
                        }`;

                        if (isLink) {
                            return (
                                <Link key={item.id} href={item.href!} className={className}>
                                    <span className={item.active ? 'text-[#C7A856]' : 'text-red-400 group-hover:text-red-100'}>
                                        {item.icon}
                                    </span>
                                    <span>{item.label}</span>
                                </Link>
                            );
                        } else {
                            return (
                                <button key={item.id} onClick={item.onClick} className={className}>
                                    <span className={item.active ? 'text-[#C7A856]' : 'text-red-400 group-hover:text-red-100'}>
                                        {item.icon}
                                    </span>
                                    <span>{item.label}</span>
                                </button>
                            );
                        }
                    })}
                </nav>

                {/* Profile Card & Logout (Bottom) */}
                <div className="p-4 border-t border-red-900/30 bg-black/20 backdrop-blur-xs">
                    <div className="flex items-center space-x-3 mb-3">
                        <div className="w-9 h-9 rounded-full bg-red-900/70 flex items-center justify-center font-bold text-[#C7A856] border border-red-700/40 uppercase">
                            {user.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold truncate text-white">{user.name}</p>
                            <p className="text-[10px] truncate text-red-300">{user.email}</p>
                        </div>
                    </div>
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="w-full flex items-center justify-center space-x-2 py-2 text-xs font-bold rounded-lg bg-red-950/50 text-red-200 border border-red-900/40 hover:bg-red-950/60 hover:text-red-200 hover:border-red-900/80 transition-all duration-200"
                    >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Keluar (Log Out)</span>
                    </Link>
                </div>
            </aside>

            {/* Mobile Sidebar Off-canvas Drawer */}
            {isMobileOpen && (
                <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-xs z-40 lg:hidden transition-opacity duration-300" onClick={() => setIsMobileOpen(false)}>
                    <div 
                        className="fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-[#1a0406] via-[#33070b] to-[#120102] text-white flex flex-col justify-between z-50 shadow-2xl transition-transform duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Drawer Header */}
                        <div className="flex h-16 shrink-0 items-center justify-between px-6 border-b border-red-900/30 bg-black/10">
                            <div className="flex items-center space-x-2.5">
                                <img src="/images/logo_original.png" alt="Dapoer Ratu Logo" className="w-8 h-8 object-contain" />
                                <span className="text-lg font-bold tracking-wider text-red-400 font-serif leading-none">DAPOER RATU</span>
                            </div>
                            <button onClick={() => setIsMobileOpen(false)} className="text-red-300 hover:text-white p-1 rounded-lg hover:bg-red-900/30">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Drawer Navigation Links */}
                        <nav className="flex-1 overflow-y-auto py-6 space-y-1">
                            {activeNavigation.map((item) => {
                                if (item.subItems && item.subItems.length > 0) {
                                    return <SidebarCollapseItem key={item.id} item={item} setIsMobileOpen={setIsMobileOpen} />;
                                }

                                const isLink = !!item.href;
                                const className = `w-full group flex items-center space-x-3 py-2.5 text-xs font-bold transition-all duration-200 border-l-4 ${
                                    item.indent ? 'pl-9 pr-5 font-medium text-[11px]' : 'px-5 font-bold'
                                } ${
                                    item.active
                                        ? 'bg-gradient-to-r from-emerald-900/40 to-transparent border-[#C7A856] text-[#C7A856]'
                                        : 'border-transparent text-red-200 hover:bg-red-900/20 hover:text-white hover:border-red-800/30'
                                }`;

                                const handleClick = () => {
                                    if (item.onClick) item.onClick();
                                    setIsMobileOpen(false);
                                };

                                if (isLink) {
                                    return (
                                        <Link key={item.id} href={item.href!} className={className} onClick={() => setIsMobileOpen(false)}>
                                            <span className={item.active ? 'text-[#C7A856]' : 'text-red-400 group-hover:text-red-100'}>
                                                {item.icon}
                                            </span>
                                            <span>{item.label}</span>
                                        </Link>
                                    );
                                } else {
                                    return (
                                        <button key={item.id} onClick={handleClick} className={className}>
                                            <span className={item.active ? 'text-[#C7A856]' : 'text-red-400 group-hover:text-red-100'}>
                                                {item.icon}
                                            </span>
                                            <span>{item.label}</span>
                                        </button>
                                    );
                                }
                            })}
                        </nav>

                        {/* Drawer Profile Card & Logout (Bottom) */}
                        <div className="p-4 border-t border-red-900/30 bg-black/20 backdrop-blur-xs">
                            <div className="flex items-center space-x-3 mb-3">
                                <div className="w-9 h-9 rounded-full bg-red-900/70 flex items-center justify-center font-bold text-[#C7A856] border border-red-700/40 uppercase">
                                    {user.name.charAt(0)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold truncate text-white">{user.name}</p>
                                    <p className="text-[10px] truncate text-red-300">{user.email}</p>
                                </div>
                            </div>
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="w-full flex items-center justify-center space-x-2 py-2 text-xs font-bold rounded-lg bg-red-950/50 text-red-200 border border-red-900/40 hover:bg-red-950/60 hover:text-red-200 hover:border-red-900/80 transition-all duration-200"
                            >
                                <LogOut className="w-3.5 h-3.5" />
                                <span>Keluar (Log Out)</span>
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Right Side Content Panel */}
            <div className="flex-1 flex flex-col min-h-screen lg:pl-64 overflow-hidden">
                {/* Content Panel Header (Top Bar) */}
                <header className="h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#1E1112] border-b border-red-100/50 dark:border-red-950/40 shadow-xs z-20">
                    <div className="flex items-center">
                        {/* Hamburger Icon for Mobile */}
                        <button 
                            onClick={() => setIsMobileOpen(true)}
                            className="lg:hidden p-2 -ml-2 mr-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-red-50/50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-red-950/30 focus:outline-none"
                        >
                            <Menu className="w-6 h-6" />
                        </button>

                        {/* Page Header Slot */}
                        <div className="flex items-center">
                            {header}
                        </div>
                    </div>

                    {/* Top Bar Actions */}
                    <div className="flex items-center space-x-4">
                        {/* Public Link */}
                        <a
                            href="/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 dark:bg-red-950/20 dark:text-red-400 dark:border-emerald-900/50 hover:dark:bg-red-950/40 transition-all duration-200"
                        >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Lihat Website</span>
                        </a>

                        {/* Theme Switcher */}
                        <div className="relative">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button
                                        type="button"
                                        className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-red-50/50 dark:hover:bg-red-950/30 rounded-lg transition-all focus:outline-none"
                                        title="Pilih Tema"
                                    >
                                        {theme === 'light' && <Sun className="w-5 h-5 text-amber-500" />}
                                        {theme === 'dark' && <Moon className="w-5 h-5 text-[#C7A856]" />}
                                        {theme === 'system' && <Monitor className="w-5 h-5" />}
                                    </button>
                                </Dropdown.Trigger>

                                <Dropdown.Content width="48">
                                    <button
                                        onClick={() => handleThemeChange('light')}
                                        className={`w-full flex items-center space-x-2 px-4 py-2 text-start text-xs font-semibold leading-5 transition duration-150 ${theme === 'light' ? 'bg-amber-50 text-amber-950 dark:bg-amber-950/20 dark:text-amber-300' : 'text-gray-700 dark:text-gray-300 hover:bg-red-50/50 dark:hover:bg-gray-800'}`}
                                    >
                                        <Sun className="w-4 h-4 text-amber-500" />
                                        <span>Terang (Light)</span>
                                    </button>
                                    <button
                                        onClick={() => handleThemeChange('dark')}
                                        className={`w-full flex items-center space-x-2 px-4 py-2 text-start text-xs font-semibold leading-5 transition duration-150 ${theme === 'dark' ? 'bg-[#C7A856]/10 text-[#C7A856] dark:bg-[#C7A856]/20 dark:text-[#C7A856]' : 'text-gray-700 dark:text-gray-300 hover:bg-red-50/50 dark:hover:bg-gray-800'}`}
                                    >
                                        <Moon className="w-4 h-4 text-[#C7A856]" />
                                        <span>Gelap (Dark)</span>
                                    </button>
                                    <button
                                        onClick={() => handleThemeChange('system')}
                                        className={`w-full flex items-center space-x-2 px-4 py-2 text-start text-xs font-semibold leading-5 transition duration-150 ${theme === 'system' ? 'bg-gray-100 text-gray-900 dark:bg-red-950/20 dark:text-gray-200' : 'text-gray-700 dark:text-gray-300 hover:bg-red-50/50 dark:hover:bg-gray-800'}`}
                                    >
                                        <Monitor className="w-4 h-4 text-gray-500" />
                                        <span>Sistem (System)</span>
                                    </button>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>

                        {/* User Dropdown Profile Shortcut */}
                        <div className="relative">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button
                                        type="button"
                                        className="inline-flex items-center px-3 py-2 text-xs font-semibold leading-4 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition-all duration-150"
                                    >
                                        <span className="w-6 h-6 rounded-full bg-red-100 text-red-800 font-bold flex items-center justify-center mr-2 dark:bg-red-900/30 dark:text-red-300 uppercase">
                                            {user.name.charAt(0)}
                                        </span>
                                        <span className="hidden md:inline">{user.name}</span>
                                        <svg
                                            className="ms-1.5 h-4 w-4 text-gray-400"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link href={route('profile.edit')}>
                                        <div className="flex items-center space-x-2">
                                            <User className="w-3.5 h-3.5" />
                                            <span>Profile Settings</span>
                                        </div>
                                    </Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button">
                                        <div className="flex items-center space-x-2 text-red-600 dark:text-red-400">
                                            <LogOut className="w-3.5 h-3.5" />
                                            <span>Log Out</span>
                                        </div>
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                </header>

                {/* Main Scrollable View Area */}
                <main className="flex-1 overflow-y-auto focus:outline-none">
                    {children}
                </main>
            </div>
        </div>
    );
}
