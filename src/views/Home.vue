<template>
  <v-container>
    <v-row v-if="loaded">
      <v-col cols="12" class="mx-0 my-0" style="background-color: #e2d4b7">
        <a class="header-link" href="">Home</a>
      </v-col>
      <v-col cols="12">
        <h1>{{featureApiData.title}}</h1>
        <v-divider/>
        <h4>{{featureApiData.description}}</h4>
      </v-col>
      <v-col cols="12">
        <v-card>
            <v-card-title>Collections</v-card-title>
            <v-card-actions>
              <a class="link-btn" href="collections/" style="">View the collections in this service</a>
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

<style>

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