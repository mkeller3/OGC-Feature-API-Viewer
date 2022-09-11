<template>
  <v-container>
    <v-row v-if="loaded">
      <v-col cols="12">
        <h1>{{featureApiData.title}}</h1>
        <v-divider/>
        <h4>{{featureApiData.description}}</h4>
      </v-col>
      <v-col cols="12">
        <v-card>
            <v-card-title>Collections</v-card-title>
            <v-card-actions>
              <v-btn
                color="accent"
                text
                href="/collections/"
              >
                View the collections in this service
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
    apiUrl: "https://demo.pygeoapi.io/stable?f=json",
    featureApiData: undefined,
    loaded: false
  }),
  mounted() {
    const that = this;

    axios.get(this.apiUrl)
    .then(function (response) {
      that.loaded = true;
      that.featureApiData = response.data
      localStorage.setItem('featureApiData', JSON.stringify(response.data))
    })
    .catch(function (error) {
      console.log(error);
    });
  },
};
</script>
