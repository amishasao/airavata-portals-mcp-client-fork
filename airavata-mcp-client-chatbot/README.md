# Cybershuttle-AI-Chatbot
This is the AI Chatbot that will be integrated into Cybershuttle's existing interface.

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
export OPENAI_API_KEY="openai-api-key"
export E2B_API_KEY="sandbox-api-key"
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
curl http://localhost:5000/health
```
3. In a new terminal, start the frontend:
```
cd airavata-portals-mcp-client-fork/airavata-mcp-client-chatbot/widget
npm run start
```
This will start the UI at localhost:3000.
