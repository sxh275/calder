// JavaScript Document



$(document).ready(function () {
    var numberOfTabs = $("#tabs>li").length;
    $("#tabs>li:eq(0)").addClass("active");
    $(".tab-pane").hide();
    $(".tab-pane:eq(0)").show();
    $("#tabs>li").click(function () {
        $("#tabs>li").removeClass("active");
        $(this).addClass("active");
        var index = $(this).index("#tabs>li");
        $(".tab-pane").hide();
        $(".tab-pane:eq("+index+")").show();
    });
});

