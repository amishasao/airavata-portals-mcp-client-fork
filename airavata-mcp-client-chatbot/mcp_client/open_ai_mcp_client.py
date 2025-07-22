import asyncio
import os
from langchain_openai import ChatOpenAI
from mcp_use import MCPClient, MCPAgent
from mcp_use.types.sandbox import SandboxOptions
from dotenv import load_dotenv


async def main():

    load_dotenv()

    # MCP server config (replace or extend as needed)
    server_config = {
        "mcpServers": {
            "everything": {
                "command": "npx",
                "args": ["-y", "@modelcontextprotocol/server-everything"],
            }
        }
    }

    sandbox_options = SandboxOptions = {
        "api_key": os.getenv("E2B_API_KEY"),
        "sandbox_template_id": "base"
    }

    client = MCPClient(
        config=server_config,
        sandbox=True,
        sandbox_options=sandbox_options
    )

    llm = ChatOpenAI(
        model="gpt-4o",
        temperature=0.1,
        max_tokens=1000
    )
    agent = MCPAgent(llm=llm, client=client)

    result = await agent.run("Could you please tell me what tools you have access to?")
    print(f"\nResult: {result}")

    await client.close_all_sessions()

if __name__ == "__main__":
    asyncio.run(main())
