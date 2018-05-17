<template>
  <div>
    <chart
    :currentRegion="currentRegion"
    ></chart>
    <selectRegion
    @updateRegion="updateRegion">
    </selectRegion>
  </div>
</template>

<script>
  import chart from "./Chart"
  import selectRegion from "./SelectRegion"

  export default {
    data () {
      return {
        currentRegion: 0
      }
    },
    components: {
      chart,
      selectRegion
    },
    methods: {
      updateRegion: function (payload) {
        this.currentRegion = +payload
      }
    }
  }
</script>

<style lang="scss">
    table {
        width: 100%;
        border: 2px solid #000;
        tr {
            th {
                padding: 10px 20px;
                background: #56433D;
                color: #F9C941;
                border-right: 2px solid;
                font-size: 0.9em;
            }

            td {
                padding: 5px 10px;
                border: 1px solid #56433D;
            }
        }
    }
</style>
