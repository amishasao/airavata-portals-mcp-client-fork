import asyncio
import os
import json
import requests
from typing import Dict, Any

from langchain_openai import ChatOpenAI
from langchain.agents import initialize_agent, AgentType
from langchain.tools import tool
from mcp_use import MCPClient
from mcp_use.types.sandbox import SandboxOptions
from dotenv import load_dotenv

load_dotenv()

llm = ChatOpenAI(
    model="gpt-4o",
    temperature=0.1,
    max_tokens=1000,
    messages=[{
        "role": "system",
        "content": "Always format your response using Markdown, including for code, tables, and lists."
    }]
)

client = None
agent = None

MCP_SERVER_URL = os.getenv("MCP_SERVER_URL", None)
if not MCP_SERVER_URL:
    raise ValueError("MCP_SERVER_URL environment variable is not set.")


# ---------------- MCP Server Function Integration ---------------- #


def call_mcp_function(function_name: str, parameters: Dict[str, Any]) -> Dict[str, Any]:
    try:
        endpoint_map = {
            "list_resources": "/resources",
            "get_resource": "/resources/{resource_id}",
            "search_resources": "/resources/search",
            "create_dataset": "/resources/dataset",
            "create_notebook": "/resources/notebook",
            "create_repository": "/resources/repository",
            "create_model": "/resources/model",
            "list_projects": "/projects",
            "create_project": "/projects",
            "start_project_session": "/hub/start-session/{project_id}",
            "list_sessions": "/sessions",
            "get_all_tags": "/resources/tags"
        }

        method_map = {
            "list_resources": "GET",
            "get_resource": "GET",
            "search_resources": "GET",
            "create_dataset": "POST",
            "create_notebook": "POST",
            "create_repository": "POST",
            "create_model": "POST",
            "list_projects": "GET",
            "create_project": "POST",
            "start_project_session": "GET",
            "list_sessions": "GET",
            "get_all_tags": "GET"
        }

        endpoint = endpoint_map.get(function_name)
        method = method_map.get(function_name)

        if not endpoint or not method:
            return {"error": f"Unknown function: {function_name}"}

        url = f"{MCP_SERVER_URL.rstrip('/')}{endpoint}"

        if function_name == "get_resource":
            url = url.format(resource_id=parameters.get("resource_id"))
            params = {}
        elif function_name == "start_project_session":
            url = url.format(project_id=parameters.get("project_id"))
            params = {"session_name": parameters.get("session_name")}
        elif function_name == "create_repository":
            params = {"github_url": parameters.get("github_url")}
        else:
            if method == "GET":
                params = parameters
            else:
                params = {}

        if method == "GET":
            response = requests.get(url, params=params)
        elif method == "POST":
            if function_name in ["create_dataset", "create_notebook", "create_model", "create_project"]:
                response = requests.post(url, json=parameters.get("data"))
            else:
                response = requests.post(url, params=params)
        else:
            return {"error": f"Unsupported method: {method}"}

        if 200 <= response.status_code < 300:
            try:
                return response.json() if response.content else {"message": "Success"}
            except ValueError:
                return {"message": "Success"}
        else:
            return {"error": f"API call failed with status {response.status_code}: {response.text}"}

    except Exception as e:
        return {"error": f"Failed to call MCP function: {str(e)}"}

# ---------------- LangChain Tool Wrappers ---------------- #


@tool
def list_resources(resource_type: str = None, tags: str = None, name: str = None, limit: int = 10):
    """List resources from Cybershuttle MCP server"""
    params = {k: v for k, v in locals().items() if v is not None}
    return call_mcp_function("list_resources", params)


@tool
def get_all_tags():
    """Get all available tags from the catalog"""
    return call_mcp_function("get_all_tags", {})


@tool
def list_projects():
    """List all projects"""
    return call_mcp_function("list_projects", {})


@tool
def list_sessions(status: str = None):
    """List all sessions with optional status"""
    params = {}
    if status:
        params["status"] = status
    return call_mcp_function("list_sessions", params)


@tool
def create_dataset(name: str, description: str, tags: str = None):
    """Create a new dataset"""
    data = {
        "name": name,
        "description": description,
        "tags": tags.split(",") if tags else []
    }
    return call_mcp_function("create_dataset", {"data": data})


@tool
def create_notebook(name: str, description: str, tags: str = None):
    """Create a new notebook"""
    data = {
        "name": name,
        "description": description,
        "tags": tags.split(",") if tags else []
    }
    return call_mcp_function("create_notebook", {"data": data})


@tool
def create_repository(name: str, description: str, github_url: str):
    """Create a new repository"""
    data = {
        "name": name,
        "description": description,
        "github_url": github_url
    }
    return call_mcp_function("create_repository", {"data": data})


@tool
def start_project_session(project_id: str, session_name: str):
    """Start a new session for a project"""
    params = {
        "project_id": project_id,
        "session_name": session_name
    }
    return call_mcp_function("start_project_session", params)

# ---------------- Initialization and Agent Execution ---------------- #


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

    tools = [
        list_resources, get_all_tags, list_projects, list_sessions,
        create_dataset, create_notebook, create_repository, start_project_session
    ]

    agent = initialize_agent(
        tools=tools,
        llm=llm,
        agent=AgentType.OPENAI_FUNCTIONS,
        verbose=True
    )


async def run_agent_query(message: str) -> str:
    global agent
    if agent is None:
        await init_mcp()

    # The agent.run() method is synchronous in the current configuration (AgentType.OPENAI_FUNCTIONS).
    # If the agent type or configuration changes, verify whether this method needs to be awaited.
    result = agent.run(message)
    return result


async def close_mcp():
    global client
    if client:
        await client.close_all_sessions()
