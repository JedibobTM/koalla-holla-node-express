console.log( 'js' );

function getKoalas(){
  console.log( 'in getKoalas' );
  // axios call to server to get koalas
  axios({
    url: '/koalas',
    method: 'GET'
  }).then((response) => {
    console.log('DO STUFF LATER FOR RENDERING', response.data);
    renderKoalas(response.data);
  })
} // end getKoalas

function saveKoala(event){
  event.preventDefault();
  console.log( 'in saveKoala' );
  // axios call to server to get koalas
  let newKoala = {name: document.getElementById('nameIn').value, 
                  age: document.getElementById('ageIn').value,
                  gender: document.getElementById('genderIn').value,
                  transfer_status: document.getElementById('readyForTransferIn').value,
                  notes: document.getElementById('notesIn').value  
                };
  console.log('in koala', newKoala);
  axios({
    url: '/koalas',
    method: 'POST',
    data: newKoala
  }).then((response) => {
    getKoalas();
  }).catch((error) =>{
    console.log(error, 'Error in adding koala');
    alert('ERROR WE SUCK AT THIS SORRY');
  })
 
}

function updateReady(event) {
  console.log('Getting ready');
  let koalaId = event.target.closest('tr').getAttribute('data-koalaId');

  axios({
    url: `/koalas/${koalaId}`,
    method: 'PUT'
  }).then((response) => {
    getKoalas();
  }).catch((error) =>{
    console.log(error, 'Error in updating koala');
    alert('ERROR WE SUCK AT THIS SORRY');
  })
 
}

function renderKoalas(listOfKoalas) {
  let koalaTableBody = document.getElementById('viewKoalas');
  console.log(koalaTableBody);
  koalaTableBody.innerHTML = '';

  for (koala of listOfKoalas) {
    console.log('List of koalas:', koala);
    koalaTableBody.innerHTML += `
    <tr data-koalaId="${koala.id}">
    <td>${koala.name}</td>
    <td>${koala.age}</td>
    <td>${koala.gender}</td>
    <td>${koala.transfer_status}</td>
    <td>${koala.notes}</td>
    <td>${koala.transfer_status != true ? `<button onclick="updateReady(event)">GET READY</button>` : `is ready`}</td>
  </tr>
    `
  }
}

getKoalas();