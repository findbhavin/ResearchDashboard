from pathlib import Path

from flask import Flask, abort, request, send_from_directory
from flask_babel import Babel

app = Flask(__name__)
app.config['BABEL_DEFAULT_LOCALE'] = 'en'
INPUTFILES_DIR = Path(__file__).parent / 'inputfiles'

def get_locale():
    return request.accept_languages.best_match(['en', 'ta'])

babel = Babel(app, locale_selector=get_locale)

@app.route('/')
def home():
    return send_from_directory(INPUTFILES_DIR, 'index.html')

@app.route('/index.html')
def home_alias():
    return send_from_directory(INPUTFILES_DIR, 'index.html')

@app.route('/pages/<path:page_name>')
def pages(page_name: str):
    if not page_name.endswith('.html'):
        abort(404)
    return send_from_directory(INPUTFILES_DIR / 'pages', page_name)

@app.route('/css/<path:asset_name>')
def css_assets(asset_name: str):
    return send_from_directory(INPUTFILES_DIR / 'css', asset_name)

@app.route('/js/<path:asset_name>')
def js_assets(asset_name: str):
    return send_from_directory(INPUTFILES_DIR / 'js', asset_name)

@app.route('/health')
def health_check():
    return {'status': 'healthy'}, 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
