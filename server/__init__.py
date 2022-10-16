from flask import Flask, request

app = Flask(__name__)


@app.route("/")
def index():
    return "Hello, World!"

@app.route("/jeremy", methods=['POST'])
def jeremy():
    request_data = request.get_json()

    user = request_data['user']

    longitude, latitude = user['longitude'], user['latitude']

    nearest_warehouse = request_data['nearest_warehouse']
    longitude, latitude = nearest_warehouse['longitude'], nearest_warehouse['latitude'] 
    
    return {
        'message': f'Hello You are at ({longitude}, {latitude})'
    }
