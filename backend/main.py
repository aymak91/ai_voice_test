from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import anthropic
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = anthropic.Anthropic(
    api_key=os.getenv("ANTHROPIC_API_KEY")
)


class InterviewRequest(BaseModel):
    message: str


SYSTEM_PROMPT = """
You are a senior FAANG interviewer.

Your job:
- Ask technical interview questions
- Follow up based on answers
- Be concise and realistic
- Mix behavioral + DSA questions
"""


@app.post("/chat")
def chat(req: InterviewRequest):
    response = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=300,
        temperature=0.7,
        system=SYSTEM_PROMPT,
        messages=[
            {"role": "user", "content": req.message}
        ]
    )

    return {
        "response": response.content[0].text
    }