<?php

require_once('functions.php');

// if there are no exit session, redirect back to login page
if(!currentSession()) {
    redirect('login.php');
}
