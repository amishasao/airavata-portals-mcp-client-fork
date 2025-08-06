
# Cybershuttle AI Chatbot
This is an open-source Model Context Protocol (MCP) client chatbot that users can prompt and interact with the remainder of the Cybershuttle interface, directly from a prompt. The user submits a request through the chatbot to the MCP client, which has a common protocol (or standard mode of communication with the MCP servers). As seen below, when the request goes to each specific MCP server, it uses REST API endpoints to complete tasks requested by the user. As shown in the diagram below, the abstracted view allow the user to be able to interact with Cybershuttle's services without directly accessing API endpoints or having to go through the website. As such, this tool can now be easily integrated into the Cybershuttle website. Go to the [Cybershuttle MCP Servers Repository](https://github.com/cyber-shuttle/mcp-server) for more information about which MCP servers can be run from the MCP client.

<img width="2216" height="1537" alt="image" src="https://github.com/user-attachments/assets/0dcc4456-bf87-4633-9af7-ace28aa71547" />

## Features
- **Natural Language Interface** – Query Cybershuttle resources (datasets, notebooks, models) using plain English.
- **MCP Protocol Support** – Communicates with multiple MCP servers for modular and scalable integration.
- **Custom MCP Servers** – FastAPI-based connectors to Airavata’s research-service API and Cybershuttle catalog.
- **Open-Source Model Integration** – Supports running inference with locally or remotely hosted open-source LLMs.
- **Flexible Deployment** – Includes both CLI and embeddable widget options for use in other applications.
- **End-to-End Workflows** – Enables query → resource discovery → model execution → result delivery in one flow.

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

## Installation
1. Clone the repo:
```
git clone https://github.com/amishasao/airavata-portals-mcp-client-fork.git
cd airavata-portals-mcp-client-fork/airavata-mcp-client-chatbot/backend
```
2. Install backend dependencies:
```
pip install -r requirements.txt
```
3. Set up environment variables:
```
# get an OpenAI API key from their website
export OPENAI_API_KEY="openai-api-key"
# create a Sandbox account and create a new E2B API key
export E2B_API_KEY="sandbox-api-key"
# run the server and copy/paste the api.dev link here
export MCP_SERVER_URL="link-here"
```
4. Install frontend dependencies
```
npm install
```

## Usage
1. Start the MCP backend:
```
cd airavata-portals-mcp-client-fork/airavata-mcp-client-chatbot/backend
python app.py
```
This will start the backend at localhost:5000.

2. (opt.) Test server health:
```
curl http://localhost:5000/api/health
```
3. In a new terminal, start the frontend:
```
cd airavata-portals-mcp-client-fork/airavata-mcp-client-chatbot/widget
npm run start
```
This will start the UI at localhost:3000.

## Cybershuttle LangChain + Qwen3 Integration

Connecting the React frontend to the LangChain + Qwen3 agent in cybershuttle/mcp-server repository.

### 🚀 How to Run
#### Step 1: In 2 seperate Windows open the cybershuttle/mcp-server repository, and the apacha/airavata-portals repository

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

#### Terminal 1: MCP Server
- **Purpose**: Connects to Cybershuttle research catalog
- **Port**: 8000
- **Status**: Should show "Server is healthy"

#### Terminal 2: Your API Server
- **Purpose**: Exposes your LangChain agent as HTTP API
- **Port**: 5000 (replaces his OpenAI backend)
- **Status**: Should show "Agent: Ready"

#### Terminal 3: React Frontend
- **Purpose**: The web interface users interact with
- **Port**: 3000
- **Status**: Opens browser to localhost:3000

## 🧪 Testing

#### Quick Test:
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
### 🎯 Success Indicators

1. **MCP Server**: Shows "Server is healthy"
2. **Ollama**: `curl localhost:11434/api/version` works
3. **API Server**: Shows "Agent: Ready" 
4. **Frontend**: Loads at localhost:3000
5. **Integration**: User queries get responses from your Qwen3 agent

The frontend will work exactly like before, but now powered by open-source Qwen3 instead of OpenAI!

## Project Structure
```
airavata-mcp-client-chatbot               
├─ backend                                
│  ├─ mcp_client                          
│  │  ├─ client_side_ollama_prompting.py  
│  │  ├─ cybershuttle_mcp_client.py       
│  │  ├─ initial_ollama_prompting.py      
│  │  ├─ mcp_config.json                  
│  │  ├─ open_ai_mcp_client.py            
│  │  ├─ requirements.txt                 
│  │  └─ __init__.py                      
│  ├─ app.py                              
│  ├─ config.py                           
│  └─ requirements.txt                    
├─ cli                                    
│  ├─ package-lock.json                   
│  ├─ package.json                        
│  └─ tsconfig.json                       
├─ widget                                 
│  ├─ build                           
│  ├─ public                     
│  ├─ src                                 
│  │  ├─ components                       
│  │  │  ├─ Chatbox.css                   
│  │  │  ├─ Chatbox.tsx                   
│  │  │  ├─ Chatbox2.css                  
│  │  │  ├─ Results.css                   
│  │  │  ├─ Results.tsx                   
│  │  │  └─ Results2.css                  
│  │  ├─ App.css                          
│  │  ├─ App.test.tsx                     
│  │  ├─ App.tsx                          
│  │  ├─ index.css                        
│  │  ├─ index.tsx                        
│  │  ├─ logo.svg                         
│  │  ├─ react-app-env.d.ts               
│  │  ├─ reportWebVitals.ts               
│  │  └─ setupTests.ts                    
│  ├─ package-lock.json                   
│  ├─ package.json                        
│  ├─ README.md                           
│  └─ tsconfig.json                       
└─ README.md
```

## Contributing
1. Fork the repository
2. Create a feature branch
3. Make changes and add tests in a separate folder
4. Submit a detailed pull request with explanations on what improvements have been made

## More Information
This project was presented, and the poster is shown below.

![Slide2](https://github.com/user-attachments/assets/373857de-dd4b-4585-9ab1-020fa202f340)

