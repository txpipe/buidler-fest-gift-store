import { useQuery } from '@tanstack/react-query';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';

// Components
import { ProductCard } from '@/components/ProductCard';

// Config
import { brandConfig } from '@/config/brand';

// Hooks
import { useCart } from '@/hooks/use-cart';

// Lib
import { getFeaturedProducts } from '@/lib/products';
import { generateMetaTags } from '@/lib/seo';

export const Route = createFileRoute('/')({
	component: HomePage,
	head: () => {
		const metaTags = generateMetaTags();

		return {
			meta: metaTags,
		};
	},
});

function HeroComponent() {
	return (
		<section className="mb-8 sm:mb-16">
			<div className="container mx-auto flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-11.25 px-6 sm:px-0">
				<img
					src="/buidler-fest-horizontal.svg"
					alt={`${brandConfig.business.name} logo`}
					className="w-full max-w-90.75"
				/>
				<div className="w-full h-px sm:h-auto sm:w-px self-stretch bg-white/50 px- sm:my-1" />
				<p className="text-base text-white">
					<ul className="list-disc">
						<li>
							Register for the event and receive <span className="text-brand-accent">BuidlerCoins</span>
						</li>
						<li>Pick a gift and exchange your coins for it.</li>
						<li>Claim your physical gift at the event.</li>
					</ul>
				</p>
			</div>
		</section>
	);
}

function HomePage() {
	const { replaceWithItem, getItemQuantity } = useCart();
	const disableProductsPage = brandConfig.features.disableProductsPage;
	const disableCartFlow = brandConfig.features.disableCartFlow;
	const navigate = useNavigate();

	const {
		data: featuredProducts = [],
		isLoading,
		error,
	} = useQuery({
		queryKey: ['featured-products'],
		queryFn: getFeaturedProducts,
	});

	const handleAddToCart = async (product: Database.Product) => {
		await replaceWithItem(product.id, 1, product);
		if (disableCartFlow) {
			navigate({ to: '/checkout' });
		}
	};

	if (isLoading) {
		return (
			<div className="py-8 flex-1 bg-[#012347]">
				<HeroComponent />
				<section className="">
					<div className="container mx-auto px-6 sm:px-0">
						<div className="text-center text-white">Loading products...</div>
					</div>
				</section>
			</div>
		);
	}

	if (error) {
		return (
			<div className="py-8 flex-1 bg-[#012347]">
				<HeroComponent />
				<section className="">
					<div className="container mx-auto px-6 sm:px-0">
						<div className="text-center text-red-500">Failed to load products</div>
					</div>
				</section>
			</div>
		);
	}

	return (
		<div className="py-8 flex-1 bg-[#012347] flex flex-col justify-center">
			{/* Hero Section */}
			<HeroComponent />

			{/* Featured Products Section */}
			<section>
				<div className="container mx-auto px-6 sm:px-0">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{featuredProducts.map(product => (
							<ProductCard
								key={product.id}
								product={product}
								variant="simple"
								showAddToCart={true}
								onAddToCart={handleAddToCart}
								itemsInCart={getItemQuantity(product.id)}
								simpleAction={disableProductsPage ? 'select' : 'link'}
							/>
						))}
					</div>
					<p className="mt-4 text-sm italic text-white/50">*Images are for illustrative purposes only.</p>

					{!disableProductsPage && (
						<div className="text-center mt-12">
							<Link
								to="/products"
								className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
							>
								View All Products
							</Link>
						</div>
					)}
				</div>
			</section>
		</div>
	);
}
