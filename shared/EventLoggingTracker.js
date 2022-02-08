export class EventLoggingTracker {

	constructor( bannerName, impressionCounter, userIdFunction ) {
		this.bannerName = bannerName;
		this.impressionCounter = impressionCounter;
		this.getUserId = userIdFunction || function () {
			return mw.user.getId();
		};
	}

	/**
	 * Track a click event on a given element
	 *
	 * @param {Object} trackedElement The html element to bind the click event to
	 * @param {string} actionName Name of the action to be tracked
	 * @param {number} trackRatio The probability of the event being tracked (between 0 and 1)
	 */
	bindClickEvent( trackedElement, actionName, trackRatio ) {
		trackedElement.addEventListener(
			'click',
			this.createTrackHandler( actionName, trackRatio )
		);
	}

	/**
	 * Generate a tracking function
	 *
	 * @param {string} actionName Name of the action to be tracked
	 * @param {number} trackingRatio The probability of the event being tracked (between 0 and 1)
	 * @return {Function}
	 */
	createTrackHandler( actionName, trackingRatio ) {
		if ( typeof trackingRatio === 'undefined' ) {
			trackingRatio = 1;
		}

		return () => {
			if ( Math.random() < trackingRatio ) {
				mw.track( 'event.WMDEBannerInteractions', {
					bannerName: this.bannerName,
					bannerAction: actionName,
					bannerImpressions: this.impressionCounter.getImpressionCount(),
					userID: this.getUserId()
				} );
			}
		};
	}

	trackSeenEvent( trackingRatio ) {
		if ( Math.random() < trackingRatio ) {
			mw.track( 'event.WMDEBannerInteractions', {
				bannerName: this.bannerName,
				bannerAction: 'banner-seen',
				bannerImpressions: this.impressionCounter.getImpressionCount(),
				userID: this.getUserId()
			} );
		}
	}
}
