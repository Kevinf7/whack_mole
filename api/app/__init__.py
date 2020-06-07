from flask import Flask
from config import Config
from flask_cors import CORS

app = Flask(__name__, static_folder='../../dist', static_url_path='/')
app.config.from_object(Config)

# enable CORS
# CORS(app)

# from app import api1, api2, api3 .. etc
from . import routes
