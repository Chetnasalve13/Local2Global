import supabase from "../supabaseclient.js";
console.log("Hello")

// Function to fetch and populate job openings
async function populateproducts() {
    // Fetch job openings
    const { data: productData, error: productError } = await supabase
        .from('product_desc')
        .select('user_id, product_name, product_type, product_details, product_image,contact_no');

    if (productError) {
        console.error('Error fetching job data:', productError.message);
        return;
    }

    if (productData && productData.length > 0) {
        for (const product of productData) {
            const { user_id, product_name, product_type, product_details, product_image,contact_no } = product;

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
                                    <button class="mx-auto lg:mx-0 hover:underline gradient text-white font-bold rounded-full my-4 py-3 px-6 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out" data-jobid="${product_id}">
                                        Buy Now
                                    </button>
                                </div>
                                <div class="flex items-center justify-end">
                                    <button class="mx-auto lg:mx-0 hover:underline gradient text-white font-bold rounded-full my-4 py-3 px-6 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                                        Call Now
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
        console.log('No job openings found.');
    }
}

// Call the function to populate job openings
populateproducts();
