export const getDateRangeForDay = () => {
    const date = new Date();
    // Create start of day (00:00:00)
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
  
    // Create end of day (23:59:59)
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
  
    return {
      dateFrom: startOfDay.toISOString(),
      dateTo: endOfDay.toISOString(),
    };
  };

//  Takes ISO-date (UTC) or Date and returns local time in format HH:MM
export const formatLocalTimeHHmm = (dateInput: string | Date): string => {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  if (isNaN(date.getTime())) return '';

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};