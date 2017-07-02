from flask import Flask, render_template, redirect, url_for, request, jsonify
import functions


app = Flask(__name__)


@app.route('/')
def index():
    return render_template("index.html")


@app.route('/registration')
def registration():
        return render_template("registration.html")


@app.route('/registration_process', methods=['POST'])
def register_process():
    userdata = request.form
    username = userdata['username']
    password = userdata['password']
    if username and password:
        update_result = functions.database_update(username, password)
        if update_result == 'OK':
            success_message = "Hello " + username + " ! You have succesfully registered!"
            return jsonify({'successmessage': success_message})
        else:
            return jsonify({'errormessage': update_result})
    else:
        return jsonify({'errormessage': 'Missing data!'})


if __name__ == '__main__':
    app.run(debug=True)