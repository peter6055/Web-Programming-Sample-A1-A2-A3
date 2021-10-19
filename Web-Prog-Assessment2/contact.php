<!doctype html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Contact | Life - Living It Fully Everyday</title>
    <?php require_once('includes/resources.php'); ?>
</head>

<body onload="contactValidation()">
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
            <div id="contact-form">
                <h1>Contact LIFE support</h1>
                <form id="contact" action="mailto:life@localcouncil.com"  method="post" enctype="text/plain">
                    <label class="contact-label" for="fname">First Name <a> *</a></label>
                    <br>
                    <input type="text" id="fname" name="firstname">
                    <br>
                    <br>
                    <label class="contact-label" for="lname">Last Name <a> *</a></label>
                    <br>
                    <input type="text" id="lname" name="lastname">
                    <br>
                    <br>
                    <label class="contact-label" for="phone">Phone (e.g. 0455333111 or 0300999111)<a> *</a></label>
                    <br>
                    <input type="text" id="phone" name="phone">
                    <br>
                    <br>
                    <label class="contact-label" for="email">Email Address <a> *</a></label>
                    <br>
                    <input type="text" id="email" name="email">
                    <br>
                    <br>
                    <label class="contact-label" for="subject">Subject <a> *</a></label>
                    <br>
                    <textarea id="subject" name="subject" style="height:200px"></textarea>
                    <br>
                    <input class="contact-submit" type="submit" value="Submit">
                </form>
                <br>
            </div>
            <div id="contact-form-decoration">
                <div id="altinfo">
                    <h1>Alternatively, You can....</h1>
                    <span>Visit us: 288 La Trobe St, Melbourne VIC 3000</span> <span> Call us (Mon-Fri 8am - 8pm): <a
                        href="tel:0390000001" style="text-decoration: underline">0390-000-001</a> </span> <span>Email us: <a
                        href="mailto:life@localcouncil.com" style="text-decoration: underline">life@localcouncil.com</a> </span>
                    <img src="assets/images/pana.svg" alt="LIFE" style="height:370px; padding-top: 100px"></div>
            </div>
        </div>
    </div>

    <!--Footer Area-->
    <?php require_once('includes/footer.php'); ?>
</div>
</body>
</html>