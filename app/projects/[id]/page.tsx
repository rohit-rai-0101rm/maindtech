import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import {
  FileText,
  MessageCircle,
  ArrowRight,
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
    <main className="min-h-screen bg-gradient-to-b from-[#073C83] via-[#7A2357] to-[#D20F35] px-4 py-12 text-white">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10 space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold">{project.name}</h1>
          <p className="text-white/90 text-base sm:text-lg max-w-3xl">
            {project.description}
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-3 mt-2">
            <div className="flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/20 rounded-full text-sm text-white">
              <FileText className="w-4 h-4" />
              {project.files.length}{" "}
              {project.files.length === 1 ? "File" : "Files"}
            </div>
            <div className="flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/20 rounded-full text-sm text-white">
              <MessageCircle className="w-4 h-4" />
              {project.chatHistory.length}{" "}
              {project.chatHistory.length === 1 ? "Chat" : "Chats"}
            </div>
          </div>

          {/* Link to Chat Page */}
          <Link
            href={`/projects/${project.id}/chat`}
            className="inline-flex items-center gap-2 text-yellow-100 text-sm font-medium hover:underline group mt-2"
          >
            Go to Chat Page
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 mb-10" />

        {/* Files Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Project Files</h2>

          {project.files.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {project.files.map((file) => (
                <div
                  key={file.id}
                  className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur p-5 shadow-md hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  {/* File Name */}
                  <h3 className="font-medium text-lg text-white truncate mb-3">
                    {file.name}
                  </h3>

                  {/* Content Preview */}
                  <pre className="text-sm text-white/80 whitespace-pre-wrap line-clamp-4 mb-4">
                    {file.content}
                  </pre>

                  {/* Only Chat Button */}
                  <Link
                    href={`/projects/${project.id}/chat?fileId=${file.id}`}
                    className="flex items-center gap-1 text-sm text-yellow-100 hover:text-yellow-200 transition"
                    title="Go to chat"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Chat
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white/60 text-sm">No files uploaded yet.</p>
          )}
        </section>
      </div>
    </main>
  );
}
