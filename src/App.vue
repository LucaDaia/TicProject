<template>
  <nav class="navbar">
    <img src="./assets/logoPictogram.png" alt="logo" class="logo">
    <router-link to="/" class="nav-link">Home</router-link>
    <h1 id="myMovieText">MyMovie</h1>
    <router-link to="/about" class="nav-link">About</router-link>
  </nav>
  <router-view/>
</template>

<style>
html, body {
  background-color: bisque; /* Set background color for the entire page */
}

#app {
  font-family: 'Poppins-Black', sans-serif; /* Change font family */
  text-align: center;
  color: #2c3e50;
  background-color: bisque;
}

@font-face {
  font-family: 'Poppins-Black';
  src: url('./assets/PoppinsFont/Poppins-Black.ttf');
  font-weight: normal;
  font-style: normal;
}

.navbar {
  background-color: rgb(27, 2, 82); /* Dark blue background color */
  padding: 50px; /* Decreased padding */
  display: flex;
  align-items: center; /* Center vertically */
}

.nav-link {
  font-weight: bold;
  font-size: 30px;
  color: #fff; /* White text color */
  text-decoration: none; /* Remove underline */
  margin: 0 10px; /* Add space between links */
  flex-grow: 1; /* Make links expand to fill available space */
}

.nav-link:hover {
  text-decoration: underline; /* Underline on hover */
}

.logo {
  width: 80px; /* Decreased width */
  height: auto; /* Maintain aspect ratio */
  margin-right: 20px; /* Add margin to separate logo from links */
}

#myMovieText {
  color: yellowgreen;
}
</style>
