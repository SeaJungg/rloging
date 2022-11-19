export const getDateString = (dateStr) => {
    const date = new Date(dateStr);
    return (
        `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ` +
        `${date.getHours()}시 ${date.getMinutes()}분`
    );
};
