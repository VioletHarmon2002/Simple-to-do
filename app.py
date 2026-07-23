import json

from flask import Flask, request, render_template, url_for, jsonify

app = Flask(__name__)

path = "tasks.json"



#adding path
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api/tasks", methods=["GET"])
def get_tasks():
    tasks = open_json()
    

    return jsonify(tasks)

@app.route("/api/tasks", methods=["POST"])
def save_task():
    data = request.get_json()
    title = data["title"]
    add_task(title)

    tasks = open_json()

    return jsonify(tasks)

@app.route("/api/tasks/<int:id>", methods=["DELETE"])
def delete_tasks(id):
    delete_task(id)

    tasks = open_json()

    return jsonify(tasks)


    


#writing down helper functions for json data and functions
def open_json():
    with open(path, "r") as file:
        loaded_json = json.load(file)
    return loaded_json     

def write_json(data):
    with open(path, "w") as file:
        json.dump(data, file)
    

def add_task(data):
    tasks = open_json()
    new_id = max([p["id"] for p in tasks], default = 0) + 1
    tasks.append({"id": new_id, "title": data, "done": False})
    write_json(tasks)

def delete_task(data):  
    tasks = open_json()
    for task in tasks:
        if task["id"] == data:
            tasks.remove(task)
            break
    write_json(tasks)    


    

    


    


if __name__ == "__main__":
    app.run(debug=True)

