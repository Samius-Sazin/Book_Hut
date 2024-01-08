const search_result = document.getElementById('search-result');
const  show_result_warning = document.getElementById('show-result-warning');

//spinner control function
const spinner_showResultWarning_Control = (display_style, id) => {
    document.getElementById(id).style.display = display_style;
}

document.getElementById('search-button').addEventListener('click', () => {
    // get value from search-box
    const search_box = document.getElementById('search-box');
    const search_box_value = search_box.value;

    //remove previous info
    search_result.textContent = '';

    //set empty string to wanrning area
    show_result_warning.innerText = '';

    //check if user gives any input or not
    if(search_box_value === ''){
        show_result_warning.innerText = `Please enter a book name first`;
        spinner_showResultWarning_Control('block', 'show-result-warning')
    }
    else{
        // hide warning area
        spinner_showResultWarning_Control('none', 'show-result-warning');
        
        //active the spinner
        spinner_showResultWarning_Control('block', 'spinner');

        //clear the search area
        search_box.value = '';

        //load details / get item with API (fetch data)
        const url_1 = `https://openlibrary.org/search.json?q=${search_box_value}`;
        fetch(url_1)
        .then(res => res.json())
        .then(data => showDetails(data.docs));
    }
})

//Show details
const showDetails = books => {
    let count_total_result = 0;
    
    try{
        books.forEach(book => {
            count_total_result++;
    
            //create 'div' tag with 'col' class
            const div = document.createElement('div');
            div.classList.add('col');

            //get all value at a variable to deal with errors
            let book_title = '';
            let book_author_name = '';
            let first_publish_year = '';
            let book_publisher = '';

            try{
                book_title = book.title;
                if(book_title.length > 30){
                    book_title = book_title.substring(0, 30);
                }
            } catch(e){
                book_title = 'Not found';
            }
            try{
                book_author_name = book.author_name[0];
                if(book_author_name.length > 30){
                    book_author_name = book_author_name.substring(0, 30);
                }
            } catch(e){
                book_author_name = 'Not found';
            }
            try{
                first_publish_year = '' + book.first_publish_year;
            } catch(e){
                first_publish_year = 'Not found';
            }
            try{
                book_publisher = book.publisher[0];
                if(book_publisher.length > 30){
                    book_publisher = book_publisher.substring(0, 30);
                }
            } catch(e){
                book_publisher = 'Not found';
            }
    
            // get the image link
            const url_img = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;

            // set value/tag to div
            div.innerHTML = `
            <div class="card h-100">
                <img src="${url_img}" class="card-img-top mt-3 ms-3 rounded shadow" alt="Book Img" style="width: 170px; height: 195px;">
                <div class="card-body">
                    <p class="card-title fw-bold">Title : ${book_title}</p>
                    <p class="card-title fw-bold">Author name : ${book_author_name}</p>
                    <p class="card-text fw-semibold">First publish year : ${first_publish_year}</p>
                    <p class="card-text fw-semibold">Publisher : ${book_publisher}</p>
                </div>
            </div> `;
    
            search_result.appendChild(div);
        })
        show_result_warning.innerText = `Results found : ${count_total_result}`;
    }
    catch(e){
        show_result_warning.innerText = `Results found : ${count_total_result}` + '\n Some items couldn\'t load';
        show_result_warning.style.backgroundColor = '#e51e28';
    }
    //hide the spinner
    spinner_showResultWarning_Control('none', 'spinner');
    //show total results
    spinner_showResultWarning_Control('block', 'show-result-warning');
    
}