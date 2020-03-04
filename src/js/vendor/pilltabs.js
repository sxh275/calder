

$('#myTab a').click(function (e) {
    e.preventDefault();
    $(this).tab('show');
})


$('#myTab a[href="#catalog"]').tab('show'); // Select tab by name
$('#myTab a[href="#pubmed"]').tab('show');
$('#myTab a[href="#uptodate"]').tab('show');
$('#myTab a[href="#dynamed"]').tab('show');


