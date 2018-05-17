<template>
    <div class="container">
      <h5>Выберите регион: </h5>
      <select name="region" id="region" class="custom-select" @change="selectRegion">
        <option :value="item.regionCode" v-for="item in regions">{{ item.regionName }}</option>
      </select>
    </div>
</template>

<script>
  import mock from '@/api/regions'
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
        this.$http.get('http://api.spending.gov.ua/api/v2/regions')
          .then(result => {this.regions = result.data})
          .catch(error => console.error(error))
      }
    },
    created () {
      mock.getAll(result => this.regions = result)
      //this.getRegionsFromApi()
    },
    name:'selectRegion'
  }
</script>

<style lang="scss">
  select {
    cursor: pointer;
  }
</style>
