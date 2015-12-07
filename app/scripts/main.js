'use strict';
$(document).ready(function(){
  function changeLanguage(lang){
    // Here we set the language we want to display:
    var language = lang;
    // In order to get the translations, we must use Ajax to load the XML file and replace the contents of the DIVs that need translating
    $.ajax({
        // Here, we specify the file that contains our translations
        url: 'translation.xml',
        // The following code is run when the file is successfully read
        success: function(xml) {
            // jQuery will find all <translation> tags and loop through each of them
            $(xml).find('translation').each(function(){
                // We fetch the id we set in the XML file and set a var 'id'
                var id = $(this).attr('id');
                // Based on the language we can set, jQuery will search for a matching tag and return the text inside it
                var text = $(this).find(language).text();
                // Last, but not least, we set the contents of the DIV with a class name matching the id in the XML file to the text we just fetched
                $('.' + id).html(text);
            });
        }
    });
  }

  $('input').on('focus', function(){
    $(this).closest('fieldset').addClass('usa-faux-focus');
  });
  $('input').on('blur', function(){
    $(this).closest('fieldset').removeClass('usa-faux-focus');
  });

  $('.usa-video-control').on('click', function(){
    if ($('.usa-video-hero-video').get(0).paused) {
       $('.usa-video-hero-video').get(0).play();
       $(this).removeClass('fa-play');
       $(this).addClass('fa-pause');
    } else {
       $('.usa-video-hero-video').get(0).pause();
       $(this).removeClass('fa-pause');
       $(this).addClass('fa-play');
    }
  });

  $('.switch').on('change', function(){
     if($('#english').is(':checked')){
       $('html').attr('lang','en');
       if($('.switch-indicator').hasClass('indicator-spanish')){
        $('.switch-indicator').removeClass('indicator-spanish');
        $('.switch-indicator').addClass('indicator-english');
       }
       changeLanguage('en');
     }
     if($('#spanish').is(':checked')){
       $('html').attr('lang','es');
       if($('.switch-indicator').hasClass('indicator-english')){
        $('.switch-indicator').removeClass('indicator-english');
        $('.switch-indicator').addClass('indicator-spanish');
       }
       changeLanguage('es');
     }
  });
});
