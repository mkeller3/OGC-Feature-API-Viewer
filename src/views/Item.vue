<template>
  <v-container fluid>
    <v-alert
      v-if="error"
      type="error"
    >
      {{error}}
    </v-alert>
    <v-row v-if="loaded">
      <v-col cols="12" class="mx-0 my-0" style="background-color: #e2d4b7">
        <a class="header-link" href="/OGC-Feature-API-Viewer/">Home</a> /
        <a class="header-link" href="/OGC-Feature-API-Viewer/collections/">Collections</a> /
        <a class="header-link" :href="'/OGC-Feature-API-Viewer/collections/'+collection.id+'/'">{{collection.title}}</a> /
        <a class="header-link" :href="'/OGC-Feature-API-Viewer/collections/'+collection.id+'/items/'">Items</a> /
        <a class="header-link" href="">Item {{$route.params.id}}</a>
      </v-col>
      <v-col cols="12">
        <h1>Item {{$route.params.id}}</h1>
      </v-col>
      <v-col cols="12">
        <v-row>
          <v-col cols="12" lg="6">
            <Map :geojson="item"/>
          </v-col>
          <v-col cols="12" lg="6">
            <v-simple-table height="40vh">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th>Property</th>
                    <th>Value</th>          
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="value, key in item.properties"
                    :key="key"
                  >
                    <td>{{key}}</td>
                    <td>{{value}}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
        </v-row>        
      </v-col>
    </v-row>
    <v-row v-else>
      <v-progress-circular
      :size="300"
      :width="7"
      color="secondary"
      indeterminate
      class="mx-auto mt-10"
      >
        Loading...
      </v-progress-circular>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
import Map from '@/components/Map.vue';

export default {
  name: "HomeView",
  components: { 
    Map 
  },
  data: () => ({
    featureApiData: JSON.parse(localStorage.getItem('featureApiData')),
    loaded: false,
    collectionUrl: undefined,
    collection: {},
    item: {},
    error: ''
}),
  mounted() {
    const that = this;
    this.featureApiData.links.forEach(link => {
      if(link.type === 'application/json' && link.rel === 'data' && link.title.toLowerCase().includes('collection')){
        this.collectionUrl = link.href
      }
    })
    axios.get(`${this.collectionUrl}/${that.$route.params.collection_id}`)
    .then(function (response) {
      that.collection = response.data;

      axios.get(`${that.collectionUrl}/${that.$route.params.collection_id}/items/${that.$route.params.id}`)
      .then(function (response) {
        that.loaded = true;
        that.item = response.data
      })
      .catch(function (error) {
        that.error = error
      });
    })
    .catch(function (error) {
      that.error = error
    });
    
    
  },
};
</script>

<style scoped>

.v-card{
  margin: 2rem;
}

.header-link:visited {
  color: rgba(0, 0, 0, 0.87) !important;
}

.header-link{
  text-decoration: none;
  color: rgba(0, 0, 0, 0.87) !important;
}

</style>