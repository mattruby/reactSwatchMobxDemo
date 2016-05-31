/** @namespace Swatch */
(function () {
	"use strict";

	Swatch.ViewerFullRenderer = mobxReact.observer(function viewer_swatch (props) {

		return React.DOM.div({
				className: 'swatch-viewer'
			},
			// React.createElement(mobxDevtools.default),
			React.DOM.h1(null, props.store.title),
			React.createElement(Swatch.selectedSwatchRenderer, {
				selectedSwatch: props.store.selectedSwatch
			}),
			React.createElement(Swatch.swatchGroupRenderer, {
				swatches: props.store.swatches,
				setSelectedSwatch: props.setSelectedSwatch
			})
		);
	});

	Swatch.selectedSwatchRenderer = mobxReact.observer(function selectedSwatch_swatch (props) {

		var selectedSwatch = props.selectedSwatch;

		return React.DOM.div({
				className: 'selected-swatch-container'
			},
			React.DOM.img({
				height: 260,
				width: 260,
				alt: selectedSwatch.name,
				className: 'selected-swatch-image',
				src: selectedSwatch.image + '?wid=260&hei=260'
			}),

			React.DOM.strong({
				className: 'selected-swatch-name'
			}, selectedSwatch.name)
		);

	});

	Swatch.swatchGroupRenderer = mobxReact.observer(function swatchGroup_swatch (props) {

		return React.DOM.div({
				className: 'swatch-container'
			},
			props.swatches.map(function (swatch) {
				return React.createElement(Swatch.swatchThumbnailRenderer, {
					key: swatch.materialId,
					swatch: swatch,
					setSelectedSwatch: props.setSelectedSwatch
				});
			}, this)
		);
	});

	Swatch.swatchThumbnailRenderer = mobxReact.observer(function swatchThumbnail_swatch (props) {

		var swatch = props.swatch;

		swatchThumbnail_swatch.swatchClickHandler = function () {
			console.log('swatch id: ' + props.swatch.materialId);
			store.setSelectedSwatch(props.swatch.materialId);
		};

		var className = 'swatch' + (swatch.selected ? ' selected' : '');

		return React.DOM.div({
				className: className,
				key: swatch.materialId,
				onClick: swatchThumbnail_swatch.swatchClickHandler
			},
			React.DOM.img({
				height: 31,
				width: 31,
				alt: swatch.name,
				src: swatch.image + '?wid=31&hei=31'
			})
		);
	});

}());