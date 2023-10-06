// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
import { doc, addDoc, setDoc } from "firebase/firestore";
import { collection } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { firebaseConfig } from "../../globals/globalVariables";

function Firebase() {

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    // Initialize Cloud Firestore and get a reference to the service
    const db = getFirestore(app);

    async function makeRoom(){

      // New room ref
      const newRoom = collection(db, "rooms");

      // Create a new room **DOCUMENT**
      const newRoomRef = await addDoc(newRoom, {
        dmgMultiplier: 1,
        movieID: "Spiderman",
      });

      // New player ref
      const newPlayer = collection(db, "rooms", newRoomRef.id, "playerA");

      // Create playerA **COLLECTION**
      const newPlayerRef = await addDoc(newPlayer, {
        hp: "TESTING"
      });

      console.log("Auto-generated document ID: ", newRoomRef.id);
    }

    async function makeNewRoom(){
    }

  return (
    <>
    
    <div className="dev-panel-firebase">
      <h3>Firebase dev panel</h3>
      <p>Firebase testing</p>
      <button onClick={makeRoom}>Generate Room</button>
    </div>

    </>
  )
}

export default Firebase