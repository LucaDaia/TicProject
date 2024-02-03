const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc, getDocs, updateDoc, doc } = require("firebase/firestore");

const firebaseConfig = {
    apiKey: "AIzaSyArY0hC0KttmyEfprYnCHVSgaUybXA92VM",
    authDomain: "ticproject-ba4b5.firebaseapp.com",
    projectId: "ticproject-ba4b5",
    storageBucket: "ticproject-ba4b5.appspot.com",
    messagingSenderId: "402005264280",
    appId: "1:402005264280:web:f849ef56fc00d78700cded",
    measurementId: "G-ENC960QZL7"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const usersCollection = collection(db, "users")
  const moviesCollection = collection(db, "movies")
  const categoryCollection = collection(db, "category")

  const addUser = async (username, password) => {
    try {
        const docRef = await addDoc(usersCollection, {
            name: username,
            password: password
        })
        console.log("Added ", docRef.id)
    } catch(e) {
        console.error('Error adding the user ', e)
    }
  }

  const getUsers = async () => {
    try {
        const querySnapshot = await getDocs(usersCollection);
        const users = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return users;
    } catch (error) {
        console.error('Error getting users:', error);
        throw error; // Rethrow the error to handle it at a higher level
    }
};

  const addMovie = async (userNameP, titleP, categoryP, descriptionP, castP, durationP, ratingP) => {
    try {
        const docRef = await addDoc(moviesCollection, {
            username: userNameP,
            title: titleP,
            category: categoryP,
            description: descriptionP,
            cast: castP,
            duration: durationP,
            rating: ratingP
        })
        console.log("Added movie", docRef.id)
    } catch(e) {
        console.error("Couldnt add movie!")
    }
  }

  const editMovie = async (movieId, userNameP, titleP, categoryP, descriptionP, castP, durationP, ratingP) => {
    try {
        const movieRef = doc(db, 'movies', movieId)
        await updateDoc(movieRef, {
            username: userNameP,
            title: titleP,
            category: categoryP,
            description: descriptionP,
            cast: castP,
            duration: durationP,
            rating: ratingP
        })
        console.log("Movie updated succesfully!")
    } catch(error) {
        console.error("Error updating the movie:", error)
    }
  }

  const getMovies = async () => {
    try {
        const querySnapshot = await getDocs(moviesCollection);
        const movies = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return movies;
    } catch (error) {
        console.error('Error getting movies:', error);
        throw error; // Rethrow the error to handle it at a higher level
    }
  }

  const addCategory = async (nameOfCategoryP, stapleMoviesP) => {
    try {
        const docRef = await addDoc(categoryCollection, {
            nameOfCategory: nameOfCategoryP,
            stapleMovies: stapleMoviesP
        })
        console.log('Category added', docRef.id)
    } catch (e) {
        console.error('Error adding category', error)
    }
  }

  const getCategories = async () => {
    try {
        const querySnapshot = await getDocs(categoryCollection);
        const categories = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return categories;
    } catch (error) {
        console.error('Error getting categories:', error);
    
    }
  }

  module.exports = { getUsers, addUser, getMovies, addMovie, getCategories, addCategory, editMovie }