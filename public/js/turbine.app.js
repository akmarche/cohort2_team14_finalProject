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
      })
    },
    fetchSensorTimeSeries (turbineId) {
     fetch('api/sensorTimeSeries.php?turbineId='+turbineId)
     .then( response => response.json() )
     // ^ This is the same as .then( function(response) {return response.json()} )
     .then( json => {
       kpiApp.sensorTime = json;
       kpiApp.formatSensorTime();
       kpiApp.buildOutputChart();
       kpiApp.buildHeatRateChart();
       kpiApp.buildCompressorEfficiencyChart();
       kpiApp.buildAvailabilityChart();
       kpiApp.buildReliabilityChart();
       kpiApp.buildFixedHourChart();
       kpiApp.buildTripsChart();
       kpiApp.buildStartsChart();
   //  console.log(agsApp.sensors);
   })
     .catch( err => {
       console.log('SENSOR FETCH ERROR:');
       console.log(err);
     })
   },
  },
  created () {
    this.fetchTurbine();
  }
})
