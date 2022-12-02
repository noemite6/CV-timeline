/**
 * @param item: item coming from the json
 * @returns {number} hash of the item
 */
function hash_item(item) {
    return hash_item_from_row(item['where'], item['role']);
}//hash_item

/**
 * @param where: string
 * @param role: string
 * @returns {number} hash of the item
 */
function hash_item_from_row(where, role) {
    return string_to_hash(where + role);
}//hash_item_from_row

/**
 * @param string
 * @returns {number} hashed string
 */
function string_to_hash(string) {
    let hash = 0;

    if (string.length === 0) return hash;

    for (let i = 0; i < string.length; i++) {
        let char = string.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }

    return hash;
}//string_to_hash

/**
 * @param start_date
 * @param end_date
 * @returns {string} Years $Y and $M months
 */
function get_duration_in_years_and_months(start_date, end_date) {
    const start = new Date(start_date);
    const end = new Date(end_date);
    const diff = end.getTime() - start.getTime();
    const diff_years = Math.floor(diff / (1000 * 3600 * 24 * 365));
    const diff_months = Math.floor((diff - (diff_years * 1000 * 3600 * 24 * 365)) / (1000 * 3600 * 24 * 30));
    return diff_years + " Years " + (diff_months > 0 ? "and " + diff_months + " months" : "");
}//get_duration_in_years_and_months


/**
 * @description: get the data to be used to draw the chart
 * @param step: all the items with a "step" [like al work"]
 * @returns {Date[]}: duration of the step
 * **/
function get_min_max_date(step) {
    let min_date = new Date();
    let max_date = new Date(1990, 1, 1);
    step.forEach(function (array) {
        min_date = new Date(Math.min(min_date, array[2]));
        max_date = new Date(Math.max(max_date, array[3]));
    });
    return [min_date, max_date];
}//get_min_max_date

/**
 * @param date: string in format YYYY-MM-DD
 * @returns {Date}: the date with the time set to 00:00:00, if $date is null, return the current date
 */
function get_today_if_null(date) {
    return date == null ? new Date() : new Date(date);
}//get_today_if_null

/**
 * @description: get row to be added on the google data table
 * @param item: item coming from the json
 * @returns {{term: string, name: string, start: Date, end: Date}}
 */
function get_array_for_table(item) {
    return [
        item['where'],
        item['role'],
        get_today_if_null(item.from),
        get_today_if_null(item.to),
    ]
}//get_array_for_table
