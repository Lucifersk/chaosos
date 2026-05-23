import { saveHydraMemory }
    from "@/lib/hydra";

import { Groq } from "groq-sdk";

import {
    saveMemory,
    getMemory,
    saveTask,
    getTask,
} from "@/memory/store";

import { simulateFailure }
    from "@/recovery/recovery";

import { detectGoalChange }
    from "@/agents/adaptive";

import { chaosSimulation }
    from "@/tools/chaos";

import { handleCommand }
    from "@/tools/commands";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export async function POST(
    req: Request
) {

    try {

        const body = await req.json();

        // Save user message to HydraDB
        await saveHydraMemory(
            body.message
        );

        // Handle terminal commands
        const commandResponse =
            handleCommand(body.message);

        if (commandResponse) {

            return Response.json({
                reply: commandResponse,
            });

        }

        // Continue previous task
        if (
            body.message
                .toLowerCase()
                .includes("continue")
        ) {

            const lastTask = getTask();

            return Response.json({
                reply:
                    `🔄 Continuing previous task: ${lastTask}`,
            });

        }

        // Chaos Simulation
        const chaos =
            chaosSimulation(body.message);

        if (chaos.chaos) {

            return Response.json({
                reply: chaos.message,
            });

        }

        // Adaptive Planning
        const adaptive =
            detectGoalChange(body.message);

        if (adaptive.changed) {

            return Response.json({
                reply: adaptive.message,
            });

        }

        // Recovery Simulation
        const recovery =
            simulateFailure(body.message);

        if (recovery.failed) {

            return Response.json({
                reply: recovery.message,
            });

        }

        // Save local memory
        saveMemory({
            role: "user",
            content: body.message,
        });

        // Save current task
        saveTask(body.message);

        // Get previous memory
        const previousMemory =
            getMemory();

        // AI Completion
        const completion =
            await groq.chat.completions.create({

                messages: [

                    {
                        role: "system",

                        content:
                            `
You are ChaosOS.

A resilient AI operating system with:

- persistent memory
- adaptive planning
- recovery systems
- multi-agent coordination
- chaos handling
- workflow continuation

Behave like an intelligent AI operating system, not a chatbot.
              `,
                    },

                    ...previousMemory,

                ],

                model:
                    "llama-3.3-70b-versatile",

            });

        const reply =
            completion.choices[0]
                ?.message?.content || "";

        // Save assistant memory locally
        saveMemory({
            role: "assistant",
            content: reply,
        });

        // Save assistant memory to HydraDB
        await saveHydraMemory(
            reply
        );

        // Return AI response
        return Response.json({
            reply,
        });

    } catch (error) {

        console.error(error);

        return Response.json({
            reply:
                "⚠️ Recovery triggered: AI service temporarily failed.",
        });

    }

}