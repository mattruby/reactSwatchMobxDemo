/** @namespace Swatch */
(function () {
	"use strict";

	window.Swatch = {};

	Swatch.SwatchStore = function (swatchJSONData) {

		_.assign(this, swatchJSONData);

		// Actions that this store will listen to
		this.actions = {
			swatchSelected: new signals.Signal()
		};
		// Actions for others to listen to
		this.listenableActions = {
			swatchDataChanged: function () {
				var sig = new signals.Signal();
				sig.memorize = true;
				return sig;
			}()
		};

		this.actions.swatchSelected.add(this.setSelectedSwatch, this);

		this.listenableActions.swatchDataChanged.dispatch();
		
	};

	Swatch.SwatchStore.prototype.getSelectedSwatch = function () {
		return _.find(this.swatches, 'selected');
	};

	Swatch.SwatchStore.prototype.setSelectedSwatch = function (materialId) {
		this.getSelectedSwatch().selected = false;
		_.find(this.swatches, {materialId: materialId}).selected = true;
		this.listenableActions.swatchDataChanged.dispatch();
	};

}());