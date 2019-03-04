function filterImgSign(val) {
    var val = val || ''
    var reTag = /<img(?:.|\s)*?>|<\/img>/g;
    val = val.replace(reTag, '');
    return val.replace(/<[\/\!]*[^<>]*>/ig,"")
}

export default filterImgSign;