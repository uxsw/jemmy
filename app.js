// Function to fetch data from the JSON file and display it
function fetchReports() {
    fetch('data.json')  // Adjust the path if needed
        .then(response => {
            // Check if the response is valid
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();  // Parse the JSON from the response
        })
        .then(data => {
            displayReports(data);  // Call displayReports to render the data
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

// Function to render the fetched data into the HTML
function displayReports(data) {
    const container = document.getElementById('article-feed');  // Container to hold the reports
    
    // Check if the data is an array and not empty
    if (Array.isArray(data) && data.length > 0) {
        data.forEach(report => {
            const reportDiv = document.createElement('li');
            reportDiv.classList.add('article-card');

            // Create a container for card header
            const articleCardHeader = document.createElement('div');
            articleCardHeader.classList.add('article-card__head');

            // Create container for card main
            const articleCardMain = document.createElement('div');
            articleCardMain.classList.add('article-card__main');

            // Elements in main for summary && quote

            const articleCardSummary = document.createElement('div');
            articleCardSummary.classList.add('article-card__summary');

            const articleCardQuote = document.createElement('div');
            articleCardQuote.classList.add('article-card__quote');


            // Create container for card footer
            const articleCardFooter = document.createElement('div');
            articleCardFooter.classList.add('article-card__footer');

            // Add title with link
            const title = document.createElement('h2');
            title.classList.add('article-card__title');
            const link = document.createElement('a');
            link.href = report.artefact_url;
            link.target = '_blank';
            link.textContent = report.title;
            title.appendChild(link);

            // Add company name
            const company = document.createElement('p');
            company.classList.add('company');
            company.textContent = `Company: ${report.company_name}`;

            // Insert title and company to the Card Article Header
            articleCardHeader.appendChild(title);
            articleCardHeader.appendChild(company);

            // Add summary
            const relevanceSummary = document.createElement('p');
            relevanceSummary.classList.add('relevance-summary');
            relevanceSummary.textContent = `Relevance Summary: ${report.relevance_summary}`;

            const keyQuotes = document.createElement('p');
            keyQuotes.classList.add('key-quotes');
            keyQuotes.textContent = `Key Quotes: ${report.key_quotes}`;

            // Insert article summary to Card Article Main
            articleCardSummary.appendChild(relevanceSummary);
            articleCardQuote.appendChild(keyQuotes);

            // Create and append other details like person, role, summary, and key quotes
            const personName = document.createElement('p');
            personName.classList.add('person-name');
            personName.textContent = `Person: ${report.person_name}`;

            const roleTitle = document.createElement('p');
            roleTitle.classList.add('role-title');
            roleTitle.textContent = `Role: ${report.role_title}`;

            //Insert footer content
            articleCardFooter.appendChild(personName);
            articleCardFooter.appendChild(roleTitle);

           

            // Append the title-company container and other details to the report div
            reportDiv.appendChild(articleCardHeader);
            reportDiv.appendChild(articleCardMain);
            reportDiv.appendChild(articleCardFooter);

            articleCardMain.appendChild(articleCardSummary);
            articleCardMain.appendChild(articleCardQuote);
            //reportDiv.appendChild(personName);
            //reportDiv.appendChild(roleTitle);
            //reportDiv.appendChild(relevanceSummary);
            //reportDiv.appendChild(keyQuotes);

            container.appendChild(reportDiv);
        });
    } else {
        container.innerHTML = '<p>No reports available.</p>';
    }
}

// Call fetchReports to load data when the page is loaded
document.addEventListener('DOMContentLoaded', fetchReports);
