<template>
    <div class="container">
      <h5>Выберите регион: </h5>
      <select name="region" id="region" class="custom-select" @change="selectRegion">
        <option :value="item.regionCode" v-for="item in regions">{{ item.regionName }}</option>
      </select>
    </div>
</template>

<script>
  import axios from "axios"
  export default {
    data () {
      return {
        region: '',
        regions: []
      }
    },
    methods: {
      selectRegion: function(el) {
        this.$emit('updateRegion', el.target.value)
      },
      getRegionsFromApi: function() {
        axios.get('https://thingproxy.freeboard.io/fetch/http://api.spending.gov.ua/api/v2/regions',
          {
            params: {
              mode: 'no-cors'
            }
          })
          .then(result => {this.regions = result.data})
          .catch(error => console.error(error))
      }
    },
    created () {
      this.getRegionsFromApi()
    },
    name:'selectRegion'
  }
</script>

<style lang="scss">
  select {
    cursor: pointer;
  }
</style>
