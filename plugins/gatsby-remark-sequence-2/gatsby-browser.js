exports.onInitialClientRender = (n, options) => {
    // console.info(`options: ${options}`)
    // see https://developer.mozilla.org/en-US/docs/Web/API/HTMLScriptElement
    // https://www.html5rocks.com/en/tutorials/speed/script-loading/
    var importScript = (function (oHead) {
        function loadError(oError) {
            throw new URIError('The script ' + oError.target.src + ' is not accessible.');
        }

        return function (sSrc, fOnload) {
            var oScript = document.createElement('script');
            oScript.type = 'text\/javascript';
            oScript.onerror = loadError;
            if (fOnload) {
                oScript.onload = fOnload;
            }
            oHead.appendChild(oScript);
            oScript.src = sSrc;
        };
    })(document.head || document.getElementsByTagName('head')[0]);

    importScript('https://bramp.github.io/js-sequence-diagrams/js/webfont.js', function () {
        importScript('https://bramp.github.io/js-sequence-diagrams/js/snap.svg-min.js', function () {
            importScript('https://bramp.github.io/js-sequence-diagrams/js/underscore-min.js', function () {
                importScript('https://bramp.github.io/js-sequence-diagrams/js/sequence-diagram-min.js', function () {
                    var sequenceElements = document.getElementsByClassName('sequence');
                    var sequenceElementsCount = sequenceElements.length;
                    for (var i = 0; i < sequenceElementsCount; i++) {
                        var diagram = Diagram.parse(sequenceElements[i].childNodes[0].nodeValue);
                        sequenceElements[i].childNodes[0].nodeValue = '';
                        diagram.drawSVG(sequenceElements[i], options);
                    }
                });
            });
        });
    });
};
