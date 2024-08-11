import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    updatePassword,
    GoogleAuthProvider,
  } from "firebase/auth";
  import { auth, db } from "./firebase";
  import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
  
  export const doCreateUserWithEmailAndPassword = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Add user data to Firestore - set first time flag to true
    await setDoc(doc(db, "users", userCredential.user.uid), {
      email: userCredential.user.email,
      createdAt: new Date(),
      isFirstTimeUser: true,
    });
    return userCredential;
  };
  
  export const doSignInWithEmailAndPassword = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  
  export const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result;
  };
  
  export const doSignOut = () => {
    return auth.signOut();
  };
  
  export const doPasswordReset = (email) => {
    return sendPasswordResetEmail(auth, email);
  };
  
  export const doPasswordChange = (password) => {
    return updatePassword(auth.currentUser, password);
  };
  
  export const doSendEmailVerification = () => {
    return sendEmailVerification(auth.currentUser, {
      url: `${window.location.origin}/home`,
    });
  };

  export const getUserData = async (userID) => {
    const userDoc = await getDoc(doc(db, "users", userID));
    return userDoc.exists() ? userDoc.data() : null;
  }

  export const updateUserData = async (userID, data) => {
    await updateDoc(doc(db, "users", userID), data);
  }

  export const saveFormData = async (userID, formData) => {
    try {
      await setDoc(doc(db, "users", userID), { formData }, {merge: true});
    } catch (error) {
      console.error("Error saving form data: ", error);
    }
  }

  export const getFormData = async (userID) => {
    try {
      const docRef = doc(db, "users", userID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data().formData;
      }
    } catch (error) {
      console.error("Error fetching form data: ", error);
    }
  }
  