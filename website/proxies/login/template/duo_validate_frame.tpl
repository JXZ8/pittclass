<html><head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pitt Passport</title>
    <link rel="shortcut icon" href="https://www.pitt.edu/sites/default/files/pitt_favicon_0.ico" type="image/vnd.microsoft.icon">
    <link rel="stylesheet" href="https://passport.pitt.edu/idp/css/shibboleth.css">
    <link rel="stylesheet" href="https://passport.pitt.edu/idp/css/font-awesome.min.css">
</head><body id="shibboleth-app">
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
</header><div class="shibboleth-content">
    <div class="container">
        <!--<div class="column one">-->

        <noscript>The Duo service requires JavaScript.</noscript>
        <script src="https://passport.pitt.edu/idp/js/Duo-Web-v2.min.js"></script>
        <iframe id="duo_iframe" data-host="api-f2c42ced.duosecurity.com" data-sig-request="{{data-sig-request}}" data-post-action="/idp/profile/SAML2/POST/SSO?execution=e1s2" frameborder="0" height="460" width="100%" style="overflow-y:scroll" src="proxy__duo_validate_content.php">
        </iframe>
        <form id="duo_form" method="post">
            <input type="hidden" name="_eventId" value="proceed">

        </form>

        <!--<h3 style="text-align: center">
            <a href="/idp/profile/SAML2/POST/SSO?execution=e1s2&_eventId=cancel">Cancel this Request</a>
        </h3>
      </div>
      <div class="column two">
        <ul class="list list-help">
          <li class="list-help-item"><a href="#"><span class="item-marker">&rsaquo;</span> Need Help?</a></li>
        </ul>-->
    </div>
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



</div></body></html>