<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- Favicon -->
        <link rel="shortcut icon" href="/favicon.ico?v=2" type="image/x-icon">
        <link rel="icon" href="/favicon.png?v=2" type="image/png" sizes="32x32">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=2" sizes="180x180">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=inter:300,400,500,600,700|playfair-display:400,600,700,800&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
        @inertiaHead

        <!-- Theme Initialization Script -->
        <script>
            try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                } else if (localStorage.theme === 'light') {
                    document.documentElement.classList.remove('dark');
                } else {
                    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                        document.documentElement.classList.add('dark');
                    } else {
                        document.documentElement.classList.remove('dark');
                    }
                }
            } catch (e) {}
        </script>
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
