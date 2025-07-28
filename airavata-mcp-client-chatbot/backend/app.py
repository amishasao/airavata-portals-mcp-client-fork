from flask import Flask, request, jsonify
from flask_cors import CORS
import sys
import asyncio
import os
from mcp_client.open_ai_mcp_client import run_agent_query, close_mcp

app = Flask(__name__)
CORS(app)


@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        user_message = data.get('message', '')

        print(f"Received message: {user_message}")  # Debug log

        if not user_message:
            return jsonify({"error": "No message provided"}), 400

        # Call the Cybershuttle MCP client to get a response
        print("Calling run_agent_query...")  # Debug log
        bot_response = asyncio.run(run_agent_query(user_message))
        print(f"Got response: {bot_response}")  # Debug log

        return jsonify({
            "response": bot_response,
            "success": True
        })

    except Exception as e:
        print(f"Error in chat endpoint: {str(e)}")  # Debug log
        print(f"Error type: {type(e)}")  # Debug log
        import traceback
        traceback.print_exc()  # Print full stack trace
        return jsonify({
            "error": str(e),
            "success": False
        }), 500


@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy"}), 200


if __name__ == '__main__':
    app.run(debug=True, port=5000)
