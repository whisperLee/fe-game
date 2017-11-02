//主题js
function Request (m) {
    var sValue = location.search.match(new RegExp("[\?\&]" + m + "=([^\&]*)(\&?)", "i"));
    return sValue ? sValue[1] : sValue;
}
var main = {
	request:function (m) {
	    var sValue = location.search.match(new RegExp("[\?\&]" + m + "=([^\&]*)(\&?)", "i"));
	    return sValue ? sValue[1] : sValue;
	},
	ajax:function(data){
		var d = $.extend({},{
			url: "",
            data:{},
            contentType:"application/json",
            timeout: 5000,
            type:"POST",
            dataType: "json",
            success: function(){}
		},data); 
		d.data = JSON.stringify(d.data);
		// $.ajax({
		// 	url:d.url,
		// 	data:JSON.stringify(d.data),
		// 	contentType:d.contentType,
		// });
		$.ajax(d);

		 // var data = {prefabricateFlag: false};
   //      $.ajax({
            
   //          url: "http://liyn.me:8888/web-api/v1/game/play/getAllCombination",
   //          data:JSON.stringify(data),
   //          contentType:"application/json",
   //          timeout: 1000,
   //          type:"POST",
   //          dataType: "json",
   //          success: function(d) {
   //              console.log(JSON.stringify(d));
   //          }
   //      });
	}
}