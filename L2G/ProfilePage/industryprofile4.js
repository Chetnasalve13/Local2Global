import supabase from "../supabaseclient.js";
console.log("Hello")

async function fetchAndDisplayOrders() {
    const userData = JSON.parse(localStorage.getItem('user'));
    const userId = userData.user_id;

    // Fetch orders from product_orders table
    const { data: ordersData, error: ordersError } = await supabase
        .from('product_orders')
        .select('user_id_session, product_id')
        .eq('user_id_product', userId);

    if (ordersError) {
        console.error('Error fetching orders:', ordersError.message);
        return;
    }

    // Initialize array to store order details
    const orders = [];

    // Iterate over orders data
    for (const order of ordersData) {
        const { user_id_session, product_id } = order;

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
        const { data: productData, error: productError } = await supabase
            .from('product_desc')
            .select('product_name')
            .eq('product_id', product_id)
            .single();

        if (productError) {
            console.error('Error fetching product data:', productError.message);
            continue; // Skip to next iteration
        }

        const productName = productData.product_name;

        // Add order details to the orders array
        orders.push({ userEmail, productName });
    }

    // Display orders in the "My Orders" section
    const ordersContainer = document.getElementById('myOrdersContainer');
    ordersContainer.innerHTML = ''; // Clear previous content

    for (const order of orders) {
        const orderHtml = `
            <div>
            <div class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700" style="width: 18rem;">

                <p>User Email: ${order.userEmail}</p>
                <p>Product Name: ${order.productName}</p>
            </div>
            </div)
            <hr>
        `;
        ordersContainer.innerHTML += orderHtml;
    }
}

// Call the function to fetch and display orders
fetchAndDisplayOrders();
