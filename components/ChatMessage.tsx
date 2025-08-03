// components/ChatMessage.tsx
type ChatMessageProps = {
  role: "user" | "ai";
  content: string;
};

export default function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>
      <div
        className={`rounded-xl px-4 py-2 max-w-sm text-sm ${
          isUser
            ? "bg-blue-500 text-white rounded-br-none"
            : "bg-gray-200 text-gray-800 rounded-bl-none"
        }`}
      >
        {content}
      </div>
    </div>
  );
}
