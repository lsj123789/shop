(function(win) {
    var doc = win.document;//取到document对象
    var docEl = doc.documentElement;//取到html
    var tid;

    function refreshRem() {//封装一个函数
        var width = docEl.getBoundingClientRect().width;//获取屏幕宽度
        var rem = width / 6.4; // 将屏幕宽度分成6.4份， 1份为1rem
        docEl.style.fontSize = rem + 'px';
        // console.log(0.14*rem);
    }

    win.addEventListener('resize', function() {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 10);
    }, false);
    win.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 10);
        }
    }, false);

    refreshRem();

})(window);