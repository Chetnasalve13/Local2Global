console.log("Hello world123")
console.log("SS")

import supabase from "../supabaseclient.js";


console.log("Supabase import sucessful")
// Import the Supabase client

// Function to handle form submission
const handleSubmit = async (event) => {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get form input values
  const jobTitle = document.getElementById('jobtitle').value;
  const jobDescription = document.getElementById('description').value;
  const experience1 = document.getElementById('experience').value;
  const imageFile = document.getElementById('file_input').files[0]; // Get the uploaded image file
  const joblocation=document.getElementById('joblocation').value;

  // Convert the image file to a base64 string
  const reader = new FileReader();
  reader.readAsDataURL(imageFile);
  reader.onload =() => {
      const imageBase64 = reader.result; // Base64 string of the image

      // Insert data into the database table
      // Insert data into the database table
    supabase.from('job_req').insert([
      { job_title: jobTitle, job_desc: jobDescription, experience: experience1,job_location:joblocation, image: imageBase64 }
  ]).then(({ data, error }) => {
      if (error) {
          console.error("Error inserting data into Supabase:", error.message);
          return;
      }
      console.log("Data inserted successfully:", data);
      window.location.href = "../dummy/auth.html";
      console.log("Redirection")
  });
  };
}

// Add event listener to the form for submission
document.querySelector('form').addEventListener('submit', handleSubmit);
