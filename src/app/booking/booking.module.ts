export enum TRIP_TYPE{
	ONE_WAY='ONE_WAY',
	ROUND_TRIP='ROUND_TRIP'
}
export enum MEAL_PREFERENCE{
	VEG='VEG',
	NON_VEG='NON_VEG'
}
export interface Bookings{
	id?:string;
	pnr?:string;
	email:string;
	seatCount:number;
	tripType:TRIP_TYPE;
	mealPreference:MEAL_PREFERENCE;
	flightId:string;
	userIds:string[];
	seatNumbers:string[];
	totalAmount?:number;
}


	
	
