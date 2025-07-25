import asyncio
import os
from langchain_openai import ChatOpenAI
from mcp_use import MCPClient, MCPAgent
from mcp_use.types.sandbox import SandboxOptions
from dotenv import load_dotenv

load_dotenv()

# Create the agent and client globally once (can also be in an init function if needed)
llm = ChatOpenAI(
    model="gpt-4o",
    temperature=0.1,
    max_tokens=1000
)

# Global variables for reuse (optional to keep persistent client in production)
client = None
agent = None


async def init_mcp():
    global client, agent

    server_config = {
        "mcpServers": {
            "everything": {
                "command": "npx",
                "args": ["-y", "@modelcontextprotocol/server-everything"],
            }
        }
    }

    sandbox_options: SandboxOptions = {
        "api_key": os.getenv("E2B_API_KEY"),
        "sandbox_template_id": "base"
    }

    client = MCPClient(
        config=server_config,
        sandbox=True,
        sandbox_options=sandbox_options
    )

    agent = MCPAgent(llm=llm, client=client)


async def run_agent_query(message: str) -> str:
    global agent
    if agent is None:
        await init_mcp()

    result = await agent.run(message)
    return result


async def close_mcp():
    global client
    if client:
        await client.close_all_sessions()
