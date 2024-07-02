<template>
  <div class="detail-page" v-if="advert">
    <div class="main-content">
      <div class="car-image-slider">
        <swiper :slides-per-view="1" navigation pagination>
          <swiper-slide v-for="(photo, index) in advert.photos" :key="index">
            <img :src="formatImageUrl(photo)" @click="showFullscreen(formatImageUrl(photo))" alt="Car image" />
          </swiper-slide>
        </swiper>
      </div>
      <div class="car-details">
        <h2>{{ advert.title }}</h2>
        <ul>
          <li><strong>Price:</strong> {{ advert.priceFormatted }}</li>
          <li><strong>Category:</strong> {{ advert.category.name }}</li>
          <li><strong>Model:</strong> {{ advert.modelName }}</li>
          <li><strong>Date:</strong> {{ advert.dateFormatted }}</li>
          <li><strong>Location:</strong> {{ getLocation(advert.location) }}</li>
          <li v-for="(property, index) in advert.properties" :key="index">
            <strong>{{ property.name }}:</strong> {{ property.value }}
          </li>
        </ul>
      </div>
    </div>
    <div class="tabs">
      <button v-for="tab in tabs" :key="tab" @click="selectedTab = tab" :class="{ active: selectedTab === tab }">
        {{ tab }}
      </button>
    </div>
    <div class="tab-content">
      <div v-if="selectedTab === 'Açıklama'">
        <p v-html="advert.text"></p>
      </div>
      <div v-if="selectedTab === 'Satıcı Bilgileri'">
      <div class="seller-info">
      <ul>
        <li><strong>Ad:</strong> {{ advert.userInfo.nameSurname }}</li>
        <li><strong>Telefon:</strong> {{ advert.userInfo.phoneFormatted }}</li>
      </ul>
    </div>
    </div>
      <!-- Diğer sekmeler için içerikler buraya eklenecek -->
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
      api.getDetail(id).then(response => {
        console.log('Fetched detail with id:', id);
        console.log('API response data:', response.data);
        this.advert = response.data;
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

.detail-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.main-content {
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: 20px 0;
}
.car-image-slider {
  flex: 3;
  width: 60%;
}
.swiper-slide img {
  width: 100%;
  height: auto;
  cursor: pointer;
}
.car-details {
  flex: 1;
  margin-left: 20px;
}
.car-details ul {
  list-style: none;
  padding: 0;
}
.car-details li {
  margin: 10px 0;
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
</style>
