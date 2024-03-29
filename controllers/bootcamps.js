const Bootcamp = require('../models/Bootcamp');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc      get all bootcamps
// @route     GET /api/v1/bootcamps
// @access    Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
    const bootcamps = await Bootcamp.find();
    res.status(200).send({success: true, count: bootcamps.length, data: bootcamps});
});

// @desc      get single bootcamps
// @route     GET /api/v1/bootcamps/:id
// @access    Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if(!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404));
    }
    res.status(200).send({success: true, data: bootcamp});
});

// @desc      create new bootcamp
// @route     POST /api/v1/bootcamps
// @access    Public
exports.createBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.create(req.body);
    
    res.status(201).json({success: true, data: bootcamp});
});

// @desc      update bootcamp
// @route     PUT /api/v1/bootcamps/:id
// @access    Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    
    if(!bootcamp) return next(new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404));
    res.status(200).send({success: true, data: bootcamp});
});

// @desc      delete bootcamp
// @route     DELETE /api/v1/bootcamps/:id
// @access    Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    
    if(!bootcamp) return next(new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404));
    res.status(200).send({success: true, data: bootcamp});
});