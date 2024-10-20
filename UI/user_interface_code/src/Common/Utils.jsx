const UTILS = {
    Title: 'FinTrack - Tracking Finances Made Easy',
    toIndianNumberFormat: function (num) {
        if (typeof num === 'string') {
            num = Number.parseFloat(num);
        }
        num = num.toLocaleString('en-IN', {
            maximumFractionDigits: 2
        });
        return num;
    }
};

export default UTILS;
