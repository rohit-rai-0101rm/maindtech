import Link from "next/link";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#073C83] via-[#7A2357] to-[#D20F35] px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-10 text-center">
          Your Workspaces
        </h1>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="group rounded-2xl border border-white/20 bg-white/10 backdrop-blur p-6 shadow-md hover:shadow-lg hover:border-white/40 transition duration-200"
            >
              <div className="space-y-3">
                <h2 className="text-lg font-semibold text-white group-hover:text-yellow-100">
                  {project.name}
                </h2>
                <p className="text-sm text-white/80 leading-snug">
                  {project.description}
                </p>
                <span className="inline-block text-xs text-white font-medium mt-2">
                  {project.files.length} file
                  {project.files.length !== 1 ? "s" : ""}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
