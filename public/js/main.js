$(document).ready(function(){
    $('.delete-service').on('click', function(){
        var id = $(this).data('id');
        var url = '/delete/'+id;
        if(confirm('Are you sure that you want to delete the service?')){
            $.ajax({
                url: url,
                type: 'DELETE',
                success: function(result){
                    console.log('Deleting service...');
                    window.location.href='/';
                },
                error: function(err){
                    console.log(err);                    
                }
            })
        }
    })
});