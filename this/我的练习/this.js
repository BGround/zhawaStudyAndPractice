const fun = function() {
    console.log(this);
}

fun();

fun.apply({a:1})