const loadPhone = async(searchText) => {
const res = await fetch (`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
const data = await res.json();
const phones = data.data;
// console.log(phones); 
displayPhones(phones);
}

const displayPhones = phones => {
    
    const phoneContainer = document.getElementById('phone-container')
    
// clear phone container card before adding new cards
    phoneContainer.textContent = '';

    //display load all button if there are more than 12 phones
    const showAll = document.getElementById('show-all')
 

    phones.forEach(phone => {
        console.log(phone)
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card card-compact w-96 bg-gray-200 shadow-xl text-blue-600 my-4 `
        phoneCard.innerHTML = 
        `<figure class="my-2"><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>${phone.slug}</p>
          <div class="card-actions justify-center">
            <button onclick="showDetails('${phone.slug}')" class="btn btn-primary">Show details</button>
          </div>
        </div>`;

        phoneContainer.appendChild(phoneCard);

    })

}

// loadPhone();

const showDetails = async(id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(phone)
}


const showPhoneDetails = (phone) => {
  console.log(phone);
  const phoneName = document.getElementById('show-detail-phone-name');
  phoneName.innerText = phone.name;

  const showDetailContainer = document.getElementById('show-detail-container');
  showDetailContainer.innerHTML = `
  <img src="${phone.image}" alt="">
  <p class="pt-5 pb-2"><span class="text-xl font-semibold"> Storage:</span> ${phone.mainFeatures.storage} </p>
  <p class="pb-2"><span class="text-xl font-semibold"> Display Size:</span> ${phone.mainFeatures.displaySize} </p>
  <p class="pb-2"><span class="text-xl font-semibold"> Memory:</span> ${phone.mainFeatures.memory} </p>
  <p class="pb-2"><span class="text-xl font-semibold"> Sensors:</span> ${phone.mainFeatures.sensors} </p>
  <p class="pb-2"><span class="text-xl font-semibold"></span> ${phone.releaseDate} </p>

  
  `;

  


  show_details_modal.showModal();
}

const handleSearch = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText)
    loadPhone(searchText)
}