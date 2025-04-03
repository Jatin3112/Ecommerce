import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { jwtDecode } from "jwt-decode";
const socket = io("http://localhost:4000");

const ChatSidePanel = ({ isOpen, onClose }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers();

    const token = localStorage.getItem("token");
    if (!token) return;
    const userId = jwtDecode(token).id;
    socket.emit("user_connected", userId);

    socket.emit("check_user_status", userId);

    users.map((user) => {
      socket.emit("check_user_status", user._id);
      socket.on("user_status", ({ userId, isOnline }) => {
        if (userId === user._id) {
          user.status = isOnline ? "online" : "offline";
        }
      });
    });

    socket.on("user_status_changed", ({ userId, status }) => {
      const user = users.find((user) => user._id === userId);
      if (user) {
        user.status = status;
      }
    });

    return () => {
      socket.off("user_status_changed");
      socket.off("user_status_result");
    };
  }, []);

  const getUsers = async () => {
    const response = await fetch("http://localhost:4000/api/user/users");
    const data = await response.json();
    setUsers(data.users);
  };

  const UsersList = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Messages</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        {users.map((user) => (
          <div
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className="flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer border-b"
          >
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                {user.name
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .toUpperCase()}
              </div>
              <span
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                  user.status === "online" ? "bg-green-500" : "bg-gray-400"
                }`}
              ></span>
            </div>
            <div>
              <h3 className="font-medium">{user.name}</h3>
              <p className="text-sm text-gray-500">Click to start chatting</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ChatView = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 p-4 border-b">
        <button
          onClick={() => setSelectedUser(null)}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
          A
        </div>
        <div>
          <h3 className="font-medium">{selectedUser.name}</h3>
          <p className="text-sm text-gray-500">{selectedUser.status}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {/* Example static messages */}
        <div className="space-y-4">
          <div className="flex justify-end">
            <div className="bg-blue-500 text-white rounded-lg p-3 max-w-[70%]">
              Hey, how are you?
            </div>
          </div>
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-3 max-w-[70%]">
              I'm doing great! Thanks for asking.
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 border-t">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className={`fixed right-0 top-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Chat With Friends</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Chat Content */}
      <div className="flex flex-col h-[calc(100%-8rem)]">
        {selectedUser ? <ChatView /> : <UsersList />}
      </div>
    </div>
  );
};

export default ChatSidePanel;
