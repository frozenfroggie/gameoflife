(function outerFn(event) {
    if(document.getElementById('loading')) {
        var el = document.getElementById('loading').innerHTML;
        setTimeout(function innerFn() {
            switch(el) {
                case 'Loading':
                case 'Loading.':
                case 'Loading..':
                    el += '.';
                    break;
                case 'Loading...':
                    el = 'Loading';
                    break;
            }
            if(document.getElementById('loading')) {
                document.getElementById('loading').innerHTML = el;
                outerFn();
            }
        }, 200);
    }
})();