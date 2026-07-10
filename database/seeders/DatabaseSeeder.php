<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Menu;
use App\Models\Portfolio;
use App\Models\Testimonial;
use App\Models\Faq;
use App\Models\Service;
use App\Models\Partner;
use App\Models\Setting;
use App\Models\Certificate;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Admin User
        User::updateOrCreate(
            ['email' => 'admin@dapoerratucatering.com'],
            [
                'name' => 'Dapoer Ratu Admin',
                'password' => Hash::make('dapoerratupremium123'),
                'email_verified_at' => now(),
            ]
        );

        // 2. Menus
        $menus = [
            [
                'name' => 'Beef Wellington Imperial',
                'slug' => 'beef-wellington-imperial',
                'category' => 'buffet',
                'description' => 'Daging sapi tenderloin premium dibalut puff pastry renyah, saus jamur truffle wangi, disajikan hangat dengan kentang panggang mentega dan sayuran segar.',
                'price_from' => 150000.00,
                'image_path' => '/images/menu_beef_wellington.webp',
                'is_best_seller' => true,
                'tags' => ['Best Seller', 'Signature', 'Chef Recommended'],
            ],
            [
                'name' => 'Nasi Tumpeng Nusantara Royal',
                'slug' => 'nasi-tumpeng-nusantara-royal',
                'category' => 'corporate',
                'description' => 'Nasi kuning wangi rempah khas Nusantara, disajikan dengan ayam goreng lengkuas, sambal goreng ati, sate lilit, telur dadar iris, perkedel kentang, abon sapi, dan sambal bajak.',
                'price_from' => 85000.00,
                'image_path' => '/images/menu_nasi_tumpeng.webp',
                'is_best_seller' => true,
                'tags' => ['Best Seller', 'Traditional', 'Halal'],
            ],
            [
                'name' => 'Salmon En Croute Elite',
                'slug' => 'salmon-en-croute-elite',
                'category' => 'private-event',
                'description' => 'Salmon segar premium yang dibumbui dengan herbs, dibalut saus krim bayam-jamur, dan dipanggang dalam kulit puff pastry keemasan renyah.',
                'price_from' => 135000.00,
                'image_path' => '/images/menu_salmon_croute.webp',
                'is_best_seller' => true,
                'tags' => ['Signature', 'Premium Choice'],
            ],
            [
                'name' => 'Gourmet Coffee Break Box',
                'slug' => 'gourmet-coffee-break-box',
                'category' => 'coffee-break',
                'description' => 'Paket snack box premium berisi Croissant Butter, Fruit Tartlet, Belgian Chocolate Brownie, Eclair Vanilla, dilengkapi kopi Mandheling hangat.',
                'price_from' => 45000.00,
                'image_path' => '/images/menu_coffee_break.webp',
                'is_best_seller' => true,
                'tags' => ['Coffee Break', 'Mini Pastry'],
            ],
            [
                'name' => 'Premium Wedding Buffet - Royal Gold',
                'slug' => 'premium-wedding-buffet-royal-gold',
                'category' => 'wedding',
                'description' => 'Paket prasmanan pernikahan mewah: Nasi Pandan Wangi, Sate Ayam Madura, Daging Lada Hitam Sapi US, Kakap Fillet Asam Manis, Tumis Kaisim Jamur Shiitake, Es Teler Signature, Galantine Salad, dan Jajanan Pasar.',
                'price_from' => 195000.00,
                'image_path' => '/images/menu_wedding_buffet.webp',
                'is_best_seller' => true,
                'tags' => ['Wedding', 'All-Inclusive'],
            ],
            [
                'name' => 'Exclusive Corporate Lunch Box',
                'slug' => 'exclusive-corporate-lunch-box',
                'category' => 'lunch-box',
                'description' => 'Nasi putih pandan wangi, Beef Teriyaki premium, Ayam Goreng Lengkuas, Tumis Buncis Jagung Muda, Sambal Bajak, Buah Potong Segar, dan Air Mineral.',
                'price_from' => 65000.00,
                'image_path' => '/images/menu_lunch_box.webp',
                'is_best_seller' => true,
                'tags' => ['Corporate', 'Lunch Box', 'Popular'],
            ],
            [
                'name' => 'Paket Aqiqah Syukuran Premium',
                'slug' => 'paket-aqiqah-syukuran-premium',
                'category' => 'aqiqah',
                'description' => 'Paket menu Aqiqah lezat berisi Nasi Kebuli wangi, Gulai Kambing gurih rempah pilihan (tanpa aroma prengus), Sate Kambing empuk, Acar Kuning segar, Kerupuk Udang, dan Risoles Mayo.',
                'price_from' => 90000.00,
                'image_path' => '/images/menu_aqiqah.webp',
                'is_best_seller' => false,
                'tags' => ['Aqiqah', 'Traditional Syukuran'],
            ],
            [
                'name' => 'Signature French Dessert Platter',
                'slug' => 'signature-french-dessert-platter',
                'category' => 'dessert',
                'description' => 'Piring pencuci mulut premium berisi Macaron Prancis aneka rasa, Panna Cotta dengan saus raspberry segar, Chocolate Lava Cake mini, dan Mille-Feuille renyah.',
                'price_from' => 75000.00,
                'image_path' => '/images/menu_dessert.webp',
                'is_best_seller' => false,
                'tags' => ['Sweet Treat', 'Luxury Platter'],
            ],
        ];

        foreach ($menus as $m) {
            Menu::create($m);
        }

        // 3. Portfolios
        $portfolios = [
            [
                'title' => 'The Grand Ballroom Wedding Showcase',
                'category' => 'wedding',
                'image_path' => '/images/gallery_wedding_setup.webp',
                'description' => 'Dekorasi buffet emas megah di Glasshouse Ritz Carlton Jakarta.',
            ],
            [
                'title' => 'Exclusive Gala Dinner BUMN Indonesia',
                'category' => 'corporate',
                'image_path' => '/images/gallery_corporate_event.webp',
                'description' => 'Sajian prasmanan VIP untuk Menteri dan Direksi BUMN.',
            ],
            [
                'title' => 'Presidential Palace Private Banquet',
                'category' => 'private-event',
                'image_path' => '/images/gallery_presidential_banquet.webp',
                'description' => 'Jamuan makan privat kenegaraan dengan menu custom.',
            ],
            [
                'title' => 'Premium Coffee Break for International Seminar',
                'category' => 'coffee-break',
                'image_path' => '/images/gallery_coffee_break.webp',
                'description' => 'Sajian pastry hangat dan kopi Mandheling untuk 500 peserta.',
            ],
            [
                'title' => 'Premium Buffet Catering Table Setup',
                'category' => 'buffet',
                'image_path' => '/images/gallery_buffet_setup.webp',
                'description' => 'Table styling elegan dengan ornamen gold dan dedaunan hijau.',
            ],
            [
                'title' => 'Chef\'s Kitchen Behind the Scene',
                'category' => 'kitchen',
                'image_path' => '/images/gallery_kitchen.webp',
                'description' => 'Proses plating presisi oleh Executive Chef bintang lima kami.',
            ],
        ];

        foreach ($portfolios as $p) {
            Portfolio::create($p);
        }

        // 4. Testimonials
        $testimonials = [
            [
                'customer_name' => 'Clara & Adrian',
                'customer_title' => 'Pernikahan di Hotel Kempinski Jakarta',
                'customer_photo' => '/images/user_clara.webp',
                'company_logo' => null,
                'rating' => 5,
                'review' => 'Layanan Dapoer Ratu luar biasa! Beef Wellington mereka menjadi buah bibir semua tamu undangan pernikahan kami. Dekorasi prasmanannya sangat mewah dan elegan, persis seperti hotel bintang lima.',
            ],
            [
                'customer_name' => 'Bambang Widjojo',
                'customer_title' => 'VP Corporate Secretary PT Bank Mandiri',
                'customer_photo' => '/images/user_bambang.webp',
                'company_logo' => '/images/logo_mandiri.webp',
                'rating' => 5,
                'review' => 'Kami mempercayakan makan siang VIP Rapat Umum Pemegang Saham (RUPS) kami kepada Dapoer Ratu. Tepat waktu, higienis, dan citarasa makanannya sangat konsisten dari awal hingga akhir acara.',
            ],
            [
                'customer_name' => 'Dr. Ratih Amalia',
                'customer_title' => 'Ketua Panitia Simposium Kedokteran Nasional',
                'customer_photo' => '/images/user_ratih.webp',
                'company_logo' => null,
                'rating' => 5,
                'review' => 'Paket Coffee Break box dari Dapoer Ratu sangat praktis namun tetap terkesan premium. Pastry-nya masih renyah saat disajikan, dan respon customer service mereka dalam memodifikasi menu sangat cepat dan ramah.',
            ],
        ];

        foreach ($testimonials as $t) {
            Testimonial::create($t);
        }

        // 5. FAQs
        $faqs = [
            [
                'question' => 'Apakah menu makanan dijamin 100% Halal?',
                'answer' => 'Ya, seluruh hidangan yang disajikan Dapoer Ratu Catering terbuat dari bahan-bahan yang memiliki sertifikasi Halal resmi. Kami sangat menjaga kebersihan dan kepatuhan syar\'i dalam seluruh pengolahan makanan.',
                'order_num' => 1,
            ],
            [
                'question' => 'Berapa jumlah minimal pesanan (minimal order) di Dapoer Ratu?',
                'answer' => 'Untuk paket prasmanan (buffet) pernikahan/corporate minimal order adalah 100 pax. Sedangkan untuk event eksklusif di rumah (private event) minimal pemesanan adalah 30 pax. Untuk paket Coffee Break dan Lunch Box minimal 50 box.',
                'order_num' => 2,
            ],
            [
                'question' => 'Apakah pemesanan sudah termasuk alat saji dan pramusaji?',
                'answer' => 'Ya, paket Prasmanan / Buffet kami sudah all-inclusive. Sudah mencakup meja saji dekoratif, piring, gelas, alat makan, penghangat makanan, serta pramusaji profesional berbaju seragam rapi yang bersiap melayani tamu sepanjang acara.',
                'order_num' => 3,
            ],
            [
                'question' => 'Bagaimana prosedur pemesanan dan pembayarannya?',
                'answer' => 'Anda dapat mengisi formulir Request a Quote di bawah. Setelah detail dikonfirmasi oleh tim kami via WhatsApp/Email, Anda dapat mengunci tanggal acara dengan membayar Down Payment (DP) sebesar 30%. Pelunasan H-7 sebelum hari pelaksanaan acara.',
                'order_num' => 4,
            ],
            [
                'question' => 'Apakah diperbolehkan melakukan test food terlebih dahulu?',
                'answer' => 'Tentu. Kami menyediakan sesi test food gratis di dapur utama kami untuk calon pengantin (wedding package) maksimal 4 orang. Silakan jadwalkan janji temu Anda bersama konsultan catering kami.',
                'order_num' => 5,
            ],
        ];

        foreach ($faqs as $f) {
            Faq::create($f);
        }

        // 6. Services
        $services = [
            [
                'title' => 'Wedding Catering',
                'description' => 'Menyajikan sajian prasmanan mewah dan dekorasi katering elegan untuk hari istimewa Anda.',
                'icon_name' => 'Award',
                'order_num' => 1,
            ],
            [
                'title' => 'Corporate Catering',
                'description' => 'Layanan katering prasmanan dan makan siang premium untuk rapat direksi, RUPS, dan seminar bisnis.',
                'icon_name' => 'Users',
                'order_num' => 2,
            ],
            [
                'title' => 'Coffee Break Package',
                'description' => 'Sajian aneka mini pastry lezat, fruit tartlet, serta kopi & teh premium untuk menyegarkan acara.',
                'icon_name' => 'Clock',
                'order_num' => 3,
            ],
            [
                'title' => 'Premium Lunch Box',
                'description' => 'Paket nasi kotak higienis bergaya nusantara dan internasional dengan bahan-bahan organik segar.',
                'icon_name' => 'ChefHat',
                'order_num' => 4,
            ],
            [
                'title' => 'Grand Buffet Set',
                'description' => 'Pilihan buffet terlengkap dengan masakan asia, barat, dan nusantara autentik untuk gathering.',
                'icon_name' => 'Sparkles',
                'order_num' => 5,
            ],
            [
                'title' => 'Exclusive Snack Box',
                'description' => 'Snack box manis dan gurih premium yang dipersiapkan khusus untuk rapat singkat dan seminar.',
                'icon_name' => 'ShieldCheck',
                'order_num' => 6,
            ],
            [
                'title' => 'Layanan Aqiqah',
                'description' => 'Sajian aqiqah syar\'i berupa olahan kambing lezat tanpa bau prengus, lengkap dengan nasi kebuli.',
                'icon_name' => 'Check',
                'order_num' => 7,
            ],
            [
                'title' => 'Private Dining Event',
                'description' => 'Menu racikan koki bintang lima yang disajikan langsung di kediaman Anda untuk perjamuan intim.',
                'icon_name' => 'Phone',
                'order_num' => 8,
            ],
        ];

        foreach ($services as $s) {
            Service::create($s);
        }

        // 7. Partners
        $partners = [
            ['name' => 'BANK MANDIRI', 'logo_path' => null, 'order_num' => 1],
            ['name' => 'PERTAMINA', 'logo_path' => null, 'order_num' => 2],
            ['name' => 'TELKOM INDONESIA', 'logo_path' => null, 'order_num' => 3],
            ['name' => 'BANK BCA', 'logo_path' => null, 'order_num' => 4],
            ['name' => 'PLN GROUP', 'logo_path' => null, 'order_num' => 5],
            ['name' => 'KEMENTERIAN RI', 'logo_path' => null, 'order_num' => 6],
        ];

        foreach ($partners as $p) {
            Partner::create($p);
        }

        // 8. General Settings
        $settings = [
            'company_phone' => '+62 812-3456-7890',
            'company_email' => 'info@dapoerratucatering.com',
            'company_address' => 'Jl. Senopati No.45, Kebayoran Baru, Jakarta Selatan',
            'company_wa' => '6281234567890',
            'company_instagram' => '@dapoerratucatering',
            'company_facebook' => 'dapoerratucatering',
            'company_youtube' => 'DapoerRatuCatering',
            'google_maps_url' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m4!2s-6.2235!3d106.8085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f1505c09191d%3A0x959779cb25662a5b!2sSenopati%2C%20Kebayoran%20Baru%2C%20Jakarta%20Selatan!5e0!3m2!1sid!2sid!4v1622350000000',
            'operational_hours_weekday' => 'Senin - Jumat: 08.00 - 18.00 WIB',
            'operational_hours_weekend' => 'Sabtu - Minggu: 09.00 - 17.00 WIB',
            'hero_title' => 'Catering Premium untuk Wedding, Corporate & Event',
            'hero_subtitle' => 'Menyajikan pengalaman kuliner legendaris berkualitas bintang lima sejak 1984 dengan layanan profesional, higienis, dan menu berkelas yang dapat disesuaikan.',
            'hero_bg_image' => '/images/hero_background.webp',
            'slider_before_image' => '/images/ballroom_empty.webp',
            'slider_after_image' => '/images/gallery_wedding_setup.webp',
            'slider_before_label' => 'Sebelum Setup',
            'slider_after_label' => 'Sesudah Setup',
            
            // Dynamic Advantages & Stats
            'advantages_badge' => 'Why Choose Us',
            'advantages_title' => 'Standar Pelayanan Katering Bintang Lima',
            'advantages_description' => 'Kami percaya bahwa menyajikan makanan bukan sekadar perkara rasa, melainkan juga kehormatan untuk mendampingi momen spesial Anda.',
            'advantage_1_title' => 'Bahan Berkualitas',
            'advantage_1_desc' => 'Hanya menggunakan bahan segar organik dari pemasok terpercaya.',
            'advantage_2_title' => 'Executive Chef Profesional',
            'advantage_2_desc' => 'Tim koki berpengalaman hotel bintang 5.',
            'advantage_3_title' => 'Jaminan 100% Halal',
            'advantage_3_desc' => 'Telah terdaftar resmi dan bersertifikat Halal MUI.',
            'advantage_4_title' => 'Tepat Waktu & Higienis',
            'advantage_4_desc' => 'Protokol ketat pengantaran tepat waktu dengan standar sanitasi tinggi.',
            'advantage_5_title' => 'Custom Menu Options',
            'advantage_5_desc' => 'Kemudahan menyesuaikan menu sesuai preferensi rasa tamu Anda.',
            'advantage_6_title' => 'Harga Transparan',
            'advantage_6_desc' => 'Tanpa biaya tersembunyi, semua rincian penawaran tercatat rapi.',
            'stats_years' => '40',
            'stats_years_label' => 'Tahun Pengalaman',
            'stats_events' => '5000',
            'stats_events_label' => 'Event Sukses',
            'stats_partners' => '300',
            'stats_partners_label' => 'Mitra Perusahaan',
            'stats_satisfaction' => '98',
            'stats_satisfaction_label' => 'Kepuasan Pelanggan',
        ];

        foreach ($settings as $key => $value) {
            Setting::updateOrCreate(['key' => $key], ['value' => $value]);
        }

        // Seeding certificates
        $certificates = [
            [
                'title' => 'Sertifikat Halal Resmi',
                'issuer' => 'Majelis Ulama Indonesia (MUI)',
                'image_path' => '/images/gallery_wedding_setup.webp',
                'icon_name' => 'ShieldCheck',
                'order_num' => 1
            ],
            [
                'title' => 'Sertifikat Laik Higiene Sanitasi Jasa Boga',
                'issuer' => 'Dinas Kesehatan Kota',
                'image_path' => '/images/gallery_kitchen.webp',
                'icon_name' => 'Award',
                'order_num' => 2
            ],
            [
                'title' => 'Izin Usaha Resmi (NIB)',
                'issuer' => 'Kementerian Investasi / BKPM',
                'image_path' => '/images/gallery_corporate_event.webp',
                'icon_name' => 'FileCheck',
                'order_num' => 3
            ],
        ];

        foreach ($certificates as $c) {
            Certificate::create($c);
        }
    }
}
