

//UpToDate Search
$('#uptodate .form-search').submit(function(){
    var baseUrl = 'http://www.uptodate.com/contents/search',
        input = $('#uptodate .form-search input[type="text"]'),
        term = $('#uptodate .form-search input[type="text"]').val();

    if (input.val() === input.attr('placeholder')) {
        term = '';
    }
    var url = baseUrl + encodeURIComponent(term);
    window.location = url + '?key=' + key;
    return false;
});