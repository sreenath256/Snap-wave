import { formatDistanceStrict, format } from 'date-fns';

export const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  const differenceInMinutes = (now - date) / 1000 / 60;

  if (differenceInMinutes < 1) {
    return 'just now';
  } else if (differenceInMinutes < 60) {
    return formatDistanceStrict(date, now, { unit: 'minute' }) + ' ago';
  } else if (differenceInMinutes < 1440) { // 60 minutes * 24 hours
    return formatDistanceStrict(date, now, { unit: 'hour' }) + ' ago';
  } else if (differenceInMinutes < 43200) { // 60 minutes * 24 hours * 30 days
    return formatDistanceStrict(date, now, { unit: 'day' }) + ' ago';
  } else {
    return format(date, 'MMMM d, yyyy');
  }
};
