// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore ,doc ,setDoc } from "firebase/firestore"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { firebaseConfig } from "../../globals/globalVariables";

function Firebase() {

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    // Initialize Cloud Firestore and get a reference to the service
    const db = getFirestore(app);

    const movies = [
        "spiderman",
        "batman",
        "superman",
        "aquaman"
    ];

    async function setDB(){
        await setDoc(doc(db, "movies", "active"), {
            title: movies[Math.floor(Math.random() * 4)],
        });
    }

  return (
    <button className="firebase" onClick={setDB}>Add spiderman to db</button>
  )
}

export default Firebase