console.log("Hello World");
const content = document.querySelector(".content");
const pagination = document.querySelector(".page-container");
let page = 0;
let pageSize = 8;
let totalDataSize = 0;
let totalPageCount = 0;

let pages = document.querySelectorAll(".btn");

const prev = document.getElementById("prev");
// const one = document.getElementById("1") ;

const next = document.getElementById("next");

// const pages = [one, two, three, four] ;

function fetchData() {
  // fetch("https://dummyjson.com/recipes?limit=1000")
  //   .then((res) => {
  //     if (!res.ok) {
  //       throw new Error(`HTTP error! Status: ${res.status}`);
  //     }
  //     return res.json();
  //   })
  //   .then(showData)
  
  console.log("Fetching Data");
  console.log(sampleRecipesData[0].recipes);
  showData(sampleRecipesData[0].recipes);
}

function showData(data) {
 const recipes = data ; 
  // const recipes = sampleRecipesData;
  totalDataSize = recipes.length ;
  console.log(totalDataSize);
  totalPageCount = Math.ceil(totalDataSize / pageSize);
  let newData = recipes.slice(pageSize * page, pageSize * (page + 1));
  console.log(newData) ;
  // addPagination();
  pushCards(newData);
  setActive() ;  // moved setAcyive but remove it now 
  
}

function addPagination() {
  console.log(totalPageCount);
  pagination.innerHTML = "";
  for (let i = 0; i < totalPageCount; i++) {
    const page = document.createElement("button");
    page.classList.add("btn"); 
    page.innerText = i+1;
    pagination.append(page);
  }
   pages = document.querySelectorAll(".btn");
   console.log(pages);
   addPaginationListeners();  // Moved Listeners to a separate function 
}

function addPaginationListeners() {
  pages.forEach((item) => {
    item.addEventListener("click", (event) => {
      page = Number(event.target.innerText) ;
      content.innerHTML = "";
      fetchData();
      setActive();
    });
  });

}
  
  // prev.addEventListener("click", () => {
  //   if (page > 0) {
  //     page--;
  //   }
  
  //   content.innerHTML = "";
  //   fetchData();
  //   setActive();
  // });
  
  // next.addEventListener("click", () => {
  //   if (page < pages.length) {
  //     page++;
  //   }
  //   content.innerHTML = "";
  //   fetchData();
  //  setActive();
  // });

function pushCards(data) {
  content.innerHTML = ""; // **Ensure previous content is cleared before pushing new cards**
  data?.forEach((item) => {
    console.log(item);
    //  Creating a new card element
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerText = item.name;
    //  Append the card element to the content container
    content.appendChild(card);
  });
}

// fetchData();

function runApp() {
  fetchData();
  addPagination(); // **Initialize pagination only once**

  // pages.forEach((item) => {
  //   item.addEventListener("click", (event) => {
  //     page = Number(event.target.innerText) - 1;
  //     content.innerHTML = "";
  //     fetchData();
  //     setActive();
  //   });
  // });
  
  pages.forEach((btn) =>{
    btn.addEventListener("click", (e) => {
      page = btn.innerText ;
      showData() ; 
  });
}); 

  prev.addEventListener("click", () => {
    if (page > 1) {
      page--;
      showData()  ;
    }
  
    // content.innerHTML = "";
    // fetchData();
    // setActive();
  });
  
  next.addEventListener("click", () => {
    if (page < totalPageCount ) {
      page++;
      showData()  ;

    }
  //   content.innerHTML = "" ;  
  //   fetchData();
  //  setActive();
  });
}
runApp();

function setActive() {
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
  pages.forEach((item) => item.classList.remove("active"));
  pages[page].classList.add("active");
}

runApp() ; 



// Removed the addEventListeners function from simple pagination.js

 // function addEventListeners() {
//   pages.forEach((btn) => {
//     btn.addEventListener("click", (e) => {
//       console.log("Button clicked check it", btn.innerText);
//       page = Number(btn.innerText);
//       content.innerHTML = "";
//       showData();
//     });
//   });
//   prev.addEventListener("click", (e) => {
//     if (page > 1) page--;
//     showData();
//   });

//   next.addEventListener("click", (e) => {
//     if (page < totalPageCount) page++;
//     showData();
//   });
// }

//