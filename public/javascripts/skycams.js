var Camholder = function(button) {
    this.root = $('<div>').addClass('camholder').appendTo($(document.body));
    this.camlist = [];

    var that = this;

    button.onclick = function() {
        that.refreshCams();
    };
}

Camholder.prototype.addCam = function(title, imageprovider) {
    this.camlist.push(new Cam(title, imageprovider,this.root));
}

Camholder.prototype.refreshCams = function() {
    for (i = 0; i < this.camlist.length; i++) {
        this.camlist[i].getImage();
    }
}

var Cam = function(name, imageprovider, container) {
    this.name = name;
    this.imageprovider = imageprovider;
    this.container = container;

    // create html elements
    this.root = $('<div>').addClass('cam').appendTo($(container));
    this.title = $('<div>').addClass('camtitle').html(name).appendTo(this.root);
    this.spinner = $('<img>').addClass('camspinner').attr('src', 'ref.gif').appendTo(this.root);
    this.camimg = $('<img>').addClass('camimage').appendTo(this.root);

    // get image
    this.getImage();

    var that = this;

    this.camimg.bind('load', function() {
        that.spinner.hide();
    })


}

Cam.prototype.getImage = function() {
    console.log("Getting image for cam " + this.name);
    this.spinner.show();
    var that = this;

    this.imageprovider.loadImage(function(image, error) {

        if (!error)
            that.camimg.attr('src', image);
        else
            console.log(error);
        that.spinner.hide();        
    });
}

var SimpleImageProvider = function(link) {
    this.link = link;
}

SimpleImageProvider.prototype.loadImage = function(done) {
    done(this.link);
}

var LinkedImageProvider = function(link) {
    this.link = link;
}


LinkedImageProvider.prototype.loadImage = function(done) {

    var that = this;
    $.ajax("./",{
        success: function(data, text) {
            if (data)
                done(data);
            else
                done(undefined, 'error loading ' + that.link);
        },
        error: function(jqXHR, text, error) {
            done(undefined, error);
        },
        method: "POST",
        data: { imgurl: that.link }
    });

}
