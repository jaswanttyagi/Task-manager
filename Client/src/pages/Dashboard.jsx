import { useCallback, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import EditTaskModal from "../components/EditTaskModal";
import { createTask, deleteTask, getTasks, updateTask } from "../services/taskAPI";
import { logoutUser } from "../services/authAPI";

function Dashboard({ user, token, onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadTasks = useCallback(async () => {
    setError("");
    setLoading(true);

    try {
      // Admin gets all tasks from backend, User gets only own tasks.
      const data = await getTasks(token);
      setTasks(data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load tasks.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const handleCreateTask = async (taskData) => {
    setMessage("");
    setError("");

    try {
      await createTask(taskData, token);
      setMessage("Task created successfully.");
      loadTasks();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to create task.");
    }
  };

  const handleUpdateTask = async (taskId, taskData) => {
    setMessage("");
    setError("");

    try {
      await updateTask(taskId, taskData, token);
      setSelectedTask(null);
      setMessage("Task updated successfully.");
      loadTasks();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to update task.");
    }
  };

  const handleDeleteTask = async (taskId) => {
    setMessage("");
    setError("");

    try {
      await deleteTask(taskId, token);
      setMessage("Task deleted successfully.");
      loadTasks();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to delete task.");
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
    } finally {
      onLogout();
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar user={user} onLogout={handleLogout} />

      <main className="mx-auto max-w-6xl px-4 py-6">
        <section className="rounded-md border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">
            Welcome, {user?.firstName || "User"}
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            You are logged in as {user?.accountType}. Manage your tasks below.
          </p>
        </section>

        {message && (
          <p className="mt-4 rounded-md bg-green-50 p-3 text-sm text-green-700">{message}</p>
        )}
        {error && (
          <p className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p>
        )}

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <TaskForm onCreateTask={handleCreateTask} />

            {user?.accountType === "Admin" && (
              <p className="mt-3 text-sm text-gray-600">
                Admin tasks are visible only to Admin.
              </p>
            )}
          </div>

          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Tasks</h2>
              <span className="text-sm text-gray-500">{tasks.length} total</span>
            </div>

            {loading ? (
              <p className="rounded-md border border-gray-200 p-5 text-sm text-gray-600">
                Loading tasks...
              </p>
            ) : tasks.length === 0 ? (
              <p className="rounded-md border border-gray-200 p-5 text-sm text-gray-600">
                No tasks found.
              </p>
            ) : (
              <div className="space-y-4">
                {tasks.map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    user={user}
                    onEdit={setSelectedTask}
                    onDelete={handleDeleteTask}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {selectedTask && (
        <EditTaskModal
          task={selectedTask}
          onSave={handleUpdateTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </div>
  );
}

export default Dashboard;
