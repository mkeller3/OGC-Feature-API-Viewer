<template>
  <v-container>
    <v-row v-if="loaded">
      <v-col cols="12" class="mx-0 my-0" style="background-color: #e2d4b7">
        <a class="header-link" href="/OGC-Feature-API-Viewer/">Home</a> /
        <a class="header-link" href="collections/">Collections</a>
      </v-col>
      <v-col cols="12">
        <h1>Collections</h1>
        <v-divider/>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="collections"
            :search="search"
          >
            <template v-slot:[`item.title`]="{ item }">
              <a :href="item.id+'/'">{{item.title}}</a>
            </template>
          </v-data-table>
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
    collections: [],
    search: '',
    headers: [
      {
        text: 'Name',
        align: 'start',
        value: 'title',
      },
      { text: 'Type', value: 'itemType' },
      { text: 'Description', value: 'description' }
    ],
}),
  mounted() {
    const that = this;
    this.featureApiData.links.forEach(link => {
      if(link.type === 'application/json' && link.rel === 'data' && link.title.toLowerCase().includes('collection')){
        this.collectionUrl = link.href
      }
    })
    axios.get(this.collectionUrl)
    .then(function (response) {
      that.loaded = true;
      that.collections = response.data.collections
    })
    .catch(function (error) {
      console.log(error);
    });
    
  },
};
</script>

<style scoped>

.header-link:visited {
  color: rgba(0, 0, 0, 0.87) !important;
}

.header-link{
  text-decoration: none;
  color: rgba(0, 0, 0, 0.87) !important;
}
</style>