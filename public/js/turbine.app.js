var turbineApp = new Vue({
  el: '#turbine',
  data: {
    turbines:[
      {
      turbineId : '',
      turbineName: '',
      turbineDescription : '',
      capacity : '',
      rampUpTime : '',
      maintenanceInterval : ''
    }
  ],
  output: {

  }
  },
  computed: {
  },
  methods: {
    fetchTurbine () {
      fetch('api/turbine.php')
      .then( response => response.json() )
      .then( json => {turbineApp.turbines = json} )
      .catch( err => {
        console.log('TASK FETCH ERROR:');
        console.log(err);
      } )
    },
  },

  fetchTurbineOutputKPI() {
    fetch('api/heatrate.php')
    .then( response => response.json() )
    .then( json => {
      turbineApp.output = json;
      this.formatTurbineOutput();
      this.buildTurbineOutputChart();
    })
    .catch( err => {
      console.log('TURBINE OUTPUT FETCH ERROR');
      console.log(err);
    } )
  },

  formatTurbineOutput() {
    this.output.forEach(
      (entry, index, arr) => {
        entry.date = Date.parse(entry.date);
      });
  },

  buildTurbineOutputChart() {
    var turbineOutputChart = Highcharts.chart('chart', {
        chart: {
            type: 'area'
        },
        title: {
            text: 'Daily Turbine Output'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
            title: {
                text: 'Units of Energy'
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
        series: [{
            name: 'Turbine 1',
            data: this.output.map( turbines => [turbines.output] )
        }]
    });
  },

  created () {
    this.fetchTurbine();
    this.fetchTurbineOutputKPI()
  },
})
