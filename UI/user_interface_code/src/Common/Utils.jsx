const UTILS = {
    TITLE: 'FinTrack - Tracking Finances Made Easy',
    GRAPH_COLORS: [
        '#026197', // Rich Blue
        '#36D087', // Vibrant Green
        '#4AC4E1', // Soft Blue
        '#2BB3A4', // Teal
        '#7B68EE', // Medium Purple
        '#00BCD4', // Bright Cyan
        '#8BC34A', // Lime Green
        '#FFC107', // Golden Yellow
        '#FFA726', // Sunset Orange
        '#FF6F61', // Coral
        '#E040FB', // Vibrant Pink
        '#673AB7' // Deep Purple
    ],
    SUPPORTED_GRAPHS: Object.freeze({
        BAR_GRAPH: 0,
        PIE_GRAPH: 1,
        LINE_GRAPH: 2
    }),
    TO_INDIAN_NUMBER_FORMAT: function (num) {
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
