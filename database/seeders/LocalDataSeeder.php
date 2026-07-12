<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Menu;
use App\Models\Portfolio;
use App\Models\Testimonial;
use App\Models\Faq;
use App\Models\Service;
use App\Models\Partner;
use App\Models\Setting;
use App\Models\Certificate;

class LocalDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Disable foreign key checks
        \Illuminate\Support\Facades\Schema::disableForeignKeyConstraints();

        // Seed users
        User::truncate();
        $records = [
            [
                'id' => 1,
                'name' => 'Dapoer Ratu Admin',
                'email' => 'admin@dapoerratucatering.com',
                'email_verified_at' => '2026-07-07 14:11:30',
                'password' => '$2y$12$mVuu6WgNl2bdimHfjMy6KODC0Z76wP6dRf1UWa1evMcCwW9ULrrOy',
                'remember_token' => 'om7lNyvsHv',
                'created_at' => '2026-07-07 14:11:30',
                'updated_at' => '2026-07-09 11:21:58',
            ],
        ];

        foreach ($records as $r) {
            User::create($r);
        }

        // Seed menus
        Menu::truncate();
        $records = [
            [
                'id' => 1,
                'name' => 'Beef Wellington Imperial',
                'slug' => 'beef-wellington-imperial',
                'category' => 'buffet',
                'description' => 'Daging sapi tenderloin premium dibalut puff pastry renyah, saus jamur truffle wangi, disajikan hangat dengan kentang panggang mentega dan sayuran segar.',
                'price_from' => 150000.00,
                'image_path' => '/images/menu_beef_wellington.webp',
                'is_best_seller' => 1,
                'tags' => '["Best Seller", "Signature", "Chef Recommended"]',
                'created_at' => '2026-07-07 14:11:30',
                'updated_at' => '2026-07-07 14:11:30',
            ],
            [
                'id' => 2,
                'name' => 'Nasi Tumpeng Nusantara Royal',
                'slug' => 'nasi-tumpeng-nusantara-royal',
                'category' => 'corporate',
                'description' => 'Nasi kuning wangi rempah khas Nusantara, disajikan dengan ayam goreng lengkuas, sambal goreng ati, sate lilit, telur dadar iris, perkedel kentang, abon sapi, dan sambal bajak.',
                'price_from' => 85000.00,
                'image_path' => '/images/menu_nasi_tumpeng.webp',
                'is_best_seller' => 1,
                'tags' => '["Best Seller", "Traditional", "Halal"]',
                'created_at' => '2026-07-07 14:11:30',
                'updated_at' => '2026-07-07 14:11:30',
            ],
            [
                'id' => 3,
                'name' => 'Salmon En Croute Elite',
                'slug' => 'salmon-en-croute-elite',
                'category' => 'private-event',
                'description' => 'Salmon segar premium yang dibumbui dengan herbs, dibalut saus krim bayam-jamur, dan dipanggang dalam kulit puff pastry keemasan renyah.',
                'price_from' => 135000.00,
                'image_path' => '/images/menu_salmon_croute.webp',
                'is_best_seller' => 1,
                'tags' => '["Signature", "Premium Choice"]',
                'created_at' => '2026-07-07 14:11:30',
                'updated_at' => '2026-07-07 14:11:30',
            ],
            [
                'id' => 4,
                'name' => 'Gourmet Coffee Break Box',
                'slug' => 'gourmet-coffee-break-box',
                'category' => 'coffee-break',
                'description' => 'Paket snack box premium berisi Croissant Butter, Fruit Tartlet, Belgian Chocolate Brownie, Eclair Vanilla, dilengkapi kopi Mandheling hangat.',
                'price_from' => 45000.00,
                'image_path' => '/images/menu_coffee_break.webp',
                'is_best_seller' => 1,
                'tags' => '["Coffee Break", "Mini Pastry"]',
                'created_at' => '2026-07-07 14:11:30',
                'updated_at' => '2026-07-07 14:11:30',
            ],
            [
                'id' => 5,
                'name' => 'Premium Wedding Buffet - Royal Gold',
                'slug' => 'premium-wedding-buffet-royal-gold',
                'category' => 'wedding',
                'description' => 'Paket prasmanan pernikahan mewah: Nasi Pandan Wangi, Sate Ayam Madura, Daging Lada Hitam Sapi US, Kakap Fillet Asam Manis, Tumis Kaisim Jamur Shiitake, Es Teler Signature, Galantine Salad, dan Jajanan Pasar.',
                'price_from' => 195000.00,
                'image_path' => '/images/menu_wedding_buffet.webp',
                'is_best_seller' => 1,
                'tags' => '["Wedding", "All-Inclusive"]',
                'created_at' => '2026-07-07 14:11:30',
                'updated_at' => '2026-07-07 14:11:30',
            ],
            [
                'id' => 6,
                'name' => 'Exclusive Corporate Lunch Box',
                'slug' => 'exclusive-corporate-lunch-box',
                'category' => 'lunch-box',
                'description' => 'Nasi putih pandan wangi, Beef Teriyaki premium, Ayam Goreng Lengkuas, Tumis Buncis Jagung Muda, Sambal Bajak, Buah Potong Segar, dan Air Mineral.',
                'price_from' => 65000.00,
                'image_path' => '/images/menu_lunch_box.webp',
                'is_best_seller' => 1,
                'tags' => '["Corporate", "Lunch Box", "Popular"]',
                'created_at' => '2026-07-07 14:11:30',
                'updated_at' => '2026-07-07 14:11:30',
            ],
            [
                'id' => 7,
                'name' => 'Paket Aqiqah Syukuran Premium',
                'slug' => 'paket-aqiqah-syukuran-premium',
                'category' => 'aqiqah',
                'description' => 'Paket menu Aqiqah lezat berisi Nasi Kebuli wangi, Gulai Kambing gurih rempah pilihan (tanpa aroma prengus), Sate Kambing empuk, Acar Kuning segar, Kerupuk Udang, dan Risoles Mayo.',
                'price_from' => 90000.00,
                'image_path' => '/images/menu_aqiqah.webp',
                'is_best_seller' => 0,
                'tags' => '["Aqiqah", "Traditional Syukuran"]',
                'created_at' => '2026-07-07 14:11:30',
                'updated_at' => '2026-07-07 14:11:30',
            ],
            [
                'id' => 8,
                'name' => 'Signature French Dessert Platter',
                'slug' => 'signature-french-dessert-platter',
                'category' => 'dessert',
                'description' => 'Piring pencuci mulut premium berisi Macaron Prancis aneka rasa, Panna Cotta dengan saus raspberry segar, Chocolate Lava Cake mini, dan Mille-Feuille renyah.',
                'price_from' => 75000.00,
                'image_path' => '/images/menu_dessert.webp',
                'is_best_seller' => 0,
                'tags' => '["Sweet Treat", "Luxury Platter"]',
                'created_at' => '2026-07-07 14:11:30',
                'updated_at' => '2026-07-07 14:11:30',
            ],
        ];

        foreach ($records as $r) {
            Menu::create($r);
        }

        // Seed portfolios
        Portfolio::truncate();
        $records = [
            [
                'id' => 1,
                'title' => 'The Grand Ballroom Wedding Showcase',
                'category' => 'wedding',
                'image_path' => '/images/gallery_wedding_setup.webp',
                'description' => 'Dekorasi buffet emas megah di Glasshouse Ritz Carlton Jakarta.',
                'created_at' => '2026-07-07 14:11:30',
                'updated_at' => '2026-07-07 14:11:30',
            ],
            [
                'id' => 2,
                'title' => 'Exclusive Gala Dinner BUMN Indonesia',
                'category' => 'corporate',
                'image_path' => '/images/gallery_corporate_event.webp',
                'description' => 'Sajian prasmanan VIP untuk Menteri dan Direksi BUMN.',
                'created_at' => '2026-07-07 14:11:30',
                'updated_at' => '2026-07-07 14:11:30',
            ],
            [
                'id' => 3,
                'title' => 'Presidential Palace Private Banquet',
                'category' => 'private-event',
                'image_path' => '/images/gallery_presidential_banquet.webp',
                'description' => 'Jamuan makan privat kenegaraan dengan menu custom.',
                'created_at' => '2026-07-07 14:11:30',
                'updated_at' => '2026-07-07 14:11:30',
            ],
            [
                'id' => 4,
                'title' => 'Premium Coffee Break for International Seminar',
                'category' => 'coffee-break',
                'image_path' => '/images/gallery_coffee_break.webp',
                'description' => 'Sajian pastry hangat dan kopi Mandheling untuk 500 peserta.',
                'created_at' => '2026-07-07 14:11:30',
                'updated_at' => '2026-07-07 14:11:30',
            ],
            [
                'id' => 5,
                'title' => 'Premium Buffet Catering Table Setup',
                'category' => 'buffet',
                'image_path' => '/images/gallery_buffet_setup.webp',
                'description' => 'Table styling elegan dengan ornamen gold dan dedaunan hijau.',
                'created_at' => '2026-07-07 14:11:30',
                'updated_at' => '2026-07-07 14:11:30',
            ],
            [
                'id' => 6,
                'title' => 'Chef\'s Kitchen Behind the Scene',
                'category' => 'kitchen',
                'image_path' => '/images/gallery_kitchen.webp',
                'description' => 'Proses plating presisi oleh Executive Chef bintang lima kami.',
                'created_at' => '2026-07-07 14:11:30',
                'updated_at' => '2026-07-07 14:11:30',
            ],
        ];

        foreach ($records as $r) {
            Portfolio::create($r);
        }

        // Seed testimonials
        Testimonial::truncate();
        $records = [
            [
                'id' => 1,
                'customer_name' => 'Clara & Adrian',
                'customer_title' => 'Pernikahan di Hotel Kempinski Jakarta',
                'customer_photo' => '/images/user_clara.webp',
                'company_logo' => null,
                'rating' => 5,
                'review' => 'Layanan Dapoer Ratu luar biasa! Beef Wellington mereka menjadi buah bibir semua tamu undangan pernikahan kami. Dekorasi prasmanannya sangat mewah dan elegan, persis seperti hotel bintang lima.',
                'created_at' => '2026-07-07 14:11:30',
                'updated_at' => '2026-07-09 11:21:58',
            ],
            [
                'id' => 2,
                'customer_name' => 'Bambang Widjojo',
                'customer_title' => 'VP Corporate Secretary PT Bank Mandiri',
                'customer_photo' => '/images/user_bambang.webp',
                'company_logo' => '/images/logo_mandiri.webp',
                'rating' => 5,
                'review' => 'Kami mempercayakan makan siang VIP Rapat Umum Pemegang Saham (RUPS) kami kepada Dapoer Ratu. Tepat waktu, higienis, dan citarasa makanannya sangat konsisten dari awal hingga akhir acara.',
                'created_at' => '2026-07-07 14:11:30',
                'updated_at' => '2026-07-09 11:21:58',
            ],
            [
                'id' => 3,
                'customer_name' => 'Dr. Ratih Amalia',
                'customer_title' => 'Ketua Panitia Simposium Kedokteran Nasional',
                'customer_photo' => '/images/user_ratih.webp',
                'company_logo' => null,
                'rating' => 5,
                'review' => 'Paket Coffee Break box dari Dapoer Ratu sangat praktis namun tetap terkesan premium. Pastry-nya masih renyah saat disajikan, dan respon customer service mereka dalam memodifikasi menu sangat cepat dan ramah.',
                'created_at' => '2026-07-07 14:11:30',
                'updated_at' => '2026-07-09 11:21:58',
            ],
        ];

        foreach ($records as $r) {
            Testimonial::create($r);
        }

        // Seed faqs
        Faq::truncate();
        $records = [
            [
                'id' => 1,
                'question' => 'Apakah menu makanan dijamin 100% Halal?',
                'answer' => 'Ya, seluruh hidangan yang disajikan Dapoer Ratu Catering terbuat dari bahan-bahan yang memiliki sertifikasi Halal resmi. Kami sangat menjaga kebersihan dan kepatuhan syar\'i dalam seluruh pengolahan makanan.',
                'order_num' => 1,
                'created_at' => '2026-07-07 14:11:30',
                'updated_at' => '2026-07-09 11:21:58',
            ],
            [
                'id' => 2,
                'question' => 'Berapa jumlah minimal pesanan (minimal order) di Dapoer Ratu?',
                'answer' => 'Untuk paket prasmanan (buffet) pernikahan/corporate minimal order adalah 100 pax. Sedangkan untuk event eksklusif di rumah (private event) minimal pemesanan adalah 30 pax. Untuk paket Coffee Break dan Lunch Box minimal 50 box.',
                'order_num' => 2,
                'created_at' => '2026-07-07 14:11:30',
                'updated_at' => '2026-07-09 11:21:58',
            ],
            [
                'id' => 3,
                'question' => 'Apakah pemesanan sudah termasuk alat saji dan pramusaji?',
                'answer' => 'Ya, paket Prasmanan / Buffet kami sudah all-inclusive. Sudah mencakup meja saji dekoratif, piring, gelas, alat makan, penghangat makanan, serta pramusaji profesional berbaju seragam rapi yang bersiap melayani tamu sepanjang acara.',
                'order_num' => 3,
                'created_at' => '2026-07-07 14:11:30',
                'updated_at' => '2026-07-07 14:11:30',
            ],
            [
                'id' => 4,
                'question' => 'Bagaimana prosedur pemesanan dan pembayarannya?',
                'answer' => 'Anda dapat mengisi formulir Request a Quote di bawah. Setelah detail dikonfirmasi oleh tim kami via WhatsApp/Email, Anda dapat mengunci tanggal acara dengan membayar Down Payment (DP) sebesar 30%. Pelunasan H-7 sebelum hari pelaksanaan acara.',
                'order_num' => 4,
                'created_at' => '2026-07-07 14:11:30',
                'updated_at' => '2026-07-07 14:11:30',
            ],
            [
                'id' => 5,
                'question' => 'Apakah diperbolehkan melakukan test food terlebih dahulu?',
                'answer' => 'Tentu. Kami menyediakan sesi test food gratis di dapur utama kami untuk calon pengantin (wedding package) maksimal 4 orang. Silakan jadwalkan janji temu Anda bersama konsultan catering kami.',
                'order_num' => 5,
                'created_at' => '2026-07-07 14:11:30',
                'updated_at' => '2026-07-07 14:11:30',
            ],
        ];

        foreach ($records as $r) {
            Faq::create($r);
        }

        // Seed services
        Service::truncate();
        $records = [
            [
                'id' => 1,
                'title' => 'Wedding Catering',
                'description' => 'Menyajikan sajian prasmanan mewah dan dekorasi katering elegan untuk hari istimewa Anda.',
                'icon_name' => 'Award',
                'order_num' => 1,
                'created_at' => '2026-07-07 14:11:30',
                'updated_at' => '2026-07-07 14:11:30',
            ],
            [
                'id' => 2,
                'title' => 'Corporate Catering',
                'description' => 'Layanan katering prasmanan dan makan siang premium untuk rapat direksi, RUPS, dan seminar bisnis.',
                'icon_name' => 'Users',
                'order_num' => 2,
                'created_at' => '2026-07-07 14:11:30',
                'updated_at' => '2026-07-07 14:11:30',
            ],
            [
                'id' => 3,
                'title' => 'Coffee Break Package',
                'description' => 'Sajian aneka mini pastry lezat, fruit tartlet, serta kopi & teh premium untuk menyegarkan acara.',
                'icon_name' => 'Clock',
                'order_num' => 3,
                'created_at' => '2026-07-07 14:11:30',
                'updated_at' => '2026-07-07 14:11:30',
            ],
            [
                'id' => 4,
                'title' => 'Premium Lunch Box',
                'description' => 'Paket nasi kotak higienis bergaya nusantara dan internasional dengan bahan-bahan organik segar.',
                'icon_name' => 'ChefHat',
                'order_num' => 4,
                'created_at' => '2026-07-07 14:11:30',
                'updated_at' => '2026-07-07 14:11:30',
            ],
            [
                'id' => 5,
                'title' => 'Grand Buffet Set',
                'description' => 'Pilihan buffet terlengkap dengan masakan asia, barat, dan nusantara autentik untuk gathering.',
                'icon_name' => 'Sparkles',
                'order_num' => 5,
                'created_at' => '2026-07-07 14:11:30',
                'updated_at' => '2026-07-07 14:11:30',
            ],
            [
                'id' => 6,
                'title' => 'Exclusive Snack Box',
                'description' => 'Snack box manis dan gurih premium yang dipersiapkan khusus untuk rapat singkat dan seminar.',
                'icon_name' => 'ShieldCheck',
                'order_num' => 6,
                'created_at' => '2026-07-07 14:11:30',
                'updated_at' => '2026-07-07 14:11:30',
            ],
            [
                'id' => 7,
                'title' => 'Layanan Aqiqah',
                'description' => 'Sajian aqiqah syar\'i berupa olahan kambing lezat tanpa bau prengus, lengkap dengan nasi kebuli.',
                'icon_name' => 'Check',
                'order_num' => 7,
                'created_at' => '2026-07-07 14:11:30',
                'updated_at' => '2026-07-07 14:11:30',
            ],
            [
                'id' => 8,
                'title' => 'Private Dining Event',
                'description' => 'Menu racikan koki bintang lima yang disajikan langsung di kediaman Anda untuk perjamuan intim.',
                'icon_name' => 'Phone',
                'order_num' => 8,
                'created_at' => '2026-07-07 14:11:30',
                'updated_at' => '2026-07-07 14:11:30',
            ],
        ];

        foreach ($records as $r) {
            Service::create($r);
        }

        // Seed partners
        Partner::truncate();
        $records = [
            [
                'id' => 1,
                'name' => 'BANK MANDIRI',
                'logo_path' => null,
                'order_num' => 1,
                'created_at' => '2026-07-07 14:11:30',
                'updated_at' => '2026-07-07 14:11:30',
            ],
            [
                'id' => 2,
                'name' => 'PERTAMINA',
                'logo_path' => null,
                'order_num' => 2,
                'created_at' => '2026-07-07 14:11:30',
                'updated_at' => '2026-07-07 14:11:30',
            ],
            [
                'id' => 3,
                'name' => 'TELKOM INDONESIA',
                'logo_path' => null,
                'order_num' => 3,
                'created_at' => '2026-07-07 14:11:30',
                'updated_at' => '2026-07-07 14:11:30',
            ],
            [
                'id' => 4,
                'name' => 'BANK BCA',
                'logo_path' => null,
                'order_num' => 4,
                'created_at' => '2026-07-07 14:11:30',
                'updated_at' => '2026-07-07 14:11:30',
            ],
            [
                'id' => 5,
                'name' => 'PLN GROUP',
                'logo_path' => null,
                'order_num' => 5,
                'created_at' => '2026-07-07 14:11:30',
                'updated_at' => '2026-07-07 14:11:30',
            ],
            [
                'id' => 6,
                'name' => 'KEMENTERIAN RI',
                'logo_path' => null,
                'order_num' => 6,
                'created_at' => '2026-07-07 14:11:30',
                'updated_at' => '2026-07-07 14:11:30',
            ],
        ];

        foreach ($records as $r) {
            Partner::create($r);
        }

        // Seed settings
        Setting::truncate();
        $records = [
            [
                'id' => 1,
                'key' => 'company_phone',
                'value' => '+62 812-3456-7890',
                'created_at' => '2026-07-07 14:11:30',
                'updated_at' => '2026-07-07 14:31:52',
            ],
            [
                'id' => 2,
                'key' => 'company_email',
                'value' => 'info@dapoerratucatering.com',
                'created_at' => '2026-07-07 14:11:30',
                'updated_at' => '2026-07-09 11:21:57',
            ],
            [
                'id' => 3,
                'key' => 'company_address',
                'value' => 'Jl. Senopati No.45, Kebayoran Baru, Jakarta Selatan',
                'created_at' => '2026-07-07 14:11:30',
                'updated_at' => '2026-07-07 14:31:52',
            ],
            [
                'id' => 4,
                'key' => 'company_wa',
                'value' => 6285656233335,
                'created_at' => '2026-07-07 14:11:30',
                'updated_at' => '2026-07-07 14:31:52',
            ],
            [
                'id' => 5,
                'key' => 'company_instagram',
                'value' => '@dapoerratucatering',
                'created_at' => '2026-07-07 14:11:30',
                'updated_at' => '2026-07-09 11:21:57',
            ],
            [
                'id' => 6,
                'key' => 'company_facebook',
                'value' => 'dapoerratucatering',
                'created_at' => '2026-07-07 14:11:30',
                'updated_at' => '2026-07-09 11:21:57',
            ],
            [
                'id' => 7,
                'key' => 'company_youtube',
                'value' => 'DapoerRatuCatering',
                'created_at' => '2026-07-07 14:11:30',
                'updated_at' => '2026-07-09 11:21:57',
            ],
            [
                'id' => 8,
                'key' => 'google_maps_url',
                'value' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3973.7441958274435!2d119.48624721207857!3d-5.144825494810881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dbefd00284cd23f%3A0xc96750f4eff4dacc!2sDipanegara%20Computer%20Club!5e0!3m2!1sid!2sid!4v1783434671047!5m2!1sid!2sid',
                'created_at' => '2026-07-07 14:11:30',
                'updated_at' => '2026-07-07 14:31:52',
            ],
            [
                'id' => 9,
                'key' => 'operational_hours_weekday',
                'value' => 'Senin - Jumat: 08.00 - 18.00 WIB',
                'created_at' => '2026-07-07 14:11:30',
                'updated_at' => '2026-07-07 14:31:52',
            ],
            [
                'id' => 10,
                'key' => 'operational_hours_weekend',
                'value' => 'Sabtu - Minggu: 09.00 - 17.00 WIB',
                'created_at' => '2026-07-07 14:11:30',
                'updated_at' => '2026-07-07 14:31:52',
            ],
            [
                'id' => 11,
                'key' => 'hero_title',
                'value' => 'Catering Premium untuk Wedding, Corporate & Event',
                'created_at' => '2026-07-07 14:11:30',
                'updated_at' => '2026-07-07 14:31:52',
            ],
            [
                'id' => 12,
                'key' => 'hero_subtitle',
                'value' => 'Menyajikan pengalaman kuliner legendaris berkualitas bintang lima sejak 1984 dengan layanan profesional, higienis, dan menu berkelas yang dapat disesuaikan.',
                'created_at' => '2026-07-07 14:11:30',
                'updated_at' => '2026-07-07 14:31:52',
            ],
            [
                'id' => 13,
                'key' => 'hero_bg_image',
                'value' => '/images/hero_background.webp',
                'created_at' => '2026-07-07 14:11:30',
                'updated_at' => '2026-07-07 14:31:52',
            ],
            [
                'id' => 14,
                'key' => 'slider_before_image',
                'value' => '/images/ballroom_empty.webp',
                'created_at' => '2026-07-07 14:11:30',
                'updated_at' => '2026-07-07 14:31:52',
            ],
            [
                'id' => 15,
                'key' => 'slider_after_image',
                'value' => '/images/gallery_wedding_setup.webp',
                'created_at' => '2026-07-07 14:11:30',
                'updated_at' => '2026-07-07 14:31:52',
            ],
            [
                'id' => 16,
                'key' => 'slider_before_label',
                'value' => 'Sebelum Setup',
                'created_at' => '2026-07-07 14:11:30',
                'updated_at' => '2026-07-07 14:31:52',
            ],
            [
                'id' => 17,
                'key' => 'slider_after_label',
                'value' => 'Sesudah Setup',
                'created_at' => '2026-07-07 14:11:30',
                'updated_at' => '2026-07-07 14:31:52',
            ],
            [
                'id' => 18,
                'key' => 'advantages_badge',
                'value' => 'Why Choose Us',
                'created_at' => '2026-07-07 19:08:42',
                'updated_at' => '2026-07-07 19:08:42',
            ],
            [
                'id' => 19,
                'key' => 'advantages_title',
                'value' => 'Standar Pelayanan Katering Bintang Lima',
                'created_at' => '2026-07-07 19:08:42',
                'updated_at' => '2026-07-07 19:08:42',
            ],
            [
                'id' => 20,
                'key' => 'advantages_description',
                'value' => 'Kami percaya bahwa menyajikan makanan bukan sekadar perkara rasa, melainkan juga kehormatan untuk mendampingi momen spesial Anda.',
                'created_at' => '2026-07-07 19:08:42',
                'updated_at' => '2026-07-07 19:08:42',
            ],
            [
                'id' => 21,
                'key' => 'advantage_1_title',
                'value' => 'Bahan Berkualitas',
                'created_at' => '2026-07-07 19:08:42',
                'updated_at' => '2026-07-07 19:08:42',
            ],
            [
                'id' => 22,
                'key' => 'advantage_1_desc',
                'value' => 'Hanya menggunakan bahan segar organik dari pemasok terpercaya.',
                'created_at' => '2026-07-07 19:08:42',
                'updated_at' => '2026-07-07 19:08:42',
            ],
            [
                'id' => 23,
                'key' => 'advantage_2_title',
                'value' => 'Executive Chef Profesional',
                'created_at' => '2026-07-07 19:08:42',
                'updated_at' => '2026-07-07 19:08:42',
            ],
            [
                'id' => 24,
                'key' => 'advantage_2_desc',
                'value' => 'Tim koki berpengalaman hotel bintang 5.',
                'created_at' => '2026-07-07 19:08:42',
                'updated_at' => '2026-07-07 19:08:42',
            ],
            [
                'id' => 25,
                'key' => 'advantage_3_title',
                'value' => 'Jaminan 100% Halal',
                'created_at' => '2026-07-07 19:08:42',
                'updated_at' => '2026-07-07 19:08:42',
            ],
            [
                'id' => 26,
                'key' => 'advantage_3_desc',
                'value' => 'Telah terdaftar resmi dan bersertifikat Halal MUI.',
                'created_at' => '2026-07-07 19:08:42',
                'updated_at' => '2026-07-07 19:08:42',
            ],
            [
                'id' => 27,
                'key' => 'advantage_4_title',
                'value' => 'Tepat Waktu & Higienis',
                'created_at' => '2026-07-07 19:08:42',
                'updated_at' => '2026-07-07 19:08:42',
            ],
            [
                'id' => 28,
                'key' => 'advantage_4_desc',
                'value' => 'Protokol ketat pengantaran tepat waktu dengan standar sanitasi tinggi.',
                'created_at' => '2026-07-07 19:08:42',
                'updated_at' => '2026-07-07 19:08:42',
            ],
            [
                'id' => 29,
                'key' => 'advantage_5_title',
                'value' => 'Custom Menu Options',
                'created_at' => '2026-07-07 19:08:42',
                'updated_at' => '2026-07-07 19:08:42',
            ],
            [
                'id' => 30,
                'key' => 'advantage_5_desc',
                'value' => 'Kemudahan menyesuaikan menu sesuai preferensi rasa tamu Anda.',
                'created_at' => '2026-07-07 19:08:42',
                'updated_at' => '2026-07-07 19:08:42',
            ],
            [
                'id' => 31,
                'key' => 'advantage_6_title',
                'value' => 'Harga Transparan',
                'created_at' => '2026-07-07 19:08:42',
                'updated_at' => '2026-07-07 19:08:42',
            ],
            [
                'id' => 32,
                'key' => 'advantage_6_desc',
                'value' => 'Tanpa biaya tersembunyi, semua rincian penawaran tercatat rapi.',
                'created_at' => '2026-07-07 19:08:42',
                'updated_at' => '2026-07-07 19:08:42',
            ],
            [
                'id' => 33,
                'key' => 'stats_years',
                'value' => 4,
                'created_at' => '2026-07-07 19:08:42',
                'updated_at' => '2026-07-09 17:00:54',
            ],
            [
                'id' => 34,
                'key' => 'stats_years_label',
                'value' => 'Tahun Pengalaman',
                'created_at' => '2026-07-07 19:08:42',
                'updated_at' => '2026-07-07 19:08:42',
            ],
            [
                'id' => 35,
                'key' => 'stats_events',
                'value' => 500,
                'created_at' => '2026-07-07 19:08:42',
                'updated_at' => '2026-07-09 17:01:05',
            ],
            [
                'id' => 36,
                'key' => 'stats_events_label',
                'value' => 'Event Sukses',
                'created_at' => '2026-07-07 19:08:42',
                'updated_at' => '2026-07-07 19:08:42',
            ],
            [
                'id' => 37,
                'key' => 'stats_partners',
                'value' => 30,
                'created_at' => '2026-07-07 19:08:42',
                'updated_at' => '2026-07-09 17:01:05',
            ],
            [
                'id' => 38,
                'key' => 'stats_partners_label',
                'value' => 'Mitra Perusahaan',
                'created_at' => '2026-07-07 19:08:42',
                'updated_at' => '2026-07-07 19:08:42',
            ],
            [
                'id' => 39,
                'key' => 'stats_satisfaction',
                'value' => 98,
                'created_at' => '2026-07-07 19:08:42',
                'updated_at' => '2026-07-07 19:08:42',
            ],
            [
                'id' => 40,
                'key' => 'stats_satisfaction_label',
                'value' => 'Kepuasan Pelanggan',
                'created_at' => '2026-07-07 19:08:42',
                'updated_at' => '2026-07-07 19:08:42',
            ],
            [
                'id' => 41,
                'key' => 'lkpp_ekatalog_url',
                'value' => 'https://katalog.inaproc.id/a-resmianti',
                'created_at' => '2026-07-10 12:01:38',
                'updated_at' => '2026-07-10 12:01:38',
            ],
        ];

        foreach ($records as $r) {
            Setting::create($r);
        }

        // Seed certificates
        Certificate::truncate();
        $records = [
            [
                'id' => 1,
                'title' => 'Sertifikat Halal Resmi',
                'issuer' => 'Majelis Ulama Indonesia (MUI)',
                'image_path' => '/images/gallery_wedding_setup.webp',
                'icon_name' => 'ShieldCheck',
                'order_num' => 1,
                'created_at' => '2026-07-10 10:21:14',
                'updated_at' => '2026-07-10 10:21:14',
            ],
            [
                'id' => 2,
                'title' => 'Sertifikat Laik Higiene Sanitasi Jasa Boga',
                'issuer' => 'Dinas Kesehatan Kota',
                'image_path' => '/images/gallery_kitchen.webp',
                'icon_name' => 'Award',
                'order_num' => 2,
                'created_at' => '2026-07-10 10:21:14',
                'updated_at' => '2026-07-10 10:21:14',
            ],
            [
                'id' => 3,
                'title' => 'Izin Usaha Resmi (NIB)',
                'issuer' => 'Kementerian Investasi / BKPM',
                'image_path' => '/images/gallery_corporate_event.webp',
                'icon_name' => 'FileCheck',
                'order_num' => 3,
                'created_at' => '2026-07-10 10:21:14',
                'updated_at' => '2026-07-10 10:21:14',
            ],
        ];

        foreach ($records as $r) {
            Certificate::create($r);
        }

        // Enable foreign key checks
        \Illuminate\Support\Facades\Schema::enableForeignKeyConstraints();
    }
}
