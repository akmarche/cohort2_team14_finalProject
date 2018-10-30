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
  sensorTime:[]
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
       turbineApp.sensorTime = json;
       turbineApp.formatSensorTime();
       turbineApp.buildOutputChart();
       turbineApp.buildHeatRateChart();
       turbineApp.buildCompressorEfficiencyChart();
       turbineApp.buildAvailabilityChart();
       turbineApp.buildReliabilityChart();
       turbineApp.buildFixedHourChart();
       turbineApp.buildTripsChart();
       turbineApp.buildStartsChart();
   //  console.log(agsApp.sensors);
   })
     .catch( err => {
       console.log('KPI FETCH ERROR:');
       console.log(err);
     })
   },
  },
  created () {
    this.fetchTurbine();
  }
})
