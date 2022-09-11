<template>
  <v-container>
    <v-row v-if="loaded">
      <v-col cols="12">
        <h1>{{collection.title}}</h1>
        <v-divider/>
        <h4>{{collection.description}}</h4>
      </v-col>
      <v-col cols="12">
        <v-card>
            <v-card-title>Items</v-card-title>
            <v-card-actions>
              <v-btn
                color="accent"
                text
                :href="`items/`"
              >
                Browse through the items of {{collection.title}}
              </v-btn>
            </v-card-actions>
        </v-card>
        <v-card>
            <v-card-title>Queryables</v-card-title>
            <v-card-actions>
              <v-btn
                color="accent"
                text
                :href="`queryables/`"
              >
                Browse through the queryables of {{collection.title}}
              </v-btn>
            </v-card-actions>
        </v-card>
        <v-card>
            <v-card-title>Links</v-card-title>
            <v-card-actions
              v-for="link in collection.links"
              v-bind:key="link.href"
            >
              <v-btn                
                color="accent"
                text
                :href="link.href"
              >
                {{link.title}} {{link.type}}
              </v-btn>
            </v-card-actions>
        </v-card>
      </v-col>
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

<style scoped>

.v-card{
  margin: 2rem;
}

</style>