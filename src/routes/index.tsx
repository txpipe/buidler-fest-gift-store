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
		<section>
			<div className="container mx-auto text-center">
				<img src="/buidler-shop.svg" alt={`${brandConfig.business.name} logo`} className="mx-auto w-67.5 h-62.75" />
				<p className="text-base text-white mt-6">
					Select the <span className="text-brand-accent">gift</span> you'd like to redeem using your{' '}
					<span className="text-brand-accent">tokens.</span>
					<br />
					Once selected, your item will be reserved and available for pickup at the event.
				</p>
			</div>
		</section>
	);
}

function HomePage() {
	const { addItem, getItemQuantity } = useCart();
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

	const handleAddToCart = (product: Database.Product) => {
		addItem(product.id, 1, product);
		if (disableCartFlow) {
			navigate({ to: '/checkout' });
		}
	};

	if (isLoading) {
		return (
			<div className="min-h-screen bg-[#012347] py-14">
				<HeroComponent />
				<section className="mt-14 mb-3.5">
					<div className="container mx-auto px-4">
						<div className="text-center text-white">Loading products...</div>
					</div>
				</section>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen bg-[#012347] py-14">
				<HeroComponent />
				<section className="mt-14 mb-3.5">
					<div className="container mx-auto px-4">
						<div className="text-center text-red-500">Failed to load products</div>
					</div>
				</section>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-[#012347] py-14">
			{/* Hero Section */}
			<HeroComponent />

			{/* Featured Products Section */}
			<section className="mt-14 mb-3.5">
				<div className="container mx-auto px-4">
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
