// $(document).ready(function(){
//     alert("jquery loaded");
// });

$(document).ready(function(){
    $('#addOnsForm').on('submit', function(event){
        event.preventDefault();
        $.ajax({
          url:"connections/addOnData.php",
          method:"POST",
          data:$(this).serialize(),
          dataType:"json",
          beforeSend: function() {
            $('#add').attr('disabled','disabled');
          },
          success:function(data){
            $('#add').attr('disabled', false);
            if(data.item) {
              var html = '<tr onclick="selection()">';
              html += '<td>'+data.item+'</td>';
              html += '<td>'+data.cost+'</td>';
              html += '<td>'+data.price+'</td>';
              html += '</tr>'
              $('#optionsTable').prepend(html);
              $('#addOnsForm')[0].reset();
            }
          }
        })
    });
    $("#optionsTable tr").click(function() {
      //alert("hello");
   });

});
