import urllib.request
import json
import os

token = 'rnd_Y4SymnRXygFGoOvZEcVlKGZQTAxW'
req = urllib.request.Request('https://api.render.com/v1/owners', headers={'Authorization': f'Bearer {token}'})
with urllib.request.urlopen(req) as response:
    data = json.loads(response.read().decode())
    print("Owners:", json.dumps(data, indent=2))
    
    if data:
        owner_id = data[0]['owner']['id']
        print("Using owner_id:", owner_id)
        
        # Now create the service
        url = "https://api.render.com/v1/services"
        payload = {
            "type": "web_service",
            "name": "online-quiz-backend",
            "ownerId": owner_id,
            "repo": "https://github.com/sanjanapanji/OnlineQuizSystem",
            "branch": "main",
            "autoDeploy": "yes",
            "rootDir": "backend",
            "serviceDetails": {
                "env": "python",
                "envSpecificDetails": {
                    "buildCommand": "pip install -r requirements.txt",
                    "startCommand": "uvicorn app.main:app --host 0.0.0.0 --port $PORT"
                },
                "region": "singapore",
                "plan": "free"
            }
        }
        
        req = urllib.request.Request(url, data=json.dumps(payload).encode(), headers={'Authorization': f'Bearer {token}', 'Content-Type': 'application/json'})
        req.get_method = lambda: 'POST'
        
        try:
            with urllib.request.urlopen(req) as resp:
                print("Created service:", resp.read().decode())
        except urllib.error.HTTPError as e:
            print("Error creating service:", e.read().decode())
