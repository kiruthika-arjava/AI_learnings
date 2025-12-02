import os
import subprocess
import sys

def run_command(cmd):
    print(f"Running: {cmd}")
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"Error: {result.stderr}")
        return False
    print(result.stdout)
    return True

def main():
    print("🚀 Building and preparing for deployment...")
    
    # Build React app
    if not run_command("npm run build"):
        print("❌ React build failed")
        return
    
    print("✅ React build completed")
    print("📁 Files ready for deployment")
    print("\n🌐 Deployment options:")
    print("1. Heroku: git push heroku main")
    print("2. Railway: Connect GitHub repo")
    print("3. Render: Connect GitHub repo")
    print("4. Manual: Upload files to your server")

if __name__ == "__main__":
    main()