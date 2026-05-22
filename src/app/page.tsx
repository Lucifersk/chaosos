"use client";
import { agents } from "@/agents/agents";
import { motion } from "framer-motion";

import {
  useEffect,
  useRef,
  useState,
} from "react";
import {
  MessageSquare,
  Brain,
  AlertTriangle,
} from "lucide-react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  const [activities, setActivities] = useState<string[]>([
    "🟢 ChaosOS Initialized",
  ]);
  const [loading, setLoading] = useState(false);


  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    const savedMessages =
      localStorage.getItem("chaosos-memory");

    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "chaosos-memory",
      JSON.stringify(messages)
    );
  }, [messages]);

  const sendMessage = async () => {
    if (!message.trim()) return;
    setLoading(true);

    // Activity: User request
    setActivities((prev) => [
      "📩 User Request Received",
      ...prev,
    ]);

    const userMessage = {
      role: "user",
      content: message,
      time: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Activity: Memory
    setActivities((prev) => [
      "🧠 Retrieving Memory",
      ...prev,
    ]);

    setActivities((prev) => [
      "⚡ Planner Agent Activated",
      ...prev,
    ]);

    setActivities((prev) => [
      "🔎 Research Agent Running",
      ...prev,
    ]);

    try {

      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({
          message,
        }),
      });

      // Activity: AI Thinking
      setActivities((prev) => [
        "⚡ AI Processing Request",
        ...prev,
      ]);

      setTimeout(() => {
        setActivities((prev) => [
          "🧠 Memory Agent analyzing context",
          ...prev,
        ]);
      }, 600);

      setTimeout(() => {
        setActivities((prev) => [
          "🔎 Research Agent gathering insights",
          ...prev,
        ]);
      }, 1200);

      setTimeout(() => {
        setActivities((prev) => [
          "⚡ Planner Agent generating execution roadmap",
          ...prev,
        ]);
      }, 1800);

      const data = await res.json();

      const aiMessage = {
        role: "assistant",
        content: data.reply,
        time: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, aiMessage]);

      // Recovery Detection
      if (
        data.reply.includes("Recovery") ||
        data.reply.includes("failure")
      ) {
        setActivities((prev) => [
          "🚨 Recovery Agent Activated",
          ...prev,
        ]);
      } else {
        setActivities((prev) => [
          "✅ Task Completed",
          ...prev,
        ]);
      }

    } catch (error) {

      setActivities((prev) => [
        "🚨 System Error Recovered",
        ...prev,
      ]);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "⚠️ ChaosOS recovered from unexpected failure.",
          time: new Date().toLocaleTimeString(),
        },
      ]);
    }
    setLoading(false);
    setMessage("");
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex relative overflow-hidden">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,140,255,0.15),transparent_40%)] pointer-events-none" />

      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 p-4 relative z-10">
        <h1 className="text-2xl font-bold mb-8">
          ChaosOS
        </h1>

        <div className="space-y-4">

          {agents.map((agent, index) => (
            <div
              key={index}
              className="bg-white/5 p-3 rounded-xl"
            >
              <h3 className="font-semibold">
                {agent.name}
              </h3>

              <p className="text-sm text-white/60 mt-1">
                {agent.description}
              </p>
            </div>
          ))}

        </div>

      </aside>

      {/* Chat Section */}
      <section className="flex-1 flex flex-col relative z-10">

        <div className="border-b border-white/10 p-4">
          <h2 className="text-xl font-semibold">
            ChaosOS • Autonomous Multi-Agent System
          </h2>

          <p className="text-sm text-green-400 mt-1">
            {loading
              ? "⚡ Agents processing request..."
              : "● All systems operational"}
          </p>
        </div>

        {/* Messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">

          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.25,
              }}
              className={`flex ${msg.role === "user"
                ? "justify-end"
                : "justify-start"
                }`}
            >
              <div
                className={`px-4 py-3 rounded-2xl max-w-md ${msg.role === "user"
                  ? "bg-blue-600"
                  : "bg-white/10 border border-cyan-500/20 shadow-lg shadow-cyan-500/10"
                  }`}
              >
                <div>
                  <p>{msg.content}</p>

                  <p className="text-xs text-white/40 mt-2">
                    {msg.time}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}

          <div ref={messagesEndRef} />

        </div>

        {/* Input */}
        <div className="border-t border-white/10 p-4 flex gap-3">

          <input
            type="text"
            placeholder="Type your request..."
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-all"
          />

          <button
            onClick={sendMessage}
            disabled={loading}
            className="bg-blue-600 px-6 rounded-xl"
          >
            {loading ? "Thinking..." : "Send"}
          </button>

        </div>
      </section>

      {/* Activity */}
      <aside className="w-80 border-l border-white/10 p-4 relative z-10">

        <h2 className="text-lg font-semibold mb-4">
          Agent Activity
        </h2>

        <div className="space-y-3 text-sm">

          {activities.map((activity, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 p-3 rounded-xl backdrop-blur-sm"
            >
              {activity}
            </div>
          ))}

        </div>

      </aside>

    </main >
  );
}