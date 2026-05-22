export type Memory = {
    role: "user" | "assistant";
    content: string;
};

let memoryStore: Memory[] = [];

export function saveMemory(message: Memory) {
    memoryStore.push(message);

    // Keep last 20 messages
    if (memoryStore.length > 20) {
        memoryStore.shift();
    }
}

export function getMemory(): Memory[] {
    return memoryStore;

}
let currentTask = "";

export function saveTask(task: string) {
    currentTask = task;
}

export function getTask() {
    return currentTask;
}