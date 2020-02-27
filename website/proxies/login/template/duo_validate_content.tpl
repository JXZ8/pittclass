<html lang="en"><!--<![endif]--><head>
<meta charset="utf-8">

<title>
Two-Factor Authentication
</title>
<!-- Import for all versions of IE, in case the standards mode is downgraded to IE8 -->
<!--[if IE]> <link rel="stylesheet" href="&#x2f;frame&#x2f;static&#x2f;css&#x2f;v3&#x2f;ie8.css&#x3f;v&#x3d;3582c"> <![endif]-->

<link rel="stylesheet" href="https://api-f2c42ced.duosecurity.com/frame/static/css/normalize.css?v=a674e">
<link rel="stylesheet" href="https://api-f2c42ced.duosecurity.com/frame/static/fonts/ss-standard/ss-standard.css?v=a8885">
<link rel="stylesheet" href="../css/duo-admin.css?v=fc5d6">
<link rel="stylesheet" href="https://api-f2c42ced.duosecurity.com/frame/static/css/v3/base.css?v=92bef">

<link rel="stylesheet" href="https://api-f2c42ced.duosecurity.com/frame/static/css/tipsy.css?v=4217a">


</head>
<body>
<div class="">
<div class="base-wrapper ">

<div class="base-main">
<div role="main" class="base-body">

	{{login-form}}



</div>
</div>
<div class="base-navigation">

<div class="base-navigation">
<div role="banner">

<a href="/frame/prompt?sid={{sid}}">
<img src="../other/logo.png" alt="University of Pittsburgh Authentication" width="128">
</a>

</div>
<div class="help-sidebar">
<button class="btn btn-support">
<i class="icon-align-justify" aria-label="Open"></i>
<i class="icon-delete" aria-label="Close"></i>
Settings
</button>
<div class="help-links">
<nav role="navigation">

<a id="help_link" class="help-nav" href="https://guide.duo.com/prompt" target="_blank" aria-label="What is the Duo Prompt? (Opens in a new tab.)">
What is this?<i class="icon-new-window"></i>
</a>


<a class="help-nav" id="new-device" href="https://api-f2c42ced.duosecurity.com/frame/enroll/pre_flow_prompt?sid={{sid_urlencode}}&amp;post_auth_action=addDevice">
Add a new device
</a>
<a class="help-nav" href="https://api-f2c42ced.duosecurity.com/frame/enroll/pre_flow_prompt?sid={{sid_urlencode}}&amp;post_auth_action=manageDevices">
My Settings &amp; Devices
</a>

<a href="#" class="need-help">Need help?</a>
</nav>


</div>

</div>
<div class="help-overlay offscreen">
<div class="help-links">
<nav role="navigation">

<a id="help_link" class="help-nav" href="https://guide.duo.com/prompt" target="_blank" aria-label="What is the Duo Prompt? (Opens in a new tab.)">
What is this?<i class="icon-new-window"></i>
</a>


<a class="help-nav" id="new-device" href="https://api-f2c42ced.duosecurity.com/frame/enroll/pre_flow_prompt?sid={{sid_urlencode}}&amp;post_auth_action=addDevice">
Add a new device
</a>
<a class="help-nav" href="https://api-f2c42ced.duosecurity.com/frame/enroll/pre_flow_prompt?sid={{sid_urlencode}}&amp;post_auth_action=manageDevices">
My Settings &amp; Devices
</a>

<a href="#" class="need-help">Need help?</a>
</nav>


</div>

</div>
</div>

</div>
<div class="base-sidebar">

</div>
<div id="messages-view" class="hidden">
<div class="messages-list">

</div>
</div>


</div>
</div>
<script id="translations" type="text/json">
{"locale_data": {"js-messages": {"": {"plural_forms": "nplurals&#x3d;2&#x3b; plural&#x3d;&#x28;n &#x21;&#x3d; 1&#x29;&#x3b;", "domain": "js-messages", "lang": "en"}}}, "domain": "js-messages"}
</script>


<script src="https://api-f2c42ced.duosecurity.com/frame/static/shared/lib/jquery/jquery-legacy.min.js?v=72e7b"></script>
<script src="https://api-f2c42ced.duosecurity.com/frame/static/shared/lib/he/he.min.js?v=aaa33"></script>
<script src="https://api-f2c42ced.duosecurity.com/frame/static/js/lib/jquery-postmessage.min.js?v=98c73"></script>
<script src="https://api-f2c42ced.duosecurity.com/frame/static/shared/lib/lodash/lodash.min.js?v=14516"></script>
<script src="https://api-f2c42ced.duosecurity.com/frame/static/shared/lib/backbone/backbone-min.js?v=28a93"></script>
<script src="https://api-f2c42ced.duosecurity.com/frame/static/js/page/v3/frame.js?v=1959f"></script>
<script src="https://api-f2c42ced.duosecurity.com/frame/static/js/page/v3/base.js?v=f9b78"></script>
<script src="https://api-f2c42ced.duosecurity.com/frame/static/shared/lib/validator/validator.min.js?v=9a068"></script>
<script type="text/json" id="helpdesk-message">{"message": "Please contact the Technology Help Desk at 412-624-HELP &#x5b;4357&#x5d;."}</script>
<script id="browser_exceptions" src="https://api-f2c42ced.duosecurity.com/frame/static/shared/js/errors.js?v=65ffc" data-url="/frame/browser_exceptions"></script>
<!--[if lt IE 10]>
<script src="&#x2f;frame&#x2f;static&#x2f;js&#x2f;page&#x2f;v3&#x2f;quirks.js&#x3f;v&#x3d;ca533"></script>
<!--<![endif]-->


<script src="https://api-f2c42ced.duosecurity.com/frame/static/js/lib/jquery.tipsy.js?v=c0432"></script>
<script src="/proxies/login/js/prompt.js?v=a0bf7"></script>


<!--[if lt IE 9]>
<script src="&#x2f;frame&#x2f;static&#x2f;js&#x2f;lib&#x2f;html5shiv.js&#x3f;v&#x3d;86fbf"></script>
<![endif]-->


</body></html>