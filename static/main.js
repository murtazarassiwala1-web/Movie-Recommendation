// 1. Sabhi zaroori HTML elements ko sabse upar select karein (Global Variables)
const searchInput = document.getElementById('search-box'); 
const listContainer = document.getElementById('movieList'); 
const listItems = document.querySelectorAll("#movieList li"); 

// 2. Debounce Function
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

// 3. Updated Search filter main function
function performSearch() {
    // 1. Get user input and clean it
    const rawSearchQuery = searchInput.value.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    let matchCount = 0; 

    // 2. NEW LOGIC: Check if the search box is completely empty
    if (rawSearchQuery === "") {
        // If empty, hide EVERYTHING
        listItems.forEach(function(list) {
            list.style.display = 'none';
        });
        // Stop the function right here so it doesn't run the search loop below
        return; 
    }

    // 3. Normal Search Logic (Only runs if they actually typed something)
listItems.forEach(function(list) {
        const rawItemText = list.innerText.toLowerCase().replace(/[^a-z0-9]/g, ''); 
        
        if(rawItemText.includes(rawSearchQuery) && matchCount < 8) {
            
            // Yahan '' (empty) ki jagah 'block' likhein
            list.style.display = 'block'; 
            
            matchCount++; 
        } else {
            list.style.display = 'none'; 
        }
    });
}

// 4. Debounce banayein aur Input par set karein
const debouncedSearch = debounce(performSearch, 300);
searchInput.addEventListener('keyup', debouncedSearch);

// 5. Click karne par text ko Search Box mein daalne wala logic
listContainer.addEventListener('click', function(event) {
    if (event.target.tagName === 'LI') {
        searchInput.value = event.target.innerText;
        
        // Optional: Ek baar select karne ke baad puri list chupana chahein, toh ye loop chala sakte hain:
        
        listItems.forEach(function(list) {
            list.style.display = 'none';
        });
        
    }
});