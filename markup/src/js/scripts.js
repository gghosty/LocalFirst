//Fixed navigation
$(function(){
  var prevPosition = null;

  $(window).scroll(function(){
    var winTop = $(window).scrollTop();
    if(winTop >= 142){
      $("body").addClass("sticky-table-header");
    }else{
      $("body").removeClass("sticky-table-header");
      $("body").removeClass("sticky-tabs-header");
    }

    if (prevPosition > winTop && winTop >= 142) {
      // console.log(' to the top');
      $("body").addClass("sticky-tabs-header");
    } else {
      $("body").removeClass("sticky-tabs-header");
    }

    prevPosition = winTop;
  });
});

//Search
$(function() {
  $(".tabs--header_search-show").click(function(e) {
    e.preventDefault();
    $(".tabs--header").toggleClass("show-search");
  });
});

$(function() {
  $(".tabs--header_search-clear").click(function(e) {
    e.preventDefault();
    $(".tabs--header").toggleClass("show-search");
  });
});


//Filter 
$(function() {
  $(".filter_btn").click(function(e) {
    e.preventDefault();
    $(".table--list_header").toggleClass("show-filter");
  });
});

//Reports More 
$(function() {
  $(".report--topic_item-more_btn").click(function(e) {
    e.preventDefault();
    $(this).parents('.report--topic_content').toggleClass("show-all");
  });
});

//Reports Menu 
$(function() {
  $(".report--topic_item-btns").click(function(e) {
    e.preventDefault();
    $(this).parents('.report--topic_item').toggleClass("show-menu");
  });
});

//Filter 
$(function() {
  $(".filter-row .datepicker_btn").click(function(e) {
    e.preventDefault();
    $(".filter-row").toggleClass("show-datepicker");
  });
});

//Calendar
$(function() {
  $(".calendar_btn").click(function(e) {
    e.preventDefault();
    $(".table--list_header").toggleClass("show-calendar");
  });
  $(".calendar-close_btn").click(function(e) {
    e.preventDefault();
    $(".table--list_header").toggleClass("show-calendar");
  });
});

//PopUps
$(document).on('click', '[data-toggle="class"]', function (e) {
    e.stopPropagation();
    console.log('CLICK EDIT')
    var $target = $($(this).data('target'));
    var classes = $(this).data('classes');
    $target.toggleClass(classes).toggleClass('show');
    $('body').toggleClass('overlay');
    return false;
});

