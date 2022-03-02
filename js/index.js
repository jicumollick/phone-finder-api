
// searching the phone from api 
const searchPhone = () => {
    const input = document.getElementById('input');
    const inputValue = input.value;

    input.value = '';

    const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue}`;

    fetch(url)
        .then(res => res.json())
        .then(data => displayPhones(data.data));
}

const displayPhones = (phones) => {

    console.log(phones);
    const parent = document.getElementById('phones-container');

// cleaning old phone searched 
    parent.innerHTML = '';

    // cleaning previous single phone details 
document.getElementById('phoneDetails').innerHTML = '';

      // error showing for all phone search
      if(phones.length === 0){
        document.getElementById('error').classList.remove('d-none');
    }else {
        document.getElementById('error').classList.add('d-none');
    }

    for (let phone of phones.slice(0,20)) {
        const div = document.createElement('div');
        div.classList.add('card');
        div.classList.add('col-md-3');
        div.classList.add('m-3');
        div.classList.add('p-3');
        div.innerHTML = `
        
    <img src="${phone.image}" alt="..." class="img-fluid">
    <div class="card-body text-center">
         
        <h3 class="card-title">${phone.phone_name}</h3>
        <h5>${phone.brand}</h5>
       
        
        <button class="btn btn-warning" onclick="getDetails('${phone.slug}')"> View Details </button>
    </div>
        `;
        parent.appendChild(div);
    }
}

const getDetails = (id) => {


    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showDetails(data.data));
}

const showDetails = (singlePhone) => {  
    const parent = document.getElementById('phoneDetails');
    parent.innerHTML = '';

    // error handling for single phone details 
    if( singlePhone.hasOwnProperty('others')){
        document.getElementById('error2').classList.add('d-none');
    }else {
        document.getElementById('error2').classList.remove('d-none');
    }

         // getting the others info 
    const {Bluetooth,GPS,NFC, Radio, USB, WLAN} = singlePhone?.others ;
  
    // checking the relese date 
    if(singlePhone.releaseDate == ''){
        singlePhone.releaseDate = 'Not Published';
    }

    const div = document.createElement('div');
    div.classList.add('card');
    div.classList.add('col-md-6');
    div.classList.add('col-sm-12');
    div.classList.add('m-3');
    div.classList.add('p-3');
    
    div.innerHTML = `
    <h1 id="displayHeading" class="text-center text-info my-3">Phone Details</h1> 
    
<img src="${singlePhone.image}" alt="..." class="img-fluid">
<div class="card-body text-center">
     
    <h3 class="card-title">Name: ${singlePhone.name}</h3>
    
    <h5>Release Date: ${singlePhone.releaseDate}</h5>
    <h5>Memory: ${singlePhone.mainFeatures.memory}</h5>
    <h5>Chipset: ${singlePhone.mainFeatures.chipSet}</h5>
    <h5>Storage: ${singlePhone.mainFeatures.storage}</h5>
    <h5>Sensors: ${singlePhone.mainFeatures.sensors}</h5>
    <h5>Others: ${Bluetooth,GPS,NFC, Radio, USB, WLAN}</h5>
</div>
    `;
    parent.appendChild(div);
}