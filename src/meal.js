const input = document.getElementById("input");
const search = document.getElementById("search");
const noMeal = document.getElementById("noMeal");
const mealWrapper = document.querySelector(".meal-wrapper");
const mealPopup = document.getElementById("mealPopup");

// Fetch meal
const fetchAllFood = async (mealName) => {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
    );
    if (!response.ok) {
      throw new Error("Something went wrong...");
    }
    const data = await response.json();
    if (data.meals) {
      showFoods(data.meals);
    } else {
      noMeal.innerHTML = `<p class="text-center text-white text-2xl">No meals found. Try another search.</p>`;
    }
  } catch (error) {
    noMeal.innerText = `${error}`;
  }
};

// Show meals
function showFoods(data) {
  noMeal.innerHTML = "";
  mealWrapper.innerHTML = "";
  data.forEach((meal) => {
    const mealBox = document.createElement("div");
    mealBox.className = "meal-box border border-gray-500 rounded-lg";

    mealBox.innerHTML = `
      <img
        src=${meal.strMealThumb}
        alt=${meal.strMeal}
        class="rounded h-[200px] w-full object-cover"
      />
      <div class="p-3 text-white">
        <h3 class="text-2xl font-semibold">${meal.strMeal}</h3>
        <p class="text-base font-normal text-gray-400 py-2">
          ${meal.strInstructions.slice(0, 100)}...
        </p>
        <p class="italic text-lg text-gray-500">
          <span>${meal.strArea}</span> <span>${meal.strCategory}</span>
        </p>
        <div class="mt-3 ">
          <a
            href=${meal.strYoutube} target="_blank"
            class="btn rounded-lg text-lg font-semibold inline-block"
            >Watch</a>
          <button id="view-recipe" class="px-3 text-white font-semibold" onclick="lookupDeatils('${
            meal.idMeal
          }')">
            View Recipe
          </button>
        </div>
      </div>
    `;
    mealWrapper.appendChild(mealBox);
  });
}

//Look Up Details
function lookupDeatils(id) {
  let URL = `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  fetch(URL)
    .then((res) => res.json())
    .then((data) => detailsPopup(data.meals[0]));
}

function detailsPopup(dtls) {
  console.log(dtls);
  mealPopup.style.display = "block";
  mealPopup.style.display = "flex";
  mealPopup.innerHTML = `
    <div class="bg-white w-full md:w-1/2 p-12 md:p-5 rounded-lg relative max-h-[90%] overflow-y-auto">
        <button id="closePopup" class="absolute top-2 right-4 text-black text-xl font-bold">
          X
        </button>
        <div class="popup-content text-center">
          <h3 class="text-2xl font-bold mb-2">${dtls.strCategory}</h3>
          <p class="text-gray-700 mb-4"> ${dtls.strInstructions}</p>
        </div>
      </div>
  `;
  const closePopup = document.getElementById("closePopup");
  closePopup.addEventListener("click", () => {
    mealPopup.style.display = "none";
  });
}

// Event listener for search button
search.addEventListener("click", () => {
  const mealName = input.value;
  fetchAllFood(mealName);
});
