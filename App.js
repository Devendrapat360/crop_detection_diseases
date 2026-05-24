import { useState } from 'react';
import axios from 'axios';

function App() {

  // =========================
  // Authentication States
  // =========================
  const [isLogin, setIsLogin] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  // =========================
  // Image + Result States
  // =========================
  const [image, setImage] = useState(null);

  const [preview, setPreview] = useState(null);

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState(null);

  // =========================
  // Login/Register
  // =========================
  const handleLogin = () => {

    if (!email || !password) {

      alert('Please fill all fields');

      return;
    }

    alert(
      isLogin
      ? 'Login Successful'
      : 'Registration Successful'
    );

    setIsLoggedIn(true);
  };

  // =========================
  // File Change
  // =========================
  const handleFileChange = (event) => {

    const file = event.target.files[0];

    setImage(file);

    setPreview(URL.createObjectURL(file));

    setResult(null);
  };

  // =========================
  // Upload Image
  // =========================
  const handleUpload = async () => {

    if (!image) {

      alert('Please select image');

      return;
    }

    const formData = new FormData();

    formData.append('file', image);

    try {

      setLoading(true);

      const response = await axios.post(

        'http://127.0.0.1:5000/predict',

        formData,

        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      setResult(response.data);

      setLoading(false);

    }

    catch (error) {

      console.log(error);

      setLoading(false);

      alert('Backend Error');
    }
  };

  // =========================
  // MAIN APP SCREEN
  // =========================
  if (isLoggedIn) {

    return (

      <div
        style={{
          minHeight: '100vh',
          background: '#f4fff4',
          paddingTop: '40px',
          fontFamily: 'Arial'
        }}
      >

        <div
          style={{
            width: '500px',
            margin: 'auto',
            background: 'white',
            padding: '30px',
            borderRadius: '15px',
            boxShadow: '0px 0px 15px rgba(0,0,0,0.2)',
            textAlign: 'center'
          }}
        >

          <h1 style={{ color: 'green' }}>
            🌱 AI Crop Disease Detection
          </h1>

          <h3>
            Welcome User
          </h3>

          <p>
            Upload crop leaf image for AI prediction
          </p>

          {/* File Input */}

          <input
            type="file"
            onChange={handleFileChange}
          />

          <br /><br />

          {/* Upload Button */}

          <button
            onClick={handleUpload}
            style={{
              padding: '12px 25px',
              fontSize: '16px',
              background: 'green',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Predict Disease
          </button>

          <br /><br />

          {/* Image Preview */}

          {
            preview && (

              <div>

                <img
                  src={preview}
                  alt="preview"
                  width="300"
                  style={{
                    borderRadius: '10px',
                    border: '3px solid green'
                  }}
                />

              </div>
            )
          }

          <br />

          {/* Loading */}

          {
            loading && (

              <h2 style={{ color: 'orange' }}>
                Predicting...
              </h2>
            )
          }

          {/* Result */}

          {
            result && (

              <div
                style={{
                  marginTop: '20px',
                  background: '#f0fff0',
                  padding: '20px',
                  borderRadius: '10px',
                  border: '1px solid green'
                }}
              >

                <h2 style={{ color: 'darkgreen' }}>
                  Disease:
                </h2>

                <h3>
                  {result.prediction}
                </h3>

                <h2 style={{ color: 'darkgreen' }}>
                  Confidence:
                </h2>

                <h3>
                  {result.confidence}
                </h3>

                <h2 style={{ color: 'darkgreen' }}>
                  Solution:
                </h2>

                <p
                  style={{
                    fontSize: '18px'
                  }}
                >
                  {result.solution}
                </p>

              </div>
            )
          }

        </div>

      </div>
    );
  }

  // =========================
  // LOGIN / REGISTER SCREEN
  // =========================
  return (

    <div
      style={{
        minHeight: '100vh',
        background: '#f0fff0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Arial'
      }}
    >

      <div
        style={{
          width: '400px',
          background: 'white',
          padding: '30px',
          borderRadius: '15px',
          boxShadow: '0px 0px 15px rgba(0,0,0,0.2)',
          textAlign: 'center'
        }}
      >

        <h1 style={{ color: 'green' }}>
          🌱 AI Crop Detection
        </h1>

        <h2>
          {
            isLogin
            ? 'Login Form'
            : 'Registration Form'
          }
        </h2>

        {/* Name Input */}

        {
          !isLogin && (

            <input
              type="text"
              placeholder="Enter Name"
              style={{
                width: '90%',
                padding: '12px',
                marginBottom: '15px',
                borderRadius: '5px',
                border: '1px solid gray'
              }}
            />
          )
        }

        {/* Email */}

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: '90%',
            padding: '12px',
            marginBottom: '15px',
            borderRadius: '5px',
            border: '1px solid gray'
          }}
        />

        {/* Password */}

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: '90%',
            padding: '12px',
            marginBottom: '15px',
            borderRadius: '5px',
            border: '1px solid gray'
          }}
        />

        <br />

        {/* Login Button */}

        <button
          onClick={handleLogin}
          style={{
            padding: '12px 25px',
            fontSize: '16px',
            background: 'green',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          {
            isLogin
            ? 'Login'
            : 'Register'
          }
        </button>

        <br /><br />

        {/* Toggle Login/Register */}

        <p
          onClick={() => setIsLogin(!isLogin)}
          style={{
            color: 'blue',
            cursor: 'pointer'
          }}
        >
          {
            isLogin
            ? 'New user? Register here'
            : 'Already have account? Login'
          }
        </p>

      </div>

    </div>
  );
}

export default App;