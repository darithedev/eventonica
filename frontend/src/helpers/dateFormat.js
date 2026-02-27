function dateFormat(dateStr) {
    const date = new Date(dateStr);

    const d = {
        year: date.getFullYear(),
        month: String(date.getMonth() + 1).padStart(2, "0"),
        day: String(date.getDate()).padStart(2, "0"),
        hours: String(date.getHours()).padStart(2, "0"),
        minutes: String(date.getMinutes()).padStart(2, "0")
    }

    return `${d.year}-${d.month}-${d.day}T${d.hours}:${d.minutes}`;
}

export default dateFormat;
