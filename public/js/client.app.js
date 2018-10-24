var clientApp = new Vue({
  el: '#clientTable',
  data: {
    clients:[
      {
      clientId : '',
      clientName: '',
      clientDescription : '',
      gicsSector : '',
      gicsSubIndustry : '',
      headquarters : '',
      notes: ''
    }
  ]
  },
  computed: {
  },
  methods: {
    fetchClient () {
      fetch('api/client.php')
      .then( response => response.json() )
      .then( json => {clientApp.clients = json} )
      .catch( err => {
        console.log('TASK FETCH ERROR:');
        console.log(err);
      })
    },
  },
  created () {
    this.fetchClient();
  }
})
