# 🚀 Deployment Guide

## ✅ Ready to Deploy!
Your app is built and ready. Choose a deployment method:

## 1. Railway (Recommended - Free & Easy)
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "Deploy from GitHub repo"
4. Select this repository
5. Railway auto-detects Python and deploys!

## 2. Render (Free Tier Available)
1. Go to [render.com](https://render.com)
2. Connect GitHub account
3. Create "Web Service"
4. Build Command: `npm install && npm run build && pip install -r requirements.txt`
5. Start Command: `python production_server.py`

## 3. Heroku (Classic Option)
```bash
# Install Heroku CLI first
heroku create your-app-name
git add .
git commit -m "Deploy"
git push heroku main
```

## 4. Local Test
```bash
python production_server.py
# Visit: http://localhost:5000
```

## 📁 Files Created:
- `production_server.py` - Single server for both frontend & API
- `Procfile` - Heroku deployment config
- `build/` - Optimized React files
- `.gitignore` - Excludes unnecessary files

## 🔑 Your API Key is Already Configured!
The Gemini API key is set in `production_server.py`