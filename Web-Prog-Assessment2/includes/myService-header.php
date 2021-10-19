<?php require_once('includes/auth.php'); ?>

<?php
// back to life website call
if (isset($_POST['back'])) {
    redirect("index.php");
}

// logout call
if (isset($_POST['logout'])) {
    logoutSession();
}

// specify current page name to let the system get navbar blue item lighted.
define("currentPage", basename($_SERVER['PHP_SELF']));
?>

<header class="p-3 border-bottom po-fixed w-100 z-index-max">
    <div class="container">
        <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
                <img src="assets/images/LIFE-logos-trans.png" alt="LIFE logo" width="162px">
            </a>

            <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            </ul>


            <form method="post" class="text-end me-3" >
                <button type="submit" class="btn btn-primary" name="back" value="back">Back to Life</button>
            </form>

            <form method="post" class="text-end" >
                <button type="submit" class="btn btn-warning" name="logout" value="logout">Logout</button>
            </form>

        </div>
    </div>
</header>


