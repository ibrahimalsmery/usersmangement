<!DOCTYPE html>

<html lang="en" class="light-style" dir="ltr" data-theme="theme-default" data-assets-path="/template/assets/"
    data-template="vertical-menu-template-free">

<head>
    <meta charset="utf-8" />

    <meta name="viewport"
        content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0" />
    <title>{{ $title ?? '' }}</title>

    <meta name="description" content="" />

    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="/template/assets/img/favicon/favicon.ico" />

    @vite(['resources/css/app.css', 'resources/js/app.js'])

</head>

<body>

    <!-- Content -->
    @yield('content')
    <!-- / Content -->

</body>
</html>
