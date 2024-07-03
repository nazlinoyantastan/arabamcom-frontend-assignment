<template>
  <div class="container">
    <div class="detail-page" v-if="advert">
      <div class="main-content">
        <div class="title">
          <h5>{{ advert.title }}</h5>
          <p class="location">{{ getLocation(advert.location) }}</p>
          <hr class="divider" />
        </div>
        <div class="left-column">
          <div class="car-image-slider">
            <swiper :slides-per-view="1" navigation pagination>
              <swiper-slide v-for="(photo, index) in advert.photos" :key="index">
                <img :src="formatImageUrl(photo)" @click="showFullscreen(formatImageUrl(photo))" alt="Car image" />
              </swiper-slide>
            </swiper>
          </div>
        </div>
        <div class="right-column">
          <div class="car-details">
            <ul>
              <li><strong>Fiyat:</strong> <span class="price">{{ advert.price }} ₺</span></li>
              <li><strong>İlan No:</strong> {{ advert.id }}</li>
              <li><strong>Model:</strong> {{ advert.modelName }}</li>
              <li><strong>İlan Tarihi:</strong> {{ advert.dateFormatted }}</li>             
              <li v-for="(property, index) in advert.properties" :key="index">
                <strong>{{ property.name }}:</strong> {{ property.value }}
              </li>
              
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="tabs">
      <button v-for="tab in tabs" :key="tab" @click="selectedTab = tab" :class="{ active: selectedTab === tab }">
        {{ tab }}
      </button>
    </div>
    <div class="tab-content">
      <div v-if="selectedTab === 'Açıklama'">
        <p v-html="advert?.text || 'Açıklama mevcut değil.'"></p>
      </div>
      <div v-if="selectedTab === 'Satıcı Bilgileri'">
        <div class="seller-info">
          <ul>
            <li><strong>Ad:</strong> {{ advert.userInfo?.nameSurname || 'Bilinmiyor' }}</li>
            <li><strong>Telefon:</strong> {{ advert.userInfo?.phoneFormatted || 'Bilinmiyor' }}</li>
          </ul>
        </div>
      </div>
    </div>
    <div v-if="fullscreenImage" class="fullscreen" @click="closeFullscreen">
      <img :src="fullscreenImage" />
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import api from '../api';

SwiperCore.use([Navigation, Pagination]);

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      advert: null,
      fullscreenImage: null,
      selectedTab: 'Açıklama',
      tabs: ['Açıklama', 'Satıcı Bilgileri'],
    };
  },
  methods: {
    fetchDetail() {
      const id = this.$route.params.id;
      api.getDetail(id)
        .then(response => {
          console.log('Fetched detail with id:', id);
          console.log('API response data:', response.data);
          this.advert = response.data;
        })
        .catch(error => {
          console.error('Error fetching advert:', error);
          this.advert = null; // Hata durumunda advert'i null olarak ayarlayın
        });
    },
    showFullscreen(photo) {
      this.fullscreenImage = photo;
    },
    closeFullscreen() {
      this.fullscreenImage = null;
    },
    getLocation(location) {
      if (!location) {
        return '';
      }
      return `${location.cityName}, ${location.townName}`;
    },
    formatImageUrl(url) {
      if (url) {
        return url.replace('{0}', '800x600'); // Change the placeholder with appropriate resolution
      }
      return '';
    },
  },
  created() {
    this.fetchDetail();
  },
};
</script>

<style scoped>
@import 'swiper/swiper-bundle.css';

.container {
  background-color: #f7f7f7;
}

.detail-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.main-content {
  display: flex;
  flex-wrap: wrap;
  width: 90%;
  margin: 20px 0;
  padding: 20px;
  background: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.title {
  width: 100%;
  margin-bottom: 20px;
}

.left-column {
  flex: 2;
  padding-right: 20px;
}

.left-column h1 {
  font-size: 24px;
  margin-bottom: 10px;
}

.left-column .location {
  color: gray;
  margin-bottom: 10px;
}

.left-column .divider {
  border: none;
  height: 1px;
  background-color: #ccc;
}

.car-image-slider {
  width: 100%;
  max-width: 600px; /* Resimlerin genişliğini sınırlamak için */
}

.swiper-slide img {
  width: 100%;
  height: auto;
  max-height: 400px; /* Resimlerin yüksekliğini sınırlamak için */
  cursor: pointer;
}

.right-column {
  flex: 1;
}

.car-details ul {
  list-style: none;
  padding: 0;
}

.car-details li {
  margin: 10px 0;
}

.price {
  margin-top: 20px;
}

.tabs {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.tabs button {
  background-color: #f1f1f1;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  margin: 0 5px;
}

.tabs button.active {
  background-color: #ccc;
}

.tab-content {
  width: 90%;
  margin-top: 20px;
  padding: 20px;
  background: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000; /* Fullscreen'in ön planda kalması için */
}

.fullscreen img {
  max-width: 90%;
  max-height: 90%;
}

.seller-info {
  width: 90%;
  margin-top: 20px;
  margin-bottom: 100px;
  padding-top: 20px;
}

.price {
  color: red;
  font-weight: bold;
}

</style>
