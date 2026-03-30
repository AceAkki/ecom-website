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

export async function fetchProductsData(category: string | undefined) {
  let dataArr = [];
  // try {
  //   console.log("Fetching from firebase")
  //   const querySnapshot = await getDocs(productsCollectionRef);
  //   dataArr = querySnapshot.docs.map((doc) => ({ ...doc.data() }));
  // } catch (error) {
  try {
    console.log("Fetching from dummyjson");
    // category based - needs to be corrected
    let mainCategories = {
      "personal-care": ["beauty", "fragrances", "skin-care"],
      "home-&-living": [
        "furniture",
        "groceries",
        "home-decoration",
        "kitchen-accessories",
      ],
      electronics: ["laptops", "mobile-accessories", "smartphones", "tablets"],
      vehicles: ["motorcycle", "vehicle"],
      accessories: ["sports-accessories", "sunglasses"],
      "mens-fashion": ["mens-shirts", "mens-shoes", "mens-watches"],
      "womens-fashion": [
        "tops",
        "womens-bags",
        "womens-dresses",
        "womens-jewellery",
        "womens-shoes",
        "womens-watches",
      ],
    };

    if (category !== undefined) {
      let mainCategorykey =
        category.toLowerCase() as any as keyof typeof mainCategories;
      console.log(mainCategories[mainCategorykey], mainCategories, category);
      let categories = mainCategories[mainCategorykey];
      let categoriesArr = categories.map(
        (cat) => `https://dummyjson.com/products/category/${cat}`,
      );
      let resArr = await Promise.all(categoriesArr.map((link) => fetch(link)));
      let resDataArr = await Promise.all(
        resArr.map(async (response) => await response.json()),
      );
      let tempArr: any = [];
      resDataArr.forEach((dtArr) => {
        tempArr.push(dtArr.products);
      });
      dataArr = tempArr.flat();
      return dataArr;
    } else {
      const res = await fetch("https://dummyjson.com/product?limit=0");
      const data = await res.json();
      dataArr = data.products;
      return dataArr;
    }
  } catch (error) {
    console.log("Error fetching data", error);
    return error;
  }
  // }
}
