import os
import torch
from pymongo import MongoClient
from dotenv import load_dotenv
from sklearn.metrics.pairwise import cosine_similarity

load_dotenv()

# MongoDB setup
client = MongoClient(os.getenv("MONGO_URI"))
db = client['litlibrary']
books_collection = db['books']

def get_similar_books(book_id, top_n=5):
    book_data = books_collection.find_one({"_id": book_id})
    if not book_data or "embedding" not in book_data:
        return []
    
    target_embedding = torch.tensor(book_data["embedding"])
    all_books = books_collection.find({"embedding": {"$exists": True}})
    
    similarities = []
    for book in all_books:
        embedding = torch.tensor(book["embedding"])
        similarity = cosine_similarity(target_embedding, embedding)
        similarities.append((book, similarity))
    
    # Sort by similarity
    similarities.sort(key=lambda x: x[1], reverse=True)
    
    return [book for book, _ in similarities[:top_n]]

def get_recommendations_for_user(user_id):
    user_books = books_collection.find({"userId": user_id})
    recommended_books = []
    
    for book in user_books:
        recommended_books.extend(get_similar_books(book["_id"]))
    
    return recommended_books
