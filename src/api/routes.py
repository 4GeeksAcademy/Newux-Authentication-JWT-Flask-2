"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token # needed to create a token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
import bcrypt, re
from werkzeug.security import generate_password_hash, check_password_hash

def check(email):
    regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'
    # pass the regular expression
    # and the string into the fullmatch() method
    if(re.fullmatch(regex, email)):
        return True
    else:
        return False

# creating flask app
api = Blueprint('api', __name__)

@api.route('/signup', methods=['POST'])
def create_user():

    body = request.get_json()

    email = body.get("email", None)
    password = body.get("password", None)

    

    hashed_password = generate_password_hash(password)


    if email != None and password != None:
        
        if check(email) == False:
            return { "message": "email format is invalid" }, 400
        

        try:
            new_user = User(email=email, password=hashed_password)

            db.session.add(new_user)

            db.session.commit()

            return jsonify({"message": "signup successful"}), 200

        except ValueError as error:
            return {"message": "An error has occured" + error}, 500
    
    else:
        return { "message": "user fields missing in request body" }, 400



# Create a route to authenticate your users and return JWTs. The
# Step (1) create_access_token() function is used to actually generate the JWT.
@api.route("/token", methods=["POST"]) #needed to create a token
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email = email).first()
    if not check_password_hash(user.password, password):
        return jsonify({"msg": "Bad username or password"}), 401
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)

@api.route('/profile')
@jwt_required()
def get_user_profile():
    email = get_jwt_identity()

    user = User.query.filter_by(email=email).one_or_none()
    if user is not None:
        return user.serialize(), 200
    
    return {"message": "Not Authorized"}, 401

@api.route("/hello", methods=["GET"])
@jwt_required() # makes it private, requires authorization
def get_hello():

    email = get_jwt_identity()
    dictionary = {
        "message": "Visit Dashboard",
        "status": "Status: Online"
        # "message": "Welcome, " + email
    }

    return jsonify(dictionary)

    