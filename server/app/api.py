from colbertt import Colbert
from agent import FarmAgent
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn 


app = FastAPI(
    title="Farmer Agent API",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization", "Accept"],
)




class QueryRequest(BaseModel):
    question: str

class QueryResponse(BaseModel):
    answer: str
    
    


@app.post("/chat", response_model=QueryResponse)
async def query_model_endpoint(request: QueryRequest):
    colbert = Colbert()
    knowledge_base = colbert.create_knowledge_base()
    agent = FarmAgent(knowledge_base, request.question)
    response = agent.farm_agent()
    answer = response.content if hasattr(response, 'content') else str(response)

    return QueryResponse(answer=answer)




if __name__ == "__main__":
    uvicorn.run("api:app", host="0.0.0.0", port=8000, reload=True)