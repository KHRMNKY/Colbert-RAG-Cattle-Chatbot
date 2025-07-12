from ragas.metrics import (
    AnswerRelevancy,
    Faithfulness,
    ContextPrecision
)

from ragas import EvaluationDataset
from api import farm_agent, get_config

from ragas import evaluate




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
]


dataset = []


def get_answer(query):
    farmer_agent = farm_agent()
    response = farmer_agent.run(query)
    answer = response.content if hasattr(response, 'content') else str(response)
    return answer


def create_dataset():
    for query, reference in zip(test_questions, references):
        docs = retriever.invoke(query)
        contexts = [doc.page_content for doc in docs]
        answers = get_answer(query)
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
        llm=llm,
        embeddings=embeddings,
    )
    print(result)
