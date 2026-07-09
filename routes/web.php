<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CateringController;
use Illuminate\Support\Facades\Route;

// Public Routes
Route::get('/', [CateringController::class, 'welcome'])->name('welcome');
Route::post('/quote-request', [CateringController::class, 'storeQuote'])->name('quote.store');

// Admin Protected Routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [CateringController::class, 'adminDashboard'])->name('dashboard');
    Route::patch('/admin/quotes/{quoteRequest}', [CateringController::class, 'updateQuoteStatus'])->name('quote.update');
    
    // Menus CRUD
    Route::post('/admin/menus', [CateringController::class, 'storeMenu'])->name('admin.menu.store');
    Route::put('/admin/menus/{menu}', [CateringController::class, 'updateMenu'])->name('admin.menu.update');
    Route::delete('/admin/menus/{menu}', [CateringController::class, 'destroyMenu'])->name('admin.menu.destroy');

    // Testimonials CRUD
    Route::post('/admin/testimonials', [CateringController::class, 'storeTestimonial'])->name('admin.testimonial.store');
    Route::put('/admin/testimonials/{testimonial}', [CateringController::class, 'updateTestimonial'])->name('admin.testimonial.update');
    Route::delete('/admin/testimonials/{testimonial}', [CateringController::class, 'destroyTestimonial'])->name('admin.testimonial.destroy');

    // FAQs CRUD
    Route::post('/admin/faqs', [CateringController::class, 'storeFaq'])->name('admin.faq.store');
    Route::put('/admin/faqs/{faq}', [CateringController::class, 'updateFaq'])->name('admin.faq.update');
    Route::delete('/admin/faqs/{faq}', [CateringController::class, 'destroyFaq'])->name('admin.faq.destroy');

    // Services CRUD
    Route::post('/admin/services', [CateringController::class, 'storeService'])->name('admin.service.store');
    Route::put('/admin/services/{service}', [CateringController::class, 'updateService'])->name('admin.service.update');
    Route::delete('/admin/services/{service}', [CateringController::class, 'destroyService'])->name('admin.service.destroy');

    // Partners CRUD
    Route::post('/admin/partners', [CateringController::class, 'storePartner'])->name('admin.partner.store');
    Route::put('/admin/partners/{partner}', [CateringController::class, 'updatePartner'])->name('admin.partner.update');
    Route::delete('/admin/partners/{partner}', [CateringController::class, 'destroyPartner'])->name('admin.partner.destroy');

    // Settings bulk update
    Route::patch('/admin/settings', [CateringController::class, 'updateSettings'])->name('admin.settings.update');

    // Portfolios CRUD
    Route::post('/admin/portfolios', [CateringController::class, 'storePortfolio'])->name('admin.portfolio.store');
    Route::put('/admin/portfolios/{portfolio}', [CateringController::class, 'updatePortfolio'])->name('admin.portfolio.update');
    Route::delete('/admin/portfolios/{portfolio}', [CateringController::class, 'destroyPortfolio'])->name('admin.portfolio.destroy');
});

// Profile Routes
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
