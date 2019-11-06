// JavaScript Document

(function ($) {

/**
 * Toggle the visibility of a fieldset using smooth animations.
 */
Drupal.toggleFieldset = function (fieldset) {
  var $fieldset = $(fieldset);
  if ($fieldset.is('.collapsed')) {
    var $content = $('> .fieldset-wrapper', fieldset).hide();
    $fieldset
      .removeClass('collapsed')
      .trigger({ type: 'collapsed', value: false })
      .find('> legend span.fieldset-legend-prefix').html(Drupal.t('Hide'));
    $content.slideDown({
      duration: 'fast',
      easing: 'linear',
      complete: function () {
        Drupal.collapseScrollIntoView(fieldset);
        fieldset.animating = false;
      },
      step: function () {
        // Scroll the fieldset into view.
        Drupal.collapseScrollIntoView(fieldset);
      }
    });
  }
  else {
    $fieldset.trigger({ type: 'collapsed', value: true });
    $('> .fieldset-wrapper', fieldset).slideUp('fast', function () {
      $fieldset
        .addClass('collapsed')
        .find('> legend span.fieldset-legend-prefix').html(Drupal.t('Show'));
      fieldset.animating = false;
    });
  }
};

/**
 * Scroll a given fieldset into view as much as possible.
 */
Drupal.collapseScrollIntoView = function (node) {
  var h = document.documentElement.clientHeight || document.body.clientHeight || 0;
  var offset = document.documentElement.scrollTop || document.body.scrollTop || 0;
  var posY = $(node).offset().top;
  var fudge = 55;
  if (posY + node.offsetHeight + fudge > h + offset) {
    if (node.offsetHeight > h) {
      window.scrollTo(0, posY);
    }
    else {
      window.scrollTo(0, posY + node.offsetHeight - h + fudge);
    }
  }
};

Drupal.behaviors.collapse = {
  attach: function (context, settings) {
    $('fieldset.collapsible', context).once('collapse', function () {
      var $fieldset = $(this);
      // Expand fieldset if there are errors inside, or if it contains an
      // element that is targeted by the URI fragment identifier.
      var anchor = location.hash && location.hash != '#' ? ', ' + location.hash : '';
      if ($fieldset.find('.error' + anchor).length) {
        $fieldset.removeClass('collapsed');
      }

      var summary = $('<span class="summary"></span>');
      $fieldset.
        bind('summaryUpdated', function () {
          var text = $.trim($fieldset.drupalGetSummary());
          summary.html(text ? ' (' + text + ')' : '');
        })
        .trigger('summaryUpdated');

      // Turn the legend into a clickable link, but retain span.fieldset-legend
      // for CSS positioning.
      var $legend = $('> legend .fieldset-legend', this);

      $('<span class="fieldset-legend-prefix element-invisible"></span>')
        .append($fieldset.hasClass('collapsed') ? Drupal.t('Show') : Drupal.t('Hide'))
        .prependTo($legend)
        .after(' ');

      // .wrapInner() does not retain bound events.
      var $link = $('<a class="fieldset-title" href="#"></a>')
        .prepend($legend.contents())
        .appendTo($legend)
        .click(function () {
          var fieldset = $fieldset.get(0);
          // Don't animate multiple times.
          if (!fieldset.animating) {
            fieldset.animating = true;
            Drupal.toggleFieldset(fieldset);
          }
          return false;
        });

      $legend.append(summary);
    });
  }
};

})(jQuery);
;

var utilities = {
  urlencode:function (urlVars) {
    var ret = "";
    var first = true;
    for (var index in urlVars) {
      if (urlVars.hasOwnProperty(index)) {
        if (first) {
          ret = ret + "?";
          first = false;
        } else {
          ret = ret + "&";
        }
        ret = ret + index + '=' + encodeURIComponent(urlVars[index]);
      }
    }
    encodeURI(ret);
    return ret;
  },
  getUrlVars: function() {
    /* taken from http://papermashup.com/read-url-get-variables-withjavascript */
    var ret = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value){
      ret[key] = decodeURIComponent(value);
    });
    return ret;
  }
}


;
(function($){
  $(document).ready(function(){

  var urlencode = utilities.urlencode,
      key = Drupal.settings.mcl_search.key;

  //Set the initial form state
  (function(){
    $('.form-search input[type="text"]').val("");
    $('select[name="Ntk"]').val('Keyword');
    $('#rbtnContains').attr('checked','checked');
    $('#rbtnClinicalInfo').attr('checked', 'checked');
  })()

  //Web Site Search
  $('#site .form-search').submit(function(){
    var baseUrl = "/search/external/website/",
        input = $('#site .form-search input[type="text"]'),
        term = $('#site .form-search input[type="text"]').val();
    term = encodeURIComponent(term);
    if (input.val() === input.attr('placeholder')) {
      term = '';
    }
    var url = baseUrl + term;
    window.location = url + '?key=' + key;
    return false;
  });

  //Catalog Search
  $('#catalog .form-search').submit(function(){
    var baseUrl = "/search/external/catalog/",
        input = $('#catalog .form-search input[type="text"]'),
        ntk = $('#catalog select').val(),
        term = $('#catalog .form-search input[type="text"]').val();

    if (input.val() === input.attr('placeholder')) {
      ntk = '';
      term = '';
    }

    var url = baseUrl;
    if (ntk && term) {
      url += encodeURIComponent(term) + '/';
      url += encodeURIComponent(ntk);
    }
    window.location = url + '?key=' + key;
    return false;
  });

  //Ebooks Search
  $('#ebooks .form-search').submit(function(){
      var baseUrl = "/search/external/ebooks/",
          input = $('#ebooks .form-search input[type="text"]'),
          ntk = $('#ebooks select').val(),
          term = $('#ebooks .form-search input[type="text"]').val();

      if (input.val() === input.attr('placeholder')) {
          ntk = '';
          term = '';
      }

      var url = baseUrl;
      if (ntk && term) {
          url += encodeURIComponent(term) + '/';
          url += encodeURIComponent(ntk);
      }
      window.location = url + '?key=' + key;
      return false;
  });

  //Ejournals Search
  $('#ejournals .form-search').submit(function(){
    var baseUrl = '/search/external/ejournals/',
        input = $('#ejournals .form-search input[type="text"]'),
        searchType = $('#ejournals input[name="SearchType"]:checked').val(),
        term = $('#ejournals .form-search input[type="text"]').val();
    if (input.val() === input.attr('placeholder')) {
      term = '';
      searchType = '';
    }
    var url = baseUrl;
    if (searchType && term) {
        url += encodeURIComponent(term) + '/';
        url += encodeURIComponent(searchType);
    }
    window.location = url + '?key=' + key;
    return false;
  });

  //PubMed Search
  $('#pubmed .form-search').submit(function(){
    var baseUrl = '/search/external/pubmed/',
        input = $('#pubmed .form-search input[type="text"]'),
        term =  $('#pubmed .form-search input[type="text"]').val();

    if (input.val() === input.attr('placeholder')) {
       term = '';
    }
    var url = baseUrl + encodeURIComponent(term);
    window.location = url + '?key=' + key;
    return false;
  });
	  
	  
	  //DynaMed Search
  $('#dynamed .form-search').submit(function(){
    var baseUrl = '/search/external/dynamed/',
        input = $('#dynamed .form-search input[type="text"]'),
        term =  $('#dynamed .form-search input[type="text"]').val();

    if (input.val() === input.attr('placeholder')) {
       term = '';
    }
    var url = baseUrl + encodeURIComponent(term);
    window.location = url + '?key=' + key;
    return false;
  });
	  

  //UpToDate Search
  $('#uptodate .form-search').submit(function(){
    var baseUrl = '/search/external/uptodate/',
        input = $('#uptodate .form-search input[type="text"]'),
        term = $('#uptodate .form-search input[type="text"]').val();

    if (input.val() === input.attr('placeholder')) {
      term = '';
    }
    var url = baseUrl + encodeURIComponent(term);
    window.location = url + '?key=' + key;
    return false;
  });

  //Quick Search
  $('#quicksearch .form-search').submit(function(){
    var baseUrl = '/search/external/clinical_searcher/';
    var urlVars = {
      'representedOrganization.id.root':'1.3.6.1.4.1.4275',
      'xsltTransform': 'Infobutton_UI_Duke'
    };
    var drugname = $('#wdgtDrug-name');
    var patientProblem = $('#wdgtPatient-problem');
    var intervention = $('#wdgtIntervention');
    var taskContext = "";
    var mainSearchCriteriaDN = "";

    if(drugname.val() !== "" && drugname.val() !== drugname.attr('placeholder')) {
      taskContext = 'MLREV';
      mainSearchCriteriaDN = drugname.val();
    } else if (patientProblem.val() !== "" && patientProblem.val() !== patientProblem.attr('placeholder')) {
      taskContext = 'PROBLISTREV';
      mainSearchCriteriaDN = '(' + patientProblem.val() + ')';
      if (intervention.val() !== "" && intervention.val() !== intervention.attr('placeholder')) {
        mainSearchCriteriaDN = mainSearchCriteriaDN + ' AND (' + intervention.val() + ')';
      }
    } else if (intervention.val() !== "" && intervention.val() !== intervention.attr('placeholder')) {
      taskContext = 'PROBLISTREV';
      mainSearchCriteriaDN = '(' + intervention.val() + ')';
    }

    var context = taskContext,
        term = mainSearchCriteriaDN,
        url = baseUrl;

    if (intervention.val() === intervention.attr('placeholder') &&
      patientProblem.val() === patientProblem.attr('placeholder') &&
      drugname.val() === drugname.attr('placeholder')) {
      term = '';
      context = '';
    }

    if (context && term) {
        url += encodeURIComponent(term) + '/';
        url += encodeURIComponent(context);
    }

    window.location = url + '?key=' + key;
    return false;
  });

  //Clear patient-problem and intervention on drug-name focus
  $('#wdgtDrug-name').focus(function(){
    $('#wdgtPatient-problem').val("");
    $('#wdgtIntervention').val("");
  });

  //Clear drug-name on patient-problem focus
  $('#wdgtPatient-problem').focus(function(){
    $('#wdgtDrug-name').val("");
  });

  //Clear drug-name on intervention focus
  $('#wdgtIntervention').focus(function(){
    $('#wdgtDrug-name').val("");
  });

  //Change the Quick Search inputs depending on the type of search selected.
  $('#quicksearch input[type="radio"]').click(function(){
    if ($('#rbtnClinicalInfo').is(':checked')) {
      $('#wdgtDrug-name').hide();
      $('#wdgtPatient-problem').show();
      $('#wdgtIntervention').show();
    } else if ($('#rbtnDrugInfo').is(':checked')) {
      $('#wdgtPatient-problem').hide();
      $('#wdgtIntervention').hide();
      $('#wdgtDrug-name').show();
    }
  });

  $('#widget').show();
});
})(jQuery);
;