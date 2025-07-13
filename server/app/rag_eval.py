from ragas import EvaluationDataset
from ragas.metrics import (
    AnswerRelevancy,
    Faithfulness,
    ContextPrecision
)
from agent import FarmAgent
from colbertt import Colbert
from ragas import evaluate

from langchain_huggingface import HuggingFaceEmbeddings
from agent import api_key
from langchain_google_genai import ChatGoogleGenerativeAI
from ragas.llms import LangchainLLMWrapper
from  langchain_google_genai import GoogleGenerativeAI


"""
test_questions = [
    "TAGEM-SUET yazılımı neyi amaçlamaktadır?"
    "2022 yılında damızlık et tavukçuluğunda geliştirilen yerli hatın ismi nedir?",
    "Vücut Kondüsyon Skoru (VKS) nedir ve ne işe yarar?",
    "Aşılamanın süt ineklerinde uygulanmasının temel amacı nedir?",
    "Canlı zayıflatılmış aşılar ile inaktif (ölü) aşılar arasındaki fark nedir?",
    "Buzağıların kolostrum alması neden önemlidir?",
    "Aşıların uygulanmasında dikkat edilmesi gereken en önemli noktalardan biri nedir?",
]



references = [
    "Türkiye’de Sulanan Bitkilerin Bitki Su Tüketimi Rehberi”nin dijital ortamda kullanımını sağlamaktadır.",
    "Anadolu-T",
    "VKS, süt ineklerinde vücutta yağ şeklinde depolanan enerji rezervinin ölçüsüdür. Besleme programının niteliğini ve enerji-besin maddesi ihtiyaçlarını izlemeye, laktasyon başlangıcındaki negatif enerji dengesini değerlendirmeye yarar.",
    "Aşılama, bulaşıcı hastalıkları önlemenin en etkili yöntemidir. Hastalıkla ilişkili üretim kayıplarını azaltır, sürdürülebilir hayvan üretimini sağlar, gebe kalma oranlarını ve ineklerin sağım süresini olumlu etkileyebilir.",
    "Canlı zayıflatılmış aşılar güçlü bağışıklık oluşturur ve ömür boyu koruma sağlayabilirken, inaktif (ölü) aşılar daha zayıf bağışıklık yanıtı oluşturur ve en az 2 kez uygulanmalıdır.",
    "Kolostrum; enerji, besin, vitamin, immünoglobülin ve biyoaktif maddeler içerir. Buzağılarda kısa süreli koruma sağlar, süt verimini ve ineklerin ömrünü etkiler. Doğumdan sonraki ilk saat içinde 3-4 litre alınması önemlidir.",
    "Aşı uygulaması sonrası alerjik reaksiyonlar (anafilaksi) meydana gelebileceğinden, hayvanlar 24 saat gözlem altında tutulmalıdır. Ayrıca soğuk zincir korunmalı, üretici talimatlarına uyulmalıdır.",   
]"""


test_questions = [
    "TAGEM-SUET yazılımı neyi amaçlamaktadır?"

]



references = [
    "Türkiye’de Sulanan Bitkilerin Bitki Su Tüketimi Rehberi”nin dijital ortamda kullanımını sağlamaktadır."]




dataset = []




def get_answer(query):
    """
    Get the answer for a given query using the Farmagent and Colber retriever.   
    """
    
    colbert = Colbert()
    knowledge_base = colbert.create_knowledge_base()
    agent = FarmAgent(knowledge_base, query )
    response = agent.farm_agent()
    retriever = colbert.create_retriever()
    answer = response.content if hasattr(response, 'content') else str(response)
    return answer, retriever


"""
def create_embedding_model():
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    return embeddings
"""


def create_embedding_model():
    """
    Create and return a HuggingFace embedding model for multilingual text.
    """
    model_name = "sentence-transformers/paraphrase-multilingual-mpnet-base-v2"
    model_kwargs = {'device': 'cuda'}
    encode_kwargs = {'normalize_embeddings': False}
    hf = HuggingFaceEmbeddings(
        model_name=model_name,
        model_kwargs=model_kwargs,
        encode_kwargs=encode_kwargs
    )
    return hf
    
    
"""def get_llm():
    llm = GoogleGenerativeAI(
        model="gemini-2.5-pro",
        api_key=api_key,
    )
    
    return LangchainLLMWrapper(llm)"""

def get_llm():
    """Create and return a Langchain LLM wrapper for the Groq model.
    """
    from langchain_groq import ChatGroq
    import os
    api_key = os.getenv("GROQ_API_KEY")
    llm = ChatGroq(
    model_name="llama-3.3-70b-versatile",
    temperature=0.7,
    api_key=api_key
)
    
    return LangchainLLMWrapper(llm)


def create_dataset():
    """Create a dataset for evaluation by retrieving answers and contexts for test questions.
    """
    for query, reference in zip(test_questions, references):
        answers, retriever = get_answer(query)
        docs = retriever.invoke(query)
        contexts = [doc.page_content for doc in docs]
        
        dataset.append(
            {
                "user_input" : query,
                "retrieved_contexts" : contexts,
                "response" : answers,
                "reference" : reference
            }
            
        )
    return dataset
        
        
        
        
if __name__ == "__main__":
    dataset = create_dataset()
    evaluation_dataset = EvaluationDataset.from_list(dataset)
    embeddings = create_embedding_model()

    result = evaluate(
        dataset=evaluation_dataset,
        metrics=[Faithfulness(), AnswerRelevancy(), ContextPrecision()],
        llm=get_llm(),
        embeddings=embeddings,
    )
    print(result)
