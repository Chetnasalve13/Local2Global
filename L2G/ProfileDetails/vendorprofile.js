import supabase from "../supabaseclient.js";

document.getElementById('addShopForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Retrieve form data
    const shopname = document.getElementById('shopname').value;
    const phoneno = document.getElementById('phoneno').value;
    const address = document.getElementById('address').value;

    // Retrieve user ID from local storage
    const userData = JSON.parse(localStorage.getItem('user'));
    const userId = userData.user_id;


    // Insert form data into Supabase table
    if (userId) {
        try {
            const { data, error } = await supabase.from('vendor_data').insert([
                { user_id: userId, shop_name: shopname, phone: phoneno, address: address }
            ]);

            if (error) {
                console.error('Error inserting shop data:', error.message);
                // Handle error
            } else {
                console.log('Shop data inserted successfully:', data);
                window.location.href = '../ProfilePage/vendorprofile.html';
            }
        } catch (error) {
            console.error('Error inserting shop data:', error.message);
            // Handle error
        }
    } else {
        console.error('User ID not found in local storage');
        // Handle error
    }
});
