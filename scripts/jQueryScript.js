// $(document).ready(function(){
//     alert("jquery loaded");
// });

$(document).ready(function(){

  $('#demo').inputpicker({
    data:[
      {name:"Body Kit", cost:"5000", price:"5500"},
      {name:"Spoilers", cost:"2500", price:"3000"},
      {name:"Enhanced Film", cost:"1000", price:"1300"},
      {name:"Leather Interior", cost:"6000", price:"6500"},
      {name:"Golden Plates", cost:"9000", price:"9500"},
    ],
    fields:[
      {name:'name',text:'Name'},
      {name:'cost',text:'Cost'},
      {name:'price',text:'Price'}
    ],
    headShow: true,
    fieldText : 'name',
    fieldValue: 'cost',
    multiple: true,
    highlightResult: true,
  });
});