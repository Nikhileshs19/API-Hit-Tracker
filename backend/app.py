import os
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime
import json 
from sqlalchemy.dialects.postgresql import JSON
from user_agents import parse
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://myuser:mypassword@localhost/ApiHitTracker'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your_secret_key'  # Change this to a secure key
db = SQLAlchemy(app)
socketio = SocketIO(app, cors_allowed_origins='*')  # Enable SocketIO with CORS

# Configure CORS to allow all origins for all routes under /api/
CORS(app)

class APIHit(db.Model):
    __tablename__ = 'APIHits'

    id = db.Column(db.Integer, primary_key=True)
    request_id = db.Column(db.String(255))
    request_type = db.Column(db.String(10))
    request_time = db.Column(db.DateTime)
    payload = db.Column(JSON)
    content_type = db.Column(db.String(255))
    ip_address = db.Column(db.String(50))
    os = db.Column(db.String(50))
    platform = db.Column(db.String(255))
    user_agent = db.Column(db.String(255))

@app.before_request
def log_request_info():
    payload = None
    if request.method != 'GET':
        payload = json.dumps(request.get_json()) if request.get_json() else None

    user_agent_string = request.user_agent.string
    user_agent = parse(user_agent_string)
    os = detect_os(request.user_agent.string) if request.user_agent else 'Unknown'
    user_agent_string = request.user_agent.string if request.user_agent else 'Unknown'
    
    api_hit = APIHit(
        request_id=request.endpoint,
        request_type=request.method,
        request_time=datetime.now(),
        payload=payload,
        content_type=request.headers.get('Content-Type') if request.method != 'GET' else None,
        ip_address=request.remote_addr,
        os=f"{user_agent.os.family} {user_agent.os.version_string}",
        platform=request.user_agent.string.split()[0],  # Assigning the first word from user_agent string to platform
        user_agent=request.user_agent.string
    )
    db.session.add(api_hit)
    db.session.commit()

    # Emitting socket.io event for new API hit
    socketio.emit('new_hit', {
        'id': api_hit.id,
        'request_id': api_hit.request_id,
        'request_type': api_hit.request_type,
        'request_time': api_hit.request_time.strftime('%Y-%m-%d %H:%M:%S'),
        'payload': api_hit.payload,
        'content_type': api_hit.content_type,
        'ip_address': api_hit.ip_address,
        'os': api_hit.os,
        'platform': api_hit.platform,
        'user_agent': api_hit.user_agent
    })

def detect_os(user_agent_string):
    if 'Windows' in user_agent_string:
        return 'Windows'
    elif 'Mac' in user_agent_string:
        return 'MacOS'
    elif 'Linux' in user_agent_string:
        return 'Linux'
    else:
        return 'Unknown'

@app.route('/api/hits', methods=['GET'])
def get_hits():
    hits = APIHit.query.all()
    hits_list = [
        {
            'id': hit.id,
            'request_id': hit.request_id,
            'request_type': hit.request_type,
            'request_time': hit.request_time.strftime('%Y-%m-%d %H:%M:%S'),
            'payload': hit.payload,
            'content_type': hit.content_type,
            'ip_address': hit.ip_address,
            'os': hit.os,
            'platform': hit.platform,
            'user_agent': hit.user_agent
        }
        for hit in hits
    ]
    response = jsonify(hits_list)
    response.headers['Content-Type'] = 'application/json'


    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Methods', 'GET')

    return response

@app.route('/api/update-items', methods=['POST'])
def update_items():
    return jsonify({"message": "Item updated successfully."}), 200

@app.route('/api/delete-item', methods=['DELETE'])
def delete_item():
    return jsonify({"message": "Item deleted successfully."}), 200

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    socketio.run(app, debug=True)
