<!doctype html>
<html class="full-height">
<head>
    <meta charset="UTF-8">
    <title>Member | Life - Living It Fully Everyday</title>
    <?php require_once('includes/resources.php'); ?>
    <?php require_once('includes/myService-resources.php'); ?>
</head>

<body class="d-flex flex-column full-height" onload="myServiceValidation(); loadServiceType();">

<?php require_once('includes/myService-header.php'); ?>

<div class="d-flex justify-content-start align-items-stretch pad-t-85">

    <?php require_once('includes/myService-navbar.php'); ?>

    <div class="container pad-l-300"></br></br>

        <!-- Greeting -->
        <?php echo '<h2 class="text-center"> Welcome ' . ($_SESSION[USER_SESSION_KEY])['first_name'] . '!</h2>' ?>
        <p class="lead text-center">Please select a service.</p>

        <div class="container"></br>
            <form name="my-service-selection" id="my-service-selection" onsubmit="return false">
                <!--Service List -->
                <div class="row align-items-start align-items-stretch" id="service">
                    <!--Yoga -->
                    <div class="col flex-column d-flex">
                        <input type="radio" class="btn-check" name="service" id="yoga" value="yoga" autocomplete="off">
                        <label class="border h-100 w-100 rounded bg-white shadow-sm py-4 btn btn-secondary"
                               onclick="checkedColor('yoga');" id="yoga_btn" for="yoga">
                            <img class="mt-4" src="<?php getServiceIconFromDatabase('yoga') ?>" height="210px">
                        </label>
                        <p class="lead text-center mt-3" id="yoga_font">Yoga</p>
                    </div>

                    <!--Meditation -->
                    <div class="col flex-column d-flex">
                        <input type="radio" class="btn-check" name="service" id="meditation" value="meditation" autocomplete="off">
                        <label class="border h-100 w-100 rounded bg-white shadow-sm py-4 btn btn-secondary"
                               onclick="checkedColor('meditation');" id="meditation_btn" for="meditation">
                            <img class="mt-4" src="<?php getServiceIconFromDatabase('meditation') ?>" height="210px">
                        </label>
                        <p class="lead text-center mt-3" id="meditation_font">Meditation</p>
                    </div>

                    <!--Stretching -->
                    <div class="col flex-column d-flex">
                        <input type="radio" class="btn-check" name="service" id="stretching" value="stretching"  autocomplete="off">
                        <label class="border h-100 w-100 rounded bg-white shadow-sm py-4 btn btn-secondary"
                               onclick="checkedColor('stretching');" id="stretching_btn" for="stretching">
                            <img class="mt-4" src="<?php getServiceIconFromDatabase('stretching') ?>" height="210px">
                        </label>
                        <p class="lead text-center mt-3" id="stretching_font">Stretching</p>
                    </div>

                    <!--Healthy habits -->
                    <div class="col flex-column d-flex">
                        <input type="radio" class="btn-check" name="service" id="healthy-habits" value="healthy-habits"  autocomplete="off">
                        <label class="border h-100 w-100 rounded bg-white shadow-sm py-4 btn btn-secondary"
                               onclick="location.href='myServices-hh.php'" id="healthy-habits_btn" for="healthy-habits">
                            <img class="mt-4" src="<?php getServiceIconFromDatabase('healthy habits') ?>" height="210px">
                        </label>
                        <p class="lead text-center mt-3" id="healthy-habits_font">Healthy habits</p>
                    </div>
                </div>
                </br></br>
            </form>

            <form name="my-user-service" id="my-user-service" style="display: none;">
                <!-- type -->
                <div class="form-floating">
                    <select class="form-select" aria-label="What type of workout have you done?" id="type" name="type">
                        <option selected value="none">Please select....</option>
                    </select>
                    <label for="floatingSelect">What type of workout have you done?</label>
                </div>
                <div class="errorMsg"></div>
                </br>

                <!-- email -->
                <div class="form-floating mb-3">
                    <input type="email" class="form-control" placeholder="name@example.com" id="email" name="email"
                           value="<?php echo ($_SESSION[USER_SESSION_KEY])['email'] ?> " disabled>
                    <label for="email">Your email address</label>
                </div>
                <div class="errorMsg"></div>

                <!-- duration -->
                <div class="form-floating mb-3">
                    <input type="input" class="form-control" id="duration" name="duration">
                    <label for="duration">How long have you workout? (mins)</label>
                </div>
                <div class="errorMsg"></div>

                <!-- duration -->
                <div class="form-floating mb-3">
                    <input type="date" class="form-control" id="date" name="date">
                    <label for="date">When do you have your workout?</label>
                </div>
                <div class="errorMsg"></div>

                <button type="submit" class="btn btn-outline-primary" value="Submit">Save and Start!</button>
                <button type="button" class="btn btn-outline-danger" onclick="location.reload()">Restart</button>
            </form>

            <div id="my-service-instruction">

            </div></br></br>


        </div>

    </div>

</div>
</body>
</html>
