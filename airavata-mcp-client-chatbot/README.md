# Cybershuttle LangChain + Qwen3 Integration

Connecting the React frontend to the LangChain + Qwen3 agent in cybershuttle/mcp-server repository.

## 🚀 How to Run
### Step 1: In 2 seperate Windows open the cybershuttle/mcp-server repository, and the apacha/airavata-portals repository

**Terminal 1 - Your MCP Server Repository (cybershuttle/mcp-server):**
```bash
python src/cybershuttle_mcp_server.py
```

**Terminal 2 - Your API Server (cybershuttle/mcp-server):**
```bash 
python demos/langchain_api_server.py
```

### Step 2: Start the Frontend

**Terminal 4 - This Repository (apache/airavata-portals):**
```bash
cd airavata-mcp-client-chatbot/widget
npm start
```

## 🔍 What Each Terminal Does

### Terminal 1: MCP Server
- **Purpose**: Connects to Cybershuttle research catalog
- **Port**: 8000
- **Status**: Should show "Server is healthy"

### Terminal 2: Your API Server
- **Purpose**: Exposes your LangChain agent as HTTP API
- **Port**: 5000 (replaces his OpenAI backend)
- **Status**: Should show "Agent: Ready"

### Terminal 3: React Frontend
- **Purpose**: The web interface users interact with
- **Port**: 3000
- **Status**: Opens browser to localhost:3000

## 🧪 Testing

### Quick Test:
```bash
curl http://localhost:5000/api/health
```

Should return:
```json
{
  "status": "healthy",
  "agent_ready": true,
  "ollama_running": true,
  "mcp_server_running": true
}
```

### Chat Test:
```bash
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Are there neuroscience resources in Cybershuttle?"}'
```

## 💡 Architecture

```
React Frontend (port 3000)
       ↓
Your API Server (port 5000)
       ↓  
Your LangChain Agent
       ↓
Your MCP Server (port 8000)
       ↓
Cybershuttle Platform
```

## 🎯 Success Indicators

1. **MCP Server**: Shows "Server is healthy"
2. **Ollama**: `curl localhost:11434/api/version` works
3. **API Server**: Shows "Agent: Ready" 
4. **Frontend**: Loads at localhost:3000
5. **Integration**: User queries get responses from your Qwen3 agent

The frontend will work exactly like before, but now powered by open-source Qwen3 instead of OpenAI!