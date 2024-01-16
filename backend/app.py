import pandas
from flask_cors import CORS
from flask import Flask, send_from_directory, jsonify, request, make_response


app = Flask(__name__, static_folder="frontend/  ", static_url_path="")
CORS(app)


import os
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def index(path):
    if path != "" and path != "api/search":
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")


@app.route('/api/get_data', methods=['GET'])
def get_data():
    print("API recieved")
    df = pandas.read_csv('final_perfume_data_with_prices.csv',
                         encoding='utf8', encoding_errors="ignore")
    records = df.to_json(orient='records')

    return jsonify(records)


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5001))
    app.run(debug=True, host='0.0.0.0', port=port)
