export function detectGoalChange(input: string) {

    const lowerInput = input.toLowerCase();

    if (
        lowerInput.includes("actually") ||
        lowerInput.includes("instead") ||
        lowerInput.includes("change") ||
        lowerInput.includes("target")
    ) {
        return {
            changed: true,
            message:
                "🔄 Goal change detected. Adaptive Planning Agent updating strategy.",
        };
    }

    return {
        changed: false,
    };
}