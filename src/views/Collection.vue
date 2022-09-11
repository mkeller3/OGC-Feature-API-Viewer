<template>
  <v-container>
    <v-row v-if="loaded">
      <v-col cols="12" class="mx-0 my-0" style="background-color: #e2d4b7">
        <a class="header-link" href="/OGC-Feature-API-Viewer/">Home</a> /
        <a class="header-link" href="/OGC-Feature-API-Viewer/collections/">Collections</a> /
        <a class="header-link" href="">{{collection.title}}</a>
      </v-col>
      <v-col cols="12">
        <h1>{{collection.title}}</h1>
        <v-divider/>
        <h4>{{collection.description}}</h4>
      </v-col>
      <v-col cols="12">
        <v-card>
            <v-card-title>Items</v-card-title>
            <v-card-actions>
              <a class="link-btn" :href="`items/`">Browse through the items of {{collection.title}}</a>
            </v-card-actions>
        </v-card>
        <v-card>
            <v-card-title>Queryables</v-card-title>
            <v-card-actions>
              <a class="link-btn" :href="`queryables/`">Browse through the queryables of {{collection.title}}</a>
            </v-card-actions>
        </v-card>
        <v-card>
            <v-card-title>Links</v-card-title>
            <v-card-actions
              v-for="link in collection.links"
              v-bind:key="link.href"
            >
              <a class="link-btn" :href="link.href" style="">{{link.title}} {{link.type}}</a>
            </v-card-actions>
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
  name: "HomeView",
  components: {},
  data: () => ({
    featureApiData: JSON.parse(localStorage.getItem('featureApiData')),
    loaded: false,
    collectionUrl: undefined,
    collection: {}
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
      that.loaded = true;
      that.collection = response.data
    })
    .catch(function (error) {
      console.log(error);
    });
    
  },
};
</script>

<style>

.v-card{
  margin: 2rem;
}

.link-btn{
  color: #17bebb !important;
  caret-color: #17bebb !important;
  font-weight: 500;
  font-size: 0.875rem;
  letter-spacing: 0.0892857143em;
  text-indent: 0.0892857143em;
  text-transform: uppercase;
  text-decoration: none;
}

.link-btn:hover{
  transition-duration: 0.28s;
  background-color: rgb(23, 190, 187, 0.08) !important;
}

.header-link:visited {
  color: rgba(0, 0, 0, 0.87) !important;
}

.header-link{
  text-decoration: none;
  color: rgba(0, 0, 0, 0.87) !important;
}

</style>