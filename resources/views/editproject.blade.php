<!-- filepath: c:\Users\becode_admin\Desktop\meibo\resources\views\editproject.blade.php -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Edit Project</title>
</head>
<body>
    <h1>Edit Project</h1>
    <a href="{{ url()->previous() }}">Back</a>
    <form action="{{ route('projects.update', $project->id) }}" method="POST">
        @csrf
        @method('PUT')

        <div class="mb-3">
            <label for="name" class="form-label">Nom du projet:</label> <br>
            <input type="text" class="form-control" id="name" name="name" value="{{ old('name', $project->name) }}">
        </div>
        <br>
        <div class="mb-3">
            <label for="description" class="form-label">Description:</label> <br>
            <textarea class="form-control" id="description" name="description">{{ old('description', $project->description) }}</textarea>
        </div>
        <br>
        <div class="mb-3">
            <label for="start_date" class="form-label">Date de début:</label> <br>
            <input type="date" class="form-control" id="start_date" name="start_date" value="{{ old('start_date', $project->start_date) }}">
        </div>
        <br>
        <div class<!-- filepath: c:\Users\becode_admin\Desktop\meibo\resources\views\editproject.blade.php -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Edit Project</title>
</head>
<body>
    <h1>Edit Project</h1>
    <a href="{{ url()->previous() }}">Back</a>
    <form action="{{ route('projects.update', $project->id) }}" method="POST">
        @csrf
        @method('PUT')

        <div class="mb-3">
            <label for="name" class="form-label">Nom du projet:</label> <br>
            <input type="text" class="form-control" id="name" name="name" value="{{ old('name', $project->name) }}">
        </div>
        <br>
        <div class="mb-3">
            <label for="description" class="form-label">Description:</label> <br>
            <textarea class="form-control" id="description" name="description">{{ old('description', $project->description) }}</textarea>
        </div>
        <br>
        <div class="mb-3">
            <label for="start_date" class="form-label">Date de début:</label> <br>
            <input type="date" class="form-control" id="start_date" name="start_date" value="{{ old('start_date', $project->start_date) }}">
        </div>
        <br>
        <div class