import requests
from flask import Flask, request, jsonify
from flask_cors import CORS

API_KEY = "AIzaSyC6HrU2lpg1Vkyr6WUuCEqMwe3c54Ss79o"
API_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={API_KEY}"

app = Flask(__name__)
CORS(app)

def generate_content(prompt):
    payload = {
        "contents": [{
            "parts": [{
                "text": prompt
            }]
        }]
    }
    response = requests.post(API_URL, json=payload)
    if response.status_code == 200:
        return response.json()["candidates"][0]["content"]["parts"][0]["text"]
    else:
        raise Exception(f"API Error: {response.text}")

@app.route('/generate', methods=['POST'])
def generate_study_material():
    try:
        data = request.json
        topic = data.get('topic', '')
        
        summary = generate_content(f"Write a 4-paragraph summary about {topic}")
        notes = generate_content(f"Create study notes with bullet points for {topic}")
        plan = generate_content(f"Create a 10-day study plan for {topic}")
        quiz = generate_content(f"Generate 5 quiz questions about {topic} with answers")
        
        return jsonify({
            "topic": topic,
            "summary": summary,
            "notes": notes,
            "plan": plan,
            "quiz": quiz
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)