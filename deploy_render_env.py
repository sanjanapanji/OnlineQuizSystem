import urllib.request
import json

token = 'rnd_Y4SymnRXygFGoOvZEcVlKGZQTAxW'
service_id = 'srv-d7133moule4c73ckvnd0'
url = f'https://api.render.com/v1/services/{service_id}/env-vars'

env_vars = [
    {"key": "DATABASE_URL", "value": "postgresql://neondb_owner:npg_yQjoG5kgivx7@ep-twilight-shadow-a111n2ar.ap-southeast-1.aws.neon.tech/OnlineQuizSystem?sslmode=require"},
    {"key": "SECRET_KEY", "value": "prod_secret_key_from_render_secure_env_var"}
]

req = urllib.request.Request(url, data=json.dumps(env_vars).encode(), headers={
    'Authorization': f'Bearer {token}', 
    'Content-Type': 'application/json',
    'Accept': 'application/json'
})
req.get_method = lambda: 'PUT'

try:
    with urllib.request.urlopen(req) as resp:
        print("Updated env vars:", resp.read().decode())
except urllib.error.HTTPError as e:
    print("Error updating env vars:", e.read().decode())
