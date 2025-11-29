import requests
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def generate_content(prompt):
    """Simple REST API call to Gemini"""
    url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"
    headers = {"Content-Type": "application/json"}
    data = {
        "contents": [{"parts": [{"text": prompt}]}]
    }
    
    try:
        response = requests.post(f"{url}?key=AIzaSyD7-DQ3uL2ACJ59xQqiJR-g7eNhXwwg7Qw", 
                               headers=headers, json=data)
        result = response.json()
        if "candidates" in result and len(result["candidates"]) > 0:
            return result["candidates"][0]["content"]["parts"][0]["text"]
        else:
            return f"API Error: {result.get('error', {}).get('message', 'Unknown error')}"
    except Exception as e:
        return f"Error: {str(e)}"

@app.route('/generate', methods=['POST'])
def generate_study_material():
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

if __name__ == '__main__':
    app.run(debug=True, port=5000)