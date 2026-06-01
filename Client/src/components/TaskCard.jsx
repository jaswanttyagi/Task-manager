function TaskCard({ task, user, onEdit, onDelete }) {
  const createdDate = task.createdAt
    ? new Date(task.createdAt).toLocaleDateString()
    : "Not available";

  const canEdit = user?.accountType === "User";

  return (
    <div className="rounded-md border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-base font-semibold text-gray-900">{task.title}</h3>
          <p className="mt-1 text-sm text-gray-600">{task.description || "No description added."}</p>
          <p className="mt-3 text-xs text-gray-500">Created: {createdDate}</p>
        </div>

        <div className="flex gap-2">
          {canEdit && (
            <button
              onClick={() => onEdit(task)}
              className="rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
            >
              Edit
            </button>
          )}

          <button
            onClick={() => onDelete(task._id)}
            className="rounded-md bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
