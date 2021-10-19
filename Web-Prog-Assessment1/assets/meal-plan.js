function doCalculation() {
  let calories = document.forms["meal-form"]["cal"].value;

  //Categories
  let cate_anything = document.forms["meal-form"]["anything"].checked;
  let cate_paleo = document.forms["meal-form"]["paleo"].checked;
  let cate_vegetarian = document.forms["meal-form"]["vegetarian"].checked;
  let cate_vegan = document.forms["meal-form"]["vegan"].checked;
  let cate_keto = document.forms["meal-form"]["keto"].checked;
  let cate_medi = document.forms["meal-form"]["medi"].checked;

  //Calories Setting
  let breakfast_cal_percentage = 0.2;
  let lunch_cal_percentage = 0.5;
  let dinner_cal_percentage = 0.3;

  //Calories each meal
  var calEachMeal = new Array(2);

  //Calories each meal
  var calCurrentMeal = new Array(2);


  //Storage of meal
  var mealStorage = [
    [],
    []
  ];


  //Storage of category selection
  var category;
	
  // Storage of budget of a dqay
  let budget = 0;

  // validate calories input
  if (calories == "") {
    alert("Don't starve! Please fill out calories felid.");
    return false;

  } else if (calories <= 1200) {
    alert("You need to serve more than 1200 calories for 3 meals a day!");
    return false;
  } else if (calories >= 2700) {
    alert("A recommanded daily calorie intake is 2000 cal for women and 2500 for men");
    return false;
  }

  // validate category selection and get the selected category
  if (cate_anything == true) {
    category = "any";

  } else if (cate_paleo == true) {
    category = "Paleo";

  } else if (cate_vegetarian == true) {
    category = "Vegetarian";

  } else if (cate_vegan == true) {
    category = "Vegan";

  } else if (cate_keto == true) {
    category = "Ketogenic";

  } else if (cate_medi == true) {
    category = "Mediterranean";

  } else {
    alert("Please select a category");
    return false;
  }


  // calculate serve for each meal
  calEachMeal[0] = calories * breakfast_cal_percentage;
  calEachMeal[1] = calories * lunch_cal_percentage;
  calEachMeal[2] = calories * dinner_cal_percentage;


  // value to calculate how many meal in a day
  let mealAmount = 0;

  // three meal time: breakfast, lunch, dinner
  for (let countMealTime = 0; countMealTime < 3; countMealTime++) {

    // get max calories of this meal
    let MaxCalories = calEachMeal[countMealTime];

    // set calories for sum up all calories from this meal
    let CurrentCalories = 0;

    // set detection for end the loop as there are no enough data set
    let isContinue = 1;

    // start to send query to data API exit loop until exceeds cal limit
    do {
      var mealStorageTemp = findMeal(MaxCalories - CurrentCalories, category, countMealTime);

      // if the data API return a valid data catch it and start to check repeatation.
      if (mealStorageTemp != null) {
        var mealRepeatCheckResult = 1;

        // check repeatation when there are data existing in storage otherwise add to database directly
        if (!(mealStorage.length == 0)) {

          // check the data from storage one by one 
          for (let countMealRepeatCheck = 0; countMealRepeatCheck < mealStorage.length; countMealRepeatCheck++) {
            if (mealStorageTemp[0] == mealStorage[countMealRepeatCheck][0]) {

              // if there are something same, to exit the for loop maxiumlize the countMealRepeatCheck
              // moreoverm 
              countMealRepeatCheck = 9999999999999999999999;
              mealRepeatCheckResult = 0;
            }
          }
        }


        if (mealRepeatCheckResult == 1) {
          CurrentCalories += mealStorageTemp[5];
          budget +=  mealStorageTemp[6];
          mealStorage[mealAmount] = mealStorageTemp;
          mealStorage[mealAmount][9] = countMealTime;
          mealAmount++;
        }

      } else {
        // if the data API return null means there are no meal match, so exit this meal time 
        isContinue = 0;
      }
    } while (MaxCalories - CurrentCalories > 0 && isContinue == 1);
    calCurrentMeal[countMealTime] = CurrentCalories;

  }


  // ---------------- DEBUG ----------------
  for (let debugCount = 0; debugCount < mealStorage.length; debugCount++) {
    console.log(mealStorage[debugCount]);
  }

  // ----------------  PRINTRESULT ----------------
  // display reset button and hide submit button. Disable illustration
  document.getElementById("submit_btn").style.display = "none";
  document.getElementById("reset_btn").style.display = "inline";
  document.getElementById("meal-right-col").style.display = "none";
  document.getElementById("meal-right-result-col").style.display = "inline";

  // disabled calories input
  document.getElementById("cal").disabled = true;

  // set a alert when clicking category button
  document.getElementById("anything").addEventListener("click", alertReset);
  document.getElementById("paleo").addEventListener("click", alertReset);
  document.getElementById("vegetarian").addEventListener("click", alertReset);
  document.getElementById("vegan").addEventListener("click", alertReset);
  document.getElementById("keto").addEventListener("click", alertReset);
  document.getElementById("medi").addEventListener("click", alertReset);


  // write overview
  var totalCalories = calCurrentMeal[0] + calCurrentMeal[1] + calCurrentMeal[2];	

  document.getElementById("overview-cals").innerHTML = totalCalories.toFixed(2) + " Calories";
  document.getElementById("overview-cals-remain").innerHTML = (calories - totalCalories).toFixed(2) + " calories remained";
  document.getElementById("overview-pricing").innerHTML = "AUD $ " + budget.toFixed(2);




  // write meal storage to front end
  // three meal time
  for (let countMealTime = 0; countMealTime < 3; countMealTime++) {
    // go to each line in storage to see is this meal in the right meal time. If yes print it out.

	let elementParentIDName = null;
	switch(countMealTime){
		case(0):
		elementParentIDName = "breakfast";
		break;
		
        case(1):
		elementParentIDName = "lunch";
		break;
		
        case(2):
		elementParentIDName = "dinner";
		break;
			
	}

    // write title and calories information for breakfast, lunch and dinner
    document.getElementById("result-col-"+ elementParentIDName +"-title").innerHTML = elementParentIDName.charAt(0).toUpperCase() + elementParentIDName.slice(1) + " (Total " + calCurrentMeal[countMealTime].toFixed(2) + " Cal/Limit " + calEachMeal[countMealTime].toFixed(2) + " Cal)";


    for (let countWrittenMeal = 0; countWrittenMeal < mealStorage.length; countWrittenMeal++) {

      if (mealStorage[countWrittenMeal][9] == countMealTime) {

        // -------- create a container for meal -------- 
        // create a new div and give it a class name
        let elementDiv = document.createElement("div");
        elementDiv.className = "result-col-item";

        // set id 
        let elementDivID = "result-col-item-" + countWrittenMeal;
        elementDiv.setAttribute("id", elementDivID);

        // get the parent want to insert
        // remember to change to the right parent
        let elementParent = document.getElementById("result-col-" + elementParentIDName);
        elementParent.appendChild(elementDiv);

        // -------- get container for this meal -------- 
        let elementParentforMealContainer = document.getElementById(elementDivID);


        // -------- images for meal -------- 
        // create a new elemtns for images
        let elementforImage = document.createElement("div");
		elementforImage.className = "result-col-image";

		
        // remember to insert url here
		let bg = "background-image: url(" + mealStorage[countWrittenMeal][7] +")"
		// this method set image as background so there won't be wired size happen
        elementforImage.setAttribute("style", bg);

        // add to HTML in the meal container
        elementParentforMealContainer.appendChild(elementforImage);


        // -------- div for span -------- 
        // create a new div for two span and set class name
        let elementDivforSpan = document.createElement("div");
        elementDivforSpan.className = "result-col-item-content";

        // set id for unique identification
        let elementDivforSpanID = "result-col-item-content-" + countWrittenMeal;
        elementDivforSpan.setAttribute("id", elementDivforSpanID);
        // add to HTML in the meal container
        elementParentforMealContainer.appendChild(elementDivforSpan);

        // -------- get container for this meal -------- 
        let elementParentforSpanContainer = document.getElementById(elementDivforSpanID);


        // -------- content in span -------- 
        // create a new elements for two span and set class name
        let elementSpan1 = document.createElement("span");
        let elementSpan2 = document.createElement("span");
        elementSpan1.className = "result-col-item-heading";
        elementSpan2.className = "result-col-item-article";

        // add to HTML in the meal container
        elementParentforSpanContainer.appendChild(elementSpan1);
        elementParentforSpanContainer.appendChild(elementSpan2);

        // remember to insert meal info here.
        elementSpan1.innerHTML = mealStorage[countWrittenMeal][0];
        elementSpan2.innerHTML = "<br>" + mealStorage[countWrittenMeal][5] + " Calories<br>AUD " + mealStorage[countWrittenMeal][6];
      }

    }
  }
  return true;
}



//finding meal using pass in attribute
function findMeal(cal, category, meal) {
  //min from 0
  var min = Math.ceil(0);

  //max from data array length
  var max = Math.floor(data(1, 0));

  //generate random number from min - max
  var value = Math.floor(Math.random() * (max - min + 1)) + min;

  // to make meal match the array isbreakfast, isLunch or isDinner check
  meal += 2;

  // detect do we need to repeat
  // 1: yes
  // 0: no
  var doRepeat = 0;

  do {
    //start from the random row and end in the max row
    for (var countData = value; countData < data(1, 0); countData++) {

      // call data API and ask for data
      var selectedData = data(2, countData);

      // if the meal is sutiable (match meal time, category and calories)
      if (selectedData[1] == category || category == "any") {
        if (selectedData[meal] == true) {
          if (selectedData[5] <= cal) {
            return selectedData;
          }
        }
      }
    }

    // if reach to this line second time, that means there are no meal sutiable, than return a "null"
    if (doRepeat == 1) {
      return null;
    }

    // if the system reach this line at the first time, that means there are no match meal in the half loop
    // so reset the loop and poll from the first one.
    value = 0;
    doRepeat = 1;
  } while (doRepeat == 1);
}


function alertReset() {
  alert("Please click the reset button!");
}


// dataset
// functionID: 
//   1.get length  
//   2.get dataAPI (please send parseID as well to let systen index which data you wan to reaching to.)
function data(functionID, parseID) {
  var meal = [
    [
      "Eggplant ragu with grilled polenta", "Vegetarian", true, true, false, 624.23, 5.50, "https://img.taste.com.au/b11rGwE6/w720-h480-cfill-q80/taste/2016/11/eggplant-ragu-with-grilled-polenta-108344-1.jpeg", "https://www.taste.com.au/recipes/eggplant-ragu-grilled-polenta/a912d25e-bad5-4ce7-a7c2-15b28110fcac?r=zone/healthymealplanner&z=Healthy%20meal%20planner"
    ],
    [
      "Curried lentil and vegetable pie", "Vegetarian", true, true, false, 612.41, 17.69, "https://img.taste.com.au/eSNLsVfh/w720-h480-cfill-q80/taste/2016/11/curried-lentil-and-vegetable-pie-103235-1.jpeg", "https://www.taste.com.au/recipes/curried-lentil-vegetable-pie/36d8c9a1-556d-4f69-a9b3-2c96ac4a4415?r=zone/healthymealplanner&z=Healthy%20meal%20planner"
    ],
    [
      "Turkish eggs", "Vegetarian", false, false, true, 344.59, 18.86, "https://img.taste.com.au/C4VXWgKn/w720-h480-cfill-q80/taste/2016/11/turkish-eggs-72227-1.jpeg", "https://www.taste.com.au/recipes/turkish-eggs/15bef257-5fe7-452a-8052-36e520ed3623?r=zone/healthymealplanner&z=Healthy%20meal%20planner"
    ],
    [
      "Super-greens frittata", "Vegetarian", true, true, true, 340.71, 12.30, "https://img.taste.com.au/X-FizDrn/w720-h480-cfill-q80/taste/2016/11/super-greens-frittata-105156-1.jpeg", "https://www.taste.com.au/recipes/super-greens-frittata/41152a0b-44c6-40c4-8244-3dd7120f79c1?r=zone/healthymealplanner&z=Healthy%20meal%20planner"
    ],
    [
      "Roasted sweet potato with caramelised garlic and spiced chickpeas", "Vegetarian", true, true, true, 537.83, 8.85, "https://img.taste.com.au/QqvXYZE2/w720-h480-cfill-q80/taste/2016/11/roasted-sweet-potato-with-caramelised-garlic-and-spiced-chickpeas-104799-1.jpeg", "https://www.taste.com.au/recipes/roasted-sweet-potato-caramelised-garlic-spiced-chickpeas/3a14841b-9f2d-4d8d-b40e-07daeab2b116?r=zone/healthymealplanner&z=Healthy%20meal%20planner"
    ],
    [
      "Mexican chilli bean polenta pie", "Vegetarian", false, true, true, 351.91, 25.62, "https://img.taste.com.au/fiDrP01D/w720-h480-cfill-q80/taste/2016/11/mexican-chilli-bean-polenta-pie-1139-1.jpeg", "https://www.taste.com.au/recipes/mexican-chilli-bean-polenta-pie/380c29dd-8c2e-429e-9f0c-818d6a255ba6?r=zone/healthymealplanner&z=Healthy%20meal%20planner"
    ],
    [
      "Sicilian eggplant lasagne", "Vegetarian", false, true, true, 456.94, 16.92, "https://img.taste.com.au/tZJZ2UyX/w720-h480-cfill-q80/taste/2016/11/sicilian-eggplant-lasagne-1190-1.jpeg", "https://www.taste.com.au/recipes/sicilian-eggplant-lasagne/9c73962c-5693-4382-a8f8-aa5d3a86cbe0?r=zone/healthymealplanner&z=Healthy%20meal%20planner"
    ],
    [
      "Silver beet and cheese lasagne", "Vegetarian", true, false, false, 192.43, 8.15, "https://img.taste.com.au/8DMFyQhU/w720-h480-cfill-q80/taste/2016/11/silver-beet-and-cheese-lasagne-4345-1.jpeg", "https://www.taste.com.au/recipes/silver-beet-cheese-lasagne/59c3939d-aad4-4bed-8240-ae3b2714ea8b?r=zone/healthymealplanner&z=Healthy%20meal%20planner"
    ],
    [
      "Chinese broccoli and mushroom stir-fry (vegetarian)", "Vegetarian", false, false, true, 592.57, 7.74, "https://img.taste.com.au/icm0t8aC/w720-h480-cfill-q80/taste/2016/11/chinese-broccoli-and-mushroom-stir-fry-vegetarian-8170-1.jpeg", "https://www.taste.com.au/recipes/chinese-broccoli-mushroom-stir-fry-vegetarian/8a466dd0-3f38-4230-8725-a50528a46329?r=zone/healthymealplanner&z=Healthy%20meal%20planner"
    ],
    [
      "Vegetable casserole with simmered eggs (vegetarian)", "Vegetarian", true, true, false, 555.34, 8.69, "https://img.taste.com.au/_va6jpP6/w720-h480-cfill-q80/taste/2016/11/vegetable-casserole-with-simmered-eggs-vegetarian-10562-1.jpeg", "https://www.taste.com.au/recipes/vegetable-casserole-simmered-eggs-vegetarian/42cc0639-e3e9-44f4-8bf6-8caf1a13366f?r=zone/healthymealplanner&z=Healthy%20meal%20planner"
    ],
    [
      "Minestrone salad", "Vegetarian", false, true, true, 542.74, 28.26, "https://img.taste.com.au/YWGLPNMh/w720-h480-cfill-q80/taste/2016/11/minestrone-salad-12254-1.jpeg", "https://www.taste.com.au/recipes/minestrone-salad/c1ddbaad-6ca3-4a4f-b1f9-eb542a54eaf5?r=zone/healthymealplanner&z=Healthy%20meal%20planner"
    ],
    [
      "Vegetarian sausages & rice salad", "Vegan", false, true, false, 595.15, 9.27, "https://img.taste.com.au/vjlMNnrO/w720-h480-cfill-q80/taste/2016/11/vegetarian-sausages-rice-salad-22716-1.jpeg", "https://www.taste.com.au/recipes/vegetarian-sausages-rice-salad/aae22809-868b-4cea-8091-da0681cefd98?r=zone/healthymealplanner&z=Healthy%20meal%20planner"
    ],
    [
      "Bruschetta pasta", "Vegan", false, true, true, 107.36, 24.69, "https://img.taste.com.au/rcRT-bXw/w720-h480-cfill-q80/taste/2016/11/bruschetta-pasta-8459-1.jpeg", "https://www.taste.com.au/recipes/bruschetta-pasta/1dab1a9f-ee90-43b8-90b7-cf526fc49cc3?r=zone/healthymealplanner&z=Healthy%20meal%20planner"
    ],
    [
      "Barbecued tofu burgers", "Vegan", true, true, false, 330.21, 29.99, "https://img.taste.com.au/0CkhdFGk/w720-h480-cfill-q80/taste/2016/11/barbecued-tofu-burgers-13711-1.jpeg", "https://www.taste.com.au/recipes/barbecued-tofu-burgers/88544849-736b-4640-bd4c-36dab59ad481?r=zone/healthymealplanner&z=Healthy%20meal%20planner"
    ],
    [
      "Stir-fried asparagus with tofu", "Vegan", true, true, true, 311.93, 36.24, "https://img.taste.com.au/PIaZY5t1/w720-h480-cfill-q80/taste/2016/11/stir-fried-asparagus-with-tofu-16108-1.jpeg", "https://www.taste.com.au/recipes/stir-fried-asparagus-tofu/a8f2bc52-da8e-4721-8f9e-06bf5883549a?r=zone/healthymealplanner&z=Healthy%20meal%20planner"
    ],
    [
      "Tofu, snow pea and corn stir-fry", "Vegan", false, true, false, 291.69, 35.56, "https://img.taste.com.au/LjVTajwp/w720-h480-cfill-q80/taste/2016/11/tofu-snow-pea-and-corn-stir-fry-80385-1.jpeg", "https://www.taste.com.au/recipes/tofu-snow-pea-corn-stir-fry/b7fd07c9-28a4-4b97-ac10-4a112b10e5c0?r=zone/healthymealplanner&z=Healthy%20meal%20planner"
    ],
    [
      "Quinoa, broad bean and sumac pumpkin tabouli", "Vegan", true, true, true, 582.07, 26.45, "https://img.taste.com.au/GXwb_OBe/w720-h480-cfill-q80/taste/2016/11/quinoa-broad-bean-and-sumac-pumpkin-tabouli-93223-1.jpeg", "https://www.taste.com.au/recipes/quinoa-broad-bean-sumac-pumpkin-tabouli/c4b5ab55-2055-484c-9982-06f468aaa730?r=zone/healthymealplanner&z=Healthy%20meal%20planner"
    ],
    [
      "Cauliflower, potato and chickpea curry", "Vegan", true, false, true, 439.88, 35.12, "https://img.taste.com.au/jtA15WWp/w720-h480-cfill-q80/taste/2016/11/cauliflower-potato-and-chickpea-curry-75960-1.jpeg", "https://www.taste.com.au/recipes/cauliflower-potato-chickpea-curry/e9065048-3a32-4bb8-87f5-cbf6af5a4631?r=zone/healthymealplanner&z=Healthy%20meal%20planner"
    ],
    [
      "Indian vegetable and chickpea curry", "Vegan", true, true, true, 692.93, 7.90, "https://img.taste.com.au/r8-myYhd/w720-h480-cfill-q80/taste/2016/11/indian-vegetable-and-chickpea-curry-81237-1.jpeg", "https://www.taste.com.au/recipes/indian-vegetable-chickpea-curry/a3aa3a62-ee80-408b-81ea-37f88042b3d1?r=zone/healthymealplanner&z=Healthy%20meal%20planner"
    ],
    [
      "Marinated tofu skewers", "Vegan", true, false, false, 209.52, 38.53, "https://img.taste.com.au/88XkKwia/w720-h480-cfill-q80/taste/2016/11/marinated-tofu-skewers-14446-1.jpeg", "https://www.taste.com.au/recipes/marinated-tofu-skewers/8b895cc4-a824-41cf-bfec-52c373b1f321?r=zone/healthymealplanner&z=Healthy%20meal%20planner"
    ],
    [
      "Angel hair pasta with watercress and carrot", "Vegan", true, true, true, 281.76, 13.56, "https://img.taste.com.au/DMYghzpG/w720-h480-cfill-q80/taste/2016/11/angel-hair-pasta-with-watercress-and-carrot-8725-1.jpeg", "https://www.taste.com.au/recipes/angel-hair-pasta-watercress-carrot/c8358a1c-9cf7-4054-a007-eeaf25d63732?r=zone/healthymealplanner&z=Healthy%20meal%20planner"
    ],
    [
      "Spicy bean and rice pilaf", "Vegan", true, true, true, 365.53, 14.63, "https://img.taste.com.au/ey7XMLEo/w720-h480-cfill-q80/taste/2016/11/spicy-bean-and-rice-pilaf-2239-1.jpeg", "https://www.taste.com.au/recipes/spicy-bean-rice-pilaf/def9edf5-72ad-46c8-b7d2-13ad350afffe?r=zone/healthymealplanner&z=Healthy%20meal%20planner"
    ],
    [
      "Stir-fried tofu & broccoli with soy & brown rice", "Vegan", true, false, false, 200.39, 35.96, "https://img.taste.com.au/o3bb6Kvp/w720-h480-cfill-q80/taste/2016/11/stir-fried-tofu-broccoli-with-soy-brown-rice-75676-1.jpeg", "https://www.taste.com.au/recipes/stir-fried-tofu-broccoli-soy-brown-rice/c18de4ae-c1fd-4b5d-8a2f-5004c8b43d50?r=zone/healthymealplanner&z=Healthy%20meal%20planner"
    ],
    [
      "Raw pasta puttanesca", "Vegan", true, true, false, 210.53, 10.64, "https://img.taste.com.au/t0utO_u-/w720-h480-cfill-q80/taste/2016/11/raw-pasta-puttanesca-68390-1.jpeg", "https://www.taste.com.au/recipes/raw-pasta-puttanesca/e790d7a5-fa6c-420b-8f21-3a6771f8b768?r=zone/healthymealplanner&z=Healthy%20meal%20planner"
    ],
    [
      "Potato and chickpea curry", "Vegan", false, true, true, 192.44, 29.92, "https://img.taste.com.au/li5XmLCv/w720-h480-cfill-q80/taste/2016/11/potato-and-chickpea-curry-1200-1.jpeg", "https://www.taste.com.au/recipes/potato-chickpea-curry/f566f05c-72a7-48f3-a229-bbc137d1e36e?r=zone/healthymealplanner&z=Healthy%20meal%20planner"
    ],
    [
      "Tofu, asparagus & snake bean stir-fry", "Vegan", true, true, true, 452.77, 10.63, "https://img.taste.com.au/f9CtyYOq/w720-h480-cfill-q80/taste/2016/11/tofu-asparagus-snake-bean-stir-fry-7803-1.jpeg", "https://www.taste.com.au/recipes/tofu-asparagus-snake-bean-stir-fry/ec6eb9ae-1145-4704-b28e-627edef46f74?r=zone/healthymealplanner&z=Healthy%20meal%20planner"
    ],
    [
      "Summer caponata pasta", "Vegan", false, false, true, 487.51, 5.19, "https://img.taste.com.au/oLIxilkE/w720-h480-cfill-q80/taste/2016/11/summer-caponata-pasta-7703-1.jpeg", "https://www.taste.com.au/recipes/summer-caponata-pasta/82e0c7f6-a719-4d25-a56b-4b800f270da6?r=zone/healthymealplanner&z=Healthy%20meal%20planner"
    ],
    [
      "Red bean and pumpkin curry", "Vegan", true, false, true, 349.08, 31.67, "https://img.taste.com.au/WVrG19TV/w720-h480-cfill-q80/taste/2016/11/pasta-with-fresh-tomato-sauce-81253-1.jpeg", "https://www.taste.com.au/recipes/red-bean-pumpkin-curry/4fdd1626-edca-4d77-8031-2597a396d8ff?r=zone/healthymealplanner&z=Healthy%20meal%20planner"
    ],
    [
      "Tomato Greek salad with pan-fried fetta", "Mediterranean", true, false, false, 227.62, 35.08, "https://img.taste.com.au/9zPHpyUk/w720-h480-cfill-q80/taste/2018/12/tomato-greek-salad-with-pan-fried-fetta-145617-2.jpg", "https://www.taste.com.au/recipes/tomato-greek-salad-pan-fried-fetta-recipe/mhpk5epk?r=healthy/OOk6eUcx"
    ],
    [
      "Mediterranean mackerel and potato patties", "Mediterranean", true, true, true, 117.87, 11.56, "https://img.taste.com.au/V20fhHkr/w720-h480-cfill-q80/taste/2017/12/mediterranean-stuffed-capsicums-133570-2.jpg", "https://www.taste.com.au/recipes/mediterranean-stuffed-capsicums/dROZ9v7D?r=healthy/OOk6eUcx"
    ],
    [
      "Deconstructed Greek salad with salmon", "Mediterranean", true, false, true, 576.85, 37.85, "https://img.taste.com.au/dlN_deGk/w720-h480-cfill-q80/taste/2018/11/deconstructed-greek-salad-with-salmon-recipe-143705-2.jpg", "https://www.taste.com.au/recipes/deconstructed-greek-salad-salmon-recipe/c3p2942r?r=healthy/OOk6eUcx"
    ],
    [
      "Roasted olives", "Mediterranean", true, true, true, 470.79, 6.85, "https://img.taste.com.au/S9JjjAsA/w720-h480-cfill-q80/taste/2016/11/roasted-olives-109865-1.jpeg", "https://www.taste.com.au/recipes/roasted-olives/420e0f43-64c7-4904-8fcf-c226ad3e6020?r=healthy/OOk6eUcx"
    ],
    [
      "Mediterranean lamb shoulder roast with lemon, olives and white wine", "Mediterranean", false, false, true, 148.40, 32.26, "https://www.taste.com.au/recipes/mediterranean-lamb-shoulder-roast-lemon-olives-white-wine/4a69a1c0-5d53-48fb-af62-36eb9b5867d5", "https://www.taste.com.au/recipes/mediterranean-lamb-shoulder-roast-lemon-olives-white-wine/4a69a1c0-5d53-48fb-af62-36eb9b5867d5?r=healthy/OOk6eUcx"
    ],
    [
      "Mediterranean roasted mushrooms", "Mediterranean", true, false, true, 245.46, 39.38, "https://img.taste.com.au/4ZNRotJJ/w720-h480-cfill-q80/taste/2016/11/mediterranean-roasted-mushrooms-95028-1.jpeg", "https://www.taste.com.au/recipes/mediterranean-roasted-mushrooms/5e5e0280-81d1-4a6e-a603-1fef9c753a7a?r=healthy/OOk6eUcx"
    ],
    [
      "Mediterranean platter", "Mediterranean", true, false, false, 631.05, 8.23, "https://img.taste.com.au/-8knaJEg/w720-h480-cfill-q80/taste/2016/11/mediterranean-platter-87227-1.jpeg", "https://www.taste.com.au/recipes/mediterranean-platter-2/a6033fd6-8f03-4ef0-8016-96aef53f108b?r=healthy/OOk6eUcx"
    ],
    [
      "Sardine bruschetta with kale slaw", "Mediterranean", false, true, true, 300.44, 6.30, "https://img.taste.com.au/BEvR536v/w720-h480-cfill-q80/taste/2018/12/sardine-bruschetta-with-kale-slaw-145037-1.jpg", "https://www.taste.com.au/recipes/sardine-bruschetta-kale-slaw-recipe/qx8np120?r=healthy/OOk6eUcx"
    ],
    [
      "Chargrilled Mediterranean vegetable pasta", "Mediterranean", false, false, true, 362.01, 5.28, "https://img.taste.com.au/IZ9zkJMH/w720-h480-cfill-q80/taste/2016/11/chargrilled-mediterranean-vegetable-pasta-105954-1.jpeg", "https://www.taste.com.au/recipes/chargrilled-mediterranean-vegetable-pasta/aaa76773-512b-427e-a7cf-c56a5fea6079"
    ],
    [
      "Mediterranean roast vegetables", "Mediterranean", true, true, true, 134.94, 27.43, "https://img.taste.com.au/Mwg8hNrI/w720-h480-cfill-q80/taste/2016/11/mediterranean-roast-vegetables-79550-1.jpeg", "https://www.taste.com.au/recipes/mediterranean-roast-vegetables/170d56e6-e80f-458b-8c0c-72ac88d3392c"
    ],
    [
      "Chicken with honey, tomatoes and almonds", "Mediterranean", false, false, true, 111.18, 20.27, "https://img.taste.com.au/2rwDNDrH/w720-h480-cfill-q80/taste/2016/11/chicken-with-honey-tomatoes-and-almonds-48717-1.jpeg", "https://www.taste.com.au/recipes/chicken-honey-tomatoes-almonds/798dea94-c3b7-4751-8928-3e9280848566"
    ],
    [
      "Rosemary's Mediterranean bean and pea salad with herbed salmon", "Mediterranean", false, false, true, 452.63, 12.55, "https://img.taste.com.au/sWfNxjtS/w720-h480-cfill-q80/taste/2016/11/rosemarys-mediterranean-bean-and-pea-salad-with-herbed-salmon-74135-1.jpeg", "https://www.taste.com.au/recipes/rosemarys-mediterranean-bean-pea-salad-herbed-salmon/dc046320-38e2-4865-b522-2eb7d98a82b5"
    ],
    [
      "Roast carrot, chickpea & mint salad", "Mediterranean", true, false, true, 384.47, 28.66, "https://img.taste.com.au/FKW3rSdr/w720-h480-cfill-q80/taste/2016/11/roast-carrot-chickpea-mint-salad-48706-1.jpeg", "https://www.taste.com.au/recipes/roast-carrot-chickpea-mint-salad/428000ea-ec3a-4a0b-a2a1-aa1c5a611b18"
    ],
    [
      "Almond and pistachio dukkah couscous", "Mediterranean", true, true, true, 447.55, 5.61, "https://img.taste.com.au/i7rqHOoA/w720-h480-cfill-q80/taste/2016/11/almond-and-pistachio-dukkah-couscous-27209-1.jpeg", "https://www.taste.com.au/recipes/almond-pistachio-dukkah-couscous/e7a2a34c-f14e-49b2-ba75-a12b8c83564d"
    ],
    [
      "Mediterranean tuna salad", "Mediterranean", true, true, false, 376.35, 19.18, "https://img.taste.com.au/1jAOXAA_/w720-h480-cfill-q80/taste/2016/11/mediterranean-tuna-salad-31059-1.jpeg", "https://www.taste.com.au/recipes/mediterranean-tuna-salad/e3fb7eaf-79cf-45f9-8e13-9592727b92b8"
    ],
    [
      "One-pan chicken acqua pazza", "Mediterranean", false, true, false, 252.18, 11.32, "https://img.taste.com.au/WW_9L49L/w720-h480-cfill-q80/taste/2018/09/one-pan-chicken-acqua-pazza-141234-2.jpg", "https://www.taste.com.au/recipes/one-pan-chicken-acqua-pazza/57zrxmh8"
    ],
    [
      "Mediterranean vegetable parcels", "Mediterranean", true, false, false, 492.85, 16.46, "https://img.taste.com.au/np8pBrPJ/w720-h480-cfill-q80/taste/2016/11/mediterranean-vegetable-parcels-92797-1.jpeg", "https://www.taste.com.au/recipes/mediterranean-vegetable-parcels/49795437-5a7f-46f8-92f1-4859ed1fd1e0"
    ],
    [
      "Keto haloumi lasagne", "Ketogenic", true, true, false, 168.68, 12.10, "https://img.taste.com.au/4IaN-MLM/w720-h480-cfill-q80/taste/2020/10/keto-haloumi-lasagne-166482-2.jpg", "https://www.taste.com.au/recipes/keto-haloumi-lasagne/01in6s78?r=recipes/ketorecipes&c=x9pyvq1v/Keto%20recipes"
    ],
    [
      "Keto zucchini slice", "Ketogenic", true, false, true, 201.50, 7.45, "https://img.taste.com.au/1Sp-cUIH/w720-h480-cfill-q80/taste/2020/10/keto-zucchini-slice-165809-1.jpg", "https://www.taste.com.au/recipes/keto-zucchini-slice-recipe/ckotvlyh?r=recipes/ketorecipes&c=x9pyvq1v/Keto%20recipes"
    ],
    [
      "Keto satay chicken for two", "Ketogenic", true, true, true, 674.00, 21.13, "https://img.taste.com.au/oQDjeVY-/w720-h480-cfill-q80/taste/2020/06/keto-satay-chicken-recipe-for-two-163139-1.jpg", "https://www.taste.com.au/recipes/keto-satay-chicken-recipe-two/1tl2yvk8?r=recipes/ketorecipes&c=x9pyvq1v/Keto%20recipes"
    ],
    [
      "Tuscan-style chicken", "Ketogenic", true, true, false, 350.89, 27.33, "https://img.taste.com.au/jtq17VeF/w720-h480-cfill-q80/taste/2020/05/jun20_tuscan-style-chicken-161759-1.jpg", "https://www.taste.com.au/recipes/tuscan-style-chicken-recipe/6zdd63ls?r=recipes/ketorecipes&c=x9pyvq1v/Keto%20recipes"
    ],
    [
      "Keto cappuccino slice", "Ketogenic", true, false, true, 632.31, 27.75, "https://img.taste.com.au/6VqVta0e/w720-h480-cfill-q80/taste/2020/01/keto-frappuccino-slice-167070-2.jpg", "https://www.taste.com.au/recipes/keto-frappuccino-slice-recipe/4rh3f351?r=recipes/ketorecipes&c=x9pyvq1v/Keto%20recipes"
    ],
    [
      "Easy keto chicken chow mein", "Ketogenic", false, false, false, 333.60, 23.50, "https://img.taste.com.au/wo2TpsDr/w720-h480-cfill-q80/taste/2020/01/easy-keto-chicken-chow-mein-157004-2.jpg", "https://www.taste.com.au/recipes/easy-keto-chicken-chow-mein-recipe/rm79vhwi?r=recipes/ketorecipes&c=x9pyvq1v/Keto%20recipes"
    ],
    [
      "Keto Swedish meatballs", "Ketogenic", false, true, false, 303.35, 29.41, "https://img.taste.com.au/qYOWwSRS/w720-h480-cfill-q80/taste/2020/01/keto-swedish-meatballs-157002-2.jpg", "https://www.taste.com.au/recipes/keto-swedish-meatballs-recipe/x54jfqd3?r=recipes/ketorecipes&c=x9pyvq1v/Keto%20recipes"
    ],
    [
      "Tikka chicken and cauliflower tray bake", "Ketogenic", true, true, true, 368.98, 35.50, "https://img.taste.com.au/ZcOwB_sI/w720-h480-cfill-q80/taste/2019/06/tikka-chicken-and-cauliflower-tray-bake-150403-2.jpg", "https://www.taste.com.au/recipes/tikka-chicken-cauliflower-tray-bake-recipe/soo4n5u6?r=recipes/ketorecipes&c=x9pyvq1v/Keto%20recipes"
    ],
    [
      "Keto taco shells", "Ketogenic", true, true, false, 554.52, 35.17, "https://img.taste.com.au/AiLOlxE_/w720-h480-cfill-q80/taste/2019/05/keto-taco-shells-149899-1.jpg", "https://www.taste.com.au/recipes/keto-taco-shells-recipe/q1cnkg68?r=recipes/ketorecipes&c=x9pyvq1v/Keto%20recipes"
    ],
    [
      "Keto lemon mug cake", "Ketogenic", true, true, false, 267.74, 6.94, "https://img.taste.com.au/8CtA0zXJ/w720-h480-cfill-q80/taste/2019/02/keto-lemon-mug-cake-147527-2.jpg", "https://www.taste.com.au/recipes/keto-lemon-mug-cake-recipe/y9rjimcd?r=recipes/ketorecipes&c=x9pyvq1v/Keto%20recipes"
    ],
    [
      "Keto garlic bread", "Ketogenic", true, true, true, 577.11, 31.32, "https://img.taste.com.au/iGELZrr5/w720-h480-cfill-q80/taste/2019/02/keto-garlic-bread-147525-1.jpg", "https://www.taste.com.au/recipes/keto-garlic-bread-recipe/rzqlztj8?r=recipes/ketorecipes&c=x9pyvq1v/Keto%20recipes"
    ],
    [
      "Keto chicken parmi bowl", "Ketogenic", true, true, true, 455.33, 30.20, "https://img.taste.com.au/pSiQbaG-/w720-h480-cfill-q80/taste/2019/02/keto-chicke-parmi-bake-147529-1.jpg", "https://www.taste.com.au/recipes/keto-chicken-parmi-bowl-recipe/2wolshvv?r=recipes/ketorecipes&c=x9pyvq1v/Keto%20recipes"
    ],
    [
      "Keto pancakes", "Ketogenic", false, false, true, 393.02, 19.87, "https://img.taste.com.au/NQpa_G9g/w720-h480-cfill-q80/taste/2019/02/keto-pancakes-146734-1.jpg", "https://www.taste.com.au/recipes/keto-pancakes-recipe/ftzlzvu5?r=recipes/ketorecipes&c=x9pyvq1v/Keto%20recipes"
    ],
    [
      "One-pot keto zucchini alfredo", "Ketogenic", false, false, false, 505.02, 32.93, "https://img.taste.com.au/GtvbOhD5/w720-h480-cfill-q80/taste/2019/02/one-pot-keto-zucchini-and-lemon-alfredo-146706-2.jpg", "https://www.taste.com.au/recipes/one-pot-keto-zucchini-lemon-alfredo-recipe/5gi89td4?r=recipes/ketorecipes&c=x9pyvq1v/Keto%20recipes"
    ],
    [
      "Low-carb keto-friendly pizza", "Ketogenic", true, false, true, 295.79, 33.41, "https://img.taste.com.au/RHCTblOU/w720-h480-cfill-q80/taste/2018/12/low-carb-keto-friendly-pizza-145723-2.jpg", "https://www.taste.com.au/recipes/low-carb-keto-friendly-pizza-recipe/cnzyga3p?r=recipes/ketorecipes&c=x9pyvq1v/Keto%20recipes"
    ],
    [
      "3-cheese chicken and cauliflower lasagne", "Ketogenic", false, true, false, 429.80, 9.49, "https://img.taste.com.au/d3DQWKOC/w720-h480-cfill-q80/taste/2018/12/3-cheese-chicken-and-cauliflower-lasagne-145713-2.jpg", "https://www.taste.com.au/recipes/3-cheese-chicken-cauliflower-lasagne-recipe/2zl75fb4?r=recipes/ketorecipes&c=x9pyvq1v/Keto%20recipes"
    ],
    [
      "Keto satay chicken bowl with zoodle salad", "Ketogenic", false, true, true, 186.93, 20.33, "https://img.taste.com.au/jDgweSoU/w720-h480-cfill-q80/taste/2018/12/keto-fish-and-chips-145319-2.jpg", "https://www.taste.com.au/recipes/keto-satay-chicken-bowl-zoodle-salad-recipe/7z9049f0?r=recipes/ketorecipes&c=x9pyvq1v/Keto%20recipes"
    ],
    [
      "Power punch juice", "Paleo", true, false, true, 253.01, 29.87, "https://img.taste.com.au/zO6Z9pXr/w720-h480-cfill-q80/taste/2016/11/power-punch-juice-105272-1.jpeg", "https://www.taste.com.au/recipes/power-punch-juice/8bf40ee2-6300-4aad-ab81-04318e1fbbe6?r=recipes/paleorecipes&c=b01d3705-a10c-4d3d-b2dd-0f5a8237544d/Paleo%20recipes"
    ],
    [
      "Miso and tahini dressing", "Paleo", false, true, true, 693.12, 35.86, "https://img.taste.com.au/luXm33-V/w720-h480-cfill-q80/taste/2016/11/miso-and-tahini-dressing-103405-1.jpeg", "https://www.taste.com.au/recipes/miso-tahini-dressing/1fb2abe2-a9fb-46e4-ba3f-98384560dcd3?r=recipes/paleorecipes&c=b01d3705-a10c-4d3d-b2dd-0f5a8237544d/Paleo%20recipes"
    ],
    [
      "Paleo almond, pecan and coconut crumbed chicken", "Paleo", true, true, false, 105.39, 32.81, "https://img.taste.com.au/kTLR_tRX/w720-h480-cfill-q80/taste/2016/11/pecan-nuts-y-seeds-and-nuts-103289-2.jpeg", "https://www.taste.com.au/recipes/paleo-almond-pecan-coconut-crumbed-chicken/2937a0fa-92f0-4a30-9d20-cd79a07cf869?r=recipes/paleorecipes&c=b01d3705-a10c-4d3d-b2dd-0f5a8237544d/Paleo%20recipes"
    ],
    [
      "Broccolini with anchovy almonds", "Paleo", false, false, false, 138.69, 7.37, "https://img.taste.com.au/CwIACKMh/w720-h480-cfill-q80/taste/2016/11/broccolini-with-anchovy-almonds-102705-1.jpeg", "https://www.taste.com.au/recipes/broccolini-anchovy-almonds/a2721377-179e-412e-be62-bc8eabbe5f34?r=recipes/paleorecipes&c=b01d3705-a10c-4d3d-b2dd-0f5a8237544d/Paleo%20recipes"
    ],
    [
      "Sugar free, gluten free fruit cake", "Paleo", true, false, true, 447.46, 39.02, "https://img.taste.com.au/xbsDvsuH/w720-h480-cfill-q80/taste/2016/11/sugar-free-gluten-free-fruit-cake-103072-1.jpeg", "https://www.taste.com.au/recipes/sugar-free-gluten-free-fruit-cake/7b3024d1-cc08-4512-ba29-cf4cf349bfbe?r=recipes/paleorecipes&c=b01d3705-a10c-4d3d-b2dd-0f5a8237544d/Paleo%20recipes"
    ],
    [
      "Roasted baby carrots and parsnips with honey and mustard dressing", "Paleo", true, true, false, 416.43, 16.61, "https://img.taste.com.au/WMPHwrKm/w720-h480-cfill-q80/taste/2016/11/roasted-baby-carrots-and-parsnips-with-honey-and-mustard-dressing-102699-1.jpeg", "https://www.taste.com.au/recipes/roasted-baby-carrots-parsnips-honey-mustard-dressing/3d3022f7-c3fb-40d5-947b-ec3878ed680b?r=recipes/paleorecipes&c=b01d3705-a10c-4d3d-b2dd-0f5a8237544d/Paleo%20recipes"
    ],
    [
      "Paleo pumpkin pie", "Paleo", false, true, true, 694.31, 16.16, "https://img.taste.com.au/cPJAJCBh/w720-h480-cfill-q80/taste/2016/11/paleo-pumpkin-pie-102074-1.jpeg", "https://www.taste.com.au/recipes/paleo-pumpkin-pie/e11b7b94-0fdb-48c1-b26d-af76cbefd49d?r=recipes/paleorecipes&c=b01d3705-a10c-4d3d-b2dd-0f5a8237544d/Paleo%20recipes"
    ],
    [
      "No-bake rawies", "Paleo", true, true, true, 374.91, 6.32, "https://img.taste.com.au/0eZDWS7c/w720-h480-cfill-q80/taste/2016/11/no-bake-rawies-100984-1.jpeg", "https://www.taste.com.au/recipes/no-bake-rawies/5b2762ec-5410-426c-aefc-2e8ea450f5a1?r=recipes/paleorecipes&c=b01d3705-a10c-4d3d-b2dd-0f5a8237544d/Paleo%20recipes"
    ],
    [
      "Peking duck and grape salad", "Paleo", false, false, false, 510.42, 17.66, "https://img.taste.com.au/osLHzh_9/w720-h480-cfill-q80/taste/2016/11/peking-duck-and-grape-salad-100852-1.jpeg", "https://www.taste.com.au/recipes/peking-duck-grape-salad/1f9635ab-dd40-418a-a4e9-fe08af4b3452?r=recipes/paleorecipes&c=b01d3705-a10c-4d3d-b2dd-0f5a8237544d/Paleo%20recipes"
    ],
    [
      "Galloping horses", "Paleo", true, true, true, 206.06, 15.71, "https://img.taste.com.au/0s182fYd/w720-h480-cfill-q80/taste/2016/11/galloping-horses-100790-1.jpeg", "https://www.taste.com.au/recipes/galloping-horses/6c82952d-d2e3-4ea4-987a-68b85201d97b?r=recipes/paleorecipes&c=b01d3705-a10c-4d3d-b2dd-0f5a8237544d/Paleo%20recipes"
    ],
    [
      "Justine's brick-pressed barbecued chicken", "Paleo", true, true, false, 566.67, 18.15, "https://img.taste.com.au/tmTrY49c/w720-h480-cfill-q80/taste/2016/11/justines-brick-pressed-barbecued-chicken-100758-1.jpeg", "https://www.taste.com.au/recipes/justines-brick-pressed-barbecued-chicken/45219a4e-127a-4165-8688-9b7e19ea91cf?r=recipes/paleorecipes&c=b01d3705-a10c-4d3d-b2dd-0f5a8237544d/Paleo%20recipes"
    ],
    [
      "Spring lettuce with aioli", "Paleo", true, false, true, 167.71, 17.47, "https://img.taste.com.au/LwLRVfSt/w720-h480-cfill-q80/taste/2016/11/spring-lettuce-with-aioli-100756-1.jpeg", "https://www.taste.com.au/recipes/spring-lettuce-aioli/458f7887-c71d-41fa-b43b-f75a0fa24691?r=recipes/paleorecipes&c=b01d3705-a10c-4d3d-b2dd-0f5a8237544d/Paleo%20recipes"
    ],
    [
      "Dairy free strawberry mousse jar cakes", "Paleo", false, true, true, 215.15, 37.26, "https://img.taste.com.au/NnDagVrK/w720-h480-cfill-q80/taste/2016/11/dairy-free-strawberry-mousse-jar-cakes-100416-1.jpeg", "https://www.taste.com.au/recipes/dairy-free-strawberry-mousse-jar-cakes/5fe1c893-6abe-4df3-a19a-e35a4b1e8acb?r=recipes/paleorecipes&c=b01d3705-a10c-4d3d-b2dd-0f5a8237544d/Paleo%20recipes"
    ],
    [
      "No-bake raw peppermint slice", "Paleo", true, false, false, 265.58, 36.07, "https://img.taste.com.au/U9l2kX_e/w720-h480-cfill-q80/taste/2016/11/no-bake-raw-peppermint-slice-100422-1.jpeg", "https://www.taste.com.au/recipes/no-bake-raw-peppermint-slice/1d8c6c97-cea7-41e9-9e54-9ee7e70f9c91?r=recipes/paleorecipes&c=b01d3705-a10c-4d3d-b2dd-0f5a8237544d/Paleo%20recipes"
    ],
    [
      "Homemade mango & coconut popsicles", "Paleo", true, false, true, 679.36, 35.51, "https://img.taste.com.au/deA_C_Ns/w720-h480-cfill-q80/taste/2016/11/homemade-mango-coconut-popsicles-100426-1.jpeg", "https://www.taste.com.au/recipes/homemade-mango-coconut-popsicles/fa9d35ba-d1b5-479d-b38a-d58503f27c9c?r=recipes/paleorecipes&c=b01d3705-a10c-4d3d-b2dd-0f5a8237544d/Paleo%20recipes"
    ],
    [
      "BBQ grass-fed beef with salsa verde", "Paleo", true, false, false, 611.02, 21.70, "https://img.taste.com.au/F19E-WvT/w354-h236-cfill-q80/taste/2016/11/bbq-grass-fed-beef-with-salsa-verde-100292-1.jpeg", "https://www.taste.com.au/recipes/bbq-grass-fed-beef-salsa-verde/1362b677-48bb-49f0-80c1-75742a2d82cb?r=recipes/paleorecipes&c=b01d3705-a10c-4d3d-b2dd-0f5a8237544d/Paleo%20recipes"
    ],
    [
      "No-churn banana and cinnamon ice-cream", "Paleo", false, false, true, 202.38, 32.29, "https://img.taste.com.au/L2yuYwkv/w720-h480-cfill-q80/taste/2016/11/no-churn-banana-and-cinnamon-ice-cream-100420-1.jpeg", "https://www.taste.com.au/recipes/no-churn-banana-cinnamon-ice-cream/fc606589-9a07-4abd-aa0d-0b3c660caf81?r=recipes/paleorecipes&c=b01d3705-a10c-4d3d-b2dd-0f5a8237544d/Paleo%20recipes"
    ],
    [
      "No bake raw banoffee pie", "Paleo", true, true, true, 287.12, 35.61, "https://img.taste.com.au/gH-zCzMj/w720-h480-cfill-q80/taste/2016/11/no-bake-raw-banoffee-pie-100424-1.jpeg", "https://www.taste.com.au/recipes/no-bake-raw-banoffee-pie/dc1904a7-dd3e-444d-9219-c6ed30a78d13?r=recipes/paleorecipes&c=b01d3705-a10c-4d3d-b2dd-0f5a8237544d/Paleo%20recipes"
    ],
    [
      "Chocolate and goji berry crackles", "Paleo", false, true, true, 601.15, 32.27, "https://img.taste.com.au/1GWsPg35/w720-h480-cfill-q80/taste/2016/11/chocolate-and-goji-berry-crackles-100434-1.jpeg", "https://www.taste.com.au/recipes/chocolate-goji-berry-crackles/8b527f1d-0a14-48bc-9a16-0a4db023f7d7?r=recipes/paleorecipes&c=b01d3705-a10c-4d3d-b2dd-0f5a8237544d/Paleo%20recipes"
    ],
    [
      "Chilli and tahini kale chips", "Paleo", false, false, true, 328.13, 18.66, "https://img.taste.com.au/4Fkfjl2S/w720-h480-cfill-q80/taste/2016/11/chilli-and-tahini-kale-chips-100436-1.jpeg", "https://www.taste.com.au/recipes/chilli-tahini-kale-chips/a9d3c3d9-2fb7-4ee4-9d29-560be4c4c3bf?r=recipes/paleorecipes&c=b01d3705-a10c-4d3d-b2dd-0f5a8237544d/Paleo%20recipes"
    ],
    [
      "Beef and mushroom meatballs with 'pappardelle'", "Paleo", false, true, false, 285.00, 11.26, "https://img.taste.com.au/capNesTV/w720-h480-cfill-q80/taste/2016/11/beef-and-mushroom-meatballs-with-pappardelle-100412-1.jpeg", "https://www.taste.com.au/recipes/beef-mushroom-meatballs-pappardelle/ee9b8378-aad4-4aba-9151-09d87fdbbbdb?r=recipes/paleorecipes&c=b01d3705-a10c-4d3d-b2dd-0f5a8237544d/Paleo%20recipes"
    ],
    [
      "Asparagus quiche with kale pesto", "Paleo", true, true, true, 237.48, 36.58, "https://img.taste.com.au/ur0WdPwn/w720-h480-cfill-q80/taste/2016/11/asparagus-quiche-with-kale-pesto-100414-1.jpeg", "https://www.taste.com.au/recipes/asparagus-quiche-kale-pesto/3f59beb3-ea1c-4266-96d2-b29e151711ba?r=recipes/paleorecipes&c=b01d3705-a10c-4d3d-b2dd-0f5a8237544d/Paleo%20recipes"
    ],
    [
      "Grapefruit and celery salad", "Paleo", false, true, true, 387.00, 12.55, "https://img.taste.com.au/sGaY50qG/w720-h480-cfill-q80/taste/2016/11/grapefruit-and-celery-salad-100159-1.jpeg", "https://www.taste.com.au/recipes/grapefruit-celery-salad/3f1e9af6-c4b1-4169-8595-e7c034990f6e?r=recipes/paleorecipes&c=b01d3705-a10c-4d3d-b2dd-0f5a8237544d/Paleo%20recipes"
    ],
    [
      "Rack of lamb with parsley pistachio crust", "Paleo", true, false, false, 637.49, 34.77, "https://img.taste.com.au/GZgVpfYs/w720-h480-cfill-q80/taste/2016/11/rack-of-lamb-with-parsley-pistachio-crust-98349-1.jpeg", "https://www.taste.com.au/recipes/rack-lamb-parsley-pistachio-crust/09e39c26-d3a3-474f-a671-65c520313c9a?r=recipes/paleorecipes&c=b01d3705-a10c-4d3d-b2dd-0f5a8237544d/Paleo%20recipes"
    ],
    [
      "Spiced pork, apricot and sweet potato tagine", "Paleo", false, true, false, 290.02, 26.24, "https://img.taste.com.au/VR29feoe/w720-h480-cfill-q80/taste/2016/11/spiced-pork-apricot-and-sweet-potato-tagine-98307-1.jpeg", "https://www.taste.com.au/recipes/spiced-pork-apricot-sweet-potato-tagine/bc66e0e3-4434-4676-a920-ae735ac27c79?r=recipes/paleorecipes&c=b01d3705-a10c-4d3d-b2dd-0f5a8237544d/Paleo%20recipes"
    ],
    [
      "Roast pork with tomato and maple jam", "Paleo", false, true, true, 320.34, 20.59, "https://img.taste.com.au/okv2gysz/w720-h480-cfill-q80/taste/2016/11/roast-pork-with-tomato-and-maple-jam-97926-1.jpeg", "https://www.taste.com.au/recipes/roast-pork-tomato-maple-jam/5ed8d0fc-227c-411b-ad0c-65b383352e65?r=recipes/paleorecipes&c=b01d3705-a10c-4d3d-b2dd-0f5a8237544d/Paleo%20recipes"
    ],
    [
      "Roast pork rack with sweet potato wedges and pears", "Paleo", false, false, true, 600.92, 18.96, "https://img.taste.com.au/ZfX3Chyi/w720-h480-cfill-q80/taste/2016/11/roast-pork-rack-with-sweet-potato-wedges-and-pears-97637-1.jpeg", "https://www.taste.com.au/recipes/roast-pork-rack-sweet-potato-wedges-pears/be2fa0a9-0975-4acf-abbf-8721059edb94?r=recipes/paleorecipes&c=b01d3705-a10c-4d3d-b2dd-0f5a8237544d/Paleo%20recipes"
    ]
  ];

  if (functionID == 1) {
    return meal.length;
  } else if (functionID == 2) {
    return meal[parseID];
  }

}
