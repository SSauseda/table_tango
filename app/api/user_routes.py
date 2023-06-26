from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import db, User, Favorite, Reservation, Restaurant

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/restaurants')
def get_user_restaurant():
    curr_user_id = current_user.id
    restaurants = db.session.query(Restaurant).filter(
        Restaurant.user_id == curr_user_id).all()
    return {'Restaurants': [restaurant.to_dict() for restaurant in restaurants]}
        
        # if current_user.is_authenticated:
        # return str(current_user.id)
