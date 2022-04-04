export default function shouldShowBanner() {
	
	var userGroups = mw.config.get( 'wgUserGroups' ); 
	userGroups = ['autoreview'];
	if ( userGroups !== null /*  logged in */
		&& (userGroups.indexOf("autoreview") > -1) ) { /* belongs to group "autoreview" */
		return true;
	}

	return false;
}
