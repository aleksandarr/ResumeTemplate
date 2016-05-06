    
    var source = $('#resume-template').html();
    var template = Handlebars.compile(source);

    $.getJSON('resume.json', function(data) {

        $('.container').append(template(data));
        
    });

    $(document).on('click', '.open-modal, #close',  function(e) {

        e.preventDefault();
        console.log('clicked');
        $('#modal').toggleClass('active');
        var ModalContent = $('#modal #modal-content');
        var ModalHeading = '<h2>'+$(this).data('title')+'</h2>';
        var ModalText = '<p>'+$(this).data('text')+'</p>';

        ModalContent.html(ModalHeading+ModalText);

    })



