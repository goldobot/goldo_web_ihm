from flask import Flask

app = Flask(__name__)

@app.route('/')
def index():
    return open('dist/index.html').read()
    
@app.route('/<path:path>')
def foo(path):
    return open('dist/' + path).read()

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')