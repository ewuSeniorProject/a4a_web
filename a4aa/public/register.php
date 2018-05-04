<?php
// Include config file
require_once 'config.php';

session_start();

if (isset($_SESSION['role']) && $_SESSION['active'] === 'yes'){
    header("location: home.php");
}


// Define variables and initialize with empty values
$fname = $lname = $email = $user_name = $password = $confirm_password = "";
$fname_err = $lname_err = $email_err = $username_err = $password_err = $confirm_password_err = "";
$role = "user";
$active = "yes";
$success = $message = "";

// Processing form data when form is submitted
if($_SERVER["REQUEST_METHOD"] == "POST"){

    // Validate first name
    if(empty(trim($_POST["fname"]))){
        $fname_err = "Please enter your first name.";
    } else{
        $fname = trim($_POST["fname"]);
    }

    // Validate last name
    if(empty(trim($_POST["lname"]))){
        $lname_err = "Please enter your last name.";
    } else{
        $lname = trim($_POST["lname"]);
    }

    // Validate email
    if(empty(trim($_POST["email"]))){
        $email_err = "Please enter a vaild email address.";
    } else{
        // Prepare a select statement
        $sql = "SELECT user_id FROM User WHERE email = ?";

        if($stmt = mysqli_prepare($link, $sql)){
            // Bind variables to the prepared statement as parameters
            mysqli_stmt_bind_param($stmt, "s", $param_email);

            // Set parameters
            $param_email = trim($_POST["email"]);

            // Attempt to execute the prepared statement
            if(mysqli_stmt_execute($stmt)){
                /* store result */
                mysqli_stmt_store_result($stmt);

                if(mysqli_stmt_num_rows($stmt) == 1){
                    $email_err = "Email address is already in use.";
                } else{
                    $email = trim($_POST["email"]);
                }
            } else{
                $message = "Oops! Something went wrong. Please try again later.";
            }
        }

        // Close statement
        mysqli_stmt_close($stmt);
    }

    // Validate username
    if(empty(trim($_POST["user_name"]))){
        $username_err = "Please enter a username.";
    } else{
        // Prepare a select statement
        $sql = "SELECT user_id FROM User WHERE user_name = ?";

        if($stmt = mysqli_prepare($link, $sql)){
            // Bind variables to the prepared statement as parameters
            mysqli_stmt_bind_param($stmt, "s", $param_username);

            // Set parameters
            $param_username = trim($_POST["user_name"]);

            // Attempt to execute the prepared statement
            if(mysqli_stmt_execute($stmt)){
                /* store result */
                mysqli_stmt_store_result($stmt);

                if(mysqli_stmt_num_rows($stmt) == 1){
                    $username_err = "User name is already in use.";
                } else{
                    $user_name = trim($_POST["user_name"]);
                }
            } else{
                $message = "Oops! Something went wrong. Please try again later.";
            }
        }

        // Close statement
        mysqli_stmt_close($stmt);
    }

    // Validate password
    if(empty(trim($_POST['password']))){
        $password_err = "Please enter a password.";
    } elseif(strlen(trim($_POST['password'])) < 6){
        $password_err = "Password must have at least 6 characters.";
    } else{
        $password = trim($_POST['password']);
    }

    // Validate confirm password
    if(empty(trim($_POST["confirm_password"]))){
        $confirm_password_err = 'Please confirm password.';
    } else{
        $confirm_password = trim($_POST['confirm_password']);
        if($password != $confirm_password){
            $confirm_password_err = 'Password did not match.';
        }
    }

    // Check input errors before inserting in database
    if(empty($fname_err) && empty($lname_err) && empty($email_err) && empty($username_err) && empty($password_err) && empty($confirm_password_err)){


        // Prepare an insert statement
        $sql = "INSERT INTO User (fname, lname, user_name, email, password, role, active) VALUES (?, ?, ?, ?, ?, ?, ?)";

        if($stmt = mysqli_prepare($link, $sql)){
            // Bind variables to the prepared statement as parameters
            mysqli_stmt_bind_param($stmt, "sssssss", $param_fname, $param_lname, $param_username, $param_email, $param_password, $param_role, $param_active);

            // Set parameters
            $param_fname = $fname;
            $param_lname = $lname;
            $param_username = $user_name;
            $param_email = $email;
            $param_password = password_hash($password, PASSWORD_DEFAULT); // Creates a password hash
            $param_role = $role;
            $param_active = $active;

            // Attempt to execute the prepared statement
            if(mysqli_stmt_execute($stmt)){
                $success = "Success! Redirecting you to the login page.";
                // Redirect to login page
                header( "Refresh:2; url=login.php", true, 303);
            } else{
                $message = "Something went wrong. Please try again later.";
            }
        }

        // Close statement
        mysqli_stmt_close($stmt);
    }

    // Close connection
    mysqli_close($link);
}
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

        <title>A4ASpokane</title>

        <link href='//fonts.googleapis.com/css?family=Lato:300' rel='stylesheet' type='text/css' />
        <!-- Bootstrap CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.3/css/bootstrap.min.css" integrity="sha384-Zug+QiDoJOrZ5t4lssLdxGhVrurbmBWopoEl+M6BdEfwnCJZtKxi1KgxUyJq13dy" crossorigin="anonymous">
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
        <link href="./style/style.css" rel="stylesheet" type="text/css" />

        <!-- Optional JavaScript -->
        <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
        <!-- jQuery first, then Popper.js, then Bootstrap JS -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.3/js/bootstrap.min.js" integrity="sha384-a5N7Y/aK3qNeh15eJKGWxsqtnX/wWdSZSKp+81YjTmS15nvnvxKHuzaWwXHDli+4" crossorigin="anonymous"></script>
        <script src="https://ajax.aspnetcdn.com/ajax/knockout/knockout-3.4.2.js"></script>
        <script defer src="https://use.fontawesome.com/releases/v5.0.8/js/all.js"></script>

        <script>
            function ResetForm(){
                document.getElementById("register_form").reset();
            }
        </script>
    </head>
    <body>
        <nav class="navbar navbar-light bg-header">
            <span class="navbar-brand mb-0 pointer">
                <a href="home.php" class="h1">
                    Access 4 All Spokane
                </a>
            </span>
        </nav>
        <div class="register">
            <div class="container">
                <div class="card card-fx">
                    <div class="card-header col-12">
                        <div>
                            <span class="h2">Register</span>
                            <p>Please fill this form to create an account.</p>
                        </div>
                    </div>
                    <div class="card-body">
                        <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post" id="register_form">
                            <div class="register-row">
                                <div class="form-group col-6 <?php echo (!empty($fname_err)) ? 'has-error' : ''; ?>">
                                    <label for="fname">First Name</label>
                                        <input type="name" autocomplete="name" name="fname" class="form-control" value="<?php echo $fname; ?>" required autofocus>
                                    <span class="form-text error"><?php echo $fname_err; ?></span>
                                </div>
                                <div class="form-group col-6 <?php echo (!empty($lname_err)) ? 'has-error' : ''; ?>">
                                    <label for="lname">Last Name</label>
                                    <input type="name" autocomplete="family-name" name="lname" class="form-control" value="<?php echo $lname; ?>" required>
                                    <span class="form-text error"><?php echo $lname_err; ?></span>
                                </div>
                            </div>
                            <div class="register-row">
                                <div class="form-group col-4<?php echo (!empty($username_err)) ? 'has-error' : ''; ?>">
                                    <label for="user_name">Username</label>
                                    <input type="text" autocomplete="username" name="user_name" class="form-control" value="<?php echo $user_name; ?>" required>
                                    <span class="form-text error"><?php echo $username_err; ?></span>
                                </div>
                                <div class="form-group col-8 <?php echo (!empty($email_err)) ? 'has-error' : ''; ?>">
                                    <label for="email">Email Address</label>
                                    <input type="email" autocomplete="email" name="email" class="form-control" value="<?php echo $email; ?>">
                                    <span class="form-text error"><?php echo $email_err; ?></span>
                                </div>
                            </div>
                            <div class="register-row">
                                <div class="form-group col-6 <?php echo (!empty($password_err)) ? 'has-error' : ''; ?>">
                                    <label for="password">Password</label>
                                    <input type="password" autocomplete="new-password" name="password" class="form-control" value="<?php echo $password; ?>" required>
                                    <span class="form-text error"><?php echo $password_err; ?></span>
                                </div>
                                <div class="form-group col-6 <?php echo (!empty($confirm_password_err)) ? 'has-error' : ''; ?>">
                                    <label for="confirm_password">Confirm Password</label>
                                    <input type="password" name="confirm_password" class="form-control" value="<?php echo $confirm_password; ?>" required>
                                    <span class="form-text error"><?php echo $confirm_password_err; ?></span>
                                </div>
                            </div>
                            <div class="register-row">
                                <span class="form-text error"><?php echo $message; ?></span>
                                <span class="form-text success"><?php echo $success; ?></span>
                            </div>
                    </div>
                    <div class="card-footer">
                            <div class="form-group">
                                <button type="submit" class="btn btn-primary col-2">Submit</button>
                                <button type="button" class="btn btn-secondary col-2" onclick="ResetForm()">Reset</button>
                            </div>
                            <p>Already have an account? <a href="login.php">Login here</a>.</p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>