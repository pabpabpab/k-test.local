<!doctype html>
<html lang="ru">
<head>
    <title>K-Telecom</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="{{ asset('css/public/public.css') }}?t=@php echo time(); @endphp">
</head>
<body>

@include('menu.top-menu')

<main class="content_wrapper">
    @yield('content')
</main>

</body>
</html>
