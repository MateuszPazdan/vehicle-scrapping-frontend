import { apiSlice } from '../services/apiSlice';

export interface Waste {
	id: number;
	name: string;
	pricePerKg: number;
}

export interface WasteBody {
	name: string;
	pricePerKg: number;
}

const wasteApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		createWaste: builder.mutation<Waste, WasteBody>({
			query: (waste) => ({
				url: '/wastes',
				method: 'POST',
				body: {
					name: waste.name,
					pricePerKg: Number(waste.pricePerKg),
				},
			}),
		}),
		retrieveWastes: builder.query<Waste[], void>({
			query: () => ({
				url: '/wastes',
				method: 'GET',
			}),
		}),
		deleteWaste: builder.mutation<void, number>({
			query: (id) => ({
				url: `/wastes/${id}`,
				method: 'DELETE',
			}),
		}),
		editWaste: builder.mutation<Waste, WasteBody & { id: number }>({
			query: ({ id, ...waste }) => ({
				url: `/wastes/${id}`,
				method: 'PATCH',
				body: {
					name: waste.name,
					pricePerKg: Number(waste.pricePerKg),
				},
			}),
		}),
	}),
});

export const {
	useCreateWasteMutation,
	useRetrieveWastesQuery,
	useDeleteWasteMutation,
    useEditWasteMutation,
} = wasteApiSlice;
