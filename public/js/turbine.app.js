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
  ]
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
    fetch('api/sensorTimeSeriesPost.php')
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

  },

  buildTurbineOutputChart() {
    var turbineOutputChart = Highcharts.chart('container', {
        chart: {
            type: 'line'
        },
        title: {
            text: 'Daily Turbine Output'
        },
        subtitle: {
            text: 'Source: sensorTimeSeries.csv'
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
            data: this.sensorTimeSeriesPost.map( turbines => [turbines.output] )
        }, {
            name: 'Turbine 3',
            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
        }, {
            name: 'Turbine 4',
            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
        }]
    });
  },

  created () {
    this.fetchTurbine();
  },
})
