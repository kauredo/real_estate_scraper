export function truncateText(title, length) {
  if (title.length > 90) {
    return title.substring(0, length) + "...";
  } else {
    return title;
  }
}
