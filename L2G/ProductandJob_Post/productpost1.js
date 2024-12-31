import supabase from "../supabaseclient.js";
console.log("Hello")

// Function to fetch and populate job openings
async function populateproducts() {
    // Fetch job openings
    const { data: productData, error: productError } = await supabase
        .from('product_desc')
        .select('user_id, product_name, product_type, product_details, product_image,contact_no,product_id');

    if (productError) {
        console.error('Error fetching job data:', productError.message);
        return;
    }

    if (productData && productData.length > 0) {
        for (const product of productData) {
            const { user_id, product_name, product_type, product_details, product_image,contact_no,product_id } = product;
console.log(product_id)
            // Fetch industry name based on user ID
            const { data: industryData, error: industryError } = await supabase
                .from('industry_data')
                .select('industry_name')
                .eq('user_id', user_id)
                .single();

            if (industryError) {
                console.error('Error fetching industry data:', industryError.message);
                return;
            }

            const industryName = industryData ? industryData.industry_name : 'Industry Name not found';

            const productHtml = `
                <div class="w-full md:w-1/3 px-2 pb-12">
                    <div class="h-full bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg relative smooth containerProduct">
                        <a href="#" class="no-underline hover:no-underline">
                            <img src="${product_image}" class="h-48 w-full rounded-t shadow-lg" id="companyimage">
                            <div class="p-6 h-auto md:h-48">	
                                <p class="text-gray-600 text-xs md:text-sm" id="industryname">${industryName}</p>
                                <div class="font-bold text-xl text-gray-900" id="jobtitle">${product_type}</div>
                                <p class="text-gray-800 font-serif text-base mb-5" id="jobdesc">${product_details}</p>
                            </div>
                            <div class="flex mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-4 containerProduct">
                                <div class="flex items-center justify-start">
                                    <button class="mx-auto lg:mx-0 hover:underline gradient text-white font-bold rounded-full my-4 py-3 px-6 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out buy-now" data-productid="${product_id}">
                                        Buy Now
                                    </button>
                                </div>
                                
                            </div>
                            <div class="flex items-center justify-between inset-x-0 bottom-0 p-6">
                                <p class="text-gray-600 text-xs md:text-sm" id="experiencerequired">Contact Number: ${contact_no}</p>
                            </div>
                        </a>
                    </div>
                </div>
            `;

            // Append job HTML to container
            document.getElementById('productpostcontainer').innerHTML += productHtml;
        }
    } else {
        console.log('No product found.');
    }
     // Add event listener for buy now buttons
     document.addEventListener('click', async (event) => {
        if (event.target.classList.contains('buy-now')) {
            // Get the product ID from the dataset
            alert("Are you sure want to place order")
            alert("Thank you for placing order ,Our company will soon Contact you!!")
            const productId = event.target.dataset.productid;
            console.log(productId)
    
            // Fetch the user ID from local storage
            //const userId = localStorage.getItem('user_id');
            const userData = JSON.parse(localStorage.getItem('user'));
            const userId = userData.user_id;
    
            // If user ID is found in local storage
            if (userId) {
                // Fetch user_id_product from product_desc table based on product_id
                const { data: productData, error: productError } = await supabase
                    .from('product_desc')
                    .select('user_id')
                    .eq('product_id', productId)
                    .single();
    
                if (productError) {
                    console.error('Error fetching product data:', productError.message);
                    return;
                }
    
                if (productData) {
                    const { user_id } = productData;
    
                    // Insert product order into the product_orders table
                    const { error } = await supabase
                        .from('product_orders')
                        .insert([
                            { product_id: productId, user_id_session: userId, user_id_product: user_id }
                        ]);
    
                    if (error) {
                        console.error('Error placing product order:', error.message);
                    } else {
                        console.log('Successfully placed product order:', productId);
                        window.location.href = '../LandingPage/landingpage.html';
                        // Optionally, you can perform additional actions after placing the order
                    }
                } else {
                    console.log('Product data not found for product ID:', productId);
                }
            } else {
                console.log('User ID not found in local storage.');
            }
        }
    });
    

}

// Call the function to populate job openings
populateproducts();
