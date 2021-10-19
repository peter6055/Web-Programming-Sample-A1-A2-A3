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

    <?php require_once('includes/myService-navbar.php'); ?>

    <div class="container pad-l-300"></br>
        <div class="alert alert-warning" role="alert">
            Due to scheduled system maintenance, some of our service will be temporarily unavailable.
        </div>
        </br></br>
        <?php echo '<h1 class="text-center"> Welcome ' . ($_SESSION[USER_SESSION_KEY])['first_name'] . ' to your service page.</h1>' ?>
        <br>
        <p class="lead text-center">Please select a service in the left navbar.</p><br><br>
        <img src="assets/images/welcome.svg" class="rounded mx-auto d-block" alt="welcome" height="400px">
    </div>
</div>
</body>
</html>
