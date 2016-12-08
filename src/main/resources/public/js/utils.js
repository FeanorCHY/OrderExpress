let utils = {
    emailValidate: function (email) {
        let re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|edu|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/;
        return re.test(email);
    },
    ageValidate: function (age) {
        age = +age;
        return !isNaN(age) && age > 0 && age < 101;
    },
    phoneValidate: function (phoneNumber) {
        return phoneNumber.length === 10 && !isNaN(+phoneNumber);
    },
    genderValidate: function (gender) {
        return gender === "male" || gender === "female" || gender === "unknown";
    },
    userNameValidate: function (userName) {
        let re = /^\w+$/;
        return re.test(userName);
    },
    passwordValidate: function (password) {
        let re = /^(?=.*[0-9])(?=.*[!@#$%^&*]).*[a-zA-Z0-9!@#$%^&*]$/;
        return re.test(password);
    },
    dateValidate: function (bDay) {
        let re = /^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/;
        return re.test(bDay);
    },
    slash: function (url) {
        return url.charAt(url.length - 1) === '/' ? url : url + '/';
    },
    secureElement: function (element) {
        if (element.length !== 0)
            return element.html();
        else return "";
    },
    ui: {
        empty: "",
        success: "<i class='fa fa-check' style='color:#00a65a'></i>",
        warning: "<i class='fa fa-bell-o' style='color:#f39c12'></i>",
        error: "<i class='fa fa-times-circle-o' style='color:#dd4b39'></i>",
        overlayIcon: "<div class='overlay'><i class='fa fa-refresh fa-spin'></i></div>"
    },
    dom: {
        left_loading_box: $("#left-panel-loading-box"),
        right_loading_box: $("#right-panel-loading-box"),
        left_boxes: $("#home-left-panel").find(".box"),
        right_boxes: $("#home-right-panel").find(".box"),
        switch_user_profile_heading: function () {
            $("section.content-header").find("h1").html("Profile<small>And we deliver your favorite food!</small>");
        },
        switch_home_heading: function () {
            $("section.content-header").find("h1").html("Pick a Restaurant<small>And we deliver your favorite food!</small>");
        }
    },
    loadings: {
        hideLeftLoading: function () {
            $("#left-panel-loading-box").hide();
        },
        showLeftLoading: function () {
            $("#left-panel-loading-box").show();
        }
    }
};

module.exports = utils;
