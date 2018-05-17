<template>
    <div class="container">
      <div id="chart"></div>
    </div>
</template>

<script>
  import mock from '@/api/transactions'
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
        this.getMockData(val)
        // this.getApiData(val)
      }
    },
    methods: {
      renderChart: function() {
        let self = this
        setTimeout(() => {
          console.log(self.values)
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
      getMockData (id) {
        let self = this
        mock.getTransactionsByRegion(result => {
          self.transactions = result
          for(let i = 0; i < result.length; i++) {
            self.values[i] = +result[i].amount
          }
          this.renderChart()
       }, id)
      },
      getApiData (id) {
        let self = this
        this.$http.get(`http://api.spending.gov.ua/api/v2/api/transactions/top100?region=${id}`)
          .then(result => {
            self.transactions = result
            for(let i = 0; i < result.length; i++) {
              self.values[i] = +result[i].amount
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
