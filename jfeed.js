function getStarRating(score) {
    let maxStars = 5;
    
    // Ensure the score is within the valid range (0-5)
    score = Math.max(0, Math.min(score, maxStars));

    let fullStars = Math.floor(score); // Count of full stars
    let halfStar = (score % 1 >= 0.5) ? 1 : 0; // Check if half star is needed
    let emptyStars = maxStars - fullStars - halfStar; // Remaining empty stars

    let starsHtml = "";

    for (let i = 0; i < fullStars; i++) {
        starsHtml += '<span class="material-icons">star</span>';
    }

    if (halfStar) {
        starsHtml += '<span class="material-icons">star_half</span>';
    }

    for (let i = 0; i < emptyStars; i++) {
        starsHtml += '<span class="material-icons">star_border</span>';
    }

    return starsHtml;
}
document.addEventListener("DOMContentLoaded", function () {
    fetch("jemmy.json") // Assuming jemmy.json is hosted in the same directory
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("jsonDataContainer");
            const entries = Object.entries(data).slice(0, 20); // Limit to first 20 entries
            
            for (const [title, details] of entries) {
                const div = document.createElement("div");
                div.className = "artifact-card";
                
                // Extract unique company names
                const companies = new Set();
                if (details["target buyers"]) {
                    details["target buyers"].forEach(buyer => companies.add(buyer.company));
                }
                
                const companyList = Array.from(companies).map(company => `<li>${company}</li>`).join("");
                
                const regions = (details["region(s)"] || []).map(region => `<span class="o-tag is-region">${region}</span>`).join(" ");

                // Extract target buyers
                const buyers = (details["target buyers"] || []).map(buyer => `
                    <div class="buyer-card">
                        <div class="buyer-card__cv">
                            <h4 class="long-primer kirk is-name">${buyer.name}</h4>
                            <p class="brevier is-role">${buyer.role}</p>
                            <p class="is-org"> ${buyer.company}</p>
                        </div>
                        <div class="buyer-card__relevance">
                            <h4 class="minion type-uppercase is-label">Relevance indicator:</h4>
                            <div class="buyer-card__stars">${getStarRating(buyer["relevance score"])}</div>
                        </div>
                        <ul class="buyer-card__connections-list">
                            ${getBuyerTags(buyer)}
                        </ul>
                    </div>
                `).join(" ");
                
                div.innerHTML = `
                    <header class="artifact-card__head">
                        <div class="artifact-card__connections-summary">
                            <p class="brevier">Connect with ${details["# relevant buyers"]} clients at:</p>    
                            <ul class="artifact-card__connections-list">
                                 ${companyList}
                            </ul>
                        </div>
                        <div class="artifact-card__usp">USP: ${getSellerUSPs(details)}</div>
                    </header>
                    <section class="artifact-card__source">
                        <div class="artifact-card__source-head">
                            <div class="industry-type ${details["artefact category"]}">
                                <span class="material-icons is-icon"></span>
                                ${details["artefact type"]}
                            </div>
                            <a href="${details["article url"]}" target="_blank" class="btn-outline is-round">View source</a>
                        </div>
                        <div class="artifact-card__summary">
                            <h2 class="pica is-title">${title}</h2>
                            <p>${details["article summary"]}</p>
                        </div>
                        <div class="artifact-card__tag-list">
                            ${regions}
                        </div>
                    </section>
                    <section class="artifact-card__buyers">
                        <h3 class="is-title brevier type-uppercase">Most relevant clients</h3>
                        <div class="o-scroll-panel snaps-inline">
                            ${buyers}
                        </div>
                    </section>
                    <div class="artifact-card__footer">
                        <button class="like-button">
                            <span class="material-icons">bookmark_border</span>
                            <span class="label">Save for later</span>
                        </button>
                        <a href="" class="btn-engage">Engage client</a>
                    </div>

                    `;
                container.appendChild(div);
            }
        })
        .catch(error => console.error("Error loading JSON data:", error));
});

function getBuyerTags(buyer) {
    let topics = Object.keys(buyer["topics of interest"] || {});
    let industries = Object.keys(buyer["industry(s)"] || {});

    let topicTags = topics.map(tag => `<li class="o-tag is-topic">${tag}</li>`); // Add is-topic class
    let industryTags = industries.map(tag => `<li class="o-tag is-industry">${tag}</li>`); // Add is-industry class

    return [...topicTags, ...industryTags].join(" "); // Combine and return formatted tags
}

function getSellerUSPs(seller) {
    return (seller["seller USPs"] && seller["seller USPs"].length > 0) ? 
        seller["seller USPs"].join(", ") : "No info";
}

function getSellerUSPs(details) {
    let usps = details["seller USPs"];
    return (usps && usps.length > 0) ? usps.join(", ") : "General chat";
}
