/** @namespace Swatch */
(function () {
	"use strict";

	window.Swatch = {};

	Swatch.SwatchStore = function (swatchJSONData) {
		// Actions that this store will listen to
		this.actions = {
			swatchSelected: new signals.Signal()
		};
		this.actions.swatchSelected.add(this.setSelectedSwatch, this);

		mobx.extendObservable(this,
			swatchJSONData,
			{
				selectedSwatch: function () {
					return _.find(this.swatches, 'selected');
				}
			});

	};

	Swatch.SwatchStore.prototype.setSelectedSwatch = function (materialId) {
		var self = this;
		mobx.transaction(function () {
			self.selectedSwatch.selected = false;
			_.find(self.swatches, {materialId: materialId}).selected = true;
		})
	};

}());