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
<h1>New project</h1>
<a href="home">Home</a>
<form action="/newproject" method="POST">
    @csrf

    <div class="mb-3">
        <label for="name" class="form-label">Nom du projet:</label> <br>
        <input type="text" class="form-control" id="name" name="name" required value="{{ old('name') }}">
    </div>
    <br>
    <div class="mb-3">
        <label for="description" class="form-label">Description:</label> <br>
        <textarea class="form-control" id="description" name="description">{{ old('description') }}</textarea>
    </div>
    <br>
    <div class="mb-3">
        <label for="start_date" class="form-label">Date de début:</label> <br>
        <input type="date" class="form-control" id="start_date" name="start_date" required value="{{ old('start_date') }}">
    </div>
    <br>
    <div class="mb-3">
        <label for="end_date" class="form-label">Date de fin:</label> <br>
        <input type="date" class="form-control" id="end_date" name="end_date" required value="{{ old('end_date') }}">
    </div>
    <br>
    <button type="submit" class="btn btn-primary">Créer le projet</button>
</form>
</body>
</html>
