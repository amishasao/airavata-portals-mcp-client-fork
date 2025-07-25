from flask import Flask, request, jsonify
from flask_cors import CORS
import sys
import asyncio
import os
from mcp_client.open_ai_mcp_client import run_agent_query
from mcp_client.open_ai_mcp_client import close_mcp


app = Flask(__name__)
CORS(app)


@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        user_message = data.get('message', '')

        if not user_message:
            return jsonify({"error": "No message provided"}), 400

        # Call the MCP client to get a response
        bot_response = asyncio.run(run_agent_query(user_message))

        return jsonify({
            "response": bot_response,
            "success": True
        })

    except Exception as e:
        return jsonify({
            "error": str(e),
            "success": False
        }), 500


@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy"}), 200


if __name__ == '__main__':
    app.run(debug=True, port=5000)
