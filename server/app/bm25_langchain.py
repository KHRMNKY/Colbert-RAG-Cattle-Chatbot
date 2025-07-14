from langchain_community.retrievers import BM25Retriever
from load_pdf import PDFLoader
import os


def get_docs(path):
    """
    get docs from pdf or pdfs
    """
    loader = PDFLoader()
    
    if os.listdir(path) == 1:
        
        docs = loader.load_single_pdf(path)
        return docs
        
    else :
        docs = loader.load_pdf_folder(path)
        
    return docs

def get_bm25_retriever(path):
    docs = get_docs(path)
    bm25_retriever = BM25Retriever.from_documents(docs)

    return bm25_retriever


if __name__ == "__main__":
    print(get_bm25_retriever("../data"))