from transformers import AutoTokenizer, AutoModel
import torch

# Load tokenizer and model
tokenizer = AutoTokenizer.from_pretrained("huggingface-model")
model = AutoModel.from_pretrained("huggingface-model")

def generate_embedding(book):
    
    inputs = tokenizer(book['title'], return_tensors="pt")
    outputs = model(**inputs)
    embedding = torch.mean(outputs.last_hidden_state, dim=1).squeeze().tolist()
    return embedding
