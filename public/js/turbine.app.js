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
  },
  created () {
    this.fetchTurbine();
  },
  fetchSite () {
    fetch('api/site.php')
    .then( response => response.json() )
    .then( json => {turbineApp.site = json} )
    .catch( err => {
      console.log('TASK FETCH ERROR');
      console.log(err);
    })
  }
})
