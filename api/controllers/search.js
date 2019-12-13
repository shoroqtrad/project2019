
const stores = require("../models/stores");
const mongoose = require("mongoose");


   // to sell books
  exports.search=(req, res, next)=>{
	var q = req.query.q;

	// FULL TEXT SEARCH USING $text

	// stores.find({
	// 	$text: {
	// 		$search: q
	// 	}
	// }, {
	// 	_id: 0,
	// 	__v: 0
	// }, function (err, data) {
	// 	res.json(data);
	// });

	// PARTIAL TEXT SEARCH USING REGEX

	stores.find({
		storeName: {
			$regex: new RegExp(q)
		}
	}, {
		_id: 0,
		__v: 0
	}, function (err, data) {
		res.json(data);
	}).limit(20);

};