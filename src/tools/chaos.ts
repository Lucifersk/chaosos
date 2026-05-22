export function chaosSimulation(input: string) {

    const lowerInput = input.toLowerCase();

    // Simulate API timeout
    if (lowerInput.includes("timeout")) {
        return {
            chaos: true,
            message:
                "⏳ API timeout detected. Recovery Agent retrying request...",
        };
    }

    // Simulate broken workflow
    if (lowerInput.includes("workflow")) {
        return {
            chaos: true,
            message:
                "🛠 Broken workflow detected. Planner Agent rebuilding execution chain...",
        };
    }

    // Simulate interruption
    if (lowerInput.includes("interrupt")) {
        return {
            chaos: true,
            message:
                "🔄 User interruption detected. Adaptive Agent reprioritizing tasks...",
        };
    }

    return {
        chaos: false,
    };
}