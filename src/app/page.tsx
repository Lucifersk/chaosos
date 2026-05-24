"use client";
import { agents } from "@/agents/agents";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

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
  const [commandHistory, setCommandHistory] =
    useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [booting, setBooting] = useState(true);
  const [accessGranted, setAccessGranted] =
    useState(false);

  const [currentTime, setCurrentTime] =
    useState("");

  const [systemLogs, setSystemLogs] =
    useState<string[]>([
      "[SYS] ChaosOS initialized",
    ]);

  const bootMessages = [
    "Initializing ChaosOS...",
    "Loading Memory Engine...",
    "Recovery Systems Online...",
    "Adaptive Agents Activated...",
    "Terminal Ready",
  ];

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

  useEffect(() => {

    const bootTimer = setTimeout(() => {
      setBooting(false);
      setAccessGranted(true);
    }, 3500);

    const accessTimer = setTimeout(() => {
      setAccessGranted(false);
    }, 5000);

    return () => {
      clearTimeout(bootTimer);
      clearTimeout(accessTimer);
    };

  }, []);

  useEffect(() => {

    const interval = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString()
      );
    }, 1000);

    return () => clearInterval(interval);

  }, []);

  useEffect(() => {

    const logs = [
      "[MEM] Context synchronization complete",
      "[CORE] Adaptive routing stable",
      "[NET] Recovery node online",
      "[SYS] Multi-agent heartbeat active",
      "[AI] Planner agent operational",
      "[SEC] Terminal access validated",
    ];

    const interval = setInterval(() => {

      const randomLog =
        logs[Math.floor(Math.random() * logs.length)];

      setSystemLogs((prev) => [
        randomLog,
        ...prev.slice(0, 5),
      ]);

    }, 4000);

    return () => clearInterval(interval);

  }, []);

  const sendMessage = async () => {
    if (!message.trim()) return;
    setLoading(true);

    if (message.startsWith("/")) {
      setCommandHistory((prev) => [
        message,
        ...prev,
      ]);
    }

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
  if (booting) {
    return (
      <main className="min-h-screen bg-black text-green-400 flex items-center justify-center font-mono">

        <div className="space-y-4 text-lg">

          {bootMessages.map((msg, index) => (
            <div
              key={index}
              className="animate-pulse"
            >
              {msg}
            </div>
          ))}

        </div>

      </main>
    );
  }

  if (accessGranted) {
    return (
      <main className="min-h-screen bg-black text-green-400 flex items-center justify-center font-mono">

        <div className="text-center space-y-4">

          <h1 className="text-5xl font-bold animate-pulse">
            ACCESS GRANTED
          </h1>

          <p className="text-xl text-cyan-400">
            Welcome Back Operator
          </p>

        </div>

      </main>
    );
  }

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
      <section className="flex-1 flex flex-col relative z-10 h-screen">

        <div className="border-b border-white/10 p-4">
          <div className="flex items-center justify-between">

            <h2 className="text-xl font-semibold">
              ChaosOS Terminal v1.0
            </h2>

            <div className="text-sm text-cyan-400 font-mono">
              {currentTime}
            </div>

          </div>

          <p className="text-sm text-green-400 mt-1">
            {loading
              ? "⚡ Agents processing request..."
              : "● All systems operational"}
          </p>

          <div className="mt-4 grid grid-cols-3 gap-3 text-xs">

            <div className="bg-white/5 border border-white/10 rounded-lg p-2">
              <p className="text-white/40">
                Memory Sync
              </p>

              <p className="text-green-400 mt-1">
                ONLINE
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-2">
              <p className="text-white/40">
                Recovery Engine
              </p>

              <p className="text-yellow-400 mt-1">
                ACTIVE
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-2">
              <p className="text-white/40">
                Agent Load
              </p>

              <p className="text-cyan-400 mt-1">
                NORMAL
              </p>
            </div>

          </div>

          <button
            onClick={() => {
              setMessages([]);
              setCommandHistory([]);
              localStorage.removeItem("chaosos-memory");
            }}
            className="mt-3 text-xs bg-red-500/20 border border-red-500/20 px-3 py-1 rounded-lg"
          >
            Clear Terminal
          </button>

        </div>


        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 min-h-0">

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
                  {msg.role === "assistant" &&
                    index === messages.length - 1 ? (
                    <TypeAnimation
                      sequence={[msg.content]}
                      wrapper="p"
                      speed={75}
                      cursor={false}
                    />
                  ) : (
                    <p>{msg.content}</p>
                  )}

                  <p className="text-xs text-white/40 mt-2">
                    {msg.time}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}

          <div ref={messagesEndRef} />

        </div>

        {messages.length === 0 && (
          <div className="mb-8 font-mono text-sm text-green-400 space-y-2">

            <p>╔══════════════════════════════╗</p>
            <p>║       CHAOSOS TERMINAL       ║</p>
            <p>║ Autonomous AI Operating Sys  ║</p>
            <p>╚══════════════════════════════╝</p>

            <p className="text-white/50 mt-4">
              Type <span className="text-cyan-400">help</span> to view commands
            </p>

            <p className="text-white/50">
              Try:
              <span className="text-cyan-400"> mem</span>,
              <span className="text-cyan-400"> crew</span>,
              <span className="text-cyan-400"> storm</span>
            </p>

          </div>
        )}

        {/* Chat Input Area */}
        <div className="text-xs text-white/40 mb-2 flex gap-4">

          <span>help</span>
          <span>mem</span>
          <span>crew</span>
          <span>pulse</span>
          <span>heal</span>
          <span>storm</span>

        </div>

        {/* Input */}
        <div className="border-t border-white/10 p-4 flex items-center gap-3 font-mono sticky bottom-0 bg-[#0a0a0a]">

          <span className="text-green-400 whitespace-nowrap">
            chaosos@system:~$
          </span>

          <input
            type="text"
            placeholder="Enter command or request..."
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-white/30"
          />

          <button
            onClick={sendMessage}
            disabled={loading}
            className="bg-blue-600 px-6 py-2 rounded-xl"
          >
            {loading ? "Thinking..." : "Send"}
          </button>

        </div>
      </section>

      {/* Command History */}
      <aside className="w-64 border-l border-white/10 p-4 relative z-10">

        <h2 className="text-lg font-semibold mb-4">
          Command History
        </h2>

        <div className="space-y-2 text-sm font-mono">

          {commandHistory.length === 0 ? (
            <div className="text-white/40">
              No commands executed
            </div>
          ) : (
            commandHistory.map((cmd, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 p-2 rounded-lg"
              >
                {cmd}
              </div>
            ))
          )}

        </div>

      </aside>

      {/* System Logs */}
      <aside className="w-72 border-l border-white/10 p-4 relative z-10">

        <h2 className="text-lg font-semibold mb-4">
          System Logs
        </h2>

        <div className="space-y-2 text-xs font-mono text-green-400">

          {systemLogs.map((log, index) => (
            <div
              key={index}
              className="bg-black/30 border border-green-500/10 p-2 rounded-lg"
            >
              {log}
            </div>
          ))}

        </div>

      </aside>

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