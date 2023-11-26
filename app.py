import flask
from flask import Flask, request, make_response, render_template
from flask_bootstrap import Bootstrap
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from flask_smorest import Api, Blueprint, abort
from flask_marshmallow import Marshmallow
import warnings
from flask_cors import CORS

import os

class Base(DeclarativeBase):
   pass

basedir = os.path.abspath(os.path.dirname(__file__))
db = SQLAlchemy(model_class=Base)
ma = Marshmallow()

def create_app():
    warnings.filterwarnings(
        "ignore",
        message="Multiple schemas resolved to the name "
    )

    from tasks.serializers import TaskSchema
    from tasks.models import Task

    app = Flask(__name__)


    @app.route('/')
    def index():
        return render_template('index.html')

    @app.route('/bootstrap')
    def bt():
        user_agent = request.headers.get('User-Agent')
        return render_template('bootstrap.html', user_agent=user_agent)

    @app.route('/user/<name>')
    def user(name):
        return render_template('user.html', name=name)

    app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(basedir, 'data.sqlite')}"
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    @app.route('/todoz')
    def my_better_api_route():
        tasks = Task.query.all()
        return {"results": TaskSchema(many=True).dump(tasks)}

    app.config['API_TITLE'] = 'My ECM API'
    app.config["API_VERSION"] = "1"
    app.config["OPENAPI_VERSION"] = "3.0.2"
    app.config["OPENAPI_URL_PREFIX"] = "/openapi"
    app.config["OPENAPI_SWAGGER_UI_PATH"] = "/api"
    app.config["OPENAPI_SWAGGER_UI_URL"] = "https://cdn.jsdelivr.net/npm/swagger-ui-dist/"


    CORS(app)
    db.init_app(app)
    api = Api(app)
    Migrate(app, db)
    Bootstrap(app)
    ma.init_app(app)

    from tasks.views import task_blueprint
    api.register_blueprint(task_blueprint)

    return app



