interface Params {
	vehicleId: string;
}

export default function page({ params }: { params: Params }) {
	return <div>{params?.vehicleId}</div>;
}
