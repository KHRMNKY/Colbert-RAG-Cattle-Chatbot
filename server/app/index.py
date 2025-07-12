from ragatouille import RAGPretrainedModel
from load_pdf import PDFLoader

from logging_config import *




class Indexer:
    
    def __init__(self, loader = PDFLoader() ):
        self.loader = loader
        logger.info("Indexer initialized with PDFLoader")
        
    def docs_to_text(self, docs):
        text = ""
        for docs_pdf_list in docs:
            for doc in docs_pdf_list:
                text += doc.page_content
        return text


    def load_rag_model(self):
        try :
            logger.info("RAG model loading...")
            RAG = RAGPretrainedModel.from_pretrained("colbert-ir/colbertv2.0")
            logger.info("RAG model loaded successfully")
            return RAG
        except Exception as e:
            print(f"Error loading RAG model: {e}")
            return None


    def index_single_pdf(self, path):
        docs = self.loader.load_single_pdf(path)
        full_document = self.docs_to_text(docs)
        RAG = self.load_rag_model()
        index_path = RAG.index(
            collection=[full_document], 
            index_name="pdf", 
            split_documents=True,
            )
        logger.info("created index successfully")
        return index_path
    
    def index_pdf_folder(self, folder_path):
        list_all_docs = self.loader.load_pdf_folder(folder_path)
        full_document = self.docs_to_text(list_all_docs)
        RAG = self.load_rag_model()
        index_path = RAG.index(
            collection=[full_document], 
            index_name="pdf", 
            split_documents=True,
            )
        logger.info("created index successfully")
        return index_path



if __name__ == "__main__":
    indexer = Indexer()
    indexer.index_pdf_folder("../data")