export function simulateFailure(input: string) {

    const lowerInput = input.toLowerCase();

    // Simulate failures
    if (
        lowerInput.includes("crash") ||
        lowerInput.includes("fail") ||
        lowerInput.includes("broken")
    ) {
        return {
            failed: true,
            message:
                "⚠️ Tool failure detected. Recovery Agent activated.",
        };
    }

    return {
        failed: false,
    };
}