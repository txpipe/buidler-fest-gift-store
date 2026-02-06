// Config
import { brandConfig } from '@/config/brand';

export default function Footer() {
	return (
		<footer className="bg-white border-t border-[#012347]">
			<div className="container mx-auto px-4 py-4 flex justify-between">
				<span className="font-abel tracking-widest text-lg lg:text-xl text-[#004289]">{brandConfig.business.name.toUpperCase()} #3</span>
				<span className="text-[#6D6D6D]">&copy; {new Date().getFullYear()} {brandConfig.business.name}</span>
			</div>
		</footer>
	);
}