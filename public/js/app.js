    

     Handlebars.getTemplate = function(name) {
        if (Handlebars.templates === undefined || Handlebars.templates[name] === undefined) {
            $.ajax({
                url : 'js/Handlebars-templates/' + name + '.handlebars',
                success : function(data) {
                    if (Handlebars.templates === undefined) {
                        Handlebars.templates = {};
                    }
                    Handlebars.templates[name] = Handlebars.compile(data);
                },
                async : false
            });
        }
        return Handlebars.templates[name];
    };

    var template = Handlebars.getTemplate("resume");

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



