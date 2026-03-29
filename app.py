from flask import Flask, render_template, request, redirect, url_for
from flask_babel import Babel

app = Flask(__name__)
app.config['LANGUAGES'] = ['en', 'hi']
app.config['BABEL_DEFAULT_LOCALE'] = 'en'

babel = Babel(app)

@babel.localeselector
def get_locale():
    return request.accept_languages.best_match(app.config['LANGUAGES'])

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/switch_language/<lang>')
def switch_language(lang):
    # Set the language in session or cookie here
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)