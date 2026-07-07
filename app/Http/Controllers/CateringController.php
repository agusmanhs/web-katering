<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use App\Models\Portfolio;
use App\Models\Testimonial;
use App\Models\QuoteRequest;
use App\Models\Faq;
use App\Models\Service;
use App\Models\Partner;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CateringController extends Controller
{
    /**
     * Display the public landing page with dynamic CMS data.
     */
    public function welcome()
    {
        return Inertia::render('Welcome', [
            'menus' => Menu::all(),
            'portfolios' => Portfolio::all(),
            'testimonials' => Testimonial::all(),
            'faqs' => Faq::orderBy('order_num')->get(),
            'services' => Service::orderBy('order_num')->get(),
            'partners' => Partner::orderBy('order_num')->get(),
            'settings' => Setting::all()->pluck('value', 'key'),
        ]);
    }

    /**
     * Store a new quote request from the public form.
     */
    public function storeQuote(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'event_type' => 'required|string|max:100',
            'event_date' => 'required|date|after_or_equal:today',
            'guests_count' => 'required|integer|min:1',
            'notes' => 'nullable|string',
        ]);

        QuoteRequest::create($validated);

        return back()->with('success', 'Quote request submitted successfully!');
    }

    /**
     * Display the admin dashboard with submitted leads, statistics, and CRUD tables.
     */
    public function adminDashboard()
    {
        return Inertia::render('Dashboard', [
            'quoteRequests' => QuoteRequest::latest()->get(),
            'stats' => [
                'total_leads' => QuoteRequest::count(),
                'pending_leads' => QuoteRequest::where('status', 'pending')->count(),
                'contacted_leads' => QuoteRequest::where('status', 'contacted')->count(),
                'closed_leads' => QuoteRequest::where('status', 'closed')->count(),
            ],
            'menus' => Menu::latest()->get(),
            'testimonials' => Testimonial::latest()->get(),
            'faqs' => Faq::orderBy('order_num')->get(),
            'services' => Service::orderBy('order_num')->get(),
            'partners' => Partner::orderBy('order_num')->get(),
            'settings' => Setting::all()->pluck('value', 'key'),
        ]);
    }

    /**
     * Update the status of a lead/quote request.
     */
    public function updateQuoteStatus(Request $request, QuoteRequest $quoteRequest)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,contacted,closed',
        ]);

        $quoteRequest->update($validated);

        return back()->with('success', 'Lead status updated!');
    }

    // ==========================================
    // MENU CRUD
    // ==========================================
    public function storeMenu(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'description' => 'required|string',
            'price_from' => 'required|numeric|min:0',
            'is_best_seller' => 'required|in:0,1,true,false',
            'tags' => 'nullable|array',
            'image' => 'nullable|image|max:4096',
        ]);

        $validated['is_best_seller'] = filter_var($validated['is_best_seller'], FILTER_VALIDATE_BOOLEAN);
        $validated['slug'] = Str::slug($validated['name']);

        if ($request->hasFile('image') && $request->file('image')->isValid()) {
            $file = $request->file('image');
            $filename = 'menu_' . time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('images'), $filename);
            $validated['image_path'] = "/images/$filename";
        } else {
            $validated['image_path'] = '/images/menu_beef_wellington.webp'; // Fallback
        }

        Menu::create($validated);
        return back()->with('success', 'Menu created successfully!');
    }

    public function updateMenu(Request $request, Menu $menu)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'description' => 'required|string',
            'price_from' => 'required|numeric|min:0',
            'is_best_seller' => 'required|in:0,1,true,false',
            'tags' => 'nullable|array',
            'image' => 'nullable|image|max:4096',
        ]);

        $validated['is_best_seller'] = filter_var($validated['is_best_seller'], FILTER_VALIDATE_BOOLEAN);
        $validated['slug'] = Str::slug($validated['name']);

        if ($request->hasFile('image') && $request->file('image')->isValid()) {
            $file = $request->file('image');
            $filename = 'menu_' . time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('images'), $filename);
            $validated['image_path'] = "/images/$filename";
        } else {
            $validated['image_path'] = $menu->image_path;
        }

        $menu->update($validated);
        return back()->with('success', 'Menu updated successfully!');
    }

    public function destroyMenu(Menu $menu)
    {
        $menu->delete();
        return back()->with('success', 'Menu deleted successfully!');
    }

    // ==========================================
    // TESTIMONIAL CRUD
    // ==========================================
    public function storeTestimonial(Request $request)
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'customer_title' => 'required|string|max:255',
            'review' => 'required|string',
            'rating' => 'required|integer|min:1|max:5',
            'customer_photo' => 'nullable|string',
            'company_logo' => 'nullable|string',
        ]);

        if (empty($validated['customer_photo'])) {
            $validated['customer_photo'] = '/images/user_clara.webp';
        }

        Testimonial::create($validated);
        return back()->with('success', 'Testimonial added successfully!');
    }

    public function updateTestimonial(Request $request, Testimonial $testimonial)
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'customer_title' => 'required|string|max:255',
            'review' => 'required|string',
            'rating' => 'required|integer|min:1|max:5',
            'customer_photo' => 'nullable|string',
            'company_logo' => 'nullable|string',
        ]);

        if (empty($validated['customer_photo'])) {
            $validated['customer_photo'] = $testimonial->customer_photo;
        }

        $testimonial->update($validated);
        return back()->with('success', 'Testimonial updated successfully!');
    }

    public function destroyTestimonial(Testimonial $testimonial)
    {
        $testimonial->delete();
        return back()->with('success', 'Testimonial deleted successfully!');
    }

    // ==========================================
    // FAQ CRUD
    // ==========================================
    public function storeFaq(Request $request)
    {
        $validated = $request->validate([
            'question' => 'required|string|max:255',
            'answer' => 'required|string',
            'order_num' => 'required|integer',
        ]);

        Faq::create($validated);
        return back()->with('success', 'FAQ added successfully!');
    }

    public function updateFaq(Request $request, Faq $faq)
    {
        $validated = $request->validate([
            'question' => 'required|string|max:255',
            'answer' => 'required|string',
            'order_num' => 'required|integer',
        ]);

        $faq->update($validated);
        return back()->with('success', 'FAQ updated successfully!');
    }

    public function destroyFaq(Faq $faq)
    {
        $faq->delete();
        return back()->with('success', 'FAQ deleted successfully!');
    }

    // ==========================================
    // SERVICES CRUD
    // ==========================================
    public function storeService(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'icon_name' => 'required|string|max:100',
            'order_num' => 'required|integer',
        ]);

        Service::create($validated);
        return back()->with('success', 'Service category created successfully!');
    }

    public function updateService(Request $request, Service $service)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'icon_name' => 'required|string|max:100',
            'order_num' => 'required|integer',
        ]);

        $service->update($validated);
        return back()->with('success', 'Service category updated successfully!');
    }

    public function destroyService(Service $service)
    {
        $service->delete();
        return back()->with('success', 'Service category deleted successfully!');
    }

    // ==========================================
    // PARTNER CRUD
    // ==========================================
    public function storePartner(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'order_num' => 'required|integer',
        ]);

        Partner::create($validated);
        return back()->with('success', 'Partner added successfully!');
    }

    public function updatePartner(Request $request, Partner $partner)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'order_num' => 'required|integer',
        ]);

        $partner->update($validated);
        return back()->with('success', 'Partner updated successfully!');
    }

    public function destroyPartner(Partner $partner)
    {
        $partner->delete();
        return back()->with('success', 'Partner removed successfully!');
    }

    // ==========================================
    // SETTINGS BATCH UPDATE
    // ==========================================
    public function updateSettings(Request $request)
    {
        $request->validate([
            'settings' => 'required|array',
        ]);

        foreach ($request->input('settings') as $key => $value) {
            // If the field is a file upload, we skip manual string update here
            if ($request->hasFile("settings.$key")) {
                continue;
            }
            Setting::updateOrCreate(['key' => $key], ['value' => $value]);
        }

        // Process file uploads
        if ($request->hasFile('settings')) {
            foreach ($request->file('settings') as $key => $file) {
                if ($file->isValid()) {
                    // Generate unique filename
                    $filename = 'uploaded_' . $key . '_' . time() . '.' . $file->getClientOriginalExtension();
                    
                    // Move to public/images/
                    $file->move(public_path('images'), $filename);
                    
                    // Save path to DB
                    Setting::updateOrCreate(['key' => $key], ['value' => "/images/$filename"]);
                }
            }
        }

        return back()->with('success', 'Settings updated successfully!');
    }
}
