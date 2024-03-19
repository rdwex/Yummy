$(function () {
  if (searchName("")) {
    $("#load").fadeOut(700);
    $("#loader").fadeOut(0);
    $("body,html").css("overflow", "visible");
  }
});

function openNav() {
  $(".navMenu").animate({ left: 0 }, 600);
  $(".links li").animate({ top: 0 }, 100);
  // $(".links li").animate({ top: 300 }, 500);
}

function closeNav() {
  let width = $(".navMenu .nav-tab").outerWidth();
  $(".navMenu").animate({ left: -width }, 500);
  $(".links li").animate({ top: 300 }, 500);
}
closeNav();
$(".navMenu .openIcon").click(() => {
  if ($(".navMenu").css("left") == "0px") {
    closeNav();
  } else {
    openNav();
  }
});
let mealRecipe = document.getElementById("row");
let changePage = document.getElementById("changePage");

function display(data) {
  let cartona = "";

  for (let i = 0; i < data.length; i++) {
    cartona += `
    <div class="col-md-4 px-4 text-center">
  
          <div class="meal" onclick="getMeals('${data[i].idMeal}')">
          <img
              src="${data[i].strMealThumb}"
              height = "250"
              class="w-100"
              alt=""
            />
            <div class="layer d-flex align-items-center text-black p-2">
            <h3>${data[i].strMeal}</h3>
            </div>
        </div>
        </div>
        `;
  }

  mealRecipe.innerHTML = cartona;
}

async function getMeals(dat) {
  closeNav();
  mealRecipe.innerHTML = "";
  $("#loader").fadeIn(300);

  changePage.innerHTML = "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${dat}`
  );
  response = await response.json();

  displayMealDetails(response.meals[0]);
  $("#loader").fadeOut(400);
}

function displayMealDetails(meal) {
  changePage.innerHTML = "";

  let ingredients = ``;

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients += `<li class="rounded ing alert-info m-2 p-2">${
        meal[`strMeasure${i}`]
      } ${meal[`strIngredient${i}`]}</li>`;
    }
  }
  let cartona = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}">
            <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8 ms-0 text-light">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="ms-0 ps-0 d-flex flex-wrap">${ingredients}</ul>
                <h3>Tags :</h3>
                <ul class=" ing ms-0 d-flex rounded w-25 flex-wrap">
                ${meal.strTags}
                </ul>
                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`;

  mealRecipe.innerHTML = cartona;
}
function displayHome() {
  closeNav();
 if (searchName("")) {
   $("#load").fadeOut(700);
   $("#loader").fadeOut(0);
   $("body,html").css("overflow", "visible");
 }
  mealRecipe.innerHTML = "";
}
function displaySearch() {
  closeNav();
  changePage.innerHTML = `
    <div class="row py-4 text-light">
        <div class="col-md-6">
            <input onkeyup="searchName(this.value)" class="form-control border-warning bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchLetter(this.value)" maxlength="1" class="form-control border-warning bg-transparent text-light" type="text" placeholder="Search By First Letter">
        </div>
    </div>`;

  mealRecipe.innerHTML = "";
}
displaySearch();

async function searchName(name) {
  closeNav();
  mealRecipe.innerHTML = "";
  $("#loader").fadeIn(300);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
  );
  response = await response.json();

  if (response.meals == display(response.meals)) {
    // display([]);
    displaySearch();
  }
  $("#loader").fadeOut(400);
}

async function searchLetter(letter) {
  closeNav();
  mealRecipe.innerHTML = "";
  // $("#loader").fadeIn(300);

  if (letter == "") {
    letter = "a";
  } else {
    ("");
  }
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
  );
  response = await response.json();
  if (response.meals == display(response.meals)) {
    // display([]);
    displaySearch();
  }
  // displaySearch();
  // $("#loader").fadeOut(300);
}

//////////////////////// category   ///////////////////////////////////////////

async function getCategories() {
  closeNav();
  mealRecipe.innerHTML = "";
  $("#loader").fadeIn(300);
  changePage.innerHTML = "";

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  response = await response.json();

  displayCategories(response.categories);
  $("#loader").fadeOut(400);
}

function displayCategories(cat) {
  let cartona = "";

  for (let i = 0; i < cat.length; i++) {
    cartona += `
        <div class="col-md-3">
                <div onclick="getCategoryRecipe('${
                  cat[i].strCategory
                }')" class="meal rounded-2 cursor-pointer">
                    <img class="w-100" src="${cat[i].strCategoryThumb}">
                    <div class="layer text-dark p-2">
                        <h2>${cat[i].strCategory}</h2>
                        <p class="text-dark">${cat[i].strCategoryDescription
                          .split(" ")
                          .slice(0, 15)
                          .join(" ")}</p>
                    </div>
                </div>
        </div>
        `;
  }

  mealRecipe.innerHTML = cartona;
}

async function getCategoryRecipe(category) {
  changePage.innerHTML = "";
  $("#loader").fadeIn(400);

  let result = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  result = await result.json();

  display(result.meals.slice(0, 20));
  $("#loader").fadeOut(400);
}

/////////////////// AREA ////////////////////////////////////////////

async function getArea() {
  closeNav();
  mealRecipe.innerHTML = "";
  changePage.innerHTML = "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  response = await response.json();
  console.log(response.meals);

  displayArea(response.meals);
}

function displayArea(query) {
  let cartona = "";

  for (let i = 0; i < query.length; i++) {
    cartona += `
        <div class="col-md-3 text-light">
                <div onclick="areaMeals('${query[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house fa-5x text-light"></i>
                        <h2>${query[i].strArea}</h2>
                </div>
        </div>
        `;
  }

  mealRecipe.innerHTML = cartona;
}

async function areaMeals(area) {
  mealRecipe.innerHTML = "";
  $("#loader").fadeIn(400);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  response = await response.json();
  display(response.meals.slice(0, 20));
  $("#loader").fadeOut(400);
}

///////////////////// ingredients /////////////////////////////

async function getIngredients() {
  closeNav();
  mealRecipe.innerHTML = "";
  $("#loader").fadeIn(400);
  changePage.innerHTML = "";

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  response = await response.json();
  console.log(response.meals);

  displayIngredients(response.meals.slice(0, 20));
  $("#loader").fadeOut(400);
}

function displayIngredients(r) {
  let cartona = "";

  for (let i = 0; i < r.length; i++) {
    cartona += `
        <div class="col-md-3 text-light">
                <div onclick="getIngredientsMeals('${
                  r[i].strIngredient
                }')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${r[i].strIngredient}</h3>
                        <p>${r[i].strDescription
                          .split(" ")
                          .slice(0, 30)
                          .join(" ")}</p>
                </div>
        </div>
        `;
  }

  mealRecipe.innerHTML = cartona;
}

async function getIngredientsMeals(ing) {
  mealRecipe.innerHTML = "";

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`
  );
  response = await response.json();

  display(response.meals.slice(0, 20));
}

//////////////////// contact ///////////////////////////

function displayContacts() {
  $("#loader").fadeIn(400);
  closeNav();
  mealRecipe.innerHTML = `
      <div class=" container contact-text text-center w-50 py-3">
  <h2>Contact Us</h2>
  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, velit quaerat numquam rerum nam voluptate, cum autem culpa nostrum amet iure facere maxime illum deleniti repellat, est voluptatum tempore quam.</p>
  </div>

  <div id="contact" class="contact text-center">
    <div class="container w-75 ">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="NameValid()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger mt-2">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="mailValid()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger mt-2">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="validate()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger mt-2">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="validate()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger mt-2">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="validate()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger mt-2">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="validate()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger mt-2">
                    Enter valid repassword
                </div>
            </div>
        </div>
        <button id="btn" class="btn btn-outline-danger disabled px-2 mt-3">Submit</button>
    </div>
</div> `;

  $("#loader").fadeOut(400);
}

function NameValid() {
  let regName = /^[a-zA-Z ]+$/;
  let name = document.getElementById("nameInput").value;
  if (regName.test(name)) {
    document.getElementById("nameAlert").style.display = "none";
    return true;
  } else {
    document.getElementById("nameAlert").style.display = "block";
    return false;
  }
}

function mailValid() {
  let regName =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let name = document.getElementById("emailInput").value;
  if (regName.test(name)) {
    document.getElementById("emailAlert").style.display = "none";
    return true;
  } else {
    document.getElementById("emailAlert").style.display = "block";
    return false;
  }
}

function phoneValid() {
  let regName = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  let name = document.getElementById("phoneInput").value;
  if (regName.test(name)) {
    document.getElementById("phoneAlert").style.display = "none";
    return true;
  } else {
    document.getElementById("phoneAlert").style.display = "block";
    return false;
  }
}

function ageValid() {
  let regName = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/;
  let name = document.getElementById("ageInput").value;
  if (regName.test(name)) {
    document.getElementById("ageAlert").style.display = "none";
    return true;
  } else {
    document.getElementById("ageAlert").style.display = "block";
    return false;
  }
}

function passwordValid() {
  let regName = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;
  let name = document.getElementById("passwordInput").value;
  if (regName.test(name)) {
    document.getElementById("passwordAlert").style.display = "none";
    return true;
  } else {
    document.getElementById("passwordAlert").style.display = "block";
    return false;
  }
}
function rePasswordValid() {
  if (
    document.getElementById("repasswordInput").value ==
    document.getElementById("passwordInput").value
  ) {
    document.getElementById("repasswordAlert").style.display = "none";
    return true;
  } else {
    document.getElementById("repasswordAlert").style.display = "block";
    return false;
  }
}

function validate() {
  if (
    NameValid() &&
    mailValid() &&
    phoneValid() &&
    ageValid() &&
    passwordValid() &&
    rePasswordValid()
  ) {
    console.log("done");
    let btn = document.getElementById("btn");
    btn.classList.remove("disabled");
  }
}
