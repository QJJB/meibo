<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Edit Task</title>
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
        <h1>Edit Task</h1>
    </header>
    <div class="container">
        <a href="{{ url()->previous() }}" class="btn btn-secondary">Back</a>
        <form action="{{ route('projects.tasks.update', [$projects->id, $task->id]) }}" method="POST" style="margin-top: 20px;">
            @csrf
            @method('PUT')

            <div class="form-group">
                <label for="title">Task Title:</label>
                <input type="text" class="form-control" id="title" name="title" value="{{ old('title', $task->title) }}" required>
            </div>

            <div class="form-group">
                <label for="description">Description:</label>
                <textarea class="form-control" id="description" name="description" rows="4" required>{{ old('description', $task->description) }}</textarea>
            </div>

            <div class="form-group">
                <label for="due_date">Due Date:</label>
                <input type="date" class="form-control" id="due_date" name="due_date" value="{{ old('due_date', $task->due_date) }}" required>
            </div>

            <div class="form-group">
                <label for="type">Type:</label>
                <select class="form-control" id="type" name="type" required>
                    <option value="task" {{ old('type', $task->type) == 'task' ? 'selected' : '' }}>Task</option>
                    <option value="event" {{ old('type', $task->type) == 'event' ? 'selected' : '' }}>Event</option>
                </select>
            </div>

            <div class="form-group">
                <label for="priority">Priority:</label>
                <select class="form-control" id="priority" name="priority" required>
                    <option value="1" {{ old('priority', $task->priority) == 1 ? 'selected' : '' }}>Low</option>
                    <option value="2" {{ old('priority', $task->priority) == 2 ? 'selected' : '' }}>Medium</option>
                    <option value="3" {{ old('priority', $task->priority) == 3 ? 'selected' : '' }}>High</option>
                </select>
            </div>

            <div class="form-group">
                <label for="status">Status:</label>
                <select class="form-control" id="status" name="status" required>
                    <option value="todo" {{ old('status', $task->status) == 'todo' ? 'selected' : '' }}>To Do</option>
                    <option value="in_progress" {{ old('status', $task->status) == 'in_progress' ? 'selected' : '' }}>In Progress</option>
                    <option value="done" {{ old('status', $task->status) == 'done' ? 'selected' : '' }}>Done</option>
                </select>
            </div>

            <div class="form-group">
                <label for="user">Assigned User:</label>
                <select class="form-control" id="user" name="user_id" required>
                    <option value="no user found">No user</option>
                    @foreach($users as $user)
                        <option value="{{ $user->id }}" {{ old('user_id', $task->user_id) == $user->id ? 'selected' : '' }}>
                            {{ $user->name }}
                        </option>
                    @endforeach
                </select>
            </div>

            <button type="submit" class="btn">Save Changes</button>
        </form>
    </div>
</body>
</html>
