<div class="footer">
    <div class="footer-container">
        <div id="left"><img src="assets/images/LIFE-logos_white.png" alt="LIFE"> <a> By using this site, you agree to
                our Cookie Policy and Privacy Policy .<br>
                Copyright 2021 by Peter Liu . All Rights Reserved .</a>
            <h1 class="footer-head1"> Sitemap</h1>
            <div class="link">
                <a href="index.php">Home</a>
                <a href="myServices.php">Service</a>
                <a href="contact.php">Contact</a>
<!--                <a href="meal-planner.php"> Meal Planner </a>-->

                <?php
                if(getSession()==null){
                    echo '<a href="register.php">Register</a> ';
                    echo '<a href="login.php">Login</a> <br>';
                } else {
                    echo '<a href="myServices.php"> myService </a>';
                }
                ?>



            </div>
        </div>
        <div id="right">
            <h1 class="footer-head1"> COVID - 19 resources </h1>
            <a href="https://www.dhhs.vic.gov.au/" target="_blank"> Department of Health and Human Services
                Victoria </a> <a href="https://www.health.gov.au/" target="_blank"> Australian Government Department of
                Health </a> <a href="https://business.vic.gov.au/" target="_blank"> Buiness Victoria - Support for
                Victorian businesses </a> <a href="https://www.australia.gov.au/" target="_blank"> Australian
                Government </a></div>
    </div>
</div>