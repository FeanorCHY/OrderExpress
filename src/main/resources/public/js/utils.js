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
        var re = /^\w+$/;
        return re.test(userName);
    },
    passwordValidate: function (password) {
        var re = /^(?=.*[0-9])(?=.*[!@#$%^&*]).*[a-zA-Z0-9!@#$%^&*]$/;
        return re.test(password);
    },
    dateValidate: function (bDay) {
        var re = /^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/;
        return re.test(bDay);
    }
};

module.exports = utils;
