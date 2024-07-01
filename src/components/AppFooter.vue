<template>
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-left">
            <span>arabam.com bir</span>
            <img src="@/assets/ilab.png" alt="iLab logo" class="ilab-logo">
            <span>grup şirketidir.</span>
          </div>
          <div class="footer-right">
            <ul class="ilab-partners">
              <li class="ilab-partner-item">
                <a href="https://www.kariyer.net/" rel="nofollow" target="_blank">Kariyer.net</a>
              </li>
              <li class="ilab-partner-item">
                <a href="https://isinolsun.com/" rel="nofollow" target="_blank">İsinolsun.com</a>
              </li>
              <li class="ilab-partner-item">
                <a href="https://www.emlakjet.com/" rel="nofollow" target="_blank">Emlakjet</a>
              </li>
              <li class="ilab-partner-item">
                <a href="https://www.sigortam.net/" rel="nofollow" target="_blank">Sigortam.net</a>
              </li>
              <li class="ilab-partner-item">
                <a href="https://www.hangikredi.com/" rel="nofollow" target="_blank">HangiKredi</a>
              </li>
              <li class="ilab-partner-item">
                <a href="https://www.neredekal.com/" rel="nofollow" target="_blank">Neredekal.com</a>
              </li>
              <li class="ilab-partner-item">
                <a href="https://www.cimri.com/" rel="nofollow" target="_blank">Cimri.com</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'AppFooter'
  }
  </script>
  
  <style scoped>
  .footer {
    background-color: rgb(255, 255, 255);
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
    font-size: 14px;
    border-top: 1px solid #ddd;
  }
  
  .footer .container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  
  .footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1200px;
  }
  
  .footer-left {
    display: flex;
    align-items: center;
    font-weight: bold;
  }
  
  .footer-left img {
    max-height: 20px;
    margin: 0 5px;
  }
  
  .footer-right {
    display: flex;
  }
  
  .ilab-partners {
    display: flex;
    gap: 1rem;
    color: #aaa;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .ilab-partner-item {
    display: flex;
    align-items: center;
  }
  
  .ilab-partner-item a {
    color: #aaa;
    text-decoration: none;
  }
  
  .ilab-partner-item a:hover {
    text-decoration: underline;
  }
  </style>
  