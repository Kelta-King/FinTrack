const CONFIG = require("../../configuration/config");
const NETWORK_CONFIG = require("../common/NETWORK_CONFIG");
const authAPI = require("../auth/authAPI");
const dataAPI = require("../model/dataApi");
const { SPECIFICATION_DATA } = require("../model/MACROS/MACROS");

function isValidEmail(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

function signInController(req, res) {
    var providedPassKey = req.body.passKey;
    if(!providedPassKey) {
        res.status(NETWORK_CONFIG.STATUS.BAD_REQUEST).send({
            message: "PassKey is required"
        });
        return;
    }
    const userData = dataAPI.getUserDetails();
    if(userData.errorCode != 0) {
        res.status(NETWORK_CONFIG.STATUS.INTERNAL_SERVER_ERROR).send({
            message: userData.errorMessage
        });
        return;
    }

    if(!userData.data.hasOwnProperty("pass_key")) {
        res.status(NETWORK_CONFIG.STATUS.INTERNAL_SERVER_ERROR).send({
            message: "Data structure is tempered in DB"
        });
        return;
    }

    const token = authAPI.signinUser(providedPassKey);
    if(userData.data.pass_key == null) {
        userData.data.pass_key = token;
        const ret = dataAPI.setUserDetails(userData.data);
        if(ret.errorCode != 0) {
            res.status(NETWORK_CONFIG.STATUS.INTERNAL_SERVER_ERROR).send({
                message: ret.errorMessage
            });
            return;
        }
    }
    else if(token !== userData.data.pass_key) {
        res.status(NETWORK_CONFIG.STATUS.UNAUTHORIZED).send({
            message: "Incorrect passKey"
        });
        return;
    }    

    res.status(NETWORK_CONFIG.STATUS.OK).send({
        message: "User signed in successfully",
        token: token
    });
    return;
}

function signOutController(req, res) {
    authAPI.signOutUser();
    res.status(NETWORK_CONFIG.STATUS.OK).send({
        message: "User signed out successfully"
    });
    // res.redirect('http://localhost:3000/dashboard');
}

function versionController(req, res) {
    res.status(NETWORK_CONFIG.STATUS.OK).send({
        version: CONFIG.APP_VERSION
    });
}

function dashboardController(req, res) {
    res.status(NETWORK_CONFIG.STATUS.OK).send({
        message: "Dashboard data"
    });
}

function expensesController(req, res) {
    res.status(NETWORK_CONFIG.STATUS.OK).send({
        message: "Expenses data"
    });
}

function autoDebitsController(req, res) {
    res.status(NETWORK_CONFIG.STATUS.OK).send({
        message: "Auto debits data"
    });
}

function settingsController(req, res) {
    // Require user_name, user email
    var ret = dataAPI.getUserDetails();
    if(ret.errorCode != 0) {
        res.status(NETWORK_CONFIG.STATUS.INTERNAL_SERVER_ERROR).send({
            message: ret.errorMessage
        });
        return;
    }

    if(!ret.data.hasOwnProperty("user_name") ||
       !ret.data.hasOwnProperty("email")) {
        res.status(NETWORK_CONFIG.STATUS.INTERNAL_SERVER_ERROR).send({
            message: "Data structure is tempered in DB"
        });
        return;
    }

    var requiredUserData = {
        user_name: ret.data.user_name,
        email: ret.data.email
    };

    res.status(NETWORK_CONFIG.STATUS.OK).send({
        message: "Settings data fetched successfully",
        data: requiredUserData
    });
}

function preferencesController(req, res) {
    res.status(NETWORK_CONFIG.STATUS.OK).send({
        message: "Preferences data"
    });
}

function accountController(req, res) {
    res.status(NETWORK_CONFIG.STATUS.OK).send({
        message: "Account data"
    });
}

function updateEmailController(req, res) {
    var providedEmail = req.body.email;
    if(!providedEmail) {
        res.status(NETWORK_CONFIG.STATUS.BAD_REQUEST).send({
            message: "Email is required"
        });
        return;
    }
    if(!isValidEmail(providedEmail)) {
        res.status(NETWORK_CONFIG.STATUS.BAD_REQUEST).send({
            message: "Invalid email format"
        });
        return;
    }
    const userData = dataAPI.getUserDetails();
    if(userData.errorCode != 0) {
        res.status(NETWORK_CONFIG.STATUS.INTERNAL_SERVER_ERROR).send({
            message: userData.errorMessage
        });
        return;
    }
    userData.data.email = providedEmail;
    const ret = dataAPI.setUserDetails(userData.data);
    if(ret.errorCode != 0) {
        res.status(NETWORK_CONFIG.STATUS.INTERNAL_SERVER_ERROR).send({
            message: ret.errorMessage
        });
        return;
    }
    res.status(NETWORK_CONFIG.STATUS.OK).send({
        message: "Email updated successfully"
    });
}

function updatePassKeyController(req, res) {
    var providedPassKey = req.body.pass_key;
    if(!providedPassKey) {
        res.status(NETWORK_CONFIG.STATUS.BAD_REQUEST).send({
            message: "PassKey is required"
        });
        return;
    }
    if(providedPassKey.length < SPECIFICATION_DATA.MIN_PASS_KEY_LENGTH) {
        res.status(NETWORK_CONFIG.STATUS.BAD_REQUEST).send({
            message: `PassKey should be at least ${SPECIFICATION_DATA.MIN_PASS_KEY_LENGTH} characters long`
        });
        return;
    }
    if(providedPassKey.length > SPECIFICATION_DATA.MAX_PASS_KEY_LENGTH) {
        res.status(NETWORK_CONFIG.STATUS.BAD_REQUEST).send({
            message: `PassKey should not exceed ${SPECIFICATION_DATA.MAX_PASS_KEY_LENGTH} characters`
        });
        return;
    }
    const userData = dataAPI.getUserDetails();
    if(userData.errorCode != 0) {
        res.status(NETWORK_CONFIG.STATUS.INTERNAL_SERVER_ERROR).send({
            message: userData.errorMessage
        });
        return;
    }
    userData.data.pass_key = authAPI.signinUser(providedPassKey);;
    const ret = dataAPI.setUserDetails(userData.data);
    if(ret.errorCode != 0) {
        res.status(NETWORK_CONFIG.STATUS.INTERNAL_SERVER_ERROR).send({
            message: ret.errorMessage
        });
        return;
    }
    res.status(NETWORK_CONFIG.STATUS.OK).send({
        message: "PassKey updated successfully"
    });
}

function updateUserNameController(req, res) {
    var providedUserName = req.body.user_name;
    if(providedUserName == null) {
        res.status(NETWORK_CONFIG.STATUS.BAD_REQUEST).send({
            message: "User name is required"
        });
        return;
    }

    if(providedUserName.length > SPECIFICATION_DATA.MAX_USER_NAME_LENGTH) {
        res.status(NETWORK_CONFIG.STATUS.BAD_REQUEST).send({
            message: `User name should not exceed ${SPECIFICATION_DATA.MAX_USER_NAME_LENGTH} characters`
        });
        return;
    }

    const userData = dataAPI.getUserDetails();
    if(userData.errorCode != 0) {
        res.status(NETWORK_CONFIG.STATUS.INTERNAL_SERVER_ERROR).send({
            message: userData.errorMessage
        });
        return;
    }
    userData.data.user_name = providedUserName;
    const ret = dataAPI.setUserDetails(userData.data);
    if(ret.errorCode != 0) {
        res.status(NETWORK_CONFIG.STATUS.INTERNAL_SERVER_ERROR).send({
            message: ret.errorMessage
        });
        return;
    }

    res.status(NETWORK_CONFIG.STATUS.OK).send({
        message: "User name updated successfully"
    });
}

function resetDBController(req, res) {
    var ret = dataAPI.resetDB();
    if(ret.errorCode != 0) {
        res.status(NETWORK_CONFIG.STATUS.INTERNAL_SERVER_ERROR).send({
            message: ret.errorMessage
        });
        return;
    }
    res.status(NETWORK_CONFIG.STATUS.OK).send({
        message: "DB reset successfully"
    })
}

function addAutoDebitController(req, res) {
    var data = req.body;
    if(!data.hasOwnProperty("autoDebitTitle") ||
       !data.hasOwnProperty("autoDebitDescription") ||
       !data.hasOwnProperty("autoDebitType") ||
       !data.hasOwnProperty("autoDebitCategory") ||
       !data.hasOwnProperty("autoDebitAmount") ||
       !data.hasOwnProperty("autoDebitFrequency") ||
       !data.hasOwnProperty("autoDebitDay")
    ) {
        res.status(NETWORK_CONFIG.BAD_REQUEST).send({
            message: "Required fields are missing"
        });
    }

    if(data.autoDebitTitle == "") {
        res.status(NETWORK_CONFIG.BAD_REQUEST).send({
            message: "Auto Debit Title is required"
        });
        return;
    }

    if(data.autoDebitType == "") {
        res.status(NETWORK_CONFIG.BAD_REQUEST).send({
            message: "Auto Debit Type is required"
        });
        return;
    }

    if(data.autoDebitCategory == "") {
        res.status(NETWORK_CONFIG.BAD_REQUEST).send({
            message: "Auto Debit Category is required"
        });
        return;
    }

    if(data.autoDebitAmount <= 0) {
        res.status(NETWORK_CONFIG.BAD_REQUEST).send({
            message: "Auto Debit Amount should be greater than 0"
        });
        return;
    }

    if(data.autoDebitFrequency == "" || data.autoDebitFrequency < 0) {
        res.status(NETWORK_CONFIG.BAD_REQUEST).send({
            message: "Auto Debit Frequency is required"
        });
        return;
    }

    if(data.autoDebitDay < 1 || data.autoDebitDay > 28) {
        res.status(NETWORK_CONFIG.BAD_REQUEST).send({
            message: "Auto Debit Day should be between 1 and 28"
        });
        return;
    }

    res.status(NETWORK_CONFIG.STATUS.OK).send({
        message: "Auto Debit added successfully"
    });
}

module.exports = {
    signInController,
    signOutController,
    versionController,
    dashboardController,
    expensesController,
    autoDebitsController,
    settingsController,
    preferencesController,
    accountController,
    updateEmailController,
    updatePassKeyController,
    updateUserNameController,
    resetDBController,
    addAutoDebitController
}