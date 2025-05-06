<!-- filepath: c:\Users\Quuee\OneDrive - Enseignement de la Province de Liège\Bureau\meibo\resources\views\editproject.blade.php -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Permission</title>
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
    <h1>Permissions Project</h1>
</header>
<div class="container">

    @foreach($roles as $role)
        <h2>Role: {{ $role->name }}</h2>
        @if($role->permissions->isEmpty())
            <p>Pas de permissions pour ce rôle.</p>
        @else
            @foreach($role->permissions as $permission)
                <p>Permission: {{ $permission->name }}</p>
                <p>Pivot Role ID: {{ $permission->id }}</p>
                <form action="{{ route('projects.permissions.destroy', ['project' => $projects, 'permission' => $permission->id, 'roles' => $role]) }}" method="POST" style="display:inline;">
                    @csrf
                    @method('DELETE')
                    <button type="submit">Delete</button>
                </form>
            @endforeach
        @endif
        <br>


        <form action="{{ route('projects.permissions.store', ['project' => $projects, 'roles' => $role->id]) }}" method="POST" style="display:inline;">
            @csrf
            @method('POST')
            <label for="pet-select">Choose a permission</label>
            <select name="permission_id" id="permission-select-{{ $role->id }}">
                @foreach($permissions as $permission)
                    <option value="{{ $permission->id }}">{{ $permission->name }}</option>
                @endforeach
            </select>

            <button type="submit">Add permissions</button>
        </form>


    @endforeach


</div>
</body>
</html>
