<?php
ini_set( "display_errors", 1 );
error_reporting( E_ALL );

// import the relay package of DB
require_once('includes/database.php');

// set a default session key
const USER_SESSION_KEY = 'user';

// start the session
session_start();


// Use for avoid XSS attack
function xssAvoider($input) {
    $input = trim($input);
    $input = stripslashes($input);
    $input = htmlspecialchars($input);
    return $input;
}

// Use to display error in the html (store errors as an array)
function displayError($errors, $name) {
    if(isset($errors[$name]))
        echo "<a class='error-msg'>{$errors[$name]}</a>";
}

// Display unit of input fields
function displayValue($form, $name) {
    if(isset($form[$name]))
        echo 'value="' . xssAvoider($form[$name]) . '"';
}


// Display unit of radio
function displayChecked($form, $name, $value) {
    if(isset($form[$name]) && $form[$name] === $value)
        echo 'checked';
}





// ============== Session Handler ===========================================================
// redirect function parse in the location
function redirect($location) {
    header("Location: $location");
    exit();
}

// Check is there any session exist
function currentSession() {
    return isset($_SESSION[USER_SESSION_KEY]);
}

// Get session that had already exist
function getSession() {
    return currentSession() ? $_SESSION[USER_SESSION_KEY] : null;
}

function logoutSession() {
    session_unset();
    redirect('login.php');
}



// ============== User ===========================================================
function login($form) {
    $errors = [];

    // check the is fields fill in
    $key = 'email';
    if(empty($form[$key])) {
        $errors[$key] = 'Username is required.';
    }
    $key = 'pswd';
    if(empty($form[$key])) {
        $errors[$key] = 'Password is required.';
    }

    // if there are no error, continue login process
    if(count($errors) == 0) {
        $user = getUser($form['email']);

        if($user != null && $form['pswd'] == $user['password']) {
            $_SESSION[USER_SESSION_KEY] = $user;
        } else {
            $errors['warning'] = 'Email and password is not match our record. Please try again.';
        }
    }
    return $errors;
}





function register($form) {
    // create an error space
    $errors = [];

    // parse in and check the fields, return a group of error message if there is any error
    // start with firstname
    $key = 'firstname';
    // look for firstname posting from form, identify is it empty
    if(empty($form[$key])){
        $errors[$key] = 'First Name must be filled out.';
    }

    $key = 'lastname';
    if(empty($form[$key])){
        $errors[$key] = 'Last Name must be filled out.';
    }

    $key = 'email';
    if(!isset($form[$key]) || filter_var($form[$key], FILTER_VALIDATE_EMAIL) == false)
        $errors[$key] = 'Email must be filled out.';
    else if(getUser($form[$key]) != null)
        $errors[$key] = 'Email is already registered.';


    $key = 'pswd';
    if(preg_match('/^[A-Z]{1}(?=.*\w)(?=.*[-_])[\w@$!%*#?&-_]{6,}\d$/', $form[$key]) != 1){
        $errors[$key] = 'Password is required and must contain at least 8 characters, an hyphen or underscore and end with number.';
    }

    $key = 'pswd2';
    if(isset($form['pswd']) && (empty($form[$key]) || $form['pswd'] != $form[$key]))
        $errors[$key] = 'Passwords do not match.';


    $key = 'phone';
    if(preg_match('/^\+61 4\d{2} \d{3} \d{3}$/', $form[$key]) != 1){
        $errors[$key] = 'Phone number is invalid. Must be in the format: +61 4xx xxx xxx';
    }

    $key = 'age';
    if(filter_var($form[$key], FILTER_VALIDATE_INT, ['options' => ['min_range' => 16, 'max_range' => 120]]) == false){
        $errors[$key] = 'You must be 16 years old or above';
    }

    //isset to ensure non click error
    $key = 'std_status';
    if(!isset($form[$key]) ||preg_match('/^true|false$/', $form[$key]) != 1){
        $errors[$key] = 'Student Status must be filled out';
    }

    //isset to ensure non click error
    $key = 'emp_status';
    if(!isset($form[$key]) ||preg_match('/^true|false$/', $form[$key]) != 1) {
        $errors[$key] = 'Employment Status must be filled out';
    }



    // create user and login
    if(count($errors) == 0) {
        // Add user.
        $user = [
            'firstname' => xssAvoider($form['firstname']),
            'lastname' => xssAvoider($form['lastname']),
            'email' => xssAvoider($form['email']),
            'pswd' => $form['pswd'],
            'phone' => xssAvoider($form['phone']),
            'age' => filter_var($form['age'], FILTER_VALIDATE_INT),
            'std_status' => (int) filter_var($form['std_status'], FILTER_VALIDATE_BOOLEAN),
            'emp_status' => (int) filter_var($form['emp_status'], FILTER_VALIDATE_BOOLEAN)
        ];

        // Insert user.
        addUser($user);

        // Auto-login the registered user.
        login([
            'email' => $user['email'],
            'pswd' => $form['pswd']
        ]);
    }
    return $errors;
}