<template>
    <div>
      <h1>Araba Detayları</h1>
      <div v-if="advert">
        <img :src="advert.imageUrl" alt="Araba Resmi">
        <p>{{ advert.title }}</p>
        <p>{{ advert.description }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import api from '../api';
  
  export default {
    data() {
      return {
        advert: null,
      };
    },
    methods: {
      fetchDetail() {
        const id = this.$route.params.id;
        api.getDetail(id).then(response => {
          this.advert = response.data;
        });
      },
    },
    created() {
      this.fetchDetail();
    },
  };
  </script>
  
  <style>
  /* İstediğiniz stil düzenlemelerini buraya ekleyebilirsiniz */
  </style>
  