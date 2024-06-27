<!-- src/components/AppHeader.vue -->
<template>
    <header>
      <nav>
        <h1>My Application</h1>
        <ul>
          <li><router-link to="/">Vitrin</router-link></li>
          
        </ul>
      </nav>
    </header>
  </template>
  
  <script>
  export default {
    name: 'AppHeader'
  }
  </script>
  
  <style scoped>
  header {
    background-color: #ffffff;
    
    padding: 1rem;
  }
  
  nav ul {
    list-style: none;
    display: flex;
    gap: 1rem;
  }
  
  nav ul li {
    display: inline;
  }
  
  nav ul li a {
    color: white;
    text-decoration: none;
  }
  
  nav ul li a:hover {
    text-decoration: underline;
  }
  </style>
  