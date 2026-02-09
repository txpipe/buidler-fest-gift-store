import { IconShoppingCart } from '@tabler/icons-react';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';

// Components
import { MiniCart } from '@/components/cart/MiniCart';

// Config
import { brandConfig } from '@/config/brand';

// Hooks
import { useCart } from '@/hooks/use-cart';

export default function Header() {
	const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);
	const { itemCount } = useCart();
	const { disableProductsPage, disableCartFlow } = brandConfig.features;

	return (
		<header className="sticky top-0 z-50 bg-white text-brand-primary shadow-xl border-b border-blue-500/30">
			<div className="container mx-auto px-4">
				<div className="flex items-center justify-between h-16">
					{/* Left: Logo + Nav */}
					<div className="flex items-center gap-6 lg:gap-8">
						{/* Logo/Brand */}
						<Link
							to="/"
							className="group flex items-center gap-2 lg:gap-3 text-lg lg:text-xl font-semibold text-brand-primary hover:opacity-20  transition-all duration-200"
						>
							<div className="flex gap-3">
								<span className="font-abel tracking-widest">{brandConfig.business.name.toUpperCase()} #3</span>
								<span className="w-0.5 self-stretch bg-brand-primary"></span>
								<span>Gift store</span>
							</div>
						</Link>

						{/* Desktop Navigation */}
						<nav className="hidden lg:flex items-center">
							{!disableProductsPage && (
								<Link
									to="/products"
									className="font-medium text-blue-100 hover:text-white transition-all duration-200 relative group"
								>
									Products
									<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-primary transition-all duration-200 group-hover:w-full"></span>
								</Link>
							)}
						</nav>
					</div>

					{/* Right: Cart */}
					<div className="flex items-center">
						<button
							type="button"
							onClick={() => {
								if (disableCartFlow) {
									return;
								}
								setIsMiniCartOpen(!isMiniCartOpen);
							}}
							className="group relative p-2 hover:bg-blue-800/30 rounded-lg transition-all duration-200"
							aria-label={`Shopping cart with ${itemCount} items`}
						>
							<IconShoppingCart size={20} className="text-brand-primary transition-colors duration-200" />
							{/* Animated Badge */}
							{itemCount > 0 && (
								<span className="absolute -top-1 -right-1 bg-linear-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full min-w-5 h-5 flex items-center justify-center px-1.5 shadow-md group-hover:shadow-lg transition-all duration-200">
									{itemCount > 99 ? '99+' : itemCount}
								</span>
							)}
						</button>

						{/* MiniCart Dropdown */}
						{!disableCartFlow && <MiniCart isOpen={isMiniCartOpen} onClose={() => setIsMiniCartOpen(false)} />}
					</div>
				</div>
			</div>
		</header>
	);
}
