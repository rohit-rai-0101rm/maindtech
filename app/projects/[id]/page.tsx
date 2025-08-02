import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import {
  FileText,
  MessageCircle,
  ArrowRight,
  Download,
  Eye,
  Pencil,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: {
    id: string;
  };
}

export default function ProjectDetailPage({ params }: PageProps) {
  const project = projects.find((p) => p.id === params.id);
  if (!project) return notFound();

  return (
    <main className="min-h-screen bg-white text-gray-900 px-4 py-10 sm:px-6 lg:px-24">
      {/* Header */}
      <div className="space-y-4 mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          {project.name}
        </h1>
        <p className="text-gray-600 text-base sm:text-lg max-w-3xl">
          {project.description}
        </p>

        {/* Stats */}
        <div className="flex flex-wrap gap-3 mt-3">
          <div className="flex items-center gap-2 px-4 py-1.5 bg-gray-100 rounded-full text-sm text-gray-700">
            <FileText className="w-4 h-4" />
            {project.files.length}{" "}
            {project.files.length === 1 ? "File" : "Files"}
          </div>
          <div className="flex items-center gap-2 px-4 py-1.5 bg-gray-100 rounded-full text-sm text-gray-700">
            <MessageCircle className="w-4 h-4" />
            {project.chatHistory.length}{" "}
            {project.chatHistory.length === 1 ? "Chat" : "Chats"}
          </div>
        </div>

        {/* Link to Chat Page */}
        <Link
          href={`/projects/${project.id}/chat`}
          className="inline-flex items-center gap-2 text-blue-600 text-sm font-medium hover:underline group mt-2"
        >
          Go to Chat Page
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 mb-10" />

      {/* Files Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Project Files</h2>

        {project.files.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {project.files.map((file) => (
              <div
                key={file.id}
                className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                {/* File Name */}
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-medium text-lg text-gray-900 truncate">
                    {file.name}
                  </h3>
                </div>

                {/* Content Preview */}
                <pre className="text-sm text-gray-600 whitespace-pre-wrap line-clamp-4 mb-4">
                  {file.content}
                </pre>

                {/* Tool Links */}
                <div className="flex flex-wrap gap-4 mt-auto">
                  <button
                    className="flex items-center gap-1 text-gray-600 hover:text-gray-900 text-sm"
                    title="Download"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>

                  <button
                    className="flex items-center gap-1 text-gray-600 hover:text-gray-900 text-sm"
                    title="View Full"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </button>

                  <button
                    className="flex items-center gap-1 text-gray-600 hover:text-gray-900 text-sm"
                    title="Edit"
                  >
                    <Pencil className="w-4 h-4" />
                    Edit
                  </button>

                  <Link
                    href={`/projects/${project.id}/chat?fileId=${file.id}`}
                    className="flex items-center gap-1 text-gray-600 hover:text-gray-900 text-sm"
                    title="View Chat"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Chat
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-sm">No files uploaded yet.</p>
        )}
      </section>
    </main>
  );
}
