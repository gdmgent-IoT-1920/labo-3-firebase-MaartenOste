from flask import Flask, render_template
app = Flask(__name__)

@app.route("/")
def hello():
    return "<h1>Here I am Webserver</h1>"

@app.route("/sensehat")
def sensehat():
    return render_template("sensehat.html")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
