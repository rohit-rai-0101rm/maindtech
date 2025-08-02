import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import { FileText, MessageCircle } from "lucide-react";

interface PageProps {
  params: {
    id: string;
  };
}

export default function ProjectDetailPage({ params }: PageProps) {
  const project = projects.find((p) => p.id === params.id);

  if (!project) return notFound();

  return (
    <main className="min-h-screen bg-white text-gray-800 px-4 py-8 md:px-12 lg:px-24">
      {/* Project Header */}
      <div className="space-y-4 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          {project.name}
        </h1>
        <p className="text-gray-600 max-w-2xl leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-3 text-sm text-gray-600">
          <span className="inline-flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
            <FileText className="w-4 h-4" />
            {project.files.length}{" "}
            {project.files.length === 1 ? "File" : "Files"}
          </span>
          <span className="inline-flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
            <MessageCircle className="w-4 h-4" />
            {project.chatHistory.length}{" "}
            {project.chatHistory.length === 1 ? "Chat" : "Chats"}
          </span>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-gray-200 mb-8" />

      {/* Files Section */}
      <section>
        <h2 className="text-xl font-semibold mb-6">Files</h2>

        {project.files.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {project.files.map((file) => (
              <div
                key={file.id}
                className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition p-5"
              >
                <h3 className="font-medium text-gray-900 text-lg truncate">
                  {file.name}
                </h3>
                <pre className="text-sm text-gray-600 mt-3 whitespace-pre-wrap line-clamp-4">
                  {file.content}
                </pre>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-sm">
            No files uploaded for this project yet.
          </p>
        )}
      </section>
    </main>
  );
}
