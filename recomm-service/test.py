from transformers import AutoModel, AutoTokenizer

model_name = "gpt2"  
token = "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"

tokenizer = AutoTokenizer.from_pretrained(model_name, use_auth_token=token)
model = AutoModel.from_pretrained(model_name, use_auth_token=token)

print(f"Embedding dimension: {model.config.hidden_size}")
