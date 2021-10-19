<!doctype html>
<html class="full-height">
<head>
    <meta charset="UTF-8">
    <title>Member | Life - Living It Fully Everyday</title>
    <?php require_once('includes/resources.php'); ?>
    <?php require_once('includes/myService-resources.php'); ?>
</head>

<body class="d-flex flex-column full-height">

<?php require_once('includes/myService-header.php'); ?>

<div class="d-flex justify-content-start align-items-stretch full-height pad-t-85">
    <div>
    <?php require_once('includes/myService-navbar.php'); ?>
    </div>
    <div class="container-fluid mx-5 pad-l-300"></br>

        <div class="vh-100 d-flex" id="page-cont"></br>
            <div class="ps-5" id="meal-left-col">
                <form name="meal-form" onsubmit="return false;">
                    <h1>I want to eat
                        <input type="number" id="cal" name="cal"><br>
                        calories a day!
                    </h1><br><br>

                    <p>Please Select Your Preference:</p>
                    <input type="radio" id="anything" name="category" value="Anything" checked>
                    <label for="anything" id="any">Anything</label>

                    <input type="radio" id="paleo" name="category" value="Paleo">
                    <label for="paleo" style="background-image: url(assets/images/fried-chicken.svg); background-repeat: no-repeat;
		   background-position: 18px 5px; background-size: 18px;">&nbsp; &nbsp; Paleo</label>

                    <input type="radio" id="vegetarian" name="category" value="Vegetarian">
                    <label for="vegetarian" style="background-image: url(assets/images/carrot.svg); background-repeat: no-repeat;
		   background-position: 18px 7px; background-size: 21px;">&nbsp; &nbsp; &nbsp; Vegetarian</label>

                    <input type="radio" id="vegan" name="category" value="Vegan">
                    <label for="vegan" style="background-image: url(assets/images/vegan.svg); background-repeat: no-repeat;
		   background-position: 18px 8px; background-size: 21px;">&nbsp; &nbsp; &nbsp; Vegan</label>

                    <input type="radio" id="keto" name="category" value="Ketogenic">
                    <label for="keto" style="background-image: url(assets/images/cookie.svg); background-repeat: no-repeat;
		   background-position: 18px 8px; background-size: 21px">&nbsp; &nbsp; &nbsp; Ketogenic</label>

                    <input type="radio" id="medi" name="category" value="Mediterranean">
                    <label for="medi" style="background-image: url(assets/images/chocolate.svg); background-repeat: no-repeat;
		   background-position: 18px 7px; background-size: 19px">&nbsp; &nbsp; &nbsp; Mediterranean</label>

                    </br></br>
                    <input type="submit" id="submit_btn" value="Generate Meal" onclick="getMealPlanner('<?php echo ($_SESSION[USER_SESSION_KEY])['email']?>')">
                    </br></br>

                    <div class="alert alert-success me-5" role="alert">Your latest meal plan will save on our system automatically!</div>

                </form>

            </div>


            <div id="meal-right-col">
                <img src="assets/images/meal-pana.svg" alt="LIFE" style="padding-top: 10px; height: 250px;">
                <div class="alert alert-info mx-5 mt-5" role="alert">Gain weight? I will generate a meal plan for you base on the calories you will like to eat in a day. Also, we offer several option on meal type, you can select a specific one or random (anything). <strong>Please note, the calculation is round up to first whole number, there might be ± 1 of uncertainty.</strong></div>
            </div>
        </div></br></br>
    </div>
</div>
</body>
</html>
