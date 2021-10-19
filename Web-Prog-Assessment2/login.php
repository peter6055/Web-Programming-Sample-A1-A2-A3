<!doctype html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Member Login | Life - Living It Fully Everyday</title>
    <?php require_once('includes/resources.php'); ?>

    <!--call when click login btn-->
    <?php
    $errors = [];
    if(isset($_POST['login'])) {
        $errors = login($_POST);

        if(count($errors) == 0) {
            redirect('myServices.php');
        }
    }
    ?>
</head>

<body>
<div class="flex-container">

    <!--Nav Bar-->
    <?php require_once('includes/header.php'); ?>

    <!--To avoid sticky nav bar block content-->
    <div class="sticky-protect-bar"></div>

    <!--Announcement Bar-->
    <?php require_once('includes/accouncements.php'); ?>


    <!--Main Content Area-->
    <div class="content">
        <div class="content-container">
            <div id="members-form-decoration"><img src="assets/images/account.svg" alt="Hi, we are life. Life is a COVID-19 anti-stress platform. Join us today."
                                                   style="padding-top: 10px;"></div>
            <div id="members-form" style="width:40%; padding-left: 100px">
                <h1>Log in to LIFE</h1></br>
                <form method="post" name="members-form-post">
                    <div class="form-group">
                        <label class="contact-label" for="email">Username (Email)</label></br>
                        <input type="text" id="email" name="email"
                            <?php displayValue($_POST, 'email'); ?> >
                        <?php displayError($errors, 'email'); ?>

                    </div></br>

                    <div class="form-group">
                        <label class="contact-label" for="pswd">Password</label></br>
                        <input type="password" id="pswd" name="pswd" value=""
                            <?php displayValue($_POST, 'pswd'); ?>
                            <?php if(!isset($form['pswd']) || $errors['warning'] != null){echo 'value="0"';} ?> >
                        <?php displayError($errors, 'pswd'); ?>
                    </div></br></br>

                    <button type="submit" class="contact-submit" name="login" value="login">Login</button></br></br>
                    <?php displayError($errors, 'warning'); ?></br>

                </form>
                <span>Not have an account?&nbsp;&nbsp;<a href="register.php">Register</a></span>

            </div>
        </div>
    </div>



    <!--Footer Area-->
    <?php require_once('includes/footer.php'); ?>
</div>
</body>
</html>