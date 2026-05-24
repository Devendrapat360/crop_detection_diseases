import os
import numpy as np

from flask import Blueprint, request, jsonify

from werkzeug.utils import secure_filename

from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image

predict_route = Blueprint('predict_route', __name__)

# =========================
# Create uploads folder
# =========================
os.makedirs('uploads', exist_ok=True)

# =========================
# Load AI Model
# =========================

model = load_model('../crop_disease_model.keras')
# =========================
# Disease Classes
# =========================
classes = [

    "Tomato Early Blight",

    "Tomato Late Blight",

    "Potato Healthy",

    "Potato Late Blight"
]

# =========================
# Prediction Route
# =========================
@predict_route.route('/predict', methods=['POST'])

def predict():

    if 'file' not in request.files:

        return jsonify({
            'error': 'No file uploaded'
        })

    image_file = request.files['file']

    filename = secure_filename(image_file.filename)

    save_path = os.path.join('uploads', filename)

    image_file.save(save_path)

    # =========================
    # Image Preprocessing
    # =========================
    img = image.load_img(

        save_path,

        target_size=(224, 224)
    )

    img_array = image.img_to_array(img)

    img_array = np.expand_dims(img_array, axis=0)

    img_array = img_array / 255.0

    # =========================
    # Prediction
    # =========================
    prediction = model.predict(img_array)

    predicted_index = np.argmax(prediction)

    confidence = float(np.max(prediction)) * 100

    disease = classes[predicted_index]

    # =========================
    # Solutions
    # =========================
    solutions = {

        "Tomato Early Blight":
        "Remove infected leaves and use fungicide.",

        "Tomato Late Blight":
        "Avoid overwatering and spray fungicide.",

        "Potato Healthy":
        "Crop is healthy.",

        "Potato Late Blight":
        "Use disease-free seeds."
    }

    solution = solutions.get(

        disease,

        "No solution available."
    )

    return jsonify({

        'prediction': disease,

        'confidence': f"{confidence:.2f}%",

        'solution': solution
    })