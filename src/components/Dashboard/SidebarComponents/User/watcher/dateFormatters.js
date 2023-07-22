import { format } from 'date-fns-tz';

export function formatDateString(str, range) {
    switch(range) {
        case '1d':
            return str;
        case '1w':
        case '1m':
        case '3m':
        case '6m':
            if (isNaN(Date.parse(str))) {
                return str;
            }
            const date = new Date(str);
            return format(date, 'MMM dd', { timeZone: 'UTC' });
        case '1y':
        case '5y':
            if (isNaN(Date.parse(str))) {
                return str;
            }
            const yearDate = new Date(str);
            return format(yearDate, 'yyyy', { timeZone: 'UTC' });
        default:
            return str.split('Z')[0];
    }
}

export function formatVolumeString(value) {
    if (value >= 1000000) {
        return (value / 1000000).toFixed(2) + 'M';
    } else if (value >= 1000) {
        return (value / 1000).toFixed(2) + 'K';
    } else {
        return value;
    }
}
