import AssuredWorkloadTwoToneIcon from '@mui/icons-material/AssuredWorkloadTwoTone';
import SipTwoToneIcon from '@mui/icons-material/SipTwoTone';
import AccountBalanceTwoToneIcon from '@mui/icons-material/AccountBalanceTwoTone';
import SavingsTwoToneIcon from '@mui/icons-material/SavingsTwoTone';
import MoneyTwoToneIcon from '@mui/icons-material/MoneyTwoTone';
import MonetizationOnTwoToneIcon from '@mui/icons-material/MonetizationOnTwoTone';
import CleaningServicesTwoToneIcon from '@mui/icons-material/CleaningServicesTwoTone';
import HouseTwoToneIcon from '@mui/icons-material/HouseTwoTone';
import LightbulbTwoToneIcon from '@mui/icons-material/LightbulbTwoTone';
import LocalGroceryStoreTwoToneIcon from '@mui/icons-material/LocalGroceryStoreTwoTone';
import LocalGasStationTwoToneIcon from '@mui/icons-material/LocalGasStationTwoTone';
import MedicalServicesTwoToneIcon from '@mui/icons-material/MedicalServicesTwoTone';
import ShoppingBagTwoToneIcon from '@mui/icons-material/ShoppingBagTwoTone';
import DiningTwoToneIcon from '@mui/icons-material/DiningTwoTone';
import LiveTvTwoToneIcon from '@mui/icons-material/LiveTvTwoTone';
import TagFacesTwoToneIcon from '@mui/icons-material/TagFacesTwoTone';
import CardGiftcardTwoToneIcon from '@mui/icons-material/CardGiftcardTwoTone';
import FitnessCenterTwoToneIcon from '@mui/icons-material/FitnessCenterTwoTone';
import WeekendTwoToneIcon from '@mui/icons-material/WeekendTwoTone';
import AirplaneTicketTwoToneIcon from '@mui/icons-material/AirplaneTicketTwoTone';

const UTILS = {
    TITLE: 'FinTrack - Tracking Finances Made Easy',
    MAX_SIGNIN_FIELD_CHARACTERS_COUNT: 50,
    MAX_INPUT_FIELD_CHARACTERS_COUNT: 100,
    ERROR_TEXT_COLOR: "#FF2E2E",
    ERROR_BACKGROUND_COLOR: "",
    SUCCESS_TEXT_COLOR: "#4BB543",
    SUCCESS_BACKGROUND_COLOR: "",
    GRAPH_COLORS: Object.freeze([
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
    ]),
    SUPPORTED_GRAPHS: Object.freeze({
        BAR_GRAPH: 0,
        PIE_GRAPH: 1,
        LINE_GRAPH: 2
    }),
    LISTS_OPTIONS: Object.freeze({
        EXPENSES_LIST: 0,
        AUTO_DEBITS_LIST: 1,
    }),
    MONTHS: Object.freeze({
        JANUARY: {i: 0, name: "January"},
        FEBRUARY: {i: 1, name: "February"},
        MARCH: {i: 2, name: "March"},
        APRIL: {i: 3, name: "April"},
        MAY: {i: 4, name: "May"},
        JUNE: {i: 5, name: "June"},
        JULY: {i: 6, name: "July"},
        AUGUST: {i: 7, name: "August"},
        SEPTEMBER: {i: 8, name: "September"},
        OCTOBER: {i: 9, name: "October"},
        NOVEMBER: {i: 10, name: "November"},
        DECEMBER: {i: 11, name: "December"}
    }),
    MONTHS_LIST: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    EXPENSES_CATEGORIES: Object.freeze({
        "Investment": [
            { title: 'SIP', icon: <SipTwoToneIcon /> },
            { title: 'Lumpsum MF', icon: <SavingsTwoToneIcon /> },
            { title: 'FD / Bank', icon: <AccountBalanceTwoToneIcon /> },
            { title: 'PPF', icon: <AssuredWorkloadTwoToneIcon /> },
            { title: 'Tax Saver MF (ELSS)', icon: <MoneyTwoToneIcon /> },
            { title: 'Other', icon: <MonetizationOnTwoToneIcon /> }
        ],
        "Necessary": [
            { title: 'Housekeeping', icon: <CleaningServicesTwoToneIcon /> },
            { title: 'House Rent', icon: <HouseTwoToneIcon /> },
            { title: 'Utilities', icon: <LightbulbTwoToneIcon /> },
            { title: 'Groceries', icon: <LocalGroceryStoreTwoToneIcon /> },
            { title: 'Fuel/Transportation', icon: <LocalGasStationTwoToneIcon /> },
            { title: 'Medical', icon: <MedicalServicesTwoToneIcon /> },
            { title: 'Other', icon: <MonetizationOnTwoToneIcon /> }
        ],
        'Non-Necessary': [
            { title: 'Shopping', icon: <ShoppingBagTwoToneIcon /> },
            { title: 'Dining', icon: <DiningTwoToneIcon /> },
            { title: 'Entertainment', icon: <LiveTvTwoToneIcon /> },
            { title: 'Travel', icon: <AirplaneTicketTwoToneIcon /> },
            { title: 'Hobbies', icon: <TagFacesTwoToneIcon /> },
            { title: 'Gifts/Charity', icon: <CardGiftcardTwoToneIcon /> },
            { title: 'Fitness/Wellness', icon: <FitnessCenterTwoToneIcon /> },
            { title: 'Luxury', icon: <WeekendTwoToneIcon /> },
            { title: 'Other', icon: <MonetizationOnTwoToneIcon /> }
        ]
    }),
    CURRENCIES: [
        {
            value: 'INR',
            label: '₹',
        },
        {
          value: 'USD',
          label: '$',
        },
    ],
    TO_INDIAN_NUMBER_FORMAT: function (num) {
        if (typeof num === 'string') {
            num = Number.parseFloat(num);
        }
        num = num.toLocaleString('en-IN', {
            maximumFractionDigits: 2
        });
        return num;
    },
};

Object.freeze(UTILS);

export default UTILS;
