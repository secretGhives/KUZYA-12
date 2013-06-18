(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelRequestAnimationFrame = window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() {
            callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };

    if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
    };
}())

var layers = [],
    objects = [],
    textures = [],

    world = document.getElementById('world'),
    viewport = document.getElementById('viewport'),

    d = 0,
    p = 400,
    worldXAngle = 0,
    worldYAngle = 0,
    computedWeights = [];


viewport.style.webkitPerspective = p;
viewport.style.MozPerspective = p + 'px';
viewport.style.oPerspective = p;

textures = [
    {
    name: 'white cloud',
    file: 'http://www.clicktorelease.com/code/css3dclouds/cloud.png',
    opacity: 1,
    weight: 0}
];


setTextureUsage(0, 'Lot');
generate();


function setTextureUsage(id, mode) {
    var modes = ['None', 'Few', 'Normal', 'Lot'];
    var weights = {
        'None': 0,
        'Few': .3,
        'Normal': .7,
        'Lot': 1
    };
    for (var j = 0; j < modes.length; j++) {
        if (modes[j] == mode) {
            textures[id].weight = weights[mode];
        }
    }
}


function createCloud() {

    var div = document.createElement('div');
    div.className = 'cloudBase';
    var x = 256 - (Math.random() * 512);
    var y = 256 - (Math.random() * 512);
    var z = 256 - (Math.random() * 512);
    var t = 'translateX( ' + x + 'px ) translateY( ' + y + 'px ) translateZ( ' + z + 'px )';
    div.style.webkitTransform = t;
    div.style.MozTransform = t;
    div.style.oTransform = t;
    world.appendChild(div);

    for (var j = 0; j < 5 + Math.round(Math.random() * 10); j++) {
        var cloud = document.createElement('img');
        cloud.style.opacity = 0;
        var r = Math.random();
        var src = 'troll.png';
        for (var k = 0; k < computedWeights.length; k++) {
            if (r >= computedWeights[k].min && r <= computedWeights[k].max) {
                (function(img) {
                    img.addEventListener('load', function() {
                        img.style.opacity = .8;
                    })
                })(cloud);
                src = computedWeights[k].src;
            }
        }
        cloud.setAttribute('src', src);
        cloud.className = 'cloudLayer';

        var x = 256 - (Math.random() * 512);
        var y = 256 - (Math.random() * 512);
        var z = 100 - (Math.random() * 200);
        var a = Math.random() * 360;
        var s = .25 + Math.random();
        x *= .2;
        y *= .2;
        cloud.data = {
            x: x,
            y: y,
            z: z,
            a: a,
            s: s,
            speed: .1 * Math.random()
        };
        var t = 'translateX( ' + x + 'px ) translateY( ' + y + 'px ) translateZ( ' + z + 'px ) rotateZ( ' + a + 'deg ) scale( ' + s + ' )';
        cloud.style.webkitTransform = t;
        cloud.style.MozTransform = t;
        cloud.style.oTransform = t;

        div.appendChild(cloud);
        layers.push(cloud);
    }

    return div;
}


function generate() {
    objects = [];
    if (world.hasChildNodes()) {
        while (world.childNodes.length >= 1) {
            world.removeChild(world.firstChild);
        }
    }
    computedWeights = [];
    var total = 0;
    for (var j = 0; j < textures.length; j++) {
        if (textures[j].weight > 0) {
            total += textures[j].weight;
        }
    }
    var accum = 0;
    for (var j = 0; j < textures.length; j++) {
        if (textures[j].weight > 0) {
            var w = textures[j].weight / total;
            computedWeights.push({
                src: textures[j].file,
                min: accum,
                max: accum + w
            });
            accum += w;
        }
    }
    for (var j = 0; j < 5; j++) {
        objects.push(createCloud());
    }
}



function update() {

    for (var j = 0; j < layers.length; j++) {
        var layer = layers[j];
        layer.data.a += layer.data.speed;
        var t = 'translateX( ' + layer.data.x + 'px ) translateY( ' + layer.data.y + 'px ) translateZ( ' + layer.data.z + 'px ) rotateY( ' + (-worldYAngle) + 'deg ) rotateX( ' + (-worldXAngle) + 'deg ) rotateZ( ' + layer.data.a + 'deg ) scale( ' + layer.data.s + ')';
        layer.style.webkitTransform = t;
        layer.style.MozTransform = t;
        layer.style.oTransform = t;
        //layer.style.webkitFilter = 'blur(5px)';
    }

    requestAnimationFrame(update);

}

update();​