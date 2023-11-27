class utils {
  printTime(dateTime) {
    return `${dateTime.getHours()}:${dateTime.getMinutes() < 10 ? 0 : ""}${dateTime.getMinutes()}`
  }

  printDate(dateStr) {
    const year = dateStr.slice(0, 4);
    const day = dateStr.slice(8, 10);
    let month;
    switch (dateStr.slice(5, 7)) {
      case "01":
        month = 'января'
        break;
      case "02":
        month = 'февраля'
        break;
      case "03":
        month = 'марта'
        break;
      case "04":
        month = 'апреля'
        break;
      case "05":
        month = 'мая'
        break;
      case "06":
        month = 'июня'
        break;
      case "07":
        month = 'июля'
        break;
      case "08":
        month = 'августа'
        break;
      case "09":
        month = 'сентября'
        break;
      case "10":
        month = 'октября'
        break;
      case "11":
        month = 'ноября'
        break;
      case "12":
        month = 'декабря'
        break;
      default:
        break;
    }
    return `${day} ${month} ${year} года`
  }

  getDate(date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() < 10 ? 0 : ""}${date.getDate()}`
  }


}

export default new utils();