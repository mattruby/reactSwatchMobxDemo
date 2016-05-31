/** @namespace Swatch */
(function () {
	"use strict";

	window.Swatch = {};

	Swatch.SwatchStore = function (swatchJSONData) {

		this.title = swatchJSONData.title;

		mobx.extendObservable(this,
			{
				swatches: _.map(swatchJSONData.swatches, function (swatchData) {
					return new Swatch.SwatchModel(swatchData);
				}),
				selectedSwatch: function () {
					return _.find(this.swatches, 'selected');
				},
				setSelectedSwatch: function (materialId) {
					// Note the automatic transaction
					this.selectedSwatch.selected = false;
					_.find(this.swatches, {materialId: materialId}).selected = true;
				}
			});
	};

	Swatch.SwatchModel = function (swatchData) {
		_.assign(this, swatchData);
		mobx.extendObservable(this, {selected: swatchData.selected});
	}

}());