import os
import tensorflow as tf

from tensorflow.keras.models import Sequential

from tensorflow.keras.layers import (
    Conv2D,
    MaxPooling2D,
    Flatten,
    Dense,
    Dropout
)

from tensorflow.keras.preprocessing.image import ImageDataGenerator

# =========================
# Create model folder
# =========================
os.makedirs("model", exist_ok=True)

# =========================
# Dataset Path
# =========================
dataset_path = "dataset"

# =========================
# Image Generator
# =========================
train_datagen = ImageDataGenerator(

    rescale=1./255,

    validation_split=0.2
)

# =========================
# Training Data
# =========================
train_generator = train_datagen.flow_from_directory(

    dataset_path,

    target_size=(224, 224),

    batch_size=32,

    class_mode='categorical',

    subset='training'
)

# =========================
# Validation Data
# =========================
validation_generator = train_datagen.flow_from_directory(

    dataset_path,

    target_size=(224, 224),

    batch_size=32,

    class_mode='categorical',

    subset='validation'
)

# =========================
# CNN Model
# =========================
model = Sequential()

model.add(
    Conv2D(
        32,
        (3,3),
        activation='relu',
        input_shape=(224,224,3)
    )
)

model.add(MaxPooling2D(2,2))

model.add(
    Conv2D(
        64,
        (3,3),
        activation='relu'
    )
)

model.add(MaxPooling2D(2,2))

model.add(Flatten())

model.add(Dense(128, activation='relu'))

model.add(Dropout(0.5))

model.add(
    Dense(
        train_generator.num_classes,
        activation='softmax'
    )
)

# =========================
# Compile Model
# =========================
model.compile(

    optimizer='adam',

    loss='categorical_crossentropy',

    metrics=['accuracy']
)

# =========================
# Train Model
# =========================
model.fit(

    train_generator,

    validation_data=validation_generator,

    epochs=5
)

# =========================
# Save Model
# =========================
model.save(

    "crop_disease_model.keras"
)

print("✅ Model Saved Successfully")