const container = document.querySelector(".container");
const content = document.querySelector(".content");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
console.log("Prev button:", prev);
console.log("Next button:", next);


const pageContainer = document.querySelector(".page-container");

let recipesArray = [];
let page = 1;
let pages = [];
let pageSize = 5;
let totalDataCOunt = 0;
let totalPageCount = 0;

function fetchData() {
  console.log("Fetching data");
  console.log(sampleRecipesData[0].recipes);
  setDetails(sampleRecipesData[0].recipes);
}

function setDetails(data) {
  recipesArray = data;
  totalDataCOunt = recipesArray.length;
  totalPageCount = Math.ceil(totalDataCOunt / pageSize);
  console.log("Total Page Count:", totalPageCount); // Add this in `setDetails` after calculating `totalPageCount`

  showData();
  addPagination();
  //   updateActive() ;
}

function showData(data) {
  content.id = "" ;
//   content.innerHTML = "";
  const recipes = data ? data : recipesArray;
  const newData = recipes.slice((page - 1) * pageSize, page * pageSize);
  pushCards(newData);
  // setPagination();
  updateActive();
  console.log("Showing data for page:", page); // Add this in `showData`
  updateTruncation();
}

function pushCards(data) {
  content.innerHTML = "";
  data?.forEach((item) => {
    const newCard = document.createElement("div");
    newCard.classList.add("card");
    
    //  Create image element and set its source
    const img = document.createElement("img");
    img.src = item.image;
    item.alt = item.name ;

    newCard.appendChild(img);

    
    const nameElement = document.createElement("p");
    nameElement.textContent = item.name;
    newCard.appendChild(nameElement);
    

    // newCard.innerHTML = item.name;
    content.appendChild(newCard);
  });
}

function addPagination() {
  // extra changes
  pageContainer.innerHTML = ""; // Clear previous pagination buttons
  pages = []; // Reset pages array
  // container.innerHTML = "";
  for (let i = 1; i <= totalPageCount; i++) {
    const newPage = document.createElement("div");
    newPage.classList.add("btn");
    newPage.innerText = i;
    // container.append(newPage);
    pageContainer.appendChild(newPage);
    // pages = [...pages, newPage];
    // OR
    pages.push(newPage); // Store page button reference
  }

  //   addEventListeners();
  //   console.log("Pages", pages);

  // changed here

  pages.forEach((btn) => {
    btn.addEventListener("click", () => {
      console.log("Button clicked check it", btn.innerText);
      page = Number(btn.innerText);
      showData();
     //   updateTruncation();

    });
  });

  //

  updateActive();
  updateTruncation();
}

// using prev and next outside
if (prev) {
  prev.addEventListener("click", () => {
    if (page > 1) {
      page--;
      console.log("Page after decrement:", page); // Add this line

      showData();
    //  updateTruncation();

    }
  });
}

if (next) {
  next.addEventListener("click", () => {
    if (page < totalPageCount) {
      page++;
      console.log("Page after increment:", page); // Add this line

      showData();
    }
  });
}

function updateActive() {
  console.log(pages, page, pages[0]?.innerText);
  if (pages.length > 0) {
    pages.forEach((btn) => {
      if (page === Number(btn.innerText)) {
        btn.classList.add("active") ;
      } else {
        btn.classList.remove("active") ;
      }
    });
  }
   // Add logic to hide/show prev and next buttons
  if (page === 1) {
    prev.style.visibility = "hidden";
  } else {
    prev.style.visibility = "visible";
  }
  if (page === totalPageCount) {
    next.style.visibility = "hidden";
  } else {
    next.style.visibility = "visible";
  }
}



//   TRUNCATE LOGIC 
function updateTruncation(){
    pages.forEach((btn)=>{
        console.log("Truncation is called or not hauu !!!") ; 
        let num = Number(btn.innerText) ;
        let shouldTruncate = num > 2 && (num < page -1  || num > page + 1) && num < totalPageCount - 1; 
        let shouldNotTruncate  =  ((num <= 5 && page < 5) || ( num >= totalPageCount - 4) && (page > totalPageCount - 4))  ; 

        if (page > 4) {
            pages[1].classList.add("truncated") ;
        }
        if (page < totalPageCount - 3) {
            pages[totalPageCount-2].classList.add("truncated") ;
        }

        if(shouldTruncate && !shouldNotTruncate){
            // btn.classList.add("truncate") ; 
            btn.style.display = "none" ; 
        }else{
            // btn.classList.remove("truncate") ;
            btn.style.display = "block" ;
        }
    })
}


function runApp() {
  fetchData();
}
runApp();
