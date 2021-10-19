<div class="navbar sticky">
    <div class="nav-container">
      <div class="logo"> <img src="assets/images/LIFE-logos.jpeg" alt="LIFE logo"></div>
      <div class="menu">
        <div class="menu item"> <a href="index.php">Home</a> </div>
        <div class="menu item"> <a href="myServices.php">Service</a> </div>
        <div class="menu item"> <a href="contact.php">Contact us</a> </div>
        <?php
          if(getSession()==null){
              echo '<div class="menu item btn login"> <a href="login.php">Login</a> </div>';
              echo '<div class="menu item btn register"> <a href="register.php">Register</a> </div>';
          } else {
              echo '<div class="menu item btn register"> <a href="myServices.php">myService Portal</a> </div>';
          }
        ?>
<!--        <div class="menu item btn login"> <a href="login.php">Login</a> </div>-->
<!--        <div class="menu item btn register"> <a href="register.php">Register</a> </div>-->
<!--        <div class="menu item btn meal-planner"> <a href="meal-planner.php">&nbsp; &nbsp; &nbsp;Meal Planner</a> </div>-->
      </div>
    </div>
</div>
