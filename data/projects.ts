// data/projects.ts
export const projects = [
    {
        id: "1",
        name: "AI Research Workspace",
        description: "Work with multiple files for an AI model",
        files: [
            {
                id: "file1",
                name: "index.js",
                content: "// File content here...",
                chatHistory: [],
            },
            {
                id: "file2",
                name: "data.json",
                content: "{ key: 'value' }",
                chatHistory: [],
            },
        ],
        chatHistory: [],
    },
    {
        id: "2",
        name: "Design System",
        description: "Figma + code handoff for components",
        files: [],
        chatHistory: [],
    },
];
