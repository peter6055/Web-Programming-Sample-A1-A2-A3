

<!doctype html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Member Register | Life - Living It Fully Everyday</title>
    <?php require_once('includes/resources.php'); ?>

    <!--call when click join us btn-->
    <?php
    $errors = [];
    if(isset($_POST['join-us'])) {
        $errors = register($_POST);

        if(count($errors) == 0)
            redirect('myServices.php');
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
                                                   style="padding-top: 10px;"> <span>Already have an account?&nbsp;&nbsp;<a
                    href="login.php">Login in</a></span></div>
            <div id="members-form"  style="width:40%; padding-left: 100px">
                <h1>Join us today!</h1>

                <form name="register-form" method="post">
                    <div class="form-group">
                        <label class="contact-label" for="fname">First Name <a> *</a></label></br>
                        <input type="text" id="fname" name="firstname"
                            <?php displayValue($_POST, 'firstname'); ?> /></br>
                        <?php displayError($errors, 'firstname'); ?>
                    </div></br>


                    <div class="form-group">
                        <label class="contact-label" for="lname">Last Name <a> *</a></label></br>
                        <input type="text" id="lname" name="lastname"
                            <?php displayValue($_POST, 'lastname'); ?> /></br>
                        <?php displayError($errors, 'lastname'); ?>
                    </div></br>


                    <div class="form-group">
                        <label class="contact-label" for="email">Email <a> *</a></label></br>
                        <input type="text" id="email" name="email"
                            <?php displayValue($_POST, 'email'); ?> /></br>
                        <?php displayError($errors, 'email'); ?>
                    </div></br>


                    <div class="form-group">
                        <label class="contact-label" for="email2">Repeat your email <a> *</a></label></br>
                        <input type="text" onpaste="return false;" onCopy="return false" id="email2" name="email2"
                            <?php displayValue($_POST, 'email2'); ?> /></br>
                        <?php displayError($errors, 'email2'); ?>
                    </div></br>

                    <div class="form-group">
                        <label class="contact-label" for="pswd">Password <a> *</a></label></br>
                        <input type="password" id="pswd" name="pswd"
                            <?php displayValue($_POST, 'pswd'); ?> /></br>
                        <?php displayError($errors, 'pswd'); ?>
                    </div></br>

                    <div class="form-group">
                        <label class="contact-label" for="pswd2">Repeat your Password <a> *</a></label></br>
                        <input type="password" onpaste="return false;" onCopy="return false" id="pswd2" name="pswd2"
                            <?php displayValue($_POST, 'pswd2'); ?> /></br>
                        <?php displayError($errors, 'pswd2'); ?>
                    </div></br>

                    <div class="form-group">
                        <label class="contact-label" for="phone">Phone Number <a> *</a></label></br>
                        <input type="text" id="phone" name="phone" placeholder="Format +61 4XX XXX XXX"
                            <?php displayValue($_POST, 'phone'); ?> /></br>
                        <?php displayError($errors, 'phone'); ?>
                    </div></br>


                    <div class="form-group">
                        <label class="contact-label" for="age">Age<a> *</a></label></br>
                        <span class="inline-description">Please drag your age.</span></br>
                        <?php displayError($errors, 'age'); ?>
                        <div class="radio_col" style="padding-top: 20px;">
                            <input type="range" id="age" name="age" min="0" max="120"
                                   oninput="rangeSliderValueUpdate(this.value);"
                                   onChange="return registerMemberFeeCal()"
                                   <?php displayValue($_POST, 'age'); ?>
                                   <?php if(!isset($_POST['age'])) echo 'value="0"'; ?> >
                            <input type="sliderDisplayer" id="age_value" value="" readonly/>
                            <br>
                        </div></br>
                    </div></br>


                    <div class="form-group">
                        <label class="contact-label" for="std_status">Student Status<a> *</a></label></br>
                        <?php displayError($errors, 'std_status'); ?>

                        <div class="radio_col" style="padding-top: 10px;">
                            <input type="radio" id="std_yes" name="std_status" value="true"
                                   onChange="return registerMemberFeeCal()"
                                <?php displayChecked($_POST, 'std_status', 'true'); ?> />
                            <label for="std_yes">Yes</label></br>
                        </div>

                        <div class="radio_col">
                            <input type="radio" id="std_no" name="std_status" value="false"
                                   onChange="return registerMemberFeeCal()"
                                <?php displayChecked($_POST, 'std_status', 'false'); ?> />
                            <label for="std_no">No</label>
                        </div>
                    </div></br>


                    <div class="form-group">
                        <label class="contact-label" for="emp_status">Employment Status<a> *</a></label></br>
                        <?php displayError($errors, 'emp_status'); ?>

                        <div class="radio_col" style="padding-top: 10px;">
                            <input type="radio" id="emp_yes" name="emp_status" value="true"
                                   onChange="return registerMemberFeeCal()"
                                <?php displayChecked($_POST, 'emp_status', 'true'); ?>
                            <label for="emp_yes">Yes</label></br>
                        </div>

                        <div class="radio_col">
                            <input type="radio" id="emp_no" name="emp_status" value="false"
                                   onChange="return registerMemberFeeCal()"
                                <?php displayChecked($_POST, 'emp_status', 'false'); ?>

                            <label for="emp_no">No</label>
                        </div>
                    </div></br></br>



                    <label class="contact-label" for="memberFeeDisplayer">Annual Membership Fees</label></br>
                    <input type="memberFeeDisplayer" id="memberFee_value" value="AUD 120" readonly></br></br></br>
                    <button type="submit" class="contact-submit" name="join-us" value="join-us">Join us!</button>
                </form></br>
            </div>
        </div>
    </div>

    <!--Footer Area-->
    <?php require_once('includes/footer.php'); ?>
</div>
</body>
</html>