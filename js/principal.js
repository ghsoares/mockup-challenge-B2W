$("#tabs a").click(function() {
    $("li.current").removeClass("current");
    $(this).parent().addClass("current");
})