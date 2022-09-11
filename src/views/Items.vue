<template>
  <v-container>
    <v-row v-if="loaded">
      <v-col cols="12">
        <h1>{{collection.title}}</h1>
        <v-divider/>
        <h4>{{collection.description}}</h4>
      </v-col>
      <v-col cols="12">
        <v-row>
          <v-col cols="6">
            <Map :geojson="items"/>
          </v-col>
          <v-col cols="6">
            <v-simple-table height="70vh">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th
                      v-for="value, key in items.features[0].properties"
                      :key="key"
                    >
                      {{key}}
                    </th>                    
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in items.features"
                    :key="item.id"
                  >
                    <td><a :href="`${item.id}/`">{{item.id}}</a></td>
                    <td
                      v-for="prop in item.properties"
                      v-bind:key="prop"
                    >
                      {{ prop}}
                    </td>
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
    items: [],
    limit: 10
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
      let urlParameters = ""
      for(let param in that.$route.query){
        if(param === 'limit'){
          that.limit = that.$route.query[param]
        }
        else{
          urlParameters += `&${param}=${that.$route.query[param]}`
        }
      }
      axios.get(`${that.collectionUrl}/${that.$route.params.collection_id}/items/?limit=${that.limit}${urlParameters}`)
      .then(function (response) {
        that.loaded = true;
        that.items = response.data
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