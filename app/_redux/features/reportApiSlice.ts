import { apiSlice } from '../services/apiSlice';

const reportApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		generateStorageStatusReport: builder.mutation({
			query: () => ({
				url: '/storages/status',
				method: 'GET',
				responseHandler: async (response) => {
					if (response.status !== 200) {
						throw new Error('Wystąpił błąd przy generowaniu raportu.');
					}
					const blob = await response.blob();
					const url = window.URL.createObjectURL(blob);
					const link = document.createElement('a');
					link.href = url;
					link.download = `test.pdf`;
					document.body.appendChild(link);
					link.click();
					link.remove();

					return true;
				},
			}),
		}),
	}),
});

export const { useGenerateStorageStatusReportMutation } = reportApiSlice;
