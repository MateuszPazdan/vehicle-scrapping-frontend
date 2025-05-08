import { apiSlice } from '../services/apiSlice';

export type VehicleStatus = 'RECEIVED_FOR_DISMANTLING' | 'DISMANTLED';

export interface VehicleFilters {
	brand?: string;
	model?: string;
	year_of_production?: number;
	vin?: string;
	registration_number?: string;
	vehicle_status?: VehicleStatus | string;
	owner_pesel?: string;
}

export interface Vehicle {
	id: number;
	brand: string;
	model: string;
	year_of_production: number;
	vin: string;
	registration_number: string;
	registration_certificate_number: string;
	weight: number;
	status: VehicleStatus;
	receivedAt: string;
	dismantledAt: string | null;
	price: number;
}

const vehiclesApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		retrieveVehicles: builder.query<Vehicle[], VehicleFilters>({
			query: (filters) => ({
				url: '/vehicles',
				method: 'GET',
				params: filters,
			}),
		}),
		retrieveFiltersInfo: builder.query<
			{ brands: string[]; models: string[] },
			{ brand?: string }
		>({
			query: (params) => ({
				url: `vehicles/filter_input?brand=${params?.brand}`,
				method: 'GET',
			}),
		}),
	}),
});

export const { useRetrieveVehiclesQuery, useRetrieveFiltersInfoQuery } =
	vehiclesApiSlice;
