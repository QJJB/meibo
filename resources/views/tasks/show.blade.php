<!-- filepath: c:\Users\Quuee\OneDrive - Enseignement de la Province de Liège\Bureau\meibo\resources\views\project.blade.php -->
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    <style>
        body {
            font-family: 'Figtree', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f9;
            color: #333;
        }

        header {
            background-color: #007BFF;
            color: white;
            padding: 20px;
            text-align: center;
        }

        header h1 {
            margin: 0;
            font-size: 2rem;
        }

        .container {
            max-width: 800px;
            margin: 20px auto;
            padding: 20px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .btn {
            display: inline-block;
            padding: 10px 15px;
            background-color: #007BFF;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            transition: background-color 0.3s ease;
        }

        .btn:hover {
            background-color: #0056b3;
        }

        .btn-danger {
            background-color: #dc3545;
        }

        .btn-danger:hover {
            background-color: #a71d2a;
        }

        .project-details p {
            margin: 10px 0;
            padding: 10px;
            background-color: #f9f9f9;
            border: 1px solid #ddd;
            border-radius: 5px;
        }

        .actions {
            margin-top: 20px;
        }

        .actions a,
        .actions button {
            margin-right: 10px;
        }
    </style>
</head>
<body>
    <header>
        <h1>Task Details</h1>
    </header>
    <div class="container">
        <a href="{{ url()->previous() }}" class="btn btn-secondary">Back</a>
        <h2 class="font-bold text-lg">{{ $task['name'] }}</h2>

        <div class="project-details">
            <p><strong>Title:</strong> {{ $task['title'] }}</p>
            <p><strong>Type:</strong> {{ $task['type'] }}</p>
            <p><strong>Description:</strong> {{ $task['description'] }}</p>
            <p><strong>Due-date:</strong> {{ $task['due_date'] }}</p>
            <p><strong>Status:</strong> {{ $task['status'] }}</p>
        </div>

        <div class="actions">
            @if(isset($task['id']))
                <form action="{{ route('projects.tasks.destroy', [$projects['id'], $task['id']]) }}" method="POST" style="display: inline;">
                    @csrf
                    @method('DELETE')
                     <button type="submit" class="btn btn-danger" onclick="return confirm('Are you sure you want to delete this task?')">Delete</button>
                </form>
            @else
                <p>Task ID is missing. Cannot delete this task.</p>
            @endif
            <a href="{{ route('projects.tasks.edit', [$projects['id'], $task['id']]) }}" class="btn">Edit</a>
        </div>
    </div>
</body>
</html>
