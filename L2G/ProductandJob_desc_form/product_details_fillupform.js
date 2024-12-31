import supabase from "../supabaseclient.js";

document.querySelector('form').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Retrieve form data
    const productname = document.getElementById('productname').value;
    const producttype = document.getElementById('producttype').value;
    const productdetails = document.getElementById('productdetails').value;
    const contactnumber = document.getElementById('contactno').value;
    const industryname = document.getElementById('industryname').value;
    const imageFile = document.getElementById('productimage').files[0];

    // Retrieve user ID from local storage
    const userData = JSON.parse(localStorage.getItem('user'));
    const userId = userData ? userData.user_id : null;

    // Convert image file to base64
    if (imageFile) {
        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onload = () => {
            const imageBase64 = reader.result; // Base64 string of the image

            // Insert data into the product_desc table
            if (userId) {
                supabase.from('product_desc').insert([
                    { user_id: userId, product_name: productname, product_type: producttype, product_details: productdetails, contact_no: contactnumber, product_image: imageBase64,industry_name:industryname }
                ]).then(({ data, error }) => {
                    if (error) {
                        alert("PRoduct Details too long make it short")
                        console.error("Error inserting data into Supabase:", error.message);
                        // Handle error
                    } else {
                        console.log("Data inserted successfully:", data);
                        window.location.href = '../LandingPage/landingpage.html';

                        // Handle success or redirect to another page
                    }
                });
            } else {
                console.error('User ID not found in local storage');
                // Handle error
            }
        };
    } else {
        console.error('No image file selected');
        // Handle error
    }
});
