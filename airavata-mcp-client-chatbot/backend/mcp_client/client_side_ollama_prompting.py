import asyncio
import os
from dotenv import load_dotenv
from langchain_ollama import OllamaLLM
from mcp_use import MCPAgent, MCPClient


# class ToolCallingOllamaLLM(OllamaLLM):
#     def bind_tools(self, tools):
#         # Override to handle tool binding if necessary
#         self.tools = tools
#         return self


async def main():
    load_dotenv()

    # no change needed to MCP client config
    config = {"mcpServers": {
        "playwright": {
            "command": "npx",
            "args": ["@playwright/mcp@latest"],
            "env": {
                "DISPLAY": ":1"
            }
        }
    }}

    client = MCPClient.from_dict(config)

    # connect to remote Ollama server
    llm = OllamaLLM(
        model="qwen-4b",
        base_url=os.getenv("OLLAMA_API_URL", "http://localhost:11434"),
        temperature=0.1,
        max_tokens=1000,
    )

    agent = MCPAgent(llm=llm, client=client, max_steps=30)
    result = await agent.run("What are the best fruiting plants to grow indoors?")
    print(f"\nResult: {result}")

if __name__ == "__main__":
    asyncio.run(main())
