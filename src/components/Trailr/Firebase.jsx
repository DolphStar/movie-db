// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
import { doc, addDoc, setDoc } from "firebase/firestore";
import { collection, addCollection, setCollection } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { firebaseConfig } from "../../globals/globalVariables";

function Firebase() {

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    // Initialize Cloud Firestore and get a reference to the service
    const db = getFirestore(app);

    let newRoomRef = 'Not yet set';

    const roomConfig = {
      difficulty: "normal",
      dmgMultiplier: "1",
      movieID: "926393",
    };

    async function makeRoom(){
      newRoomRef = await addDoc(db, "rooms", roomConfig);
    }

  return (
    <>
    
    <div className="firebase">
      <button onClick={makeRoom}>Generate Room</button>
      <p>{newRoomRef}</p>
    </div>

    </>
  )
}

export default Firebase