const API_KEY =
    process.env.HYDRA_DB_API_KEY!;

export async function saveHydraMemory(
    text: string
) {

    await fetch(
        "https://api.hydradb.com/memories/add_memory",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${API_KEY}`,
            },

            body: JSON.stringify({
                tenant_id: "chaosos",
                sub_tenant_id: "operator",

                memories: [
                    {
                        text,
                        infer: true,
                        user_name: "Operator",
                    },
                ],
            }),
        }
    );
}