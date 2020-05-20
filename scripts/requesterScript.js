$("document").on('load',function(){
    $('#submitRequest').on('click',function(){
        var requestURL = $('#requestUrl').val();
        if($('#inputPayload').val() != ""){
            var requestPayload = JSON.parse($('#inputPayload').val());
        }
        $.ajax({
        url: requestURL,
        headers: { 
            "Accept":"application/json" , 
            "Content-Type":"application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
            },
        data: requestPayload,
        type: $('#requestMethod').val(),
        statusCode: {
            200: function(responseData){
                $('#responsePayload').text(JSON.stringify(responseData,undefined,4));
                $('#statusCode').text('200 OK');
            },
            201: function(responseData){
                $('#responsePayload').text(JSON.stringify(responseData.responseJSON,undefined,4));
                $('#statusCode').text('201 NO CONTENT');			
            },
            400: function(responseData){
                $('#responsePayload').text(JSON.stringify(responseData.responseJSON,undefined,4));
                $('#statusCode').text('400 BAD REQUEST');				
            },
            404: function(responseData){
                $('#responsePayload').text(JSON.stringify(responseData.responseJSON,undefined,4));
                $('#statusCode').text('404 NOT FOUND');				
            },
            405: function(responseData){
                $('#responsePayload').text(JSON.stringify(responseData.responseJSON,undefined,4));
                $('#statusCode').text('405 METHOD NOT ALLOWED');
            },
            500: function(responseData){
                $('#responsePayload').text(JSON.stringify(responseData.responseJSON,undefined,4));
                $('#statusCode').text('500 INTERNAL SERVER ERROR');
            }
        }
    });
    });
    $('#requestMethod').on('change',function(){
        if($('#requestMethod').val() == "GET"){
            $('#inputPayload').attr("disabled","true");
        }
        else{
            $('#inputPayload').removeAttr("disabled");
        }
    })
    $('#inputPayload').keyup(function(){
        $('#inputPayload').val(JSON.stringify(JSON.parse($('#inputPayload').val()),undefined,4));
    });
});