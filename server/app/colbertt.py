from ragatouille import RAGPretrainedModel
from ragatouille.integrations._langchain import RAGatouilleLangChainRetriever
from ragatouille import RAGPretrainedModel
from phi.knowledge.langchain import LangChainKnowledgeBase
import os
from logging_config import *

class Colbert:
    def create_retriever(self, index_path = ".ragatouille/colbert/indexes/pdf"):
        if not os.path.exists(index_path):
            raise FileNotFoundError(f"Index not found: {index_path}")
        else:
            RAG = RAGPretrainedModel.from_index(index_path)
            retriever = RAGatouilleLangChainRetriever(
                model=RAG
            )
        return retriever


    def create_knowledge_base(self):
        
        retriever = self.create_retriever()
        knowledge_base = LangChainKnowledgeBase(retriever=retriever)
        logger.info("knowledge base created successfully")
        return knowledge_base





if __name__ == "__main__":
    
    queries = ["süt sığırlarında ve buzağılarda aşılama programı nasıl olmalıdır ?","erkek simental kaç kg ağırlıa ulaşabilir ?","süt verimini etkileyen faktörler nelerdir ?", "sığır besiciliğine en uygun hayvan materyalleri hangileridir ? ", " yerli sığır ırklarımız nedir ?  "]
    path = "/home/kahraman/Desktop/AI-Chatbot/server/uploaded_pdfs/sigircilik.pdf"

    colbert = Colbert()
    knowledge_base = colbert.create_knowledge_base()
    print(knowledge_base.search(queries[0]))
