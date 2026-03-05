import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import UserAvatar from "../../components/UserAvatar";
import {
  LuUserPlus,
  LuSearch,
  LuSquarePen, // <-- REPLACE LuEdit
  LuTrash2,
  LuEye,
  LuUsers,
  LuFileText,
  LuShield,
  LuHouse, // ✅ NEW
  LuArrowUp,    // ✅ NEW - Promote arrow
  LuArrowDown,  // ✅ NEW - Demote arrow

} from "react-icons/lu";

import Modal from "../../components/Modal";
import EditUserModal from "./EditUserModal";
import DeleteUserModal from "./DeleteUserModal";
import CreateUserModal from "./CreateUserModal";
import Pagination from "../../components/Admin/Pagination";
import toast from "react-hot-toast";
import moment from "moment";

const AdminDashboard = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAdmins: 0,
    totalResumes: 0,
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: 1,
    perPage: 15,
    total: 0,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [togglingRoleId, setTogglingRoleId] = useState(null); // ✅ NEW - track which user is being toggled

  // Modal states
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Redirect if not admin
  useEffect(() => {
    if (user && user.role !== "admin") {
      toast.error("Access denied. Admin only.");
      navigate("/dashboard");
    }
  }, [user, navigate]);

  // Fetch all users
  const fetchUsers = async (page = 1, search = "") => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(API_PATHS.ADMIN.GET_ALL_USERS, {
        params: {
          page,
          per_page: 15,
          search,
        },
      });

      setUsers(response.data.users);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  // Fetch stats
  const fetchStats = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.ADMIN.GET_STATS);
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  //Promotion-Demotion feature
  // ✅ NEW: Handle Promote/Demote
  const handleToggleRole = async (targetUser) => {
    // ✅ Confirm if demoting self
    if (targetUser._id === user._id) {
      const confirmSelf = window.confirm(
        `⚠️ You are about to ${targetUser.role === 'admin' ? 'DEMOTE' : 'PROMOTE'} YOUR OWN account! Are you sure?`
      );
      if (!confirmSelf) return;
    }

    try {
      setTogglingRoleId(targetUser._id);

      const response = await axiosInstance.put(
        API_PATHS.ADMIN.TOGGLE_ROLE(targetUser._id)
      );

      const newRole = response.data.newRole;

      // ✅ Update the user in local state instantly (no refetch needed)
      setUsers((prev) =>
        prev.map((u) =>
          u._id === targetUser._id ? { ...u, role: newRole } : u
        )
      );

      // ✅ Refresh stats too
      fetchStats();

      toast.success(
        `${targetUser.name} has been ${newRole === 'admin' ? '⬆️ promoted to Admin' : '⬇️ demoted to User'}!`
      );

    } catch (error) {
      console.error("Error toggling role:", error);
      toast.error("Failed to update role. Please try again.");
    } finally {
      setTogglingRoleId(null);
    }
  };

  // Handle search
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    fetchUsers(1, query);
  };

  // Handle page change
  const handlePageChange = (page) => {
    fetchUsers(page, searchQuery);
  };

  // Handle edit user
  const handleEditUser = (user) => {
    setSelectedUser(user);
    setOpenEditModal(true);
  };

  // Handle delete user
  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setOpenDeleteModal(true);
  };

  // Handle view user resumes
  const handleViewResumes = (userId) => {
    navigate(`/admin/users/${userId}/resumes`);
  };

  // Refresh data after create/edit/delete
  const handleDataChange = () => {
    fetchUsers(pagination.currentPage, searchQuery);
    fetchStats();

    // ✅ Force image cache clear
  const images = document.querySelectorAll('img[alt*="Profile"]');
  images.forEach(img => {
    const src = img.src.split('?')[0]; // Remove old timestamp
    img.src = `${src}?t=${Date.now()}`; // Add new timestamp
  });
  };

  useEffect(() => {
    if (user && user.role === "admin") {
      fetchUsers();
      fetchStats();
    }
  }, [user]);

  // if (!user || user.role !== "admin") {
  //   return null; // Don't render anything if not admin
  // }
   if (loading) return null;




  return (
    <DashboardLayout>
      {/* Admin Header with gradient */}
      <div className="px-4 md:px-6 lg:px-10 pt-8">
        <div
          className="bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 
                      rounded-2xl p-6 shadow-lg text-white relative overflow-hidden"
        >
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>

          <div className="relative z-10 flex items-center justify-between flex-wrap gap-4">
            <div>
    {/* ✅ Title and Badge in same line */}
    <div className="flex items-center gap-3">
      <h1
        className="text-2xl md:text-3xl font-bold tracking-tight"
        style={{ fontFamily: "Bahnschrift, sans-serif" }}
      >
        Admin Dashboard
      </h1>
      
      <span
        className="bg-white/20 backdrop-blur-md border border-white/30
                   px-3 py-1 rounded-full text-xm font-semibold"
      >
        ✨ Admin Access 
      </span>
    </div>
    
    {/* ✅ Subtitle below */}
    <p
      className="text-sm md:text-base text-white/80 mt-1"
      style={{ fontFamily: "Bahnschrift, sans-serif" }}
    >
      Manage users and their resumes
    </p>
  </div>
          {/* </div>
        </div>
      </div> */}

     

     {/*New buttons*/}
     {/* ✅ NEW: Back to Home Page Button */}
            <button
              onClick={() => navigate("/")}
              className="bg-white/20 backdrop-blur-md border border-white/30
                         hover:bg-white/30 px-4 py-2 rounded-full text-sm font-semibold
                         flex items-center gap-2 transition-all"
            >
              <LuHouse className="text-lg" />
              Back to Home Page
            </button>
          </div>
        </div>
      </div>


      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-6 lg:px-10 pt-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Users</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-1">
                {stats.totalUsers}
              </h3>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <LuUsers className="text-2xl text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Admins</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-1">
                {stats.totalAdmins}
              </h3>
            </div>
            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
              <LuShield className="text-2xl text-teal-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Resumes</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-1">
                {stats.totalResumes}
              </h3>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <LuFileText className="text-2xl text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* User Management Section */}
      <div className="px-4 md:px-6 lg:px-10 pt-6 pb-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          {/* Table Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <h2 className="text-lg font-semibold text-gray-800">
                User Management
              </h2>

              <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
                {/* Search */}
                <div className="relative w-full md:w-64">
                  <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                {/* Create User Button */}
                <button
                  onClick={() => setOpenCreateModal(true)}
                  className="btn-small bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 w-full md:w-auto justify-center"
                >
                  <LuUserPlus className="text-lg" />
                  Create User
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
              </div>
            ) : users.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                <LuUsers className="text-4xl mb-2" />
                <p>No users found</p>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Name
                    </th>
                    {/* Promotion Demotion Feature */}
                    {/* ✅ NEW COLUMN */}
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Promote/Demote
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Resumes
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr
                      key={user._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user._id}
                      </td>
                      {/* <td className="px-6 py-4 whitespace-nowrap">    correcting non image profiles
                        <div className="flex items-center">
                          <img
                            src={
                              user.profileImageUrl ||
                              "https://via.placeholder.com/40"
                            }
                            alt={user.name}
                            className="w-8 h-8 rounded-full mr-3 object-cover"
                          />
                          <span className="text-sm font-medium text-gray-900">
                            {user.name}
                          </span>
                        </div>
                      </td> */}

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {/* ✅ Use UserAvatar component */}
                          <div className="mr-3">
                              <UserAvatar user={user} size="sm" />
                              
                          </div>
                          <span className="text-sm font-medium text-gray-900">
                            {user.name}
                          </span>
                        </div>
                      </td>





                      {/* Promotion/Demotion Buttons */}
                      {/* ✅ NEW: Promote/Demote Cell - ADD THIS RIGHT HERE */}
      <td className="px-6 py-4 whitespace-nowrap">
        {user.role === "user" ? (
          <button
            onClick={() => handleToggleRole(user)}
            disabled={togglingRoleId === user._id}
            title={`Promote ${user.name} to Admin`}
            className="flex items-center gap-1 bg-green-100 hover:bg-green-200 
                       text-green-700 px-3 py-1.5 rounded-lg text-xs font-semibold 
                       transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {togglingRoleId === user._id ? (
              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-green-700"></div>
            ) : (
              <LuArrowUp className="text-sm" />
            )}
            Promote
          </button>
        ) : (
          <button
            onClick={() => handleToggleRole(user)}
            disabled={togglingRoleId === user._id}
            title={`Demote ${user.name} to User`}
            className="flex items-center gap-1 bg-red-100 hover:bg-red-200 
                       text-red-700 px-3 py-1.5 rounded-lg text-xs font-semibold 
                       transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {togglingRoleId === user._id ? (
              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-red-700"></div>
            ) : (
              <LuArrowDown className="text-sm" />
            )}
            Demote
          </button>
        )}
      </td>





                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.role === "admin"
                              ? "bg-teal-100 text-teal-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {user.resumeCount || 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {moment(user.createdAt).format("MMM DD, YYYY")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleViewResumes(user._id)}
                            className="text-teal-600 hover:text-teal-800 p-1.5 hover:bg-teal-50 rounded transition-colors"
                            title="View Resumes"
                          >
                            <LuEye className="text-lg" />
                          </button>
                          <button
                            onClick={() => handleEditUser(user)}
                            className="text-blue-600 hover:text-blue-800 p-1.5 hover:bg-blue-50 rounded transition-colors"
                            title="Edit User"
                          >
                            <LuSquarePen className="text-lg" />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user)}
                            className="text-red-600 hover:text-red-800 p-1.5 hover:bg-red-50 rounded transition-colors"
                            title="Delete User"
                          >
                            <LuTrash2 className="text-lg" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          {!loading && users.length > 0 && (
            <div className="p-6 border-t border-gray-200">
              <Pagination
                currentPage={pagination.currentPage}
                lastPage={pagination.lastPage}
                onPageChange={handlePageChange}
                total={pagination.total}
                perPage={pagination.perPage}
              />
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <Modal
        isOpen={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        title="Create New User"
      >
        <CreateUserModal
          onClose={() => setOpenCreateModal(false)}
          onSuccess={handleDataChange}
        />
      </Modal>

      <Modal
        isOpen={openEditModal}
        onClose={() => setOpenEditModal(false)}
        title="Edit User"
      >
        <EditUserModal
          user={selectedUser}
          onClose={() => setOpenEditModal(false)}
          onSuccess={handleDataChange}
        />
      </Modal>

      <Modal
        isOpen={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        hideHeader
      >
        <DeleteUserModal
          user={selectedUser}
          onClose={() => setOpenDeleteModal(false)}
          onSuccess={handleDataChange}
        />
      </Modal>
    </DashboardLayout>
  );
};

export default AdminDashboard;

