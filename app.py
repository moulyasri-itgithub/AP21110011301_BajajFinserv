from flask import Flask, request, jsonify
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return jsonify({'message': 'Hello from the backend!'})


def generate_user_id():
    return "Moulyasri_Amudalapalli_27012005"

@app.route('/bfhl', methods=['GET', 'POST'])
def handle_request():
    if request.method == 'GET':
        return jsonify({"operation_code": 1}), 200

    if request.method == 'POST':
        try:
            data = request.get_json()
            data_list = data.get('data')
            if not data_list:
                return jsonify({"is_success": False, "error": "Missing data key in request"}), 400
        except json.JSONDecodeError:
            return jsonify({"is_success": False, "error": "Invalid JSON format"}), 400

        numbers = []
        alphabets = []
        highest_alphabet = []

        for item in data_list:
            if isinstance(item, str):
                alphabets.append(item.upper())
                highest_alphabet.append(max(alphabets, key=lambda x: ord(x)))
            elif isinstance(item, int):
                numbers.append(item)

        response = {
            "is_success": True,
            "user_id": generate_user_id(),
            "email": "moulyasri_a@srmap.edu.in",  
            "roll_number": "AP21110011301", 
            "numbers": numbers,
            "alphabets": alphabets,
            "highest_alphabet": highest_alphabet
        }
        return jsonify(response), 200

if __name__ == '__main__':
    app.run(debug=True)
