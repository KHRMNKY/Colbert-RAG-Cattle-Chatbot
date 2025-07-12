from langchain_community.document_loaders import PyPDFLoader
import os
from logging_config import *


class PDFLoader:
    def __init__(self, chunk_size = 1000, chunk_overlap = 200):
        self.chunk_size = chunk_size,
        self.chunk_overlap = chunk_overlap
        
        
    def load_single_pdf(self, pdf_path):
        if not os.path.exists(pdf_path):
            raise FileNotFoundError(f"PDF not found: {pdf_path}")
        
        loader = PyPDFLoader(pdf_path)
        docs = loader.load()
        logger.info(f"pdf loaded.. {pdf_path}")
        return docs
    
    
    def load_pdf_folder(self, folder_path):
        if not os.path.exists(folder_path):
            raise FileNotFoundError(f"Folder not found: {folder_path}")
        
        list_all_docs = []
        file_names = os.listdir(folder_path)
        for file_name in file_names:
            file_path = os.path.join(folder_path, file_name)
            loader = PyPDFLoader(file_path)
            docs = loader.load()
            list_all_docs.append(docs)
            logger.info(f"pdf loaded.. {file_name}")
        return list_all_docs
    
    
    
if __name__ == "__main__":
    loader = PDFLoader()
    print(loader.load_pdf_folder("/home/kahraman/Desktop/AI-Chatbot/server/uploaded_pdfs"))
    print(len(loader.load_pdf_folder("/home/kahraman/Desktop/AI-Chatbot/server/uploaded_pdfs")))
    