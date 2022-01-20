export const GROUP_TYPE_A = 0;
export const GROUP_TYPE_B = 1;
export const GROUP_TYPE_NONE = 2;

const GROUP_TYPE_SUFFIX_A = 'experienced_editor';
const GROUP_TYPE_SUFFIX_B = 'new_editor';

const GROUP_TYPE_BANNER_HEADLINE_A = 'Was macht die Mitarbeit in den Wikis schwer?';
const GROUP_TYPE_BANNER_TEXT_A = 'Du bist gefragt: In welchem Bereich sollen <strong>technische Hürden</strong> abgebaut werden? ' +
	'Noch bis zum 6.&nbsp;Februar kannst du den neuen Themenschwerpunkt des Projekts Technische Wünsche wählen. ' +
	'16&nbsp;Optionen stehen dieses Jahr zur Wahl. Technikkenntnisse sind nicht erforderlich. ';

const GROUP_TYPE_BANNER_HEADLINE_B = 'Was macht die Mitarbeit in den Wikis schwer?';
const GROUP_TYPE_BANNER_TEXT_B = 'Egal, wie lang du schon dabei bist – deine Meinung ist gefragt: In welchem Bereich ' +
	'wünschst du dir <strong>technische Erleichterungen?</strong> Noch bis zum 6.&nbsp;Februar kannst du den neuen ' +
	'Themenschwerpunkt des Projekts Technische Wünsche wählen. ' +
	'16&nbsp;Optionen stehen dieses Jahr zur Wahl. Technikkenntnisse sind nicht erforderlich. ';

export function getGroupType() {
	const editCount = mw.config.get( 'wgUserEditCount' );
	const daysRegistered = Math.floor( ( Date.now() - mw.config.get( 'wgUserRegistration' ) ) / ( 1000 * 3600 * 24 ) );

	if ( editCount > 200 && daysRegistered >= 60 ) {
		return GROUP_TYPE_A;
	} else if ( editCount > 20 && editCount <= 200 && daysRegistered > 30 ) {
		return GROUP_TYPE_B;
	}

	return GROUP_TYPE_NONE;
}

export function getGroupTypeSuffix( groupType ) {
	if ( groupType === GROUP_TYPE_A ) {
		return GROUP_TYPE_SUFFIX_A;
	}

	if ( groupType === GROUP_TYPE_B ) {
		return GROUP_TYPE_SUFFIX_B;
	}

	return 'notype';
}

export function getGroupBannerHeadline( groupType ) {
	if ( groupType === GROUP_TYPE_A ) {
		return GROUP_TYPE_BANNER_HEADLINE_A;
	}

	if ( groupType === GROUP_TYPE_B ) {
		return GROUP_TYPE_BANNER_HEADLINE_B;
	}

	return '';
}

export function getGroupBannerText( groupType ) {
	if ( groupType === GROUP_TYPE_A ) {
		return GROUP_TYPE_BANNER_TEXT_A;
	}

	if ( groupType === GROUP_TYPE_B ) {
		return GROUP_TYPE_BANNER_TEXT_B;
	}

	return '';
}
