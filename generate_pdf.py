# -*- coding: utf-8 -*-
import os
import sys
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    """
    Custom canvas to handle two-pass page numbering ("Halaman X dari Y")
    and header/footer decorations on all pages except the cover page.
    """
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        # Save state for the second pass
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        # Page 1 is the cover page
        if self._pageNumber == 1:
            self.saveState()
            # Draw decorative side accent bar on the cover
            self.setFillColor(HexColor('#7C1A22')) # Deep Red Primary
            self.rect(0, 0, 18, 841.89, fill=1, stroke=0)
            
            # Draw a subtle gold line next to it
            self.setFillColor(HexColor('#E5B82C')) # Gold/Amber Accent
            self.rect(18, 0, 4, 841.89, fill=1, stroke=0)
            self.restoreState()
            return
            
        self.saveState()
        # Header Text
        self.setFont("Helvetica-Bold", 8)
        self.setFillColor(HexColor('#7C1A22'))
        self.drawString(54, 802, "PANDUAN CMS")
        self.setFont("Helvetica", 8)
        self.setFillColor(HexColor('#64748B'))
        self.drawString(130, 802, "|   Dapoer Ratu Catering")
        
        # Header Line
        self.setStrokeColor(HexColor('#E2E8F0'))
        self.setLineWidth(0.5)
        self.line(54, 794, 541, 794)
        
        # Footer Line
        self.line(54, 55, 541, 55)
        
        # Footer Text
        self.drawString(54, 40, "© 2026 Dapoer Ratu Catering. Hak Cipta Dilindungi.")
        page_str = f"Halaman {self._pageNumber} dari {page_count}"
        self.drawRightString(541, 40, page_str)
        self.restoreState()


def make_hr(color=HexColor('#E2E8F0'), thickness=0.75, space_after=12):
    """Helper to create a safe horizontal rule using a single-cell table."""
    t = Table([['']], colWidths=[487], rowHeights=[1])
    t.setStyle(TableStyle([
        ('LINEABOVE', (0,0), (-1,-1), thickness, color),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    return t


def make_callout(text, style, bg_color=HexColor('#FEF2F2'), border_color=HexColor('#7C1A22')):
    """Helper to create a nice blockquote-style callout box."""
    p = Paragraph(text, style)
    t = Table([[p]], colWidths=[480])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), bg_color),
        ('LINELEFT', (0,0), (0,0), 3, border_color),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('LEFTPADDING', (0,0), (-1,-1), 12),
        ('RIGHTPADDING', (0,0), (-1,-1), 12),
    ]))
    return t


def generate_pdf(output_path):
    # Setup document
    # A4: 595.27 x 841.89 pt
    # 54 pt margins = 487.27 pt printable width
    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        leftMargin=54,
        rightMargin=54,
        topMargin=72,
        bottomMargin=72
    )

    styles = getSampleStyleSheet()

    # Define custom styles
    title_style = ParagraphStyle(
        'CoverTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=26,
        leading=32,
        textColor=HexColor('#7C1A22'),
        spaceAfter=12
    )

    subtitle_style = ParagraphStyle(
        'CoverSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=12,
        leading=16,
        textColor=HexColor('#475569'),
        spaceAfter=250
    )

    meta_label_style = ParagraphStyle(
        'MetaLabel',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=13,
        textColor=HexColor('#1E293B')
    )

    meta_val_style = ParagraphStyle(
        'MetaValue',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=HexColor('#475569')
    )

    h1_style = ParagraphStyle(
        'SectionH1',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=16,
        leading=20,
        textColor=HexColor('#7C1A22'),
        spaceBefore=22,
        spaceAfter=8,
        keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'SectionH2',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=HexColor('#1E293B'),
        spaceBefore=14,
        spaceAfter=6,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'BodyTextCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=14.5,
        textColor=HexColor('#334155'),
        spaceAfter=10
    )

    bullet_style = ParagraphStyle(
        'BulletCustom',
        parent=body_style,
        leftIndent=15,
        firstLineIndent=-10,
        spaceAfter=6
    )

    code_style = ParagraphStyle(
        'CodeText',
        parent=body_style,
        fontName='Courier',
        fontSize=9,
        leading=13,
        textColor=HexColor('#7C1A22')
    )

    table_header_style = ParagraphStyle(
        'TableHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=12,
        textColor=colors.white
    )

    table_cell_style = ParagraphStyle(
        'TableCell',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=HexColor('#334155')
    )

    table_cell_bold = ParagraphStyle(
        'TableCellBold',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=12,
        textColor=HexColor('#1E293B')
    )

    story = []

    # =========================================================================
    # Halaman 1: COVER
    # =========================================================================
    story.append(Spacer(1, 40))
    story.append(Paragraph("<b>DAPOER RATU CATERING</b>", ParagraphStyle('CoverBrand', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=14, leading=16, textColor=HexColor('#E5B82C'), spaceAfter=15)))
    story.append(Paragraph("PANDUAN PENGGUNAAN<br/>CMS & ADMINISTRASI WEBSITE", title_style))
    story.append(Paragraph("Panduan langkah demi langkah bagi administrator untuk mengelola konten landing page utama, memperbarui portofolio/menu, serta menindaklanjuti data permintaan penawaran harga pelanggan.", subtitle_style))
    
    # Metadata Table at the bottom of cover page
    meta_data = [
        [Paragraph("Aplikasi", meta_label_style), Paragraph("Dapoer Ratu Catering Web Platform", meta_val_style)],
        [Paragraph("Tipe Dokumen", meta_label_style), Paragraph("User Guide / Buku Panduan Admin", meta_val_style)],
        [Paragraph("Versi Sistem", meta_label_style), Paragraph("1.0 (Stabil) / Laravel 13 & React (Inertia)", meta_val_style)],
        [Paragraph("Tanggal Pembuatan", meta_label_style), Paragraph("13 Juli 2026", meta_val_style)],
        [Paragraph("Status Akses", meta_label_style), Paragraph("Rahasia (Khusus Administrator Internal)", meta_val_style)],
    ]
    meta_table = Table(meta_data, colWidths=[120, 360])
    meta_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), HexColor('#F8FAFC')),
        ('BOX', (0,0), (-1,-1), 0.5, HexColor('#E2E8F0')),
        ('INNERGRID', (0,0), (-1,-1), 0.5, HexColor('#E2E8F0')),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
    ]))
    story.append(meta_table)
    story.append(PageBreak())

    # =========================================================================
    # Halaman 2: PENDAHULUAN & AKSES LOGIN
    # =========================================================================
    story.append(Paragraph("1. Pendahuluan", h1_style))
    story.append(make_hr())
    story.append(Paragraph("Sistem Manajemen Konten (<b>CMS - Content Management System</b>) Dapoer Ratu Catering dirancang khusus untuk mempermudah pengelola website dalam membarui seluruh informasi visual dan tekstual pada halaman depan (landing page) secara mandiri tanpa harus memahami bahasa pemrograman.", body_style))
    story.append(Paragraph("Selain memperbarui tampilan konten, CMS ini juga terintegrasi langsung dengan formulir permintaan harga pelanggan (Quote Requests / Inquiries) yang masuk secara real-time. Dengan demikian, admin dapat merespons penawaran yang diajukan pelanggan dengan cepat.", body_style))
    
    story.append(Spacer(1, 10))
    story.append(Paragraph("2. Akses & Login ke Dashboard", h1_style))
    story.append(make_hr())
    
    story.append(Paragraph("2.1 URL Akses Administrasi", h2_style))
    story.append(Paragraph("Untuk masuk ke panel pengelolaan administrasi website, Anda perlu membuka web browser (seperti Google Chrome, Safari, atau Firefox) dan mengakses alamat URL berikut:", body_style))
    
    login_url_html = "<b>Alamat URL Login:</b><br/><font face='Courier' color='#7C1A22'><b>http://domain-anda.com/login</b></font><br/><i>Untuk lokal (pengembangan):</i> <font face='Courier' color='#7C1A22'><b>http://localhost:8000/login</b></font>"
    story.append(make_callout(login_url_html, body_style))
    story.append(Spacer(1, 10))

    story.append(Paragraph("2.2 Kredensial Akun Default", h2_style))
    story.append(Paragraph("Gunakan akun administrator default berikut untuk masuk pertama kali ke sistem:", body_style))
    
    cred_data = [
        [Paragraph("Parameter", table_header_style), Paragraph("Keterangan Kredensial", table_header_style)],
        [Paragraph("Email Admin", table_cell_bold), Paragraph("<font face='Courier' color='#7C1A22'>admin@dapoerratucatering.com</font>", table_cell_style)],
        [Paragraph("Password Default", table_cell_bold), Paragraph("<font face='Courier' color='#7C1A22'>dapoerratupremium123</font>", table_cell_style)],
        [Paragraph("Tingkat Akses", table_cell_bold), Paragraph("Super Administrator (Kontrol Penuh)", table_cell_style)],
    ]
    cred_table = Table(cred_data, colWidths=[130, 350])
    cred_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), HexColor('#7C1A22')),
        ('BACKGROUND', (0,1), (-1,-1), HexColor('#F8FAFC')),
        ('BOX', (0,0), (-1,-1), 0.5, HexColor('#E2E8F0')),
        ('INNERGRID', (0,0), (-1,-1), 0.5, HexColor('#E2E8F0')),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
    ]))
    story.append(cred_table)
    story.append(Spacer(1, 10))

    story.append(Paragraph("2.3 Langkah-langkah Login", h2_style))
    story.append(Paragraph("• Buka halaman login menggunakan tautan di atas.", bullet_style))
    story.append(Paragraph("• Masukkan alamat email admin dan kata sandi Anda dengan benar.", bullet_style))
    story.append(Paragraph("• Centang kotak <b>'Remember me'</b> apabila Anda menggunakan komputer pribadi agar sesi login bertahan lebih lama.", bullet_style))
    story.append(Paragraph("• Klik tombol <b>'Log in'</b>.", bullet_style))
    story.append(Paragraph("• Setelah verifikasi berhasil, Anda akan langsung dialihkan ke halaman utama <b>Dashboard Admin</b>.", bullet_style))
    
    warning_text = "<b>PENTING:</b> Demi keamanan data perusahaan, pastikan Anda segera mengubah kata sandi default di atas setelah login pertama kali melalui menu <b>Profile</b> yang ada di bagian kanan atas navigasi."
    story.append(Spacer(1, 8))
    story.append(make_callout(warning_text, body_style, bg_color=HexColor('#FEF3C7'), border_color=HexColor('#D97706')))
    story.append(PageBreak())

    # =========================================================================
    # Halaman 3: DASHBOARD OVERVIEW & LEADS MANAGEMENT
    # =========================================================================
    story.append(Paragraph("3. Gambaran Umum Dashboard & Pengelolaan Leads", h1_style))
    story.append(make_hr())
    story.append(Paragraph("Setelah berhasil masuk ke sistem, Anda akan melihat beranda dashboard. Di sini terdapat menu navigasi samping (sidebar) yang membagi modul pengelolaan menjadi beberapa tab, serta panel ringkasan data di bagian tengah.", body_style))
    
    story.append(Paragraph("3.1 Statistik Penawaran Masuk (Leads/Inquiries)", h2_style))
    story.append(Paragraph("Pada bagian atas dashboard admin, terdapat 4 kartu informasi statistik untuk melihat performa penawaran secara cepat:", body_style))
    
    story.append(Paragraph("• <b>Total Leads:</b> Akumulasi seluruh permintaan penawaran harga yang pernah dikirim oleh pengunjung web.", bullet_style))
    story.append(Paragraph("• <b>Pending Leads:</b> Jumlah permintaan penawaran baru yang belum diproses atau dihubungi oleh tim admin.", bullet_style))
    story.append(Paragraph("• <b>Contacted Leads:</b> Jumlah permintaan penawaran yang statusnya sedang dalam proses negosiasi atau komunikasi lanjutan.", bullet_style))
    story.append(Paragraph("• <b>Closed Leads:</b> Jumlah permintaan penawaran yang sudah selesai ditangani (Deal/Selesai).", bullet_style))
    
    story.append(Spacer(1, 10))
    story.append(Paragraph("3.2 Memproses Permintaan Penawaran Pelanggan", h2_style))
    story.append(Paragraph("Seluruh formulir penawaran masuk akan ditampilkan dalam bentuk tabel di tab pertama: <b>Active Inquiries</b>. Setiap baris mewakili satu data pemesanan.", body_style))
    
    inquiry_fields_text = """
    <b>Kolom Informasi Leads:</b><br/>
    1. <b>Customer Info:</b> Nama pelanggan, email, dan nomor telepon/WhatsApp.<br/>
    2. <b>Event Details:</b> Jenis acara (Wedding, Corporate, dll.), tanggal pelaksanaan, dan estimasi jumlah tamu undangan.<br/>
    3. <b>Customer Notes:</b> Catatan khusus atau permintaan menu tertentu dari pelanggan.<br/>
    4. <b>Status Dropdown:</b> Status tindak lanjut dari lead tersebut.
    """
    story.append(make_callout(inquiry_fields_text, body_style, bg_color=HexColor('#EFF6FF'), border_color=HexColor('#2563EB')))
    story.append(Spacer(1, 10))
    
    story.append(Paragraph("Langkah-langkah menindaklanjuti permintaan penawaran harga:", h2_style))
    story.append(Paragraph("1. Salin nomor telepon/WhatsApp pelanggan atau alamat email mereka untuk melakukan kontak.", bullet_style))
    story.append(Paragraph("2. Hubungi pelanggan secara manual untuk membahas ketersediaan tanggal, detail menu, dan negosiasi harga.", bullet_style))
    story.append(Paragraph("3. Setelah menghubungi pelanggan, klik tombol dropdown status pada baris lead tersebut di CMS, lalu ubah status dari <font color='#EF4444'><b>Pending</b></font> menjadi <font color='#F59E0B'><b>Contacted</b></font>.", bullet_style))
    story.append(Paragraph("4. Jika negosiasi selesai (pelanggan telah melakukan DP / pesanan selesai), ubah status lead menjadi <font color='#10B981'><b>Closed</b></font>.", bullet_style))
    story.append(Paragraph("5. Sistem akan otomatis memperbarui jumlah pada kartu statistik di bagian atas halaman secara real-time.", bullet_style))
    story.append(PageBreak())

    # =========================================================================
    # Halaman 4: MENGISI KONTEN - BAGIAN 1 (MENU, TESTIMONI, FAQ)
    # =========================================================================
    story.append(Paragraph("4. Mengisi Konten Landing Page (Modul CRUD)", h1_style))
    story.append(make_hr())
    story.append(Paragraph("Untuk mengisi dan memperbarui konten dinamis di landing page, gunakan menu navigasi samping. Setiap modul dirancang dengan antarmuka yang serupa: tombol <b>'Tambah Baru'</b> di pojok kanan atas tab untuk menambahkan data baru, ikon <b>'Pensil/Edit'</b> untuk mengubah data, dan ikon <b>'Tempat Sampah/Delete'</b> untuk menghapus data.", body_style))
    
    story.append(Paragraph("4.1 Modul Katalog Menu (Menu Catalog)", h2_style))
    story.append(Paragraph("Digunakan untuk mengelola daftar menu makanan yang ditawarkan kepada pelanggan. Setiap menu akan muncul di bagian menu tab landing page publik.", body_style))
    
    menu_fields_data = [
        [Paragraph("Nama Form Field", table_header_style), Paragraph("Keterangan Pengisian & Batasan", table_header_style)],
        [Paragraph("Nama Hidangan", table_cell_bold), Paragraph("Nama masakan (contoh: <i>Beef Wellington Imperial</i>). Wajib diisi.", table_cell_style)],
        [Paragraph("Kategori", table_cell_bold), Paragraph("Kategori masakan (pilih: Prasmanan / Buffet, Korporat / Bisnis, Private Event, Coffee Break, Lunch Box, Aqiqah, Pencuci Mulut).", table_cell_style)],
        [Paragraph("Harga Mulai (IDR)", table_cell_bold), Paragraph("Harga awal per porsi. Hanya isi angka tanpa titik/koma (contoh: <i>150000</i>).", table_cell_style)],
        [Paragraph("Deskripsi Menu", table_cell_bold), Paragraph("Penjelasan detail masakan, bahan, saus, atau pelengkap hidangan.", table_cell_style)],
        [Paragraph("Tags / Keistimewaan", table_cell_bold), Paragraph("Label promosi. Pisahkan dengan tanda koma (contoh: <i>Best Seller, Signature, Premium</i>).", table_cell_style)],
        [Paragraph("Foto Hidangan", table_cell_bold), Paragraph("Unggah gambar makanan (Format .webp/.jpg, ukuran maks 4MB. Rekomendasi: 800x600 px).", table_cell_style)],
        [Paragraph("Set Best Seller", table_cell_bold), Paragraph("Centang opsi ini jika ingin menampilkan label khusus 'Best Seller' pada kartu menu di landing page.", table_cell_style)],
    ]
    menu_table = Table(menu_fields_data, colWidths=[130, 350])
    menu_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), HexColor('#7C1A22')),
        ('BACKGROUND', (0,1), (-1,-1), HexColor('#F8FAFC')),
        ('BOX', (0,0), (-1,-1), 0.5, HexColor('#E2E8F0')),
        ('INNERGRID', (0,0), (-1,-1), 0.5, HexColor('#E2E8F0')),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(menu_table)
    story.append(Spacer(1, 10))

    story.append(Paragraph("4.2 Modul Testimoni Klien (Testimonials)", h2_style))
    story.append(Paragraph("Digunakan untuk mempublikasikan ulasan kepuasan dari pelanggan untuk meningkatkan kepercayaan calon pelanggan baru. Kolom pengisian meliputi:", body_style))
    story.append(Paragraph("• <b>Nama Customer:</b> Nama lengkap pemberi testimoni (contoh: <i>Clara Adisutjipto</i>).", bullet_style))
    story.append(Paragraph("• <b>Acara / Keterangan:</b> Jenis acara yang diselenggarakan (contoh: <i>Wedding di Hotel Mulia</i>).", bullet_style))
    story.append(Paragraph("• <b>Rating Bintang (1-5):</b> Tingkat kepuasan dalam bentuk angka (1 s/d 5).", bullet_style))
    story.append(Paragraph("• <b>Isi Review Ulasan:</b> Teks testimoni / kalimat apresiasi dari pelanggan.", bullet_style))
    
    story.append(Spacer(1, 8))
    story.append(Paragraph("4.3 Modul FAQ & Tanya Jawab (FAQs & QAs)", h2_style))
    story.append(Paragraph("Digunakan untuk memelihara daftar pertanyaan populer beserta jawabannya agar mempermudah pelanggan:", body_style))
    story.append(Paragraph("• <b>Pertanyaan:</b> Kalimat tanya umum (contoh: <i>Apakah Dapoer Ratu menyediakan tester menu?</i>).", bullet_style))
    story.append(Paragraph("• <b>Jawaban:</b> Penjelasan resmi dari pihak catering secara detail.", bullet_style))
    story.append(Paragraph("• <b>Urutan Tampil:</b> Angka urutan (contoh: angka 1, 2, dst. Angka lebih kecil akan muncul lebih awal/atas).", bullet_style))
    story.append(PageBreak())

    # =========================================================================
    # Halaman 5: MENGISI KONTEN - BAGIAN 2 (SERVICES, PARTNERS, PORTFOLIOS, CERTS)
    # =========================================================================
    story.append(Paragraph("4.4 Modul Layanan Catering (Services)", h2_style))
    story.append(Paragraph("Mengelola kategori jasa catering utama yang ditawarkan perusahaan. Setiap layanan memiliki atribut:", body_style))
    story.append(Paragraph("• <b>Nama Layanan:</b> Judul utama kategori layanan (contoh: <i>Wedding Catering</i>, <i>Corporate Event</i>).", bullet_style))
    story.append(Paragraph("• <b>Deskripsi Singkat:</b> Penjelasan ringkas mengenai paket layanan yang disediakan.", bullet_style))
    story.append(Paragraph("• <b>Ikon Lucide:</b> Pilihan visual ikon yang mewakili layanan (tersedia pilihan default: Award, Users, Clock, ChefHat, Sparkles, ShieldCheck, Check, Phone).", bullet_style))
    story.append(Paragraph("• <b>Urutan Tampil:</b> Mengatur posisi susunan kartu layanan.", bullet_style))
    
    story.append(Spacer(1, 10))
    story.append(Paragraph("4.5 Modul Portofolio & Dokumentasi Event (Portfolios)", h2_style))
    story.append(Paragraph("Untuk mengunggah dokumentasi foto acara yang sudah pernah dikerjakan oleh Dapoer Ratu Catering:", body_style))
    story.append(Paragraph("• <b>Judul Acara / Dokumentasi:</b> Nama event (contoh: <i>Gala Dinner Kementerian Keuangan</i>).", bullet_style))
    story.append(Paragraph("• <b>Kategori Acara:</b> Kategori untuk filter galeri (Pernikahan, Korporat, Private Event, Tumpengan, Coffee Break, Lunch Box, Aqiqah).", bullet_style))
    story.append(Paragraph("• <b>Deskripsi Singkat Acara:</b> Ulasan ringkas jalannya acara, lokasi, atau menu yang disajikan (Opsional).", bullet_style))
    story.append(Paragraph("• <b>Foto Dokumentasi:</b> Unggah gambar resolusi tinggi (Format .jpg/.webp, ukuran maks 4MB. Rekomendasi: 1200x800 px).", bullet_style))
    
    story.append(Spacer(1, 10))
    story.append(Paragraph("4.6 Modul Sertifikat & Legalitas (Certificates)", h2_style))
    story.append(Paragraph("Berfungsi untuk menampilkan jaminan kualitas resmi demi meningkatkan kredibilitas di mata pelanggan korporasi/pemerintah:", body_style))
    story.append(Paragraph("• <b>Nama Sertifikat / Dokumen:</b> Nama sertifikat (contoh: <i>Sertifikat Halal Resmi MUI</i>).", bullet_style))
    story.append(Paragraph("• <b>Penerbit Resmi:</b> Instansi penerbit dokumen (contoh: <i>Majelis Ulama Indonesia</i> atau <i>Dinas Kesehatan</i>).", bullet_style))
    story.append(Paragraph("• <b>Ikon Tampil:</b> Pilihan ikon visual (Perisai/ShieldCheck, Medali/Award, atau Dokumen/FileCheck).", bullet_style))
    story.append(Paragraph("• <b>Urutan Tampil:</b> Urutan peletakan sertifikat di landing page.", bullet_style))
    story.append(Paragraph("• <b>Berkas Gambar Scan:</b> Unggah foto dokumen scan sertifikat resmi (Maks: 4MB).", bullet_style))
    
    story.append(Spacer(1, 10))
    story.append(Paragraph("4.7 Modul Daftar Klien / Mitra (Partners)", h2_style))
    story.append(Paragraph("Menampilkan nama-nama perusahaan besar atau instansi yang telah memercayakan kebutuhan konsumsi mereka kepada Dapoer Ratu Catering. Konten berupa running text/logo list di landing page publik.", body_style))
    story.append(Paragraph("• <b>Nama Mitra / Klien:</b> Nama lengkap perusahaan (contoh: <i>PERTAMINA</i>, <i>BANK BCA</i>).", bullet_style))
    story.append(Paragraph("• <b>Urutan Tampil:</b> Urutan pemunculan nama dalam barisan logo mitra kerja.", bullet_style))
    
    tip_text = "<b>TIPS GAMBAR:</b> Gunakan format gambar <b>.webp</b> untuk efisiensi pemuatan halaman web. Format ini memiliki ukuran berkas jauh lebih kecil dibandingkan .png atau .jpg namun tetap mempertahankan kualitas gambar yang sangat tajam."
    story.append(Spacer(1, 8))
    story.append(make_callout(tip_text, body_style, bg_color=HexColor('#ECFDF5'), border_color=HexColor('#10B981')))
    story.append(PageBreak())

    # =========================================================================
    # Halaman 6: PENGATURAN WEBSITE (WEB SETTINGS) - BAGIAN 1 (HERO & KONTAK)
    # =========================================================================
    story.append(Paragraph("5. Pengaturan Website (Web Settings)", h1_style))
    story.append(make_hr())
    story.append(Paragraph("Menu <b>Web Settings</b> digunakan untuk mengubah teks banner utama, gambar slider komparasi dekorasi, jam operasional, kontak WhatsApp, sosial media, hingga angka-angka counter statistik. Modul ini terbagi menjadi 3 tab utama. <i>Ingat untuk menekan tombol 'Simpan Pengaturan' setelah selesai mengedit data pada setiap tab.</i>", body_style))
    
    story.append(Paragraph("5.1 Tab Hero & Slider (Hero Section)", h2_style))
    story.append(Paragraph("Mengatur kesan pertama pengunjung ketika membuka website (bagian header banner publik):", body_style))
    
    story.append(Paragraph("• <b>Judul Hero:</b> Teks tajuk utama. Gunakan kalimat pemasaran yang kuat (contoh: <i>Catering Premium untuk Wedding, Corporate & Event</i>).", bullet_style))
    story.append(Paragraph("• <b>Subjudul Hero:</b> Penjelasan pendukung di bawah judul utama (1-2 kalimat).", bullet_style))
    story.append(Paragraph("• <b>Tampilkan Badge Hero:</b> Pilihan untuk mengaktifkan/menyembunyikan 4 kotak jaminan pelayanan di area banner utama (Pilih: <i>Ya, Tampilkan</i> atau <i>Tidak, Sembunyikan</i>).", bullet_style))
    story.append(Paragraph("• <b>Teks Badge 1 s/d 4:</b> Kalimat jaminan singkat (contoh: <i>Jaminan Halal MUI</i>, <i>Koki Hotel Bintang 5</i>, <i>Higienis & Sehat</i>, <i>Tepat Waktu</i>).", bullet_style))
    story.append(Paragraph("• <b>Foto Background Hero:</b> File gambar latar utama header web.", bullet_style))
    story.append(Paragraph("• <b>Before/After Image Slider:</b> Fitur pembanding foto sebelum dan sesudah setup catering. Unggah foto kosong pada <i>Slider Before Image</i> (misal: ruang ballroom kosong) dan foto dekorasi yang sudah siap pada <i>Slider After Image</i> (misal: meja buffet lengkap penataan makanan), lalu tentukan label teksnya.", bullet_style))
    
    story.append(Spacer(1, 10))
    story.append(Paragraph("5.2 Tab Kontak & Sosial Media", h2_style))
    story.append(Paragraph("Penting untuk memastikan pelanggan dapat menghubungi admin catering secara langsung dengan sekali klik:", body_style))
    
    wa_warning = """
    <b>PENTING - Format Nomor WhatsApp:</b><br/>
    Masukkan nomor WhatsApp dengan format angka saja diawali kode negara Indonesia (<b>62</b>) tanpa menggunakan spasi, tanda tambah (+), atau tanda hubung (-).<br/>
    • <b>BENAR:</b> 6281234567890<br/>
    • <b>SALAH:</b> +62 812-3456-7890 atau 081234567890<br/>
    Kesalahan format nomor WhatsApp akan mengakibatkan tautan tombol chat otomatis di landing page publik tidak berfungsi.
    """
    story.append(make_callout(wa_warning, body_style, bg_color=HexColor('#FEF2F2'), border_color=HexColor('#7C1A22')))
    story.append(Spacer(1, 8))
    
    story.append(Paragraph("• <b>Nomor Telepon:</b> Nomor telepon kantor / hotline resmi (contoh: <i>+62 21-8899-7766</i>).", bullet_style))
    story.append(Paragraph("• <b>Alamat Email:</b> Email resmi perusahaan (contoh: <i>info@dapoerratucatering.com</i>).", bullet_style))
    story.append(Paragraph("• <b>Alamat Lengkap:</b> Alamat fisik kantor utama / lokasi dapur (ditampilkan pada footer website).", bullet_style))
    story.append(Paragraph("• <b>Jam Operasional Weekday & Weekend:</b> Jam kerja kantor (contoh: <i>Senin - Jumat: 08.00 - 18.00 WIB</i>).", bullet_style))
    story.append(Paragraph("• <b>Instagram, Facebook, YouTube:</b> Nama username sosial media tanpa menyertakan alamat web lengkap (contoh: cukup tulis <i>@dapoerratucatering</i> atau <i>dapoerratucatering</i>).", bullet_style))
    story.append(Paragraph("• <b>Google Maps Embed URL:</b> URL peta interaktif dari fitur Google Maps Share Embed. Pastikan mengambil bagian URL-nya saja dari kode <font face='Courier' color='#7C1A22'>&lt;iframe src=&quot;...&quot;&gt;</font>.", bullet_style))
    story.append(Paragraph("• <b>LKPP E-Katalog URL:</b> Tautan profil katalog LKPP jika perusahaan berpartisipasi dalam e-purchasing pengadaan pemerintah.", bullet_style))
    story.append(PageBreak())

    # =========================================================================
    # Halaman 7: PENGATURAN WEBSITE (WEB SETTINGS) - BAGIAN 2 (STATS & PENUTUP)
    # =========================================================================
    story.append(Paragraph("5.3 Tab Keunggulan & Statistik", h2_style))
    story.append(Paragraph("Mengatur konten di area kelebihan Dapoer Ratu Catering (Why Choose Us) serta data statistik pencapaian:", body_style))
    
    story.append(Paragraph("<b>Bagian Keunggulan (Advantages):</b>", bullet_style))
    story.append(Paragraph("• <b>Teks Badge Keunggulan:</b> Label kecil di atas judul keunggulan (contoh: <i>Why Choose Us</i>).", bullet_style))
    story.append(Paragraph("• <b>Judul Keunggulan:</b> Kalimat tajuk utama bagian keunggulan (contoh: <i>Standar Pelayanan Katering Bintang Lima</i>).", bullet_style))
    story.append(Paragraph("• <b>Deskripsi Keunggulan:</b> Paragraf pengantar singkat bagian keunggulan.", bullet_style))
    story.append(Paragraph("• <b>Poin Keunggulan 1 s/d 6 (Judul & Deskripsi):</b> Anda dapat merumuskan 6 nilai kelebihan utama. Masing-masing terdiri atas Judul Singkat (contoh: <i>Bahan Berkualitas</i>) dan Deskripsi Detail (contoh: <i>Hanya menggunakan bahan segar organik pilihan dari supplier tepercaya.</i>).", bullet_style))
    
    story.append(Spacer(1, 10))
    story.append(Paragraph("<b>Bagian Counter Angka Statistik:</b>", bullet_style))
    story.append(Paragraph("Menampilkan 4 indikator kesuksesan catering dalam bentuk counter angka dinamis di landing page publik:", body_style))
    
    stats_data = [
        [Paragraph("Nama Field Angka", table_header_style), Paragraph("Nama Field Label", table_header_style), Paragraph("Contoh Pengisian Tampilan", table_header_style)],
        [Paragraph("stats_years (e.g. <b>40</b>)", table_cell_bold), Paragraph("stats_years_label", table_cell_style), Paragraph("40 + Tahun Pengalaman", table_cell_style)],
        [Paragraph("stats_events (e.g. <b>5000</b>)", table_cell_bold), Paragraph("stats_events_label", table_cell_style), Paragraph("5000+ Event Sukses", table_cell_style)],
        [Paragraph("stats_partners (e.g. <b>300</b>)", table_cell_bold), Paragraph("stats_partners_label", table_cell_style), Paragraph("300+ Mitra Perusahaan", table_cell_style)],
        [Paragraph("stats_satisfaction (e.g. <b>98</b>)", table_cell_bold), Paragraph("stats_satisfaction_label", table_cell_style), Paragraph("98% Kepuasan Pelanggan", table_cell_style)],
    ]
    stats_table = Table(stats_data, colWidths=[150, 150, 180])
    stats_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), HexColor('#7C1A22')),
        ('BACKGROUND', (0,1), (-1,-1), HexColor('#F8FAFC')),
        ('BOX', (0,0), (-1,-1), 0.5, HexColor('#E2E8F0')),
        ('INNERGRID', (0,0), (-1,-1), 0.5, HexColor('#E2E8F0')),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(stats_table)
    story.append(Spacer(1, 10))
    story.append(Paragraph("Setiap kali Anda menekan tombol <b>'Simpan Pengaturan'</b> di tab Keunggulan, angka statistik dan poin keunggulan ini akan langsung dihitung dan diperbarui secara instan pada landing page utama dengan efek transisi angka yang dinamis.", body_style))

    story.append(Spacer(1, 15))
    story.append(Paragraph("6. Kesimpulan & Troubleshooting", h1_style))
    story.append(make_hr())
    story.append(Paragraph("Dengan mengikuti panduan di atas, pengisian dan pembaruan konten landing page Dapoer Ratu Catering dapat diselesaikan dengan aman dan mandiri. Apabila Anda mengalami masalah umum seperti gambar tidak berubah atau tombol link tidak merespons, lakukan pemeriksaan berikut:", body_style))
    story.append(Paragraph("1. <b>Cache Browser:</b> Terkadang web browser masih menyimpan data lama. Tekan <b>Ctrl + F5</b> (Windows) atau <b>Cmd + Shift + R</b> (Mac) untuk memuat ulang halaman secara bersih.", bullet_style))
    story.append(Paragraph("2. <b>Validasi Input Gambar:</b> Pastikan ukuran gambar yang Anda unggah tidak melebihi <b>4MB</b> dan berekstensi JPG, PNG, atau WEBP.", bullet_style))
    story.append(Paragraph("3. <b>Status Koneksi:</b> Pastikan server Laravel berjalan dengan baik (<font face='Courier' color='#7C1A22'>php artisan serve</font> atau server produksi aktif).", bullet_style))
    story.append(Paragraph("4. <b>Format Nomor WA:</b> Cek kembali apakah format WhatsApp di tab kontak sudah dimulai dengan 62 (misal: 62812...) dan bukan 0812... atau +62812...", bullet_style))

    # Build document
    doc.build(story, canvasmaker=NumberedCanvas)


if __name__ == "__main__":
    output_pdf = "Panduan_Penggunaan_CMS_Catering.pdf"
    if len(sys.argv) > 1:
        output_pdf = sys.argv[1]
    
    print(f"Generating PDF to: {output_pdf}...")
    generate_pdf(output_pdf)
    print("PDF generation complete!")
