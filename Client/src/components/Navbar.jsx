function Navbar({ user, onLogout }) {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Task Manager</h1>
          <p className="text-sm text-gray-600">
            {user?.firstName} {user?.lastName} - {user?.accountType}
          </p>
        </div>

        <button
          onClick={onLogout}
          className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 sm:w-auto"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;
