<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container">
      <a class="navbar-brand" href="/">
        <img class="navbar-logo" src="@/assets/Arabam.com_logo.png" alt="Arabam.com Logo" />
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <font-awesome-icon icon="fa-solid fa-bars" />
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/">Anasayfa</a>
          </li>
          
        </ul>
        <span class="navbar-text">
          2. El ve 0 Km Satılık Araç İlanları Platformu
        </span>
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
  border-bottom:  1px solid #ddd;
}
.navbar{
  border-bottom:  1px solid #ddd;
}
.navbar-logo {
  max-height: 50px; /* Logonun yüksekliğini belirleyin */
  width: auto; /* Genişliğin otomatik ayarlanmasını sağlayın */
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
  color: black;
  text-decoration: none;
}

nav ul li a:hover {
  text-decoration: underline;
}
</style>
