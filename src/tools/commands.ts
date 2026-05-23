export function handleCommand(command: string) {

    const cmd = command.toLowerCase();

    if (cmd === "/memory" || cmd === "mem") {
        return `
🧠 MEMORY STATE

Goal:
Build AI Operating System

Last Task:
Recovery Workflow

Memory Status:
Persistent
    `;
    }

    if (cmd === "/agents" || cmd === "crew") {
        return `
🤖 ACTIVE AGENTS

🧠 Memory Agent
⚡ Planner Agent
🔎 Research Agent
🚨 Recovery Agent
    `;
    }

    if (cmd === "/status" || cmd === "pulse") {
        return `
🟢 CHAOSOS STATUS

Agents: Active
Memory: Stable
Recovery: Online
Context Load: Normal
    `;
    }

    if (cmd === "/recover" || cmd === "heal") {
        return `
🚨 RECOVERY ENGINE

Scanning failures...
Retrying workflows...
System stabilized.
    `;
    }

    if (cmd === "/chaos" || cmd === "storm") {
        return `
⚠️ CHAOS SIMULATION

API timeout detected
Workflow interruption detected
Adaptive recovery triggered
System stabilized
    `;
    }

    if (cmd === "help" || cmd === "guide") {
        return `
📘 CHAOSOS COMMANDS

mem    → Memory State
crew   → Active Agents
pulse  → System Status
heal   → Recovery Engine
storm  → Chaos Simulation
  `;
    }

    if (cmd === "override") {
        return `
⚠️ ADMIN OVERRIDE ENABLED

ROOT ACCESS GRANTED

Recovery restrictions bypassed
Memory access unlocked
Adaptive systems elevated
  `;
    }

    return null;
}