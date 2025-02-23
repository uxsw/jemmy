async function fetchData() {
    try {
        const response = await fetch('data.json'); // Load JSON from external file
        return await response.json();
    } catch (error) {
        console.error("Error loading JSON:", error);
    }
}

async function showModal(personId) {
    const data = await fetchData();
    if (!data) return;

    const filteredResults = data.filter(item => item.person_id === personId);
    
    if (filteredResults.length === 0) {
        document.getElementById('jemmyFeed').innerHTML = `<p>No results found.</p>`;
    } else {
        const person = filteredResults[0];
        const personName = person.person_name || "Unknown";
        const roleName = person.role_title || "Unknown";

        // Display person_name and company_name at the top
        const personInfoHTML = `
            <div class="person-info">
                <span class="is-leading-icon material-icons">account_box</span>
                <div class="is-labels">
                    <p class="is-name">${personName}</p>
                    <p class="is-role">${roleName}</p>
                </div>
            </div>
        `;

        // Insert this info above the results
        let html = personInfoHTML + filteredResults.map(item => {

            return `
            <div class="article-card">
                <div class="article-card__head">
                    <h2 class="article-card__title">${item.title}</h2>
                </div>
                <div class="article-card__main">
                    <div class="is-b1 overview__article">
                        <p class="primer is-summary">${item.article_summary}</p>
                        <div class="is-attention">
                            <h4 class="icon-title">
                            <span class="material-icons is-icon">campaign</span>
                            Attention grabber
                            </h4>
                            <p class="long-primer">${item.attention_grabber}</p>
                        </div>
                        <a href="${item.artefact_url}" target="_blank" class="btn-view-source">
                            View source
                            <span class="material-icons">launch</span>
                        </a>
                    </div>
                    <div class="overview__aside">
                        <div class="is-b2 overview__relevance article-aside">
                            <h4 class="icon-title">
                            <span class="material-icons is-icon">tips_and_updates</span>
                            Relevance
                            </h4>
                            <p class="relevance-summary">${item.relevance_summary}</p>
                        </div>
                        <div class="is-b3 article-aside">
                            <h4 class="icon-title">
                                <span class="material-icons is-icon">3p</span>
                                Suggested angle
                            </h4>
                            <p>${item.snowflake_angle}</p>
                            <a href="javascript:void(0);" class="copy-to-clipboard">
                                <span class="material-icons is-icon">file_copy</span>
                                Copy to clipboard
                            </a>
                        </div>
                    </div>
                </div> 
               
                <div class="article-card__footer">
                    <div class="rate-article">
                        <h4 class="is-legend">Rate this article</h4>
                        <div class="rate-article__buttons">
                            <a href="javascript:void(0);" class="is-thumb is-thumb-up">
                                <span class="is-label">Thumbs up</span>
                            </a>
                            <a href="javascript:void(0);" class="is-thumb is-thumb-down">
                                <span class="is-label">Thumbs down</span>
                            </a>
                        </div>
                    </div>

                    <div class="share-article">
                        <a href="javascript:void(0);" class="is-email is-item">
                            <span class="material-icons is-icon">email</span>
                        </a>
                        <a href="javascript:void(0);" class="is-linkedin is-item">
                            <?xml version="1.0" encoding="utf-8"?>
                            <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="is-icon">
                            <path d="M22 3.47059V20.5294C22 20.9194 21.8451 21.2935 21.5693 21.5693C21.2935 21.8451 20.9194 22 20.5294 22H3.47059C3.08056 22 2.70651 21.8451 2.43073 21.5693C2.15494 21.2935 2 20.9194 2 20.5294V3.47059C2 3.08056 2.15494 2.70651 2.43073 2.43073C2.70651 2.15494 3.08056 2 3.47059 2H20.5294C20.9194 2 21.2935 2.15494 21.5693 2.43073C21.8451 2.70651 22 3.08056 22 3.47059ZM7.88235 9.64706H4.94118V19.0588H7.88235V9.64706ZM8.14706 6.41177C8.14861 6.18929 8.10632 5.96869 8.02261 5.76255C7.93891 5.55642 7.81542 5.36879 7.65919 5.21039C7.50297 5.05198 7.31708 4.92589 7.11213 4.83933C6.90718 4.75277 6.68718 4.70742 6.46471 4.70588H6.41177C5.95934 4.70588 5.52544 4.88561 5.20552 5.20552C4.88561 5.52544 4.70588 5.95934 4.70588 6.41177C4.70588 6.86419 4.88561 7.29809 5.20552 7.61801C5.52544 7.93792 5.95934 8.11765 6.41177 8.11765C6.63426 8.12312 6.85565 8.0847 7.06328 8.00458C7.27092 7.92447 7.46074 7.80422 7.62189 7.65072C7.78304 7.49722 7.91237 7.31346 8.00248 7.10996C8.09259 6.90646 8.14172 6.6872 8.14706 6.46471V6.41177ZM19.0588 13.3412C19.0588 10.5118 17.2588 9.41177 15.4706 9.41177C14.8851 9.38245 14.3021 9.50715 13.7799 9.77345C13.2576 10.0397 12.8143 10.4383 12.4941 10.9294H12.4118V9.64706H9.64706V19.0588H12.5882V14.0529C12.5457 13.5403 12.7072 13.0315 13.0376 12.6372C13.3681 12.2429 13.8407 11.9949 14.3529 11.9471H14.4647C15.4 11.9471 16.0941 12.5353 16.0941 14.0176V19.0588H19.0353L19.0588 13.3412Z" fill="var(--color-slate-80)"/>
                            </svg>
                        </a>
                        <a href="javascript:void(0);" class="is-twitter is-item">
                            <?xml version="1.0" encoding="UTF-8" standalone="no"?>
                            <svg width="24px" height="24px" viewBox="0 -2 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="is-icon"><defs></defs>
                            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <g id="Dribbble-Light-Preview" transform="translate(-60.000000, -7521.000000)" fill="var(--color-slate-80">
                                    <g id="icons" transform="translate(56.000000, 160.000000)">
                                        <path d="M10.29,7377 C17.837,7377 21.965,7370.84365 21.965,7365.50546 C21.965,7365.33021 21.965,7365.15595 21.953,7364.98267 C22.756,7364.41163 23.449,7363.70276 24,7362.8915 C23.252,7363.21837 22.457,7363.433 21.644,7363.52751 C22.5,7363.02244 23.141,7362.2289 23.448,7361.2926 C22.642,7361.76321 21.761,7362.095 20.842,7362.27321 C19.288,7360.64674 16.689,7360.56798 15.036,7362.09796 C13.971,7363.08447 13.518,7364.55538 13.849,7365.95835 C10.55,7365.79492 7.476,7364.261 5.392,7361.73762 C4.303,7363.58363 4.86,7365.94457 6.663,7367.12996 C6.01,7367.11125 5.371,7366.93797 4.8,7366.62489 L4.8,7366.67608 C4.801,7368.5989 6.178,7370.2549 8.092,7370.63591 C7.488,7370.79836 6.854,7370.82199 6.24,7370.70483 C6.777,7372.35099 8.318,7373.47829 10.073,7373.51078 C8.62,7374.63513 6.825,7375.24554 4.977,7375.24358 C4.651,7375.24259 4.325,7375.22388 4,7375.18549 C5.877,7376.37088 8.06,7377 10.29,7376.99705" id="twitter-[#154]"></path>
                                    </g>
                                </g>
                            </g>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
            `;
        }).join('');

        document.getElementById('jemmyFeed').innerHTML = html;
    }

    document.getElementById('modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}
