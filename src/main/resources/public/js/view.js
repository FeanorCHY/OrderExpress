let $ = require('jquery');
let _ = require('underscore');
let Backbone = require('backbone');
Backbone.$ = $;
let _vars = require('!css-variables!../css/variables.css');
let utils = require('./utils');
const __templateRoot = "../templates/";
const ui = {
    success: "<i class='fa fa-check' style='color:#00a65a'></i>",
    warning: "<i class='fa fa-bell-o' style='color:#f39c12'></i>",
    error: "<i class='fa fa-times-circle-o' style='color:#dd4b39'></i>"
};
require('../lib/AdminLTE/plugins/iCheck/icheck');

_.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
};

let CustomerBadgeView = Backbone.View.extend({
    el: '#customer-badge',
    render: function () {
        var self = this;
        $.when($.getJSON("/logStatus")).done(function (data) {
            if (data.hasOwnProperty("customer")) {
                $('#login-button').css('display', 'none');
                self.$el.css("display", "block");
                self.model.parseWith(data.customer);
                self.model.set("isLoggedIn", true);
                $.when(fetchTemplate("customerBadge")).done(function (data) {
                    self.template = _.template(data);
                    self.$el.html(self.template(self.model.attributes));
                    self.bindEvents();
                }).fail(function (xhr, textStatus) {
                    console.log(textStatus + ": fail to fetch template " + self.el);
                });
            } else {
                $('#login-button').find('a').html('Sign In').css('display', 'block');
                self.$el.css("display", "none");
            }
        });
    },
    bindEvents: function () {
        $('#logout-button').on("click", function () {
            $.when($.getJSON("/logout")).done(function (data) {
                this.model.clear();
            }).fail(function (xhr, textStatus) {

            });
        })
    }
});

let LoginMaskView = Backbone.View.extend({
    el: 'body',
    render: function () {
        var self = this;
        if (!this.model.get("isLoggedIn")) {
            $.when(fetchTemplate("loginMask")).done(function (data) {
                self.template = _.template(data);
                self.$el.prepend(self.template);
            }).fail(function (xhr, textStatus) {

            });
            this.bindEvents();
        }
    },
    bindEvents: function () {
        var self = this;
        $(".ion-close-circled").on("click", function () {
            self.removeMask();
        });
        $('#login-submit').on("click", function () {
            self.model.set({
                cus_email: $('#login-cus-email').val(),
                cus_password: $('#login-cus-password').val()
            });

            if ($(".icheckbox_square-blue").hasClass("checked")) {
                // TODO: add operation.
            }

            if (self.inputValidation()) {
                $.when($.ajax({
                    url: "/login",
                    type: "POST",
                    data: JSON.stringify(self.model.attributes),
                    dataType: 'json'
                })).done(function (data) {
                    $("#info-message-container").css("margin-top", "-30px");
                    $("#info-message").html(data.statusMsg);
                    self.model.parseWith(data.customer);
                    self.model.set("isLoggedIn", true);
                    self.removeMask();
                }).fail(function (xhr, textStatus) {
                    console.log(xhr.status + ": " + xhr.responseJSON.statusMsg);
                });
            }
        });
    },
    inputValidation: function () {
        var self = this;
        if (!utils.emailValidate(self.model.get("cus_email"))) {
            $('#login-cus-email').css("border-color", _vars["--color-login-red"]);
            return false;
        } else {
            $('#login-cus-email').css("border-color", _vars["--color-login-gray"]);
            return true;
        }
    },
    removeMask: function () {
        $(".login-mask").remove();
        $(".login-background").remove();
    }
});

let RegisterMaskView = Backbone.View.extend({
    el: '#register-box-body',
    initialize: function () {
        this.bindEvents();
    },
    bindEvents: function () {
        let self = this;
        $('#cus_name').on("input blur", function () {
            self.nameValidation();
        });
        $('#cus_email').on("blur", function () {
            self.emailValidation();
        });
        $('#cus_password').on("input blur", function () {
            self.passwordValidation();
        });
        $('#datepicker').on("input blur change", function () {
            self.dateValidation();
        });
        $('#cus_address').on("input blur", function () {
            self.addressValidation();
        });
        $('#cus_phone').on("input blur", function () {
            self.phoneValidation();
        });
        $('#register_cus_password').find('.input-group-addon').on("click", function () {
            let theIcon = $(this).find('i');
            theIcon.toggleClass("fa-lock fa-unlock-alt");
            if (theIcon.hasClass("fa-lock")) {
                $('#cus_password').attr("type", "password");
            } else {
                $('#cus_password').attr("type", "text");
            }
        });
        $(".icheckbox_square-blue ins").on("click", function () {
            if ($("#register_agree_to_term").parent().hasClass("checked")) {
                $("#alert-box").remove();
            }
        });
        $('#register-button').on("click", function () {
            self.submitValidation();
        });
    },
    nameValidation: function () {
        let c = $('#register_cus_name'),
            cus_name = c.find('#cus_name').val(),
            flag = false;
        if (cus_name === "") {
            this.setStatus(c, "error", "User name cannot be empty.");
            flag = false;
        } else if (cus_name.length < 4) {
            this.model.set("cus_name", cus_name);
            this.setStatus(c, "warning", "User name longer than 3 is recommended.");
            flag = true;
        } else if (cus_name.length > 45) {
            this.setStatus(c, "error", "User name should contain no more than 45 letters.");
            flag = false;
        } else if (!utils.userNameValidate(cus_name)) {
            this.setStatus(c, "error", "Only combination of numbers, letters and underscore \"_\" is allowed.");
            flag = false;
        } else {
            this.model.set("cus_name", cus_name);
            c.find('.help-block').html("");
            c.find('.form-control-feedback').html(ui["success"]);
            this.nowClear(c);
            flag = true;
        }
        return flag;
    },
    emailValidation: function () {
        let self = this,
            c = $('#register_cus_email'),
            cus_email = c.find('#cus_email').val();
        if (self.emailPreValidation(c)) {
            $.when(self.emailExistence(cus_email)).done(function (data) {
                self.setStatus(c, "error", "Email has already been taken. Try another please.");
            }).fail(function (xhr, textStatus) {
                self.model.set("cus_email", cus_email);
                c.find('.help-block').html("");
                c.find('.form-control-feedback').html(ui["success"]);
                self.nowClear(c);
            });
        }
    },
    emailPreValidation: function (c) {
        let flag = false,
            cus_email = c.find('#cus_email').val();
        if (cus_email === "") {
            this.setStatus(c, "error", "Email cannot be empty.");
            flag = false;
        } else if (!utils.emailValidate(cus_email)) {
            this.setStatus(c, "error", "Typo in email?");
            flag = false;
        } else if (cus_email.length > 45) {
            this.setStatus(c, "error", "Email should contain no more than 45 letters.");
            flag = false;
        } else {
            flag = true;
        }
        return flag;
    },
    passwordValidation: function () {
        let c = $('#register_cus_password'),
            cus_password = c.find('#cus_password').val(),
            flag = false;
        if (cus_password === "") {
            this.setStatus(c, "error", "Password cannot be empty.");
            flag = false;
        } else if (!utils.passwordValidate(cus_password)) {
            this.setStatus(c, "error", "At least one number and one special character from \"!@#$%^&*\" are required.");
            flag = false;
        } else {
            if (cus_password.length > 45) {
                this.setStatus(c, "error", "Password should contain no more than 45 letters.");
                flag = false;
            } else if (cus_password.length >= 8 && cus_password.length <= 16) {
                this.model.set("cus_password", cus_password);
                c.find('.help-block').html("");
                c.find('.form-control-feedback').html(ui["success"]);
                this.nowClear(c);
                flag = true;
            } else {
                this.model.set("cus_password", cus_password);
                this.setStatus(c, "warning", "Password from 8 to 16 digits is recommended.");
                flag = true;
            }
        }
        return flag;
    },
    dateValidation: function () {
        let c = $('#register_cus_age'),
            cus_bday = c.find('#datepicker').val(),
            flag = false;
        if (cus_bday === "") {
            this.model.set("cus_age", cus_bday);
            this.setClass(c, "has-warning");
            flag = true;
        } else if (!utils.dateValidate(cus_bday)) {
            this.setStatus(c, "error", "Invalid date format.");
            flag = false;
        } else {
            let dateArray = cus_bday.split("/"),
                month = +dateArray[0],
                day = +dateArray[1],
                year = +dateArray[2];
            if (day > 28) {
                let converted = new Date(year, month - 1, day),
                    convertedString = (converted.getMonth() + 1) + "/" + converted.getDate() + "/" + converted.getFullYear();
                $("#datepicker").val(convertedString);
                if (c.find('.form-control-feedback').html() !== "") {
                    c.find('.form-control-feedback').html("");
                }
            }
            this.model.set("cus_age", cus_bday);
            c.find('.help-block').html("");
            c.find('.form-control-feedback').html("");
            this.nowClear(c);
            flag = true;
        }
        return flag;
    },
    addressValidation: function () {
        let c = $('#register_cus_address'),
            cus_address = c.find('#cus_address').val(),
            flag = false;
        if (cus_address === "") {
            this.model.set("cus_address", cus_address);
            this.setClass(c, "has-warning");
            flag = true;
        } else if (cus_address.length > 100) {
            this.setStatus(c, "error", "Address should contain no more than 100 letters.");
            flag = false;
        } else {
            this.model.set("cus_address", cus_address);
            this.nowClear(c);
            flag = true;
        }
        return flag;
    },
    phoneValidation: function () {
        let c = $('#register_cus_phone'),
            cus_phone = c.find('#cus_phone').val(),
            flag = false;
        if (cus_phone === "") {
            this.model.set("cus_phone", cus_phone);
            this.setClass(c, "has-warning");
            flag = true;
        } else if (cus_phone.replace(/\D/g, '').length !== 10) {
            this.setClass(c, "has-error");
            flag = false;
        } else {
            this.model.set("cus_phone", cus_phone);
            this.nowClear(c);
            flag = true;
        }
        return flag;
    },
    agreeToTermValidation: function () {
        if (!$("#register_agree_to_term").parent().hasClass("checked") && (typeof $("#alert-box")[0]) === "undefined") {
            $(".register-box").append("\
                <div id='alert-box' class='alert alert-info alert-dismissible'>\
                <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>×</button>\
                <h4><i class='icon fa fa-info'></i> Before Registration</h4>\
                Read and agree to our <a href='#'>terms</a> before start to use.\
                </div>");
        }
    },
    submitValidation: function () {
        let self = this,
            cus_gender = $('#register_cus_gender').find("input:checked").val(),
            emailContainer = $('#register_cus_email'),
            cus_email = emailContainer.find('#cus_email').val();
        if (!utils.genderValidate(cus_gender)) {
            $('.iradio_square-blue').removeClass("checked");
            $($('.iradio_square-blue').get(2)).addClass("checked");
        }
        this.model.set("cus_gender", cus_gender);
        this.agreeToTermValidation();
        if (self.nameValidation() & self.passwordValidation() & self.dateValidation() &
            self.emailPreValidation(emailContainer) & self.addressValidation() & self.phoneValidation()) {
            $.when(self.emailExistence(cus_email)).done(function (data) {
                self.setStatus(emailContainer, "error", "Email has already been taken. Try another please.");
            }).fail(function (xhr, textStatus) {
                self.model.set("cus_email", cus_email);
                emailContainer.find('.help-block').html("");
                emailContainer.find('.form-control-feedback').html(ui["success"]);
                self.nowClear(emailContainer);
                self.parseRegistration();
                console.log(self.model.attributes);
                $.when($.post({
                    url: '/register',
                    data: JSON.stringify(self.model.attributes),
                    dataType: 'json'
                })).done(function (data) {
                    console.log(data.statusMsg);
                    self.model.parseWith(data.customer);
                    window.location.href = "/";
                }).fail(function (xhr, textStatus) {
                    if (xhr.status === 409) {
                        console.log("email taken.");
                    }
                    console.log(xhr);
                });
            });
        }
    },
    parseRegistration: function () {
        let self = this,
            bdayArray = this.model.get("cus_age").split("/"),
            bday = new Date(bdayArray[2], (+bdayArray[0] - 1), bdayArray[1]),
            now = new Date(),
            diff = (now.getTime() - bday.getTime()) / 1000;
        diff /= (60 * 60 * 24);
        this.model.set({
            "cus_age": Math.abs(Math.round(diff / 365.25)),
            "cus_phone": self.model.get("cus_phone").replace(/\D/g, '')
        });
    },
    emailExistence: function (cus_email) {
        return $.getJSON("/user/email/" + cus_email);
    },
    setStatus: function (element, status, info) {
        element.find('.help-block').html(info);
        element.find('.form-control-feedback').html(ui[status]);
        this.setClass(element, "has-" + status);
    },
    setClass: function (element, className) {
        element.removeClass("has-warning has-error has-success").addClass(className);
    },
    nowClear: function (element) {
        element.removeClass("has-warning has-error has-success");
    }
});


function fetchTemplate(templateIdentifier) {
    let template_url = __templateRoot + templateIdentifier + ".html";
    return $.ajax({
        url: template_url,
        method: 'GET',
        async: false,
        dataType: 'html'
    });
}

module.exports = {
    CustomerBadgeView: CustomerBadgeView,
    LoginMaskView: LoginMaskView,
    RegisterMaskView: RegisterMaskView
};