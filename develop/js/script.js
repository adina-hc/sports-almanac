// Initialize MaterializeCss
/*  $(document).ready(function(){
    $('select').formSelect();
  });
  */
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var option = document.querySelectorAll('option');
    var instances = M.FormSelect.init(elems, option);
  });

   