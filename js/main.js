// function handleLoadDetails() {
//     console.log("clicked");
//   }

const loadData = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/ai/tools');
    const data = await response.json();
    const aiProducts = data.data.tools;
    // console.log(aiProducts);
    const cardContainer = document.getElementById('card-container');

    const renderCards = (products) => {
        cardContainer.innerHTML = ''; // Clear the card container

        products.forEach((product) => {
            // console.log(product);
            const singleCard = document.createElement('div');
            singleCard.innerHTML = `
            <div onclick="loadDeatails('${product.id}')" id="card" class="card w-96 bg-base-100 shadow-xl cursor-pointer">
            <figure class="px-10 pt-10 max-w-md h-80">
            <img class="rounded-xl w-full h-full" src="${product.image}" alt="Shoes" class="rounded-xl" />
            </figure>
            <div class="card-body items-left text-left">
                <h2 class="card-title font-semibold text-2xl">Features!</h2>
                <ul class="font-normal text-[#585858] text-sm">
                    ${product.features.map(feature => `    <li> ${feature}</li>`).join(' ')}
                </ul>
                <div class="">
                    <h1 class="text-2xl mt-8 block">${product.name}</h1>
                    <span> ${product.published_in} </span>
                </div>
            </div>
            </div>
            `;
            cardContainer.appendChild(singleCard);
        });
    };

    // load data 


    const sortProductsByDate = () => {
        const sortedProducts = [...aiProducts];
        console.log(sortedProducts);
        sortedProducts.sort((a, b) => {
            const dateA = new Date(a.published_in);
            const dateB = new Date(b.published_in);
            return dateA - dateB;
        });
        renderCards(sortedProducts);
    };


    // Initial rendering
    renderCards(aiProducts);






    // Add event listener to the "Sort by Date" button
    const sortByDateButton = document.getElementById('handleSortByDate');
    sortByDateButton.addEventListener('click', sortProductsByDate);
};
loadData();


// handle load details
const loadDeatails = async (id) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
    const data = await response.json();
    my_modal_4.showModal()
    const productDetails = data.data;
    console.log(productDetails.pricing);
    const modalContainer = document.getElementById('modal-container')


    modalContainer.innerHTML = `
 <div class="flex justify-center items-center">
            <!-- modal left side -->
            <div class=" border-red-400 w-full flex-1">
                <h3 class="text-xl font-semibold ">${productDetails.description}</h3>
                <!-- Pricing -->
                <div class="flex justify-around my-10  items-center">
                    <p class="text-green-500 text-sm text-center font-extrabold">${productDetails.pricing[0].price}
                        <span>${productDetails.pricing[1].plan}</span></p>
                    <p class="text-yellow-600 text-sm text-center font-extrabold">${productDetails.pricing[1].price}
                        <span>${productDetails.pricing[1].plan}</span></p>
                    <p class="text-red-500 text-sm text-center font-extrabold">${productDetails.pricing[2].price}
                        <span>${productDetails.pricing[1].plan}</span></p>

                </div>

                <div class="flex gap-10">
                    <div>
                        <h2 class="font-semibold mb-5 text-2xl">Features</h2>
                        <ul>
                            <li>Natural language </li>
                            <li>Natural language </li>
                            <li>Natural language </li>
                        </ul>
                    </div>
                    <div>
                        <h2 class="font-semibold mb-5 text-2xl">Integrations</h2>
                        <ul>
                            <li>Integrations</li>
                            <li>Integrations</li>
                            <li>Integrations</li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- modal right side -->
            <div class=" border-red-400 w-full flex-1">
                <div class="flex justify-center items-center">
                    <img src="${productDetails.image_link}" alt="">
                </div>
                <div class="text-center ">
                    <h3>Hi, how are you doing today?</h3>
                    <p>I'm doing well, thank you for asking. How can I assist you today?</p>
                </div>
            </div>
        </div>
        <div class="modal-action">
            <button class="btn">Close</button>
        </div>

   `;

    modalContainer.appendChild(modal);


}




