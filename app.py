from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pandas as pd
import pickle
import xgboost as xgb

app = Flask(__name__)
CORS(app)

# Load Preprocessor 
try:
    with open("Preprocessor_3.pkl", "rb") as f:
        preprocessor = pickle.load(f)
    print(" Preprocessor loaded successfully")
except Exception as e:
    print(f" Failed to load preprocessor: {e}")
    preprocessor = None

#Load XGBoost Model
try:
    model = xgb.Booster()
    model.load_model("Emission.json")
    print("Model loaded successfully")
except Exception as e:
    print(f" Failed to load model: {e}")
    model = None


FEATURE_COLUMNS = [
    "Vehicle Class",              
    "Cylinders", 
    "Fuel Type",
    "Engine Size (Binned)",                                   
    "Engine_Cylinders",          
    "EnginePowerRatio",              
]


@app.route("/predict", methods=["POST"])
def predict():
    if model is None or preprocessor is None:
        return jsonify({"error": "Model or preprocessor not loaded"}), 500

    try:
        data = request.get_json()

        if "input" not in data:
            return jsonify({"error": "Missing 'input' in request"}), 400

       
        input_values = data["input"]
        if len(input_values) != len(FEATURE_COLUMNS):
            return jsonify({"error": f"Expected {len(FEATURE_COLUMNS)} values, got {len(input_values)}"}), 400

        
        df_input = pd.DataFrame([input_values], columns=FEATURE_COLUMNS)

      
        processed_input = preprocessor.transform(df_input)

      
        dmatrix = xgb.DMatrix(processed_input)
        prediction = model.predict(dmatrix)

        return jsonify({"prediction": prediction.tolist()})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/", methods=["GET"])
def home():
    return "Flask XGBoost API is running. POST to /predict with JSON { 'input': [val1, val2, val3, val4] }"

if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 5000))  # Render provides PORT
    app.run(host="0.0.0.0", port=port)
