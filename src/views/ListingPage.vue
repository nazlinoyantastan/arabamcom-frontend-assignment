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

    <!-- Filtreleme formu -->
    <div class="filters">
      <div>
        <label for="minPrice">Min Fiyat:</label>
        <input type="text" id="minPrice" :value="filters.minPrice" @input="formatPriceInput('minPrice', $event)">
      </div>
      <div>
        <label for="maxPrice">Max Fiyat:</label>
        <input type="text" id="maxPrice" :value="filters.maxPrice" @input="formatPriceInput('maxPrice', $event)">
      </div>
      <div>
        <label for="minYear">Min Yıl:</label>
        <input type="number" id="minYear" v-model.number="filters.minYear" @input="applyFilters">
      </div>
      <div>
        <label for="maxYear">Max Yıl:</label>
        <input type="number" id="maxYear" v-model.number="filters.maxYear" @input="applyFilters">
      </div>
      <div>
        <label for="color">Renk:</label>
        <input type="text" id="color" v-model="filters.color" @input="applyFilters">
      </div>
      <div>
        <label for="minDate">Min Tarih:</label>
        <input type="date" id="minDate" v-model="filters.minDate" @input="applyFilters">
      </div>
      <div>
        <label for="maxDate">Max Tarih:</label>
        <input type="date" id="maxDate" v-model="filters.maxDate" @input="applyFilters">
      </div>
    </div>

    <table class="ad-table">
      <thead>
        <tr>
          <th colspan="2" class="model-header">Model</th>
          <th>İlan Başlığı</th>
          <th class="year-header" @click="setSort('year')">
            <span>Yıl</span>
          </th>
          <th>Kilometre</th>
          <th>Renk</th>
          <th class="price-header" @click="setSort('price')">Fiyat</th>
          <th class="date-header" @click="setSort('date')">Tarih</th>
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
          <td class="date">{{ ad.dateFormatted }}</td>
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
      selectedCount: 20,
      sortType: 'date',
      sortOrder: 'desc',
      filters: {
        minPrice: '',
        maxPrice: '',
        minYear: null,
        maxYear: null,
        color: '',
        minDate: null,
        maxDate: null,
      },
    };
  },
  computed: {
    sortedAdverts() {
      let filtered = this.adverts.filter(ad => {
        const price = this.parseFormattedNumber(ad.price);
        const year = parseInt(this.getProperty(ad.properties, 'year'));
        const color = this.getProperty(ad.properties, 'color');
        const date = new Date(ad.date.split('.').reverse().join('-'));

        return (
          (!this.filters.minPrice || price >= this.parseFormattedNumber(this.filters.minPrice)) &&
          (!this.filters.maxPrice || price <= this.parseFormattedNumber(this.filters.maxPrice)) &&
          (!this.filters.minYear || year >= this.filters.minYear) &&
          (!this.filters.maxYear || year <= this.filters.maxYear) &&
          (!this.filters.color || color.toLowerCase().includes(this.filters.color.toLowerCase())) &&
          (!this.filters.minDate || date >= new Date(this.filters.minDate)) &&
          (!this.filters.maxDate || date <= new Date(this.filters.maxDate))
        );
      });

      switch (this.sortType) {
        case 'date':
          filtered.sort(this.sortByDate);
          break;
        case 'price':
          filtered.sort(this.sortByPrice);
          break;
        case 'year':
          filtered.sort(this.sortByYear);
          break;
        default:
          break;
      }

      return this.sortOrder === 'asc' ? filtered : filtered.reverse();
    }
  },
  methods: {
    fetchListings() {
      const params = {
        take: this.selectedCount,
      };

      api.getListings(params)
        .then(response => {
          this.adverts = response.data;
        })
        .catch(error => {
          console.error('İlanlar alınırken hata oluştu:', error);
        });
    },
    applyFilters() {
      this.$forceUpdate(); // computed property'i tetiklemek için
    },
    setSort(type) {
      if (this.sortType === type) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortType = type;
        this.sortOrder = 'asc';
      }
    },
    goToDetail(id) {
      this.$router.push({ name: 'DetailPage', params: { id } });
    },
    formatImageUrl(url) {
      if (url) {
        return url.replace('{0}', '120x90');
      }
      return '';
    },
    getProperty(properties, name) {
      const property = properties.find(prop => prop.name === name);
      return property ? property.value : '';
    },
    getLocation(location) {
      if (!location) {
        return '';
      }
      return `${location.cityName}\n${location.townName}`;
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
    },
    sortByDate(a, b) {
      const dateA = new Date(a.date.split('.').reverse().join('-'));
      const dateB = new Date(b.date.split('.').reverse().join('-'));
      return dateA - dateB;
    },
    sortByPrice(a, b) {
      return this.parseFormattedNumber(a.price) - this.parseFormattedNumber(b.price);
    },
    sortByYear(a, b) {
      return this.getProperty(a.properties, 'year') - this.getProperty(b.properties, 'year');
    },
    formatPriceInput(field, event) {
      let value = event.target.value;
      // Remove all non-numeric characters
      value = value.replace(/[^\d]/g, '');
      // Add dots every three digits
      value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      this.filters[field] = value;
      this.applyFilters();
    }
  },
  created() {
    this.fetchListings();
  }
};

</script>

<style>
.container {
  max-width: 1500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f7f7f7;
}

.filter, .filters {
  margin-bottom: 20px;
}

.filters {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}

.filters label {
  display: block;
}

.filters input[type="text"],
.filters input[type="number"],
.filters input[type="date"] {
  padding: 5px;
  font-size: 14px;
  width: 100%;
}

.ad-table {
  width: 100%;
  border-collapse: collapse;
}

.ad-table th {
  background-color: #ffffff;
}

.ad-table th, .ad-table td {
  border: 1px solid #ffffff;
  padding: 10px;
  text-align: center;
  vertical-align: middle;
}

.ad-table th.model-header {
  text-align: center;
}

.ad-table th.price-header {
  width: 150px;
  cursor: pointer;
}
.ad-table th.year-header, th.date-header {
  cursor: pointer;
}
.ad-table th.year-header:hover {
  color: red;
}
.ad-table th.price-header:hover {
  color: red;
}
.ad-table th.date-header:hover {
  color: red;
}
.ad-table th.left-align, .ad-table td.left-align {
  text-align: left;
}

.ad-table th {
  background-color: #f2f2f2;
}

.ad-item:nth-child(even) {
  background-color: #f3f3f3;
}

.ad-item:nth-child(odd) {
  background-color: #ffffff;
}

.ad-item:hover {
  background-color: #ffe6e6;
}

.ad-image {
  width: 120px;
  height: auto;
  margin-right: 10px;
}

.price {
  color: red;
  font-weight: bold;
  white-space: nowrap;
}
.location {
  white-space: pre-line;
}
.date {
  white-space: pre-line;
}

</style>
