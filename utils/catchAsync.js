// const catchAsync = function (fnc) {
//     return function (req, res, next) {
//         fnc(req, res, next).catch(e => next(e));
//     }
// }

module.exports = func => {
    return (req, res, next) => {
        func(req, res, next).catch(e => next(e));
    }
}

// module.exports = catchAsync;