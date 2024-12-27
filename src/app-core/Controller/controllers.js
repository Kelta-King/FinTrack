const CONFIG = require("../../configuration/config");
const NETWORK_CONFIG = require("../common/NETWORK_CONFIG");
const authAPI = require("../auth/authAPI");
const dataAPI = require("../model/dataApi");
const { SPECIFICATION_DATA } = require("../model/MACROS/MACROS");

function isValidEmail(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

function signIn(req, res) {
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

function signOut(req, res) {

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
    res.status(NETWORK_CONFIG.STATUS.OK).send({
        message: "Settings data"
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

module.exports = {
    signIn,
    signOut,
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
}