import supabase from "../supabaseclient.js";
console.log("Hello")

async function fetchAndDisplayApplications() {
    const userData = JSON.parse(localStorage.getItem('user'));
    const userId = userData.user_id;

    // Fetch orders from product_orders table
    const { data: ordersData, error: ordersError } = await supabase
        .from('job_applications')
        .select('user_id_session, job_id')
        .eq('user_id_jobpost', userId);

    if (ordersError) {
        console.error('Error fetching orders:', ordersError.message);
        return;
    }

    // Initialize array to store order details
    const orders = [];

    // Iterate over orders data
    for (const order of ordersData) {
        const { user_id_session, job_id } = order;

        // Fetch user's email from users table
        const { data: userData, error: userError } = await supabase
            .from('users')
            .select('email_id')
            .eq('user_id', user_id_session)
            .single();

        if (userError) {
            console.error('Error fetching user data:', userError.message);
            continue; // Skip to next iteration
        }

        const userEmail = userData.email_id;

        // Fetch product name from product_desc table
        // Fetch product name from product_desc table
        const { data: productData, error: productError } = await supabase
            .from('job_desc')
            .select('job_title')
            .eq('job_id', job_id)
            .single();

        if (productError) {
            console.error('Error fetching product data:', productError.message);
            continue; // Skip to next iteration
        }

        const jobtitle = productData.job_title;


        

        // Add order details to the orders array
        orders.push({ userEmail, jobtitle });
    }

    // Display orders in the "My Orders" section
    const ordersContainer = document.getElementById('myjobContainer');
    ordersContainer.innerHTML = ''; // Clear previous content

    for (const order of orders) {
        const orderHtml = `
            <div>
            <div class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700" style="width: 18rem;">
            
                <p>Applicant Email: ${order.userEmail}</p>
                <p>Job Title: ${order.jobtitle}</p>
            </div>
            
            </div>
            <hr>
        `;
        ordersContainer.innerHTML += orderHtml;
    }
}

// Call the function to fetch and display orders
fetchAndDisplayApplications();
