# Cybershuttle-AI-Chatbot
This is an open-source Model Context Protocol (MCP) client chatbot that users can prompt and interact with the remainder of the Cybershuttle interface, directly from a prompt. The user submits a request through the chatbot to the MCP client, which has a common protocol (or standard mode of communication with the MCP servers). As seen below, when the request goes to each specific MCP server, it uses REST API endpoints to complete tasks requested by the user. As shown in the diagram below, the abstracted view allow the user to be able to interact with Cybershuttle's services without directly accessing API endpoints or having to go through the website. As such, this tool can now be easily integrated into the Cybershuttle website. Go to the [Cybershuttle MCP Servers Repository](https://github.com/cyber-shuttle/mcp-server) for more information about which MCP servers can be run from the MCP client.

<img width="2216" height="1537" alt="image" src="https://github.com/user-attachments/assets/0dcc4456-bf87-4633-9af7-ace28aa71547" />

## Features
- **Natural Language Interface** – Query Cybershuttle resources (datasets, notebooks, models) using plain English.
- **MCP Protocol Support** – Communicates with multiple MCP servers for modular and scalable integration.
- **Custom MCP Servers** – FastAPI-based connectors to Airavata’s research-service API and Cybershuttle catalog.
- **Open-Source Model Integration** – Supports running inference with locally or remotely hosted open-source LLMs.
- **Flexible Deployment** – Includes both CLI and embeddable widget options for use in other applications.
- **End-to-End Workflows** – Enables query → resource discovery → model execution → result delivery in one flow.

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
