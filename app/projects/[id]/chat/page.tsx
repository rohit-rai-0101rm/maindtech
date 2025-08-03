"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { sendMessage } from "@/store/chatSlice";
import { useState } from "react";
import { RootState } from "@/store";
import { format } from "date-fns";
import { z } from "zod";

const chatInputSchema = z.object({
  message: z.string().max(500, "Message too long"),
});

export default function ProjectChatPage() {
  const { id: projectId } = useParams();
  const searchParams = useSearchParams();
  const fileId = searchParams.get("fileId");

  const dispatch = useAppDispatch();
  const messages = useAppSelector(
    (state: RootState) => state.chat[projectId as string] || []
  );

  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSend = () => {
    const trimmed = input.trim();
    const validation = chatInputSchema.safeParse({ message: trimmed });

    if (!validation.success && !file) {
      const zodError = validation.error.errors[0]?.message;
      setError(zodError || "Please enter a message or upload a file");
      return;
    }

    if (!trimmed && !file) {
      setError("Cannot send empty message.");
      return;
    }

    setError(""); // Clear error
    const timestamp = format(new Date(), "MMM dd, yyyy • hh:mm a");

    if (trimmed) {
      dispatch(
        sendMessage({
          key: projectId as string,
          message: {
            role: "user",
            content: trimmed,
            timestamp,
          },
        })
      );
    }

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        dispatch(
          sendMessage({
            key: projectId as string,
            message: {
              role: "user",
              file: {
                name: file.name,
                type: file.type,
                url: reader.result,
              },
              timestamp,
            },
          })
        );
      };
      reader.readAsDataURL(file);
    }

    const aiResponseContent = trimmed || file?.name;
    if (aiResponseContent) {
      setTimeout(() => {
        dispatch(
          sendMessage({
            key: projectId as string,
            message: {
              role: "ai",
              content: `You said: ${aiResponseContent}`,
              timestamp: format(new Date(), "MMM dd, yyyy • hh:mm a"),
            },
          })
        );
      }, 1000);
    }

    setInput("");
    setFile(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#073C83] via-[#7A2357] to-[#D20F35] text-white">
      <header className="p-6 text-xl font-semibold backdrop-blur-md bg-white/10 shadow-sm">
        {fileId ? (
          <div>
            <div>💾 File Chat</div>
            <div className="text-sm text-white/70">File ID: {fileId}</div>
          </div>
        ) : (
          <div>💬 Project Chat #{projectId}</div>
        )}
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.length === 0 ? (
          <p className="text-center text-white/70">
            No messages yet. Start the conversation!
          </p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-2xl max-w-[80%] text-sm ${
                  msg.role === "user"
                    ? "bg-white text-[#073C83]"
                    : "bg-white/20 text-white backdrop-blur"
                }`}
              >
                {msg.content && <p className="mb-1">{msg.content}</p>}
                {msg.file && (
                  <div className="mt-1">
                    {msg.file.type.startsWith("image/") ? (
                      <img
                        src={msg.file.url}
                        alt={msg.file.name}
                        className="rounded-md max-w-xs border border-white/20"
                      />
                    ) : (
                      <a
                        href={msg.file.url}
                        download={msg.file.name}
                        className="underline text-blue-200"
                      >
                        📎 {msg.file.name}
                      </a>
                    )}
                  </div>
                )}
                <div className="text-[10px] text-black/80 mt-2 text-right">
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))
        )}
      </main>

      <footer className="px-4 py-4 border-t border-white/20 bg-white/10 backdrop-blur-lg">
        <div className="flex flex-col gap-2">
          {file && (
            <div className="text-sm text-white/80 flex items-center gap-2">
              📎 {file.name}
              <button
                className="text-red-300 text-xs hover:underline"
                onClick={() => setFile(null)}
              >
                Remove
              </button>
            </div>
          )}
          <div className="flex gap-2 items-start">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 text-sm rounded-xl bg-white/90 text-black focus:outline-none focus:ring-2 focus:ring-white/30"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <input
              type="file"
              accept="image/*,.pdf,.doc,.docx"
              className="hidden"
              id="file-upload"
              onChange={handleFileChange}
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer px-3 py-2 bg-white text-[#073C83] rounded-xl hover:bg-gray-100"
            >
              📎
            </label>
            <button
              onClick={handleSend}
              disabled={!input.trim() && !file}
              className="bg-white text-[#073C83] font-semibold px-5 py-2 rounded-xl hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      </footer>
    </div>
  );
}
