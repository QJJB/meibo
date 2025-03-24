<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

</head>
<body class="font-sans antialiased">
    <h1>Project</h1>
    <h2 class="font-bold text-lg">{{ $projects ['name'] }}</h2>

    <p>
        Description: {{ $projects['description'] }}.
    </p>
    <p>
        Start date: {{ $projects['start_date'] }}.
    </p>
    <p>
        End date: {{ $projects['end_date'] }}.
    </p>
    <p>
        Created at: {{ $projects['created_at'] }}.
    </p>
</body>
</html>
