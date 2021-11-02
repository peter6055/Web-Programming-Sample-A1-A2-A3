<!doctype html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Meet Our Team</title>
    <link rel="stylesheet" href="assets/team.css">

    <!-- Google font API-->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css?family=Noto Sans" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Lato:400,900" rel="stylesheet" type="text/css">

    <?php require_once "includes/map.php" ?>

</head>

<body>
<div class="container d-flex-cus" id="bg1">
    <h1>Meet Our Team</h1>
</div>

<div class="container d-grid-cus">
    <div class="d-grid-item-cus" id="people-item1">
        <div class="profile-img"
             style="background-image: url('assets/images/p2.svg'); background-color: #68dcd145;"></div>
        <div class="profile-name">Lisa Maheta</div>
        <div class="profile-role" style="border-color: #68dbd1;">MARKETING</div>
        <div class="profile-intro">Graduated with the Master of Quality Management from The Hong Kong Polytechnic
            University, Lisa was the Senior Specialist of Brand and Marketing of Alibaba, and now the Founder & CEO of
            KaDa Story.
        </div>
        <div class="profile-social-media">
            <a href="https://www.facebook.com/RMITuniversity/" target="_blank"><img
                        src="assets/images/68dbd1/facebook.png" alt="facebook" width="20px"></a>
            <a href="https://twitter.com/rmit" target="_blank"><img src="assets/images/68dbd1/twitter.png" alt="twitter"
                                                                    width="20px"></a>
            <a href="https://www.rmit.edu.au/" target="_blank"><img src="assets/images/68dbd1/google.png" alt="google"
                                                                    width="20px"></a>
            <a href="https://au.linkedin.com/school/rmit-university/" target="_blank"><img
                        src="assets/images/68dbd1/linkedin.png" alt="linkedin" width="20px"></a>
        </div>
        <div class="profile-map">
            <img src="<?php map('sydneynsw', 'australia') ?>" alt="Sydney map">
        </div>
    </div>

    <div class="d-grid-item-cus" id="people-item2">
        <div class="profile-img"
             style="background-image: url('assets/images/p1.svg'); background-color: #91d6a652;"></div>
        <div class="profile-name">John Meker</div>
        <div class="profile-role" style="border-color: #90d6a6;">DESIGNER</div>
        <div class="profile-intro">John is the Managing Director of Seer Asset Management whose focus is to develop and
            manage wholesale investment funds, investing in alternative assets and sustainable and responsible global
            equities.
        </div>
        <div class="profile-social-media"></div>
        <div class="profile-social-media">
            <a href="https://www.facebook.com/RMITuniversity/" target="_blank"><img
                        src="assets/images/90d6a6/facebook.png" alt="facebook" width="20px"></a>
            <a href="https://twitter.com/rmit" target="_blank"><img src="assets/images/90d6a6/twitter.png" alt="twitter"
                                                                    width="20px"></a>
            <a href="https://www.rmit.edu.au/" target="_blank"><img src="assets/images/90d6a6/google.png" alt="google"
                                                                    width="20px"></a>
            <a href="https://au.linkedin.com/school/rmit-university/" target="_blank"><img
                        src="assets/images/90d6a6/linkedin.png" alt="linkedin" width="20px"></a>
        </div>
        <div class="profile-map">
            <img src="<?php map('melbournevic', 'australia') ?>" alt="Melbourne map">
        </div>
    </div>

    <div class="d-grid-item-cus" id="people-item3">
        <div class="profile-img"
             style="background-image: url('assets/images/p3.svg'); background-color: #f0826a3d;"></div>
        <div class="profile-name">Vin Deasel</div>
        <div class="profile-role" style="border-color: #f0826a;">PRODUCER</div>
        <div class="profile-intro">Siimon Reynolds is a serial entrepreneur with over 3 decades of experience building
            successful businesses. He co- founded the 15th largest marketing communications business in the world, with
            6000 employees in 14 countries.
        </div>
        <div class="profile-social-media">
            <a href="https://www.facebook.com/RMITuniversity/" target="_blank"><img
                        src="assets/images/f0826a/facebook.png" alt="facebook" width="20px"></a>
            <a href="https://twitter.com/rmit" target="_blank"><img src="assets/images/f0826a/twitter.png" alt="twitter"
                                                                    width="20px"></a>
            <a href="https://www.rmit.edu.au/" target="_blank"><img src="assets/images/f0826a/google.png" alt="google"
                                                                    width="20px"></a>
            <a href="https://au.linkedin.com/school/rmit-university/" target="_blank"><img
                        src="assets/images/f0826a/linkedin.png" alt="linkedin" width="20px"></a>
        </div>
        <div class="profile-map">
            <img src="<?php map('perthwa', 'australia') ?>" alt="Perth map">
        </div>
    </div>
</div>

<?php require_once "includes/footer.php" ?>

</body>
</html>
