import JoinForm from "./JoinForm";

export default async function Home() {
	return (
		<div className="relative h-screen w-screen overflow-x-hidden overflow-y-auto">
			<main className="p-8">
				<h1 className="w-fit text-5xl mx-auto max-sm:text-4xl">Scribble Clone</h1>
				<JoinForm />
			</main>

			<img
				src="https://api.dicebear.com/7.x/big-smile/svg"
				alt=""
				className="block absolute bottom-0 left-0 h-64 w-64 -rotate-12 -z-10 max-md:h-40 max-md:w-40"
			/>
			<img
				src="https://api.dicebear.com/7.x/big-smile/svg?seed=jake&flip=true"
				alt=""
				className="block absolute bottom-0 right-0 h-64 w-64 rotate-12 -z-10 max-md:w-40"
			/>
		</div>
	);
}
