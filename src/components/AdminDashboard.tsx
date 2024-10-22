// components/AdminDashboard.tsx
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { User, UserStatus } from "../models/user";
import { AuthContext } from "../contexts/AuthContext";
import Unauthorized from "./Unauthorized";

const AdminDashboard: React.FC = () => {
  const [vendors, setVendors] = useState<User[]>([]);
  const { user, token } = useContext(AuthContext);

  if (user?.role !== "admin") {
    return <Unauthorized />;
  }

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async (): Promise<void> => {
    try {
      const response = await axios.get<User[]>(
        "http://localhost:8080/api/v1/vendors",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setVendors(response.data);
    } catch (error) {
      console.error("Error fetching vendors:", error);
    }
  };

  const handleApprove = async (id: number): Promise<void> => {
    try {
      await axios.put(
        `http://localhost:8080/api/v1/users/${id}/approve`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchVendors();
    } catch (error) {
      console.error('Error approving vendor:', error);
    }
  };

  const handleReject = async (id: number): Promise<void> => {
    try {
      await axios.put(`http://localhost:8080/api/v1/users/${id}/reject`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchVendors();
    } catch (error) {
      console.error('Error rejecting vendor:', error);
    }
  };

  const handleDelete = async (id: number): Promise<void> => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchVendors();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Vendor Management</h3>
        </div>
        <div className="border-t border-gray-200">
          <ul className="divide-y divide-gray-200">
            {vendors.map((vendor) => (
              <li key={vendor.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-gray-900">{vendor.name}</div>
                  <div className="text-sm text-gray-500">{vendor.status}</div>
                </div>
                <div className="mt-2 flex space-x-2">
                  {vendor.status === UserStatus.PENDING && (
                    <>
                      <button
                        onClick={() => handleApprove(vendor.id)}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-xs"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(vendor.id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => handleDelete(vendor.id)}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded text-xs"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;