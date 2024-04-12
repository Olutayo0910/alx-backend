#!/usr/bin/env python3
"""
Basic Flask App with User Authentication
"""

from flask import Flask, render_template, request, g
from flask_babel import Babel, _
import pytz

app = Flask(__name__, template_folder='templates')
babel = Babel(app)

# Mock user database
users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


class Config:
    """
    Configuration class for the Flask app
    """
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'


app.config.from_object(Config)


@babel.localeselector
def get_locale():
    """
    Determine the best match for the supported languages
    """
    if g.user and 'locale' in g.user:
        return g.user['locale']
    else:
        return request.accept_languages.best_match(app.config['LANGUAGES'])


def get_user(user_id):
    """
    Get user details from mock database
    """
    return users.get(user_id)


@app.before_request
def before_request():
    """
    Execute before all other functions
    """
    user_id = request.args.get('login_as')
    g.user = get_user(int(user_id)) if user_id else None


@app.route('/')
def index():
    """
    Render index.html template
    """
    welcome_message = _("You are logged in as %(username)s.") % \
        {'username': g.user['name']} if g.user else _("You are not logged in.")
    return render_template('5-index.html', welcome_message=welcome_message,
                           get_locale=get_locale)


if __name__ == '__main__':
    app.run(debug=True)
