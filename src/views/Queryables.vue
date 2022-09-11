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
        <a class="header-link" href="">Queryables</a>
      </v-col>
      <v-col cols="12">
        <h1>{{collection.title}}</h1>
        <v-divider/>
        <h4>Queryables</h4>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-list>      
            <v-list-item-group
              v-for="value, key in queryables.properties"
              :key="key"
            >
              <v-list-item
                v-if="value.$ref == undefined"              
              >
                <v-list-item-content>
                  <v-list-item-title>{{value.title}} ({{value.type}})</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item v-else>
                <v-list-item-content>
                  <v-list-item-title><a :href="value.$ref">{{key}}</a></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
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

export default {
  name: "QueryablesView",
  data: () => ({
    featureApiData: JSON.parse(localStorage.getItem('featureApiData')),
    loaded: false,
    collectionUrl: undefined,
    collection: {},
    queryables: {}
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
      axios.get(`${that.collectionUrl}/${that.$route.params.collection_id}/queryables`)
      .then(function (response) {
        that.loaded = true
        that.queryables = response.data;     
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