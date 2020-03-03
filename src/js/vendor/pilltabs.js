$('#myTab a').click(function (e) {
    e.preventDefault();
    $(this).tab('show');
})


$('#myTab a[href="#pills-catalog"]').tab('show'); // Select tab by name
$('#myTab a[href="#pills-pubmed"]').tab('show');
$('#myTab a[href="#pills-uptodate"]').tab('show');
$('#myTab a[href="#pills-dynamed"]').tab('show');