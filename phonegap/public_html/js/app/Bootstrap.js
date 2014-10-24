var Bootstrap = (function() {
    //Function to get the global data
    function getData() {
        var data = {
            appId: "1226d77ebdee4f43bb85145",
            accessToken: "f277044568c4c56b3d83c7ebb52198370542dc87",
            otpData: {}
        };
        return data;
    }
    //Function to initialize application
    function initApp() {
        loadInitialView();
        bindEvents();
    }
    //Function to load initial view of the app
    function loadInitialView() {
        $(".loginArea").css("display", "none");
        $("#firstView").css("display", "block");
    }
    //Function to bind events
    function bindEvents() {
        $("#verify").off("click");
        $("#otpVerify").off("click");
        $("#ok").off("click");
        $("#verify").on("click", function() {
            if ($("#number").val().length > 0) {
                startLoader();
                ajaxGetRequest("https://www.cognalys.com/api/v1/otp/?app_id=" + getData().appId + "&access_token=" + getData().accessToken + "&mobile=" + $("#number").val(), "json", Bootstrap.otpSuccess, Bootstrap.otpFailed);
            } else {
                alert("Please Enter a Number.");
            }
        });
        $("#ok").click(function() {
            loadInitialView();
        });
        $("#retry").click(function() {
            loadOtpVerificationView(getData().otpData);
        });
        $("#otpVerify").on("click", function() {
            if ($("#otpNumberSecond").val().length > 0) {
                startLoader();
                ajaxGetRequest("https://www.cognalys.com/api/v1/otp/confirm/?app_id=" + getData().appId + "&access_token=" + getData().accessToken + "&keymatch=" + getData().response.keymatch + "&otp=" + $("#otpNumberFirst").val() + $("#otpNumberSecond").val(), "json", Bootstrap.otpVerificationSuccess, Bootstrap.otpVerificationFailed);
            } else {
                alert("Please Enter OTP");
            }
        });
    }
    //Function to handle the OTP Success data
    function otpSuccess(response) {
        stopLoader();
        debugger;
        getData().otpData = response;
        if (response.status == "failed") {
            var message = "";
            $.each(response.errors, function(key, value) {
                message += value;
            });
            alert(message);
        } else {
            loadOtpVerificationView(response);
        }
    }
    //Function to load OTP Verification View
    function loadOtpVerificationView(response) {
        $(".loginArea").css("display", "none");
        $("#secondView").css("display", "block");
        $("#otpNumberFirst").val(response.otp_start);
    }
    //Function to handle OTP Verification Service success
    function otpVerificationSuccess(response) {
        stopLoader();
        if (response.status == "success") {
            $(".loginArea").css("display", "none");
            $("#otpSuccessView").css("display", "block");

        } else {
            loadOtpFailedView();
        }
    }
    //Function to handle OTP Verification Service failure
    function otpVerificationFailed(error) {
        stopLoader();
        loadOtpFailedView();
    }
    //Function to handle OTP Verification failure view
    function loadOtpFailedView() {
        $(".loginArea").css("display", "none");
        $("#otpFailedView").css("display", "block");

    }
    //Function to handle OTP failure
    function otpFailed(error) {
        stopLoader();
    }
    //Function to start loader
    function startLoader() {
        $(".section-loader").css("display", "block");
    }
    //Function to stop loader
    function stopLoader() {
        $(".section-loader").css("display", "none");
    }
    //Function to handle ajax GET request
    function ajaxGetRequest(requestUrl, dataType, successFunction, errorFunction, parameter) {
        $.ajaxSetup({
            cache: false
        });
        $.ajax({
            url: requestUrl,
            type: 'GET',
            dataType: dataType,
            success: function(response) {
                successFunction(response, parameter);
            },
            error: function(error) {
                errorFunction(error, parameter);
            }
        });
    }
    return {
        initApp: initApp,
        otpSuccess: otpSuccess,
        otpFailed: otpFailed,
        otpVerificationSuccess: otpVerificationSuccess,
        otpVerificationFailed: otpVerificationFailed
    };
})();