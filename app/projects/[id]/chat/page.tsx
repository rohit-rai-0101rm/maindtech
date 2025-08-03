// app/projects/[id]/chat/page.tsx
"use client";

import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { sendMessage } from "@/store/chatSlice";
import { useState } from "react";
import { RootState } from "@/store";
import { format } from "date-fns";

export default function ProjectChatPage() {
  const { id: projectId } = useParams();
  const dispatch = useAppDispatch();
  const messages = useAppSelector(
    (state: RootState) => state.chat[projectId as string] || []
  );
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const timestamp = format(new Date(), "yyyy-MM-dd HH:mm:ss");

    // Send user message
    dispatch(
      sendMessage({
        key: projectId as string,
        message: {
          role: "user",
          content: input,
          timestamp,
        },
      })
    );

    // Simulate AI response
    setTimeout(() => {
      dispatch(
        sendMessage({
          key: projectId as string,
          message: {
            role: "ai",
            content: `You said: ${input}`,
            timestamp: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
          },
        })
      );
    }, 600);

    setInput("");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">
        Chat with Project #{projectId}
      </h1>

      <div className="border rounded-md h-[400px] overflow-y-auto p-4 bg-gray-50 mb-4">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-sm">No messages yet.</p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-3 ${
                msg.role === "user" ? "text-right" : "text-left"
              }`}
            >
              <div
                className={`inline-block px-4 py-2 rounded-lg text-sm max-w-[80%] ${
                  msg.role === "user"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.content}
              </div>
              <div className="text-xs text-gray-400 mt-1">{msg.timestamp}</div>
            </div>
          ))
        )}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 border rounded-md px-3 py-2 text-sm"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
        >
          Send
        </button>
      </div>
    </div>
  );
}
