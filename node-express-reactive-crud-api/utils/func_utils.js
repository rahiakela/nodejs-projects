let getOne = (obj, what) => {
    if (typeof what === 'number' || what.indexOf('.') === -1)
        return obj[what];
    
    if (what.indexOf('.') != -1) {
        let parts = what.split('.');
        let value = obj;
        parts.forEach((idx) => value = value[idx]);

        return value;
    }
};

let get = (what) => {
    let argWhat = arguments;

    return function(obj) {
        if (argWhat.length > 1) {
            return _.map(argWhat, _.partial(getOne, obj));
        } else {
            return getOne(obj, what);
        }
    };
};

// Helper map function. This is how a curried function looks like:
let map = (fn) => {
    let curried = (val) => fn(val);

    curried.__type = 'map';  // custom parameter so our then function knows how to handle us

    return curried;
};

let filter = (filterFn) => {
    let fn = null;

    if (filterFn.length == 1) {
        fn = (val) => {
            if (filterFn(val)) {
                return val;
            }
            return null;
        };
    } else {
        fn = (val, done) => {
            filterFn(val, (err) => {
                if (err) {
                    return done(err);
                }
                return done();
            });
        };
    }

    fn.__type = 'filter';

    return fn;
};

let isNotEmpty = (v) => {

    if (v === false || v === 0 || v === '') 
        return true;

    return false;
};

module.exports = {
    get: get,
    map : map,
    filter: filter,
    isNotEmpty: isNotEmpty
};
