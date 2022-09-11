<template>
  <v-container>
    <v-row v-if="loaded">
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
    item: {}
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
        console.log(error);
      });
    })
    .catch(function (error) {
      console.log(error);
    });
    
    
  },
};
</script>

<style scoped>

.v-card{
  margin: 2rem;
}

</style>