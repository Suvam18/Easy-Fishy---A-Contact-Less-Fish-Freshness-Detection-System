import sys
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

USERS_FILE = '/tmp/users.json' if os.environ.get('VERCEL') else 'users.json'

# Ensure users.json exists
if not os.path.exists(USERS_FILE):
    with open(USERS_FILE, 'w') as f:
        json.dump([], f)

def load_users():
    with open(USERS_FILE, 'r') as f:
        return json.load(f)

def save_users(users):
    with open(USERS_FILE, 'w') as f:
        json.dump(users, f, indent=4)

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.json
    first_name = data.get('firstName')
    email = data.get('email')
    password = data.get('password')

    if not first_name or not email or not password:
        return jsonify({'error': 'Missing fields'}), 400

    users = load_users()
    if any(u['email'] == email for u in users):
        return jsonify({'error': 'Email already exists'}), 400

    new_user = {
        'firstName': first_name,
        'email': email,
        'password': password  # In a real app, hash this!
    }
    users.append(new_user)
    save_users(users)

    return jsonify({'message': 'User created', 'user': {'firstName': first_name, 'email': email}}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    users = load_users()
    user = next((u for u in users if u['email'] == email and u['password'] == password), None)

    if user:
        return jsonify({'message': 'Login successful', 'user': {'firstName': user['firstName'], 'email': user['email']}}), 200
    else:
        return jsonify({'error': 'Invalid credentials'}), 401

@app.route('/')
def index():
    return send_from_directory('..', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('..', path)
