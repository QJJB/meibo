<!-- filepath: c:\Users\Quuee\OneDrive - Enseignement de la Province de Liège\Bureau\meibo\resources\views\editproject.blade.php -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Edit Project</title>
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

        .form-group {
            margin-bottom: 15px;
        }

        label {
            font-weight: bold;
            display: block;
            margin-bottom: 5px;
        }

        .form-control {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
            box-sizing: border-box;
        }

        .form-control:focus {
            border-color: #007BFF;
            outline: none;
            box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
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
            border: none;
            cursor: pointer;
        }

        .btn:hover {
            background-color: #0056b3;
        }

        .btn-secondary {
            background-color: #6c757d;
        }

        .btn-secondary:hover {
            background-color: #5a6268;
        }
    </style>
</head>
<body>
    <header>
        <h1>Edit Project</h1>
    </header>
    <div class="container">
        <a href="{{ url()->previous() }}" class="btn btn-secondary">Back</a>
        <form action="{{ route('projects.update', $projects->id) }}" method="POST" style="margin-top: 20px;">
            @csrf
            @method('PUT')

            <div class="form-group">
                <label for="name">Nom du projet:</label>
                <input type="text" class="form-control" id="name" name="name" value="{{ old('name', $projects->name) }}">
            </div>

            <div class="form-group">
                <label for="description">Description:</label>
                <textarea class="form-control" id="description" name="description" rows="4">{{ old('description', $projects->description) }}</textarea>
            </div>

            <div class="form-group">
                <label for="start_date">Date de début:</label>
                <input type="date" class="form-control" id="start_date" name="start_date" value="{{ old('start_date', $projects->start_date) }}">
            </div>

            <div class="form-group">
                <label for="end_date">Date de fin:</label>
                <input type="date" class="form-control" id="end_date" name="end_date" value="{{ old('end_date', $projects->end_date) }}">
            </div>

            <button type="submit" class="btn">Save Changes</button>
        </form>
    </div>
</body>
</html>
