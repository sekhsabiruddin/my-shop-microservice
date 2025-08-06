import React, { useState } from "react";
import {
  ShoppingBag,
  MapPin,
  Lock,
  CreditCard,
  MessageCircle,
  Bell,
  Star,
  Settings,
  LogOut,
  Menu,
  X,
  Camera,
  Edit3,
  Save,
  ChevronRight,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Download,
  Package,
  Check,
  Clock,
  Truck,
  User,
} from "lucide-react";
import { UserData } from "../types/type";
const ProfileSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<UserData>({
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, Anytown, ST 12345",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  });

  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "15/01/1990",
    gender: "",
    address: "123 Main Street, Anytown, ST 12345",
  });

  const handleSave = () => {
    setIsEditing(false);
    // Save logic here
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form logic here
  };

  return (
    <div className="bg-gray-900 text-white rounded-2xl shadow-md p-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div className="flex items-center gap-6 mb-6 md:mb-0">
          <div className="relative">
            <img
              src={user.avatar}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border-4 border-[#773d4c]"
            />
            <button className="absolute bottom-0 right-0 bg-[#773d4c] text-white p-2 rounded-full shadow-md hover:opacity-90 transition-opacity">
              <Camera size={14} />
            </button>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">{user.name}</h1>
            <p className="text-gray-400 mt-1">{user.email}</p>
            <div className="flex items-center gap-3 mt-2">
              <span className="px-3 py-1 bg-[#773d4c] text-white text-xs rounded-full font-medium">
                Premium Member
              </span>
              <span className="px-3 py-1 bg-green-600 text-white text-xs rounded-full font-medium flex items-center gap-1">
                <Check size={12} />
                Verified
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center gap-2 px-6 py-3 bg-[#773d4c] text-white rounded-2xl hover:opacity-90 transition-opacity font-medium"
        >
          <Edit3 size={16} />
          {isEditing ? "Cancel Edit" : "Edit Profile"}
        </button>
      </div>

      {/* Personal Information Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-6 h-6 rounded-full border-2 border-[#773d4c] flex items-center justify-center">
            <div className="w-2 h-2 bg-[#773d4c] rounded-full"></div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">
              Personal Information
            </h2>
            <p className="text-gray-400 text-sm">
              Manage your personal details and contact information
            </p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              First Name
            </label>
            {isEditing ? (
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-2xl focus:ring-2 focus:ring-[#773d4c] focus:border-[#773d4c] text-white"
              />
            ) : (
              <div className="px-4 py-3 bg-gray-800 rounded-2xl text-white border border-gray-700">
                {formData.firstName}
              </div>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Last Name
            </label>
            {isEditing ? (
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-2xl focus:ring-2 focus:ring-[#773d4c] focus:border-[#773d4c] text-white"
              />
            ) : (
              <div className="px-4 py-3 bg-gray-800 rounded-2xl text-white border border-gray-700">
                {formData.lastName}
              </div>
            )}
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            {isEditing ? (
              <div className="relative">
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 pl-12 bg-gray-800 border border-gray-700 rounded-2xl focus:ring-2 focus:ring-[#773d4c] focus:border-[#773d4c] text-white"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <User size={16} />
                </div>
              </div>
            ) : (
              <div className="flex items-center px-4 py-3 bg-gray-800 rounded-2xl text-white border border-gray-700">
                <User size={16} className="text-gray-400 mr-3" />
                {formData.email}
              </div>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Phone Number
            </label>
            {isEditing ? (
              <div className="relative">
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-4 py-3 pl-12 bg-gray-800 border border-gray-700 rounded-2xl focus:ring-2 focus:ring-[#773d4c] focus:border-[#773d4c] text-white"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <User size={16} />
                </div>
              </div>
            ) : (
              <div className="flex items-center px-4 py-3 bg-gray-800 rounded-2xl text-white border border-gray-700">
                <User size={16} className="text-gray-400 mr-3" />
                {formData.phone}
              </div>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Date of Birth
            </label>
            {isEditing ? (
              <div className="relative">
                <input
                  type="text"
                  value={formData.dateOfBirth}
                  onChange={(e) =>
                    setFormData({ ...formData, dateOfBirth: e.target.value })
                  }
                  className="w-full px-4 py-3 pl-12 bg-gray-800 border border-gray-700 rounded-2xl focus:ring-2 focus:ring-[#773d4c] focus:border-[#773d4c] text-white"
                  placeholder="DD/MM/YYYY"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <User size={16} />
                </div>
              </div>
            ) : (
              <div className="flex items-center px-4 py-3 bg-gray-800 rounded-2xl text-white border border-gray-700">
                <User size={16} className="text-gray-400 mr-3" />
                {formData.dateOfBirth}
              </div>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Gender
            </label>
            {isEditing ? (
              <select
                value={formData.gender}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-2xl focus:ring-2 focus:ring-[#773d4c] focus:border-[#773d4c] text-white"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            ) : (
              <div className="px-4 py-3 bg-gray-800 rounded-2xl text-gray-400 border border-gray-700">
                {formData.gender || "Select Gender"}
              </div>
            )}
          </div>
        </div>

        {/* Address */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Address
          </label>
          {isEditing ? (
            <div className="relative">
              <textarea
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                className="w-full px-4 py-3 pl-12 bg-gray-800 border border-gray-700 rounded-2xl focus:ring-2 focus:ring-[#773d4c] focus:border-[#773d4c] text-white h-24 resize-none"
                rows={3}
              />
              <div className="absolute left-4 top-4 text-gray-400">
                <MapPin size={16} />
              </div>
            </div>
          ) : (
            <div className="flex items-start px-4 py-3 bg-gray-800 rounded-2xl text-white border border-gray-700">
              <MapPin
                size={16}
                className="text-gray-400 mr-3 mt-1 flex-shrink-0"
              />
              {formData.address}
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      {isEditing && (
        <div className="flex gap-4 justify-end">
          <button
            onClick={handleCancel}
            className="px-6 py-3 border border-gray-600 text-gray-300 rounded-2xl hover:bg-gray-800 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-3 bg-[#773d4c] text-white rounded-2xl hover:opacity-90 transition-opacity font-medium"
          >
            <Save size={16} />
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};
export default ProfileSection;
