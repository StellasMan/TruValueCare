function initializePage() 
{
    addHeader();
    addFooter();
    addDate();
    initializeTransitions();
    slideText("This is a test");
}

function initializeContactPage() 
{
    initializePage();
    initializeEJS();
}

function initializeEJS() 
{
    try 
    {
        emailjs.init(
        {
            publicKey: 'geS2qWKzC39WSHNX1',
            // Do not allow headless browsers
            blockHeadless: true,
            blockList: 
            {
                // Block the suspended emails
                list: [],
                // The variable contains the email address
                watchVariable: 'userEmail',
            },
            limitRate: 
            {
                // Set the limit rate for the application
                id: 'app',
                // Allow 2 request per second
                throttle: 2000
            },
        });
    } 
    catch(err) 
    {
        alert(`EJS Init failed: ${err.message}`);
    }

    // Get 'Contact' form and add the event listener
    const submitForm = document.getElementById("submit_form");
    if (submitForm != null) 
    {
        submitForm.addEventListener("submit", OnContactSubmit);
    } 

    // Get the 'Refer a Patient' form and add the event listener
    const referralForm = document.getElementById("referral_form");
    if (referralForm != null) 
    {
        referralForm.addEventListener("submit", OnReferralSubmit);
    }
}

async function OnContactSubmit(event) 
{
    // Prevent the default form submission behavior
    event.preventDefault();

    const form = document.querySelector('#submit_form');

    // Create a FormData object from the form element
    var formData = new FormData(form);

    // Convert all data to a plain JavaScript object
    const formObject = Object.fromEntries(formData.entries());
    formObject['email'] = 'myhealth@t-vcare.com';    // Target email for EmailEJS
    
    // Replace 'on'/'off' with 'Yes'/'No'
    newPatientRaw = formObject['new_patient'];
    newPatient = (newPatientRaw=='on') ? "Yes" : "No";
    formObject['new_patient'] = newPatient;

    // Create a new Date object for the current date and time
    const currentDate = new Date();
    const timeStamp = currentDate.toLocaleString();
    formObject['time_stamp'] = timeStamp;

    console.log('Form Object: ', formObject);

    try 
    {
        emailjs.send("TruValueService","Contact_Request_Template", formObject)
        .then(function(response) 
        {
            console.log('Message sent', response.status, response.text);
            alert("Message sent");
            window.location.reload();
        }, 
        function(error) 
        {
            console.log('Failed to send message', error);
            alert("Send failed");
        });
    } 
    catch (error) 
    {
        console.error("Failed to send email:", error);
    }
}

async function OnReferralSubmit(event) 
{
    // Prevent the default form submission behavior
    event.preventDefault();

    const form = document.querySelector('#referral_form');

    // Create a FormData object from the form element
    var formData = new FormData(form);

    // Convert all data to a plain JavaScript object
    const formObject = Object.fromEntries(formData.entries());
    formObject['email'] = 'myhealth@t-vcare.com';    // Target email for EmailEJS

    
    // Replace patient age range with readable text
    var patientAgeRaw = formObject['patient_age'];
    var patientAge = 
            (patientAgeRaw == 'Five212')        ? "5-12"    :
            (patientAgeRaw == 'Thirteen217')    ? "13-17"   :
            (patientAgeRaw == 'Eighteen260')    ? "18-60"   :
            (patientAgeRaw == 'Sixty280')       ? "60-80"   :
            (patientAgeRaw == 'Over80')         ? "Over 80" :  'Unknown';
    formObject['patient_age'] = patientAge;

    // Create a new Date object for the current date and time
    const currentDate = new Date();
    const timeStamp = currentDate.toLocaleString();
    formObject['time_stamp'] = timeStamp;

    try 
    {
        emailjs.send("TruValueService","Referral_Template", formObject)
        .then(
        function(response) 
        {
            console.log('SUCCESS!', response.status, response.text);
            alert("Referral sent");
            window.location.reload();
        }, 
        function(error) 
        {
            console.log('FAILED...', error);
            alert("Send failed");
        });
    } 
    catch (error) 
    {
        console.error("Failed to send email:", error);
    }
}

function addDate() 
{
    // Create a new Date object for the current date and time
    const currentDate = new Date();
    const currentYearNumber = currentDate.getFullYear(); // Returns a number, e.g., 2025
    const currentYearString = currentYearNumber.toString(); // Converts the number to a string, e.g., "2025"

    // Get the HTML element by its ID
    const dateElement = document.getElementById("dateYear");

    // Set the year in the selected HTML element
    dateElement.innerHTML = currentYearString;
}

function addHeader() 
{
    const hdrText = `
    <nav class="navbar navbar-expand-lg bg-light" style="padding: 8px 5% 8px 5%">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">
                <img src="./Images/Tru-Value Care Logo.png" height="130px" alt="True Value Care Logo"/>
            </a>
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="./index.html">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="./services.html">Services</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="https://pp-wfe-101.advancedmd.com/account/logon?lk=161930">Patient Portal</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a
                            class="nav-link dropdown-toggle"
                            href="#"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            About Us
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="./our_practice.html">Our Practice</a></li>
                            <li><a class="dropdown-item" href="./ngozi.html">Ngozi Kalu, AGNP-C</a></li>
                            <li><a class="dropdown-item" href="./susan.html">Dr. Susan Tanyi</a></li>
                            <li><hr class="dropdown-divider" /></li>
                            <li><a class="dropdown-item" href="./referral.html">Make a referral</a></li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="./contact.html">Contact Us</a>
                    </li>
                </ul>
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li class="nav-item font-size-var mb-2 mb-lg-0">
                        <a  href="tel:+13468275466" class="btn btn-primary">Call 346&#8209;827&#8209;5466</a>
                    </li>
                    <li class="nav-item mb-0">
                        <a  href="https://care.headway.co/providers/ngozi-kalu?utm_source=pem&utm_medium=direct_link&utm_campaign=136140" class="btn btn-primary">Book&nbsp;an Appointment</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>`
    ;

    // Get the header element by its ID
    const hdrElement = document.getElementById("hdrSection");

    // Insert the header
    hdrElement.innerHTML = hdrText;
}

function addFooter() 
{
    const ftrText = `
        <br>
        <hr style="margin-left:5%" width="90%">

        <footer class="py-3 my-4">
            <ul class="nav justify-content-center pb-3 mb-3">
                <li class="nav-item"><a href="./index.html" class="nav-link px-2 text-body-secondary">Home</a></li>
                <li class="nav-item"><a href="./services.html" class="nav-link px-2 text-body-secondary">Services</a></li>
                <li>
                    <a href="./contact.html" class="btn btn-primary">Contact</a>                    
                </li>
            </ul>

        <hr style="margin-left:5%" width="90%">

        <p class="text-center text-body-secondary">© 2025-<span id="dateYear"></span> Tru-Value Care, LLC</p>
        </footer>`
    ;

    // Get the footer element by its ID
    const ftrElement = document.getElementById("ftrSection");

    // Insert the header
    ftrElement.innerHTML = ftrText;
}

// Slide the text into view.
// We assume here that the active page has an element '.slide-up-element' which
// contains a text item with the 'slide-message' id.
function slideText(textSlide) {
    const homeSlideElement = document.querySelector('#slide-message');
    homeSlideElement.innerHTML = textSlide;

    const homeSlideContainer = document.querySelector('.slide-up-element');
    homeSlideContainer.animate
    (
        [
            { transform: 'translateY(100%)', opacity: 0 },
            { transform: 'translateY(0%)', opacity: 1 }
        ], 
        {
            duration: 2000,
            iterations: 1
        }
    );
}

// Change the sliding text associated with each carousel item,
// and force an animation to cause the text to slide into view.
// This method is called whenever the carousel 'slides'.
function slideCarouselText(currentSlideIndex) {
    var messages = [];
    var hasCarousel = false;

    var slideIndex = typeof(currentSlideIndex)=='undefined' ? 0 : currentSlideIndex;

    // Check if the current page is the 'home' page
    if (window.location.pathname.includes('/index.html')) 
    {
        hasCarousel = true;

        // We need to make sure that we have 1 message for each carousel item.
        // The 'Home' page currently has 4 carousel items.
        messages = 
        [
            "<p class=\"font-size-var-sm\">Welcome to Tru-Value Care</p><p class=\"font-size-var-lg\">Caring for individuals with our experienced mental health practitioners</p>",
            "<p class=\"font-size-var-sm\">Compassion</p><p class=\"font-size-var-lg\">We listen deeply and treat every patient with respect</p>",
            "<p class=\"font-size-var-sm\">Medication Management</p><p class=\"font-size-var-lg\">Evaluation, diagnosis, and ongoing management of psychiatric medications tailored to your unique needs</p>",
            "<p class=\"font-size-var-sm\">Integrity</p><p class=\"font-size-var-lg\">Honest, transparent, patient-centered services</p>",
        ] 
    } 
    else if (window.location.pathname.includes('/services.html')) 
    {
        hasCarousel = true;

        // We need to make sure that we have 1 message for each carousel item.
        // The 'Services' page currently has 3 carousel items.
        messages = 
        [
            "<p class=\"font-size-var-sm\">Medication Management</p><p class=\"font-size-var-lg\">Evaluation, diagnosis, and treatment of psychiatric medications</p>",
            "<p class=\"font-size-var-sm\">Senior Care</p><p class=\"font-size-var-lg\">Support for the patient suffering from Alzheimer's, dementia, and other age-related conditions</p>",
            "<p class=\"font-size-var-sm\">Anxiety Disorders</p><p class=\"font-size-var-lg\">We assess and treat generalized, social and PTSD-related anxieties</p>",
        ];
    }

    if (hasCarousel) {
        const textSlide = messages[slideIndex];
        slideText(textSlide);
    }
}

function initializeTransitions() 
{
    console.log(`Current Page: ${window.location.pathname}`);

    // Home page
    const homeCarouselElement = document.querySelector('#homeCarouselContainer');
    if (typeof(homeCarouselElement) != null)
    {
        homeCarouselElement.addEventListener(
            'slid.bs.carousel', 
            event => 
            {
                const currentSlideIndex = event.to;
                slideCarouselText(currentSlideIndex);
            }
        );

        // Create a new event object (e.g., a 'carousel slide' event)
        const event = new Event('slid.bs.carousel', {
            bubbles: true // 'bubbles: true' allows the event to bubble up through the DOM
        });

        // Simulate a carousel slide event
        homeCarouselElement.dispatchEvent(event);
    } 
    else 
    {
        // Services page
        const servicesCarouselElement = document.querySelector('#servicesCarouselContainer');
        if (typeof(servicesCarouselElement) != null)
        {
            servicesCarouselElement.addEventListener(
                'slid.bs.carousel', 
                event => 
                {
                    const currentSlideIndex = event.to;
                    slideCarouselText(currentSlideIndex);
                }
            );

            // Create a new event object (e.g., a 'carousel slide' event)
            const event = new Event('slid.bs.carousel', {
                bubbles: true // 'bubbles: true' allows the event to bubble up through the DOM
            });

            // Simulate a carousel slide event
            servicesCarouselElement.dispatchEvent(event);
        }
    } 
    // else if (window.location.pathname.includes('/our_practice.html')) 
    // {
    //     slideText("<h1>Our Practice</h1>");
    // } 
    // else if (window.location.pathname.includes('/ngozi.html')) 
    // {
    //     slideText("<h1>About Ngozi Kalu</h1>");
    // } 
    // else if (window.location.pathname.includes('/susan.html')) 
    // {
    //     slideText("<h1>About Dr. Susan Tanyi</h1>");
    // } 
    // else if (window.location.pathname.includes('/referral.html'))
    // {
    //     slideText("<h1>Make a referral</h1>");
    // } 
    // else if (window.location.pathname.includes('/contact.html'))
    // {
    //     slideText("<h1>Contact Us</h1>");
    // }
}

// Called when user changes the dropdown selection 'How did you hear about us' on the Contact page
function handleDropdownChange(value) {
    const hidden = document.getElementById("hidden_section");
    hidden.style.display = (value == 'Other') ? "block" : "none";
}
