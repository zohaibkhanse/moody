import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  updateDoc,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyDqdWS2ROyQr2VobygKtek17uQszt_qQS4",
  authDomain: "moodi-87fe4.firebaseapp.com",
  projectId: "moodi-87fe4",
  storageBucket: "moodi-87fe4.appspot.com",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const onSnapshotC = onSnapshot;
const collectionC = collection;
const dbC = db;
const authC = auth;
const queryC = query;
const whereC = where;
const getDocsC = getDocs;
// const onAuthStateChangedC = onAuthStateChanged;
export { onSnapshotC, collectionC, dbC, authC, queryC, whereC, getDocsC };
//////////////////////////////////////////////////////////////
// STATE
//////////////////////////////////////////////////////////////
export const state = {
  account: {},
};

////////////////////////////////////////

export const createNewUserAccount = async function () {
  try {
    const res = await createUserWithEmailAndPassword(
      auth,
      state.account.email.trim().toLowerCase(),
      +state.account.password
    );

    if (auth.currentUser !== null) {
      updateProfile(auth.currentUser, {
        displayName: state.account.userName,
        photoURL: state.account.pictureURL,
      });
    }
    console.log("Account Created Successfully 😍👍👍👍");
  } catch (error) {
    // if (error.message === "Firebase: Error (auth/email-already-in-use).") {
    //   throw new Error("Email already in use. Please try with another email.");
    // }
    // if (
    //   error.message ===
    //   "Firebase: Password should be at least 6 characters (auth/weak-password)."
    // ) {
    //   throw new Error("Password at least 6 characters long.");
    // };
    throw error;
  }
};

export const signInAccount = async function () {
  try {
    const res = await signInWithEmailAndPassword(
      auth,
      state.account.email,
      state.account.password
    );
   
    state.displayName = auth.currentUser.displayName;
    state.pictureURL = auth.currentUser.photoURL;
    state;
  } catch (error) {
    throw error;
  }
};

//=============================
// Sign Out User
//=============================

export const signoutUserAccount = async function () {
  try {
    await signOut(auth);
    console.log(`User has been logged out 👍👍😂😂`);
    return true;
  } catch (error) {
    throw error;
  }
};

// =====================================
// Update Post in Firestore
// =====================================
export const updatePostInFirestore = async function (data, postId) {
  try {
    const postRef = doc(db, "posts", postId);

    // Set the "capital" field of the city 'DC'
    await updateDoc(postRef, {
      body: data,
    });
    console.log("Content updated successfully 👍👍👍");
  } catch (error) {
    throw error;
  }
};
// =====================================
// Store new post in Firestore
// =====================================
export const storePostInFirestore = async function (data, user) {
  try {
    await addDoc(collection(db, "posts"), {
      body: data,
      uid: user.uid,
      userName: state.displayName,
      userPhotoURL: state.pictureURL,
      postedDate: Date.now(),
    });
  } catch (error) {
    throw error;
  }
};
// =====================================
// Store new post in Firestore
// =====================================
export const deletePostFromFirestore = async function (postId) {
  try {
    await deleteDoc(doc(db, "posts", postId));
  } catch (error) {
    throw error;
  }
};
