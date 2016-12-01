let utils = {
    emailValidate: function (email) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
        return gender === "male" || gender === "female";
    }
};

module.exports = utils;
