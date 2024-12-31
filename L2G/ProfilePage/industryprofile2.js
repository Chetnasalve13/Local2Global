import supabase from "../supabaseclient.js";
console.log("Hello")

// Function to fetch and populate product posts
async function populateProducts() {
    // Fetch user_id from local storage
   // const userId = localStorage.getItem('user_id');
    const userData = JSON.parse(localStorage.getItem('user'));
    const userId = userData.user_id;


    // Fetch product posts
    const { data: productData, error: productError } = await supabase
        .from('product_desc')
        .select('product_id, user_id, product_name, product_type, product_details, product_image, contact_no');

    if (productError) {
        console.error('Error fetching product data:', productError.message);
        return;
    }


    if (productData && productData.length > 0) {
        for (const product of productData) {
            // Check if the product's user_id matches the user_id from local storage
            console.log(userId)
            if (product.user_id === userId) {console.log("Hello")
                const { product_id, product_name, product_type, product_details, product_image, contact_no } = product;
                
                // Fetch industry name based on user ID
                const { data: industryData, error: industryError } = await supabase
                    .from('industry_data')
                    .select('industry_name')
                    .eq('user_id', userId)
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
                                        <button class="delete-product mx-auto lg:mx-0 hover:underline gradient text-black font-bold rounded-full my-4 py-3 px-6 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out" data-productid="${product_id}">
                                            Delete
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

                // Append product HTML to container
                document.getElementById('productpostcontainer').innerHTML += productHtml;
            }
        }
    } else {
        console.log('No product posts found.');
    }
}


// Call the function to populate product posts
populateProducts();


// Add event listener for delete buttons
document.addEventListener('click', async (event) => {
    if (event.target.classList.contains('delete-product')) {
        const productId = event.target.dataset.productid;
        alert("Are You Sure Want to Delete?")

        // Delete product from database
        const { error } = await supabase
            .from('product_desc')
            .delete()
            .eq('product_id', productId);

        if (error) {
            console.error('Error deleting product:', error.message);
        } else {
            // Remove product HTML from the DOM
            event.target.closest('.w-full').remove();
        }
    }
});
