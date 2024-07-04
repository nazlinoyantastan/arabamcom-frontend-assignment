<template>
  <div class="container">
    <div class="detail-page" v-if="advert">
      <div class="main-content">
        <div class="title">
          <div class="title-detail">
            <div>
              <h5>{{ advert.title }}</h5>
              <p class="location">{{ getLocation(advert.location) }}</p>
            </div>
            <div>
              <button class="seller-info-btn" @click="showModal = true">
                Satıcı Bilgileri
              </button>
            </div>
          </div>
          <hr class="divider" />
        </div>

        <div class="left-column">
          <div class="car-image-slider">
            <swiper :slides-per-view="1" navigation pagination>
              <swiper-slide
                v-for="(photo, index) in advert.photos"
                :key="index"
              >
                <img
                  :src="formatImageUrl(photo)"
                  @click="showFullscreen(formatImageUrl(photo))"
                  alt="Car image"
                />
              </swiper-slide>
            </swiper>
          </div>
        </div>
        <div class="right-column">
          <div class="car-details">
            <ul>
              <li>
                <strong>Fiyat:</strong>
                <span class="price">{{ formatPrice(advert.price) }} ₺</span>
              </li>
              <li>
                <a
                  href="https://www.arabam.com/oto-ekspertiz"
                  class="expertise-btn"
                  target="_blank"
                  >Ekspertiz teklifleri</a
                >
              </li>
              <li><strong>İlan No:</strong> {{ advert.id }}</li>
              <li><strong>İlan Tarihi:</strong> {{ advert.dateFormatted }}</li>
              <li><strong>Model:</strong> {{ advert.modelName }}</li>
              <li v-for="(property, index) in customProperties" :key="index">
                <strong>{{ property.name }}:</strong>
                {{ getValueByKey(property.key) }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    
    <div class="tab-content">
      <div >
        <p v-html="advert?.text || 'Açıklama mevcut değil.'"></p>
      </div>
      
    </div>
    <div v-if="fullscreenImage" class="fullscreen" @click="closeFullscreen">
      <img :src="fullscreenImage" />
    </div>

    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="showModal = false">&times;</span>
        <ul>
          <li>
            <strong>Ad:</strong>
            {{ advert.userInfo?.nameSurname || "Bilinmiyor" }}
          </li>
          <li>
            <strong>Telefon:</strong>
            {{ advert.userInfo?.phoneFormatted || "Bilinmiyor" }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper-bundle.css";
import SwiperCore, { Navigation, Pagination } from "swiper";
import api from "../api";

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
      customProperties: [
        { name: "Kilometre", key: "km" },
        { name: "Renk", key: "color" },
        { name: "Yıl", key: "year" },
        { name: "Vites", key: "gear" },
        { name: "Yakıt", key: "fuel" },
      ],
      showModal: false,
    };
  },
  methods: {
    fetchDetail() {
      const id = this.$route.params.id;
      api
        .getDetail(id)
        .then((response) => {
          console.log("Fetched detail with id:", id);
          console.log("API response data:", response.data);
          this.advert = response.data;
        })
        .catch((error) => {
          console.error("Error fetching advert:", error);
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
        return "";
      }
      return `${location.cityName}, ${location.townName}`;
    },
    formatImageUrl(url) {
      if (url) {
        return url.replace("{0}", "800x600"); // Change the placeholder with appropriate resolution
      }
      return "";
    },
    getValueByKey(key) {
      if (this.advert && this.advert.properties) {
        const property = this.advert.properties.find(
          (prop) => prop.name === key
        );
        return property ? property.value : "Bilinmiyor";
      }
      return "Bilinmiyor";
    },
    formatPrice(price) {
      return new Intl.NumberFormat("tr-TR").format(price);
    },
  },
  created() {
    this.fetchDetail();
  },
};
</script>

<style scoped>
/* Varsayılan stiller (masaüstü için) */
.container {
  background-color: #f7f7f7;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
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
  align-items: stretch;
}

.title {
  width: 100%;
  margin-bottom: 20px;
}

.title-detail {
  display: flex;
  justify-content: space-between;
}

.seller-info-btn {
  padding: 5px 10px;
  background-color: #e40030;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.seller-info-btn:hover {
  background-color: #c8002b;
}

.left-column {
  flex: 2;
  padding-right: 20px;
}

.left-column h5 {
  font-size: 20px;
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
  margin-bottom: 20px;
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
  color: red;
  font-weight: bold;
}

.expertise-btn {
  background-color: #f2f2f2;
  border: 1px solid #ccc;
  padding: 5px 10px;
  cursor: pointer;
  margin-top: 10px;
  color: inherit;
  text-decoration: none;
}

.expertise-btn:hover {
  background-color: #ebebeb;
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
  margin-bottom: 50px;
  padding: 20px;
  background: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
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

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 500px;
  border-radius: 8px;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  display: flex;
  justify-content: flex-end;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

/* Küçük ekranlar için (mobil cihazlar) */
@media (max-width: 768px) {
  .main-content {
    flex-direction: column;
    width: 100%;
  }

  .title-detail {
    flex-direction: column;
    align-items: flex-start;
  }

  .left-column {
    padding-right: 0;
  }

  .right-column {
    width: 100%;
    margin-top: 20px;
  }

  .tab-content {
    width: 100%;
  }

  .modal-content {
    width: 90%;
  }

  .seller-info-btn,
  .expertise-btn {
    width: 100%;
    text-align: center;
    padding: 10px 0;
  }
}

/* Orta ekranlar için (tabletler) */
@media (min-width: 769px) and (max-width: 1024px) {
  .main-content {
    width: 95%;
  }

  .title-detail {
    flex-direction: column;
    align-items: flex-start;
  }

  .left-column {
    padding-right: 0;
  }

  .right-column {
    width: 100%;
    margin-top: 20px;
  }

  .tab-content {
    width: 95%;
  }

  .modal-content {
    width: 80%;
  }

  .seller-info-btn,
  .expertise-btn {
    width: 100%;
    text-align: center;
    padding: 10px 0;
  }
}

</style>


