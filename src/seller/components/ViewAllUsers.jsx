import React, { useEffect, useState } from "react";
import axios from 'axios'; // or correct path

import toast from "react-hot-toast";

export default function ViewAllUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    phone: "",
    address: "",
    password: "",
  });
  const [showModal, setShowModal] = useState(false);

  axios.defaults.withCredentials = true;

  // ✅ Fetch Users with Pagination
  const fetchUsers = async (p = 1, limit = 50) => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/admin/users?page=${p}&limit=${limit}`);
      setUsers(res.data.users || []);
      setPage(res.data.currentPage);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      toast.error("Failed to fetch users");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers(1, 50); // Load first page
  }, []);

  // ✅ Handle Pagination
  const handlePrev = () => {
    if (page > 1) fetchUsers(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) fetchUsers(page + 1);
  };

  // ✅ Edit Modal Functions
  const handleEdit = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone || "",
      address: user.address || "",
      password: "",
    });
    setShowModal(true);
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleUpdate = async () => {
    try {
      await axios.patch(`/api/admin/users/${selectedUser.id}`, formData);
      toast.success("✅ User updated successfully!");
      setShowModal(false);
      fetchUsers(page); // Reload current page
    } catch (err) {
      toast.error("❌ Failed to update user");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("⚠️ Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`/api/admin/users/${id}`);
      toast.success("✅ User deleted");
      fetchUsers(page);
    } catch (err) {
      toast.error("❌ Failed to delete user");
    }
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-800";
      case "seller":
        return "bg-blue-100 text-blue-800";
      case "customer":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex md:flex-row flex-col md:items-center md:justify-between ">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">User Management</h2>
              <p className="text-gray-600 mt-1">
                Manage all system users and their permissions
              </p>
            </div>
            <div className="bg-blue-50 px-4 py-2 rounded-lg">
              <span className="text-green-600 font-semibold">
                {users.length} Users (Page {page} / {totalPages})
              </span>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="text-gray-600 font-medium">Loading users...</span>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {users.length > 0 ? (
    users.map((u) => (
      <div
        key={u.id}
        className="bg-white border rounded-lg shadow-sm p-4 flex flex-col justify-between"
      >
        {/* Header */}
        <div className="flex items-center mb-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-600 to-white-500 flex items-center justify-center text-white font-semibold">
            {u.name.charAt(0).toUpperCase()}
          </div>
          <div className="ml-3">
            <p className="font-semibold text-gray-900">{u.name}</p>
            <p className="text-xs text-gray-500 truncate overflow-hidden whitespace-nowrap max-w-[150px]">
            {u.email}
          </p>

          </div>
        </div>

        {/* Role */}
        <div className="mb-3">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeColor(
              u.role
            )}`}
          >
            {u.role.charAt(0).toUpperCase() + u.role.slice(1)}
          </span>
        </div>

        {/* Contact Info */}
        <div className="text-sm text-gray-700 mb-3">
          <p className="font-medium">📞 {u.phone || "—"}</p>
          <p className="text-gray-500 truncate">{u.address || "No address"}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-auto">
          <button
            onClick={() => handleEdit(u)}
            className="flex-1 px-3 py-1.5 border border-gray-300 rounded-md bg-white hover:bg-gray-50 text-sm cursor-pointer"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(u.id)}
            className="flex-1 px-3 py-1.5 border border-red-300 rounded-md text-red-700 bg-red-50 hover:bg-red-100 text-sm cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    ))
  ) : (
    <p className="text-center col-span-full text-gray-500 py-8">
      No users found.
    </p>
  )}
</div>

              {/* ✅ Pagination Controls */}
              <div className="flex justify-between items-center p-4 border-t">
                <button
                  disabled={page === 1}
                  onClick={handlePrev}
                  className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                  ⬅ Prev
                </button>

                <span className="text-sm">
                  Page {page} of {totalPages}
                </span>

                <button
                  disabled={page === totalPages}
                  onClick={handleNext}
                  className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                  Next ➡
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

            {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-40 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Edit User</h3>

            <div className="space-y-3">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full border p-2 rounded"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full border p-2 rounded"
              />
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="admin">Admin</option>
                <option value="seller">Seller</option>
                <option value="customer">Customer</option>
              </select>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                className="w-full border p-2 rounded"
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="New Password (optional)"
                className="w-full border p-2 rounded"
              />
            </div>

            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
