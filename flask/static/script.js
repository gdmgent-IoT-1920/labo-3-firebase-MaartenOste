const dbConfig = {
    collection: 'raspberry_collection',
    document: 'maarostepi_doc'
};

const firebaseConfig = {
    apiKey: "AIzaSyBa-vCRXesCiqtf-9IN4qhfK1A9DIVS0wA",
    authDomain: "raspberry-colors.firebaseapp.com",
    databaseURL: "https://raspberry-colors.firebaseio.com",
    projectId: "raspberry-colors",
    storageBucket: "raspberry-colors.appspot.com",
    messagingSenderId: "880027952274",
    appId: "1:880027952274:web:0aaad908e58b55930eb24b",
    measurementId: "G-D9Y2RGJGST"
  };

const app = {
    init() {
        // initialiseer de firebase app
        firebase.initializeApp(firebaseConfig);
        this._db = firebase.firestore();
        this.cacheDOMElements();
        this.cacheDOMEvents();
        this.getDataFromSensor();

        this._matrix = {
            isOn: false, color: {value: '#000000', type: 'hex'}
        };
    },
    cacheDOMElements() {
        this.$colorPicker = document.querySelector('#colorPicker');
        this.$toggleMatrix = document.querySelector('#toggleMatrix');
        this.$btnChange = document.querySelector('#btnChange');
        this.$temperature = document.getElementById('temp');
        this.$humidity = document.getElementById('hum');
    },
    cacheDOMEvents() {
        this.$btnChange.addEventListener('click', (e) => {
            e.preventDefault();
            this._matrix.color.value = this.$colorPicker.value;
            this._matrix.isOn = this.$toggleMatrix.checked;
            
            this.updateInFirebase();
        });
    },
    updateInFirebase() {
        this._db.collection(dbConfig.collection).doc(dbConfig.document)
            .set(
                {matrix: this._matrix},
                {merge: true}
            );
    },
    getDataFromSensor() {
        const temp = document.getElementById('temp');
        const hum = document.getElementById('hum');

        this._db.collection('raspberry_collection').doc('sensor-data')
        .onSnapshot((doc) => {
            temp.innerText = `${doc.data().temperature}°C`;
            hum.innerText = `${doc.data().humidity}`;
        })
    }
}

app.init();