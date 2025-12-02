import requests
from flask import Flask, request, jsonify
from flask_cors import CORS

API_KEY = "AIzaSyBOt3i4EU-vULaC_8PMDMrR6Zls2WldOO8"
API_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={API_KEY}"

app = Flask(__name__)
CORS(app)  # Allow all origins for debugging

def generate_content(prompt):
    try:
        payload = {
            "contents": [{
                "parts": [{
                    "text": prompt
                }]
            }]
        }
        response = requests.post(API_URL, json=payload)
        print(f"API Response Status: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            return data["candidates"][0]["content"]["parts"][0]["text"]
        else:
            print(f"API Error: {response.text}")
            return f"Error generating content: {response.status_code}"
    except Exception as e:
        print(f"Exception in generate_content: {str(e)}")
        return f"Error: {str(e)}"

@app.route('/test', methods=['GET'])
def test():
    return jsonify({"message": "Backend is working!"})

@app.route('/generate', methods=['POST'])
def generate_study_material():
    print("Received request to /generate")
    try:
        data = request.json
        print(f"Request data: {data}")
        topic = data.get('topic', '')
        days = data.get('days', 10)
        hours = data.get('hours_per_day', 1.5)
        
        if not topic:
            return jsonify({"error": "Topic is required"}), 400
        
        print(f"Generating content for topic: {topic}")
        summary = generate_content(f"Write a comprehensive 4-paragraph summary about {topic}. Include key concepts, applications, and importance.")
        notes = generate_content(f"Create detailed study notes with bullet points for {topic}. Include main concepts, definitions, and examples.")
        plan = generate_content(f"Create a {days}-day study plan for {topic} with {hours} hours per day. Break down topics by day with specific learning objectives.")
        quiz = generate_content(f"Generate 5 multiple choice quiz questions about {topic} with correct answers and explanations.")
        
        return jsonify({
            "topic": topic,
            "summary": summary,
            "notes": notes,
            "plan": plan,
            "quiz": quiz
        })
    except Exception as e:
        print(f"Error in generate_study_material: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=5000)