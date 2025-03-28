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
    <h1>New task</h1>
    <a href="../../home">Home</a>
<form action="" method="POST">
    @csrf <!-- CSRF protection -->

    <!-- Task Title -->
    <label for="title">Task Title:</label> <br>
    <input type="text" id="title" name="title" required>
    <br> <br>

    <!-- Description -->
    <label for="description">Description:</label> <br>
    <textarea id="description" name="description" required></textarea>
    <br> <br>

    <!-- Due Date -->
    <label for="due_date">Due Date:</label> <br>
    <input type="date" id="due_date" name="due_date" required>
    <br> <br>

    <!-- Type -->
    <label for="type">Type:</label>
    <select id="type" name="type" required>
        <option value="task">Task</option>
        <option value="event">Event</option>
    </select>
    <br> <br>
    <!-- Priority -->
    <label for="priority">Priority:</label>
    <select id="priority" name="priority" required>
        <option value="1">Low</option>
        <option value="2">Medium</option>
        <option value="3">High</option>
    </select>
    <br> <br>

    <!-- Status -->
    <label for="status">Status:</label>
    <select id="status" name="status" required>
        <option value="todo">To Do</option>
        <option value="in_progress">In Progress</option>
        <option value="done">Done</option>
    </select>
    <br> <br>

    <!-- Assigned User -->
    <label for="user">Assigned User:</label>
    <select id="user" name="user_id" required>
        <option value="no user found">No user</option>
        @foreach($users as $user)
            <option value="{{$user->id}}">{{$user->name}}</option>
        @endforeach
    </select>
    <br> <br>


    <!-- Role -->
    <label for="role">Role:</label>
    <select id="role" name="role">
        <option value="admin">Admin</option>
        <option value="editor">Editor</option>
        <option value="viewer">Viewer</option>
    </select>
    <br> <br>

    <!-- Notification -->
    <label for="notification">Notification:</label>
    <input type="checkbox" id="notification" name="notification">
    <br> <br>

    <label for="message">Notification Message:</label> <br>
    <input type="date" id="due_date" name="due_date" required> <br>
    <textarea id="message" name="message"></textarea>
    <br> <br>

    <!-- Submit Button -->
    <button type="submit">Add Task</button>
</form>

</body>
</html>
