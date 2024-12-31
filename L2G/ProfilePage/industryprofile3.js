import supabase from "../supabaseclient.js";
console.log("Hello")

// Function to fetch and populate job openings
async function populateJobOpenings() {
    // Fetch job openings
    const { data: jobData, error: jobError } = await supabase
        .from('job_desc')
        .select('job_id, user_id, job_title, job_desc, experience_required, company_image');

    if (jobError) {
        console.error('Error fetching job data:', jobError.message);
        return;
    }

    if (jobData && jobData.length > 0) {
        for (const job of jobData) {
            const { job_id, user_id, job_title, job_desc, experience_required, company_image } = job;

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

            const jobHtml = `
                <div class="w-full md:w-1/3 px-2 pb-12">
                    <div class="h-full bg-white rounded overflow-hidden shadow-md hover:shadow-lg relative smooth containerProduct">
                        <a href="#" class="no-underline hover:no-underline">
                            <img src="${company_image}" class="h-48 w-full rounded-t shadow-lg" id="companyimage">
                            <div class="p-6 h-auto md:h-48">	
                                <p class="text-gray-600 text-xs md:text-sm" id="industryname">${industryName}</p>
                                <div class="font-bold text-xl text-gray-900" id="jobtitle">${job_title}</div>
                                <p class="text-gray-800 font-serif text-base mb-5" id="jobdesc">${job_desc}</p>
                            </div>
                            <br><br><br><br><br>
                            <div class="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-4 containerProduct">
                                <div class="flex items-center justify-center">
                                    <button class="delete-job mx-auto lg:mx-0 hover:underline gradient text-black font-bold rounded-full my-4 py-3 px-6 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out" data-jobid="${job_id}">
                                        Delete
                                    </button>
                                </div>
                            </div>
                            <div class="flex items-center justify-between inset-x-0 bottom-0 p-6">
                                <p class="text-gray-600 text-xs md:text-sm" id="experiencerequired">Experience Required: ${experience_required}</p>
                            </div>
                        </a>
                    </div>
                </div>
            `;

            // Append job HTML to container
            document.getElementById('jobOpeningsContainer').innerHTML += jobHtml;
        }
    } else {
        console.log('No job openings found.');
    }
}

// Call the function to populate job openings
populateJobOpenings();

// Add event listener for delete buttons
document.addEventListener('click', async (event) => {
    if (event.target.classList.contains('delete-job')) {
        const jobId = event.target.dataset.jobid;

        // Delete job from database
        const { error } = await supabase
            .from('job_desc')
            .delete()
            .eq('job_id', jobId);

        if (error) {
            console.error('Error deleting job:', error.message);
        } else {
            // Remove job HTML from the DOM
            event.target.closest('.w-full').remove();
        }
    }
});
