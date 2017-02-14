export const youtube_parser = url => {
    if(!url)  return false;
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length >= 11)? match[7].slice(0, 11) : false;
}
