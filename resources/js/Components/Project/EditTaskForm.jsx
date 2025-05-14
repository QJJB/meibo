import InputError from "@/Components/Form/InputError";
import InputLabel from "@/Components/Form/InputLabel";
import PrimaryButton from "@/Components/Form/PrimaryButton";
import TextInput from "@/Components/Form/TextInput";
import { useForm } from "@inertiajs/react";

function EditTaskForm({ task, users, roles, onClose, onSuccess }) {
  const { data, setData, put, processing, errors } = useForm({
    title: task.title || "",
    type: task.type || "task",
    description: task.description || "",
    due_date: task.due_date || "",
    priority: String(task.priority || "1"),
    status: task.status || "todo",
    user_ids: task.assignees ? task.assignees.map(u => u.id) : [],
    role_ids: task.roles ? task.roles.map(r => r.id) : [],
    project_id: task.project_id,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route("projects.tasks.update", { project: task.project_id, task: task.id }), {
      onSuccess: () => {
        if (onSuccess) onSuccess();
        if (onClose) onClose();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <InputLabel htmlFor="title" value="Task Title" />
        <TextInput
          id="title"
          name="title"
          value={data.title}
          className="bg-[#172227] h-15 w-full rounded-xl focus:border-[#B5B5B8] focus:ring-2 focus:ring-[#B5B5B8]"
          autoComplete="title"
          onChange={(e) => setData("title", e.target.value)}
          required
        />
        <InputError message={errors.title} className="mt-2" />
      </div>

      <div>
        <InputLabel htmlFor="description" value="Description" />
        <textarea
          id="description"
          name="description"
          value={data.description}
          className="bg-[#172227] h-15 w-full rounded-xl p-3 text-white focus:border-[#B5B5B8] focus:ring-2 focus:ring-[#B5B5B8]"
          onChange={(e) => setData("description", e.target.value)}
        />
        <InputError message={errors.description} className="mt-2" />
      </div>

      <div>
        <InputLabel htmlFor="due_date" value="Due Date" />
        <TextInput
          id="due_date"
          type="date"
          name="due_date"
          value={data.due_date}
          className="bg-[#172227] h-15 w-full rounded-xl focus:border-[#B5B5B8] focus:ring-2 focus:ring-[#B5B5B8]"
          onChange={(e) => setData("due_date", e.target.value)}
          required
        />
        <InputError message={errors.due_date} className="mt-2" />
      </div>

      <div>
        <InputLabel htmlFor="priority" value="Priority" />
        <select
          id="priority"
          name="priority"
          value={data.priority}
          className="bg-[#172227] h-15 w-full rounded-xl p-3 text-white"
          onChange={(e) => setData("priority", e.target.value)}
          required
        >
          <option value="1">Low</option>
          <option value="2">Medium</option>
          <option value="3">High</option>
        </select>
        <InputError message={errors.priority} className="mt-2" />
      </div>

      <div>
        <InputLabel htmlFor="status" value="Status" />
        <select
          id="status"
          name="status"
          value={data.status}
          className="bg-[#172227] h-15 w-full rounded-xl p-3 text-white"
          onChange={(e) => setData("status", e.target.value)}
          required
        >
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <InputError message={errors.status} className="mt-2" />
      </div>

      <div>
        <InputLabel htmlFor="user_ids" value="Assigned Users" />
        <div className="bg-[#172227] p-3 rounded-xl">
          {users.map((user) => (
            <div key={user.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={`user-${user.id}`}
                value={user.id}
                checked={data.user_ids.includes(user.id)}
                onChange={(e) => {
                  const userId = parseInt(e.target.value);
                  setData("user_ids", e.target.checked
                    ? [...data.user_ids, userId]
                    : data.user_ids.filter((id) => id !== userId)
                  );
                }}
                className="text-[#B5B5B8] focus:ring-[#B5B5B8]"
              />
              <label htmlFor={`user-${user.id}`} className="text-white">
                {user.name}
              </label>
            </div>
          ))}
        </div>
        <InputError message={errors.user_ids} className="mt-2" />
      </div>

      <div>
        <InputLabel htmlFor="role_ids" value="Assigned Roles" />
        <div className="bg-[#172227] p-3 rounded-xl">
          {roles
            .filter((role) => role.name !== "admin" && role.name !== "guest")
            .map((role) => (
              <div key={role.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`role-${role.id}`}
                  value={role.id}
                  checked={data.role_ids.includes(role.id)}
                  onChange={(e) => {
                    const roleId = parseInt(e.target.value);
                    setData("role_ids", e.target.checked
                      ? [...data.role_ids, roleId]
                      : data.role_ids.filter((id) => id !== roleId)
                    );
                  }}
                  className="text-[#B5B5B8] focus:ring-[#B5B5B8]"
                />
                <label htmlFor={`role-${role.id}`} className="text-white">
                  {role.name}
                </label>
              </div>
            ))}
        </div>
        <InputError message={errors.role_ids} className="mt-2" />
      </div>

      <div className="mt-4 flex items-center justify-end">
        <PrimaryButton
          className="ms-4 bg-[#FFFF] text-black hover:bg-[#172227] hover:text-white transition duration-300"
          disabled={processing}
        >
          {processing ? "Modification en cours..." : "Modifier la tâche"}
        </PrimaryButton>
      </div>
    </form>
  );
}

export default EditTaskForm
