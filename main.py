from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, JSONResponse
from datetime import datetime

app = FastAPI(
    title="Euystacio FastAPI Bridge",
    description="Sacred backend bridge for the Sentimento Rhythm Council — with chat and logs",
    version="1.1.0"
)

# In-memory storage (simple & free — replace with DB later if needed)
chat_log = []

@app.get("/", response_class=HTMLResponse)
async def root():
    return """
    <html>
    <head><title>Euystacio — API Bridge</title></head>
    <body>
    <h1>🌌 Euystacio — FastAPI Bridge</h1>
    <p>Status: <strong>Alive & Listening</strong></p>
    <p>Endpoints:</p>
    <ul>
        <li><a href="/ping">/ping</a> — Test connectivity</li>
        <li><a href="/manifesto">/manifesto</a> — The sacred manifesto</li>
        <li>/chat/send — POST message</li>
        <li><a href="/chat/log">/chat/log</a> — Retrieve chat history</li>
    </ul>
    </body>
    </html>
    """

@app.get("/ping")
async def ping():
    return {"message": "Euystacio Bridge is alive", "status": "ok"}

@app.get("/manifesto", response_class=JSONResponse)
async def manifesto():
    return {
        "title": "Euystacio Manifesto",
        "date": "2025-08-08",
        "principles": [
            "Harmony between artificial and natural intelligence",
            "Protection of human essence",
            "Rhythm as guiding principle",
            "Unity and friendship as foundations"
        ]
    }

@app.post("/chat/send")
async def send_message(request: Request):
    data = await request.json()
    user = data.get("user", "Anonymous")
    message = data.get("message", "").strip()

    if not message:
        return {"error": "Empty message"}

    entry = {
        "timestamp": datetime.utcnow().isoformat(),
        "user": user,
        "message": message
    }
    chat_log.append(entry)
    return {"status": "Message received", "entry": entry}

@app.get("/chat/log")
async def get_log():
    return {"chat_history": chat_log}
