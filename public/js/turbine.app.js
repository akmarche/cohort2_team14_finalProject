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
          title: {
              text: 'Daily Turbine Output'
          },
          subtitle: {
              text: ''
          },
          xAxis: {
              type: 'datetime'
          },
          yAxis: {
              title: {
                  text: 'Units of Energy'
              }
          },
          plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },
          series: [{
              type: 'area',
              name: 'Turbine 1',
              data: this.output.map( turbines => [turbines.output] )
          }]
      });
    },
  },

  created () {
    this.fetchTurbine();
    this.fetchTurbineOutputKPI();
  },
})
