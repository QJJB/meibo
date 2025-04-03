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
    <a href="/home">Home</a>
    <h2 class="font-bold text-lg">{{ $projects ['name'] }}</h2>
    <form action="{{ route('projects.delete', $projects['id']) }}" method="POST" style="display: inline;">
        @csrf
        @method('DELETE')
        <button type="submit" class="text-red-500" onclick="return confirm('Are you sure you want to delete this project?')">Delete</button>
    </form>
    <a href="/home/{{ $projects['id'] }}/edit">Edit</a>
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
    <a href="{{ url('/home/' . $projects['id'] . '/newtask') }}">Create new task</a>
</body>
</html>
