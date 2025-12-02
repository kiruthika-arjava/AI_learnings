import os
import requests
from flask import Flask, request, jsonify, send_from_directory, send_file
from flask_cors import CORS

API_KEY = "AIzaSyBOt3i4EU-vULaC_8PMDMrR6Zls2WldOO8"
API_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={API_KEY}"

app = Flask(__name__, static_folder='build', static_url_path='')
CORS(app)

def generate_content(prompt):
    try:
        payload = {"contents": [{"parts": [{"text": prompt}]}]}
        response = requests.post(API_URL, json=payload)
        if response.status_code == 200:
            data = response.json()
            return data["candidates"][0]["content"]["parts"][0]["text"]
        return f"Error: {response.status_code}"
    except Exception as e:
        return f"Error: {str(e)}"

@app.route('/api/generate', methods=['POST'])
def generate_study_material():
    data = request.json
    topic = data.get('topic', '')
    days = data.get('days', 10)
    hours = data.get('hours_per_day', 1.5)
    
    if not topic:
        return jsonify({"error": "Topic required"}), 400
    
    summary = generate_content(f"Write a 4-paragraph summary about {topic}")
    notes = generate_content(f"Create study notes for {topic} with bullet points")
    plan = generate_content(f"Create a {days}-day study plan for {topic} with {hours} hours/day")
    quiz = generate_content(f"Generate 5 quiz questions about {topic} with answers")
    
    return jsonify({"topic": topic, "summary": summary, "notes": notes, "plan": plan, "quiz": quiz})

@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def static_proxy(path):
    return send_from_directory(app.static_folder, path)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)