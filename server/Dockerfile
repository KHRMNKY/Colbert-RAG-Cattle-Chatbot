FROM nvidia/cuda:12.6.0-runtime-ubuntu22.04


RUN apt-get update
RUN apt-get install -y python3-pip
RUN apt-get install -y python3.10


WORKDIR /app


COPY requirements.txt .

RUN  pip3 install  --default-timeout=100 torch torchvision torchaudio

RUN pip install --no-cache-dir  --default-timeout=100  -r requirements.txt

COPY app /app 

COPY . .

EXPOSE 8000

CMD ["python3.10", "-m", "uvicorn", "app.api:app", "--host", "0.0.0.0", "--port", "8000"]