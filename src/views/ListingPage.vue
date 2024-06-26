<template>
    <div class="container">
      <h1>Vitrin</h1>
  
      <!-- İlan sayısını seçmek için dropdown -->
      <div class="filter">
        <label for="advertCount">İlan Sayısı:</label>
        <select id="advertCount" v-model="selectedCount" @change="fetchListings">
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
  
      <table class="ad-table">
        <thead>
          <tr>
            <th>Fotoğraf</th>
            <th>Model</th>
            <th>İlan Başlığı</th>
            <th class="year-header" @click="setSort('year')">Yıl</th>
            <th>Kilometre</th>
            <th>Renk</th>
            <th class="price-header" @click="setSort('price')">Fiyat</th>
            <th @click="setSort('date')" class="date-header">Tarih</th>
            <th>İl / İlçe</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ad in sortedAdverts" :key="ad.id" @click="goToDetail(ad.id)" class="ad-item">
            <td><img :src="formatImageUrl(ad.photo)" alt="Araba Resmi" class="ad-image"></td>
            <td class="left-align">{{ ad.modelName }}</td>
            <td class="left-align">{{ ad.title }}</td>
            <td>{{ getProperty(ad.properties, 'year') }}</td>
            <td>{{ formatNumber(getProperty(ad.properties, 'km')) }}</td>
            <td>{{ getProperty(ad.properties, 'color') }}</td>
            <td class="price">{{ formatNumber(ad.price) }} ₺</td>
            <td>{{ ad.dateFormatted }}</td>
            <td class="location">{{ getLocation(ad.location) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import api from '../api';
  
  export default {
    data() {
      return {
        adverts: [],
        selectedCount: 20, // Başlangıçta 20 ilan seçili
        filters: {
          minDate: '',
          maxDate: '',
          categoryId: ''
        },
        sortType: 'price',
        sortOrder: 'asc' // 'asc' veya 'desc'
      };
    },
    computed: {
      sortedAdverts() {
        return this.adverts.slice().sort((a, b) => {
          let comparison = 0;
          if (this.sortType === 'price') {
            comparison = this.parseFormattedNumber(a.price) - this.parseFormattedNumber(b.price);
          } else if (this.sortType === 'year') {
            comparison = this.getProperty(a.properties, 'year') - this.getProperty(b.properties, 'year');
          } else if (this.sortType === 'date') {
            comparison = new Date(a.dateFormatted.split(' ').reverse().join('-')) - new Date(b.dateFormatted.split(' ').reverse().join('-'));
          }
          return this.sortOrder === 'asc' ? comparison : -comparison;
        });
      }
    },
    methods: {
      fetchListings() {
        const params = {
          take: this.selectedCount,
          minDate: this.filters.minDate,
          maxDate: this.filters.maxDate,
          categoryId: this.filters.categoryId
        };
  
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const apiUrl = 'http://sandbox.arabamd.com/api/v1/listing';
  
        api.get(proxyUrl + apiUrl, { params })
          .then(response => {
            console.log('API yanıtı:', response.data);
            this.adverts = response.data.map(ad => {
              ad.price = this.parseFormattedNumber(ad.priceFormatted);
              return ad;
            });
          })
          .catch(error => {
            console.error('İlanlar alınırken hata oluştu:', error);
          });
      },
      setSort(type) {
        if (this.sortType === type) {
          // Aynı sütuna tekrar tıklanırsa sıralama sırasını değiştir
          this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
        } else {
          // Farklı bir sütuna tıklanırsa sıralama türünü değiştir
          this.sortType = type;
          this.sortOrder = 'asc';
        }
      },
      goToDetail(id) {
        this.$router.push({ name: 'DetailPage', params: { id } });
      },
      formatImageUrl(url) {
        if (url) {
          return url.replace('{0}', '120x90'); // URL'deki yer tutucuyu doğru çözünürlükle değiştir
        }
        return '';
      },
      getProperty(properties, name) {
        const property = properties.find(prop => prop.name === name);
        return property ? property.value : '';
      },
      getLocation(location) {
        if (!location) {
          return ''; // location null veya undefined ise boş string döndür
        }
        return `${location.cityName}\n${location.townName}`; // İl ve ilçe bilgilerini alt alta yaz
      },
      formatNumber(value) {
        if (!value) return '';
        return new Intl.NumberFormat('tr-TR').format(value);
      },
      parseFormattedNumber(value) {
        if (typeof value === 'string') {
          return parseFloat(value.replace(/\./g, '').replace(',', '.'));
        }
        return value;
      }
    },
    created() {
      this.fetchListings();
    },
  };
  </script>
  
  <style>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .filter, .filters {
    margin-bottom: 20px;
  }
  
  .filters {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    flex-wrap: wrap;
  }
  
  .filters label {
    display: block;
  }
  
  .ad-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .ad-table th, .ad-table td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center; /* Yatayda ortalama */
    vertical-align: middle; /* Dikeyde ortalama */
  }
  
  .ad-table th.price-header, .ad-table th.year-header, .ad-table th.date-header {
    cursor: pointer; /* Başlıkların tıklanabilir olduğunu göstermek için */
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .ad-table th.price-header:hover, .ad-table th.year-header:hover, .ad-table th.date-header:hover {
    color: red;
  }
  
  .ad-table th.left-align, .ad-table td.left-align {
    text-align: left; /* Satır başından başlama */
  }
  
  .ad-table th {
    background-color: #f2f2f2;
  }
  
  .ad-item:nth-child(odd) {
    background-color: #f9f9f9;
  }
  
  .ad-item:nth-child(even) {
    background-color: #ffffff;
  }
  
  .ad-item:hover {
    background-color: #ffe6e6; /* Hafif kırmızımsı arka plan rengi */
  }
  
  .ad-image {
    width: 120px;
    height: auto;
    margin-right: 10px;
  }
  
  .price {
    color: red;
    font-weight: bold;
    white-space: nowrap; /* Tek satırda gösterim */
  }
  
  .location {
    white-space: pre-line; /* İl ve ilçe bilgisini alt alta yazmak için */
  }
  </style>
  