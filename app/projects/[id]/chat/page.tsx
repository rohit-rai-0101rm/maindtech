"use client";

import { useParams } from "next/navigation";
import { projects } from "@/data/projects";
import Link from "next/link";

export default function ProjectChatPage() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="p-6 text-center text-gray-500">Project not found.</div>
    );
  }

  const chatList = project.chatHistory ?? [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6">
        {project.title} – Chats
      </h1>

      {chatList.length === 0 ? (
        <div className="text-gray-500 dark:text-gray-400 text-center">
          No chats found for this project.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {chatList.map((chat) => (
            <Link
              key={chat.id}
              href={`/projects/${project.id}/chat/${chat.id}`}
              className="block bg-white dark:bg-gray-800 hover:shadow-lg rounded-xl p-4 transition duration-200 border border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
                Chat #{chat.id}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                {chat.messages?.[0]?.content || "No messages yet."}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
