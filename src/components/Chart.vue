<template>
    <div class="container">
      <div id="chart"></div>
    </div>
</template>

<script>
  import axios from 'axios'
  import zingchart from 'zingchart'

  export default {
    data () {
      return {
        transactions: [],
        chart: {},
        values: []
      }
    },
    props: {
      currentRegion: {
        type: Number,
        required: true
      }
    },
    name:'chart',
    watch: {
      currentRegion: function(val) {
        this.values = []
        this.getApiData(val)
      }
    },
    methods: {
      renderChart: function() {
        let self = this
        setTimeout(() => {
          zingchart.render({
            id: 'chart',
            data: {
              type: 'bar',
              series: [{
                values: self.values,
              }]
            },
            height: 400
          });
        }, 0)
      },
      getApiData (id) {
        let self = this
        axios.get('https://thingproxy.freeboard.io/fetch/http://api.spending.gov.ua/api/v2/api/transactions/top100?region=' + id,
          {
            params: {
              mode: 'no-cors'
            }
          })
          .then(result => {
            self.transactions = result.data
            for(let i = 0; i < result.data.length; i++) {
              self.values[i] = +result.data[i].amount
            }
            this.renderChart()
          })
          .catch(error => console.error(error))
      }
    },
    created () {
      this.renderChart()
    }
  }
</script>

<style lang="scss">
  #chart-wrapper {
    margin: 0 auto;
  }
</style>
