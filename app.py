from flask import Flask, render_template, redirect, url_for, request
from flask_babel import Babel, gettext

app = Flask(__name__)
app.config['BABEL_DEFAULT_LOCALE'] = 'en'

def get_locale():
    return request.accept_languages.best_match(['en', 'ta'])

babel = Babel(app, locale_selector=get_locale)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/health')
def health_check():
    return {'status': 'healthy'}, 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
