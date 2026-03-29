import { initializeApp } from "firebase/app";
import {
  getFirestore,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  collection,
} from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyAwd9rHNDg4svn39KcfP8Ia1t7Xy7o6f7s",
  authDomain: "ecom-84195.firebaseapp.com",
  projectId: "ecom-84195",
  storageBucket: "ecom-84195.firebasestorage.app",
  messagingSenderId: "959142830243",
  appId: "1:959142830243:web:3108a85ae407a3a86f1f16",
  measurementId: "G-J3VB90W4LN",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const productsCollectionRef = collection(db, "products");

export async function fetchProductsData() {
  let dataArr = [];
  // try {
  //   console.log("Fetching from firebase");
  //   const querySnapshot = await getDocs(productsCollectionRef);
  //   dataArr = querySnapshot.docs.map((doc) => ({ ...doc.data() }));
  // } catch (error) {
  try {
    console.log("Fetching from dummyjson");
    const res = await fetch("https://dummyjson.com/product?limit=0");
    const data = await res.json();
    dataArr = data.products;
    return dataArr;
  } catch (error) {
    console.log("Error fetching data", error);
    return error;
  }
  // }
}
