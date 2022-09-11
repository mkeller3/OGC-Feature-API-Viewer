<template>
  <v-container>
    <v-row v-if="apiUrl && loaded">
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
              <a class="link-btn" href="collections/">View the collections in this service</a>
            </v-card-actions>
        </v-card>
        <v-card>
            <v-card-title>Reset</v-card-title>
            <v-card-actions>
              <a class="link-btn" @click="reset">Click to restart demo</a>
            </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12">
        <v-card>
          <v-card-title>OGC Feature API Viewer</v-card-title>
          <v-card-text>
            <div class="text--primary">
              An application to visually browse OGC Feature API endpoints.
              To get started, enter an OGC Feature API below or click load demo.</div>
          </v-card-text>
        </v-card>
        <v-card class="px-2">
          <v-card-text>
            <v-text-field
              v-model="newApiUrl"
              label="OGC Feature API URL"
            ></v-text-field>
            <div v-if="error" style="color: red">{{error}}</div>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="success"
              text
              @click="validateUrl"
            >
              Load API
            </v-btn>     
          </v-card-actions>
        </v-card>
        <v-card class="px-2">
          <v-card-text>
            <div class="text--primary">If you do not know a API url, click the button below to see a demo.</div>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="success"
              text
              @click="loadDefaultApi"
            >
              Load Demo
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
    apiUrl: localStorage.getItem('apiUrl'),
    newApiUrl: "",
    featureApiData: undefined,
    loaded: false,
    error: ''
  }),
  mounted() {
    const that = this;
    if(this.apiUrl){
      axios.get(this.apiUrl)
      .then(function (response) {
        console.log(response)
        that.loaded = true;
        that.featureApiData = response.data
        localStorage.setItem('apiUrl', that.apiUrl)
        localStorage.setItem('featureApiData', JSON.stringify(response.data))
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  },
  methods:{
    validateUrl(){
      const that = this;
      axios.get(this.newApiUrl)
      .then(function () {
        localStorage.setItem('apiUrl', that.newApiUrl)
        window.location.reload()
      })
      .catch(function (error) {
        that.error = error.message
        console.log(error);
      });
    },
    loadDefaultApi(){
      localStorage.setItem('apiUrl', "https://demo.pygeoapi.io/stable?f=json")
      window.location.reload()
    },
    reset(){
      localStorage.removeItem('apiUrl')
      window.location.reload()
    }
  }
};
</script>

<style>

.v-card{
  margin-bottom: 2rem;
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