<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container">
      <div class="navbar-left">
        <a class="navbar-brand" href="/">
          <img class="navbar-logo" src="@/assets/Arabam.com_logo.png" alt="Arabam.com Logo" />
        </a>
        <div class="navbar-search">
          <input type="text" placeholder="Kelime, galeri adı veya ilan no ile ara" class="search-input">
          <button class="search-button">
            <font-awesome-icon icon="fa-solid fa-search" />
          </button>
        </div>
      </div>
      <div class="navbar-right">
        <a href="#" class="login-link">Giriş Yap / Üye Ol</a>
        <button class="post-ad-button">Ücretsiz İlan Ver <font-awesome-icon icon="fa-solid fa-chevron-down" /></button>
      </div>
    </div>
  </nav>
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
  border-bottom: 1px solid #ddd;
}


.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #ddd;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.navbar-left {
  display: flex;
  align-items: center;
}

.navbar-logo {
  max-height: 40px;
  width: auto;
  margin-right: 1rem; 
}

.navbar-search {
  display: flex;
  flex-grow: 1;
  max-width: 600px; 
}

.search-input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-right: none;
  background: #F0F0F0;
  min-width: 300px; 
}

.search-button {
  padding: 0.5rem 1rem;
  background-color:#E40030;
  border: none;
  color: white;
 
  cursor: pointer;
}

.navbar-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.login-link {
  color: black;
  text-decoration: none;
}

.login-link:hover {
  text-decoration: underline;
}

.post-ad-button {
  padding: 0.5rem 1rem;
  background-color: #FFDB4D;
  border: none;
  color: black;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.post-ad-button:hover {
  background-color: #e6b800;
}
</style>
