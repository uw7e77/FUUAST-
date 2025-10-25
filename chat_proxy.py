import os
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

PPLX_API_KEY = os.getenv('PPLX_API_KEY') or 'YOUR_API_KEY_HERE'
PPLX_ENDPOINT = 'https://api.perplexity.ai/chat/completions'
DEFAULT_MODEL = os.getenv('PPLX_MODEL', 'sonar-small-online')

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({ 'status': 'ok', 'model': DEFAULT_MODEL }), 200

@app.route('/api/chat', methods=['POST'])
def chat():
    if not PPLX_API_KEY:
        return jsonify({ 'error': 'Missing PPLX_API_KEY on server' }), 500

    data = request.json
    if not data or not data.get('messages'):
        return jsonify({ 'error': 'Missing messages in request body' }), 400

    headers = {
        'Authorization': f'Bearer {PPLX_API_KEY}',
        'Content-Type': 'application/json'
    }

    model = data.get('model', DEFAULT_MODEL)
    messages = data.get('messages', [])
    
    payload = {
        'model': model,
        'messages': messages
    }
    
    # Add optional parameters if provided
    for param in ['temperature', 'max_tokens', 'top_p', 'stream']:
        if param in data:
            payload[param] = data[param]
    
    try:
        response = requests.post(PPLX_ENDPOINT, headers=headers, json=payload)
        return jsonify(response.json()), response.status_code
    except Exception as e:
        return jsonify({ 'error': str(e) }), 500

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('DEBUG', 'False').lower() == 'true'
    app.run(host='0.0.0.0', port=port, debug=debug)