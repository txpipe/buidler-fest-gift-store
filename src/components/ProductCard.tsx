import { IconShoppingCart } from '@tabler/icons-react';
import { Link } from '@tanstack/react-router';

// Config
import { brandConfig } from '@/config/brand';

// Lib
import { formatPriceSyncById } from '@/lib/unified-formatter';

export interface ProductCardProps {
	product: Database.Product;
	variant?: 'simple' | 'detailed';
	showAddToCart?: boolean;
	onAddToCart?: (product: Database.Product) => void | Promise<void>;
	itemsInCart?: number;
	simpleAction?: 'link' | 'select';
}

export function ProductCard({
	product,
	variant = 'simple',
	showAddToCart = false,
	onAddToCart,
	itemsInCart = 0,
	simpleAction = 'link',
}: ProductCardProps) {
	const handleAddToCart = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		void onAddToCart?.(product);
	};

	const priceString = formatPriceSyncById(product.price, product.token_id, {
		supportedToken: product.supported_tokens,
	});

	// Get first product image or fallback to emoji
	const productImage =
		product.product_images && product.product_images.length > 0
			? product.product_images.sort((a, b) => a.display_order - b.display_order)[0].image_url
			: '🛍️';

	const isInStock = product.stock > 0;
	const isOutOfStock = product.stock === 0;
	const isSelectAction = variant === 'simple' && simpleAction === 'select';
	const isSelectDisabled = isOutOfStock || itemsInCart >= product.stock;
	const isDetailDisabled = brandConfig.features.disableProductDetailPage;

	const cardContent = (
		<div className="border rounded-3xl p-6 hover:shadow-lg transition-shadow duration-300 bg-white/12 border-white/25">
			{/* Product Image */}
			<div className="w-full aspect-[1.1] bg-gray-100 rounded-3xl mb-8 flex items-center justify-center group-hover:bg-gray-50 transition-colors overflow-hidden">
				{productImage.startsWith('http') ? (
					<img
						src={productImage}
						alt={product.product_images?.[0]?.alt_text || product.name}
						className="w-full h-full object-cover"
					/>
				) : (
					<div className="text-center">
						<div className="text-5xl mb-2">{productImage}</div>
					</div>
				)}
			</div>

			{/* Product Info */}
			<h3 className="font-semibold text-2xl mb-2 text-white transition-colors">{product.name}</h3>
			{/* 
			{product.description && <p className="text-white/80 mb-5 line-clamp-2">{product.description}</p>} */}

			{variant === 'detailed' && (
				<>
					{/* Price and Stock */}
					<div className="flex justify-between items-center mb-3">
						<span className="font-bold text-lg text-white">{priceString}</span>
						<span className={`text-xs font-medium ${isInStock ? 'text-green-600' : 'text-red-600'}`}>
							{isInStock ? `${product.stock} in stock` : 'Out of stock'}
						</span>
					</div>
				</>
			)}

			{variant === 'simple' && (
				<div className="flex justify-between items-center">
					<span className="font-abel font-semibold text-[#FEED7B]">{priceString}</span>
					{isSelectAction ? (
						<button
							type="button"
							onClick={handleAddToCart}
							disabled={isSelectDisabled}
							// /* background: linear-gradient(95.17deg, #3280D4 14.86%, #8EC4FF 151.92%); */
							className="px-5 py-2 bg-linear-95 from-[#3280D4] from-15% to-[#8EC4FF] to-151% rounded-full text-white hover:text-white/70 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed font-mono"
						>
							SELECT
						</button>
					) : (
						<span className="px-3 py-1 bg-primary rounded text-white transition-colors text-sm">View</span>
					)}
				</div>
			)}

			{variant === 'detailed' && showAddToCart && (
				<button
					type="button"
					onClick={handleAddToCart}
					className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
					disabled={isOutOfStock || itemsInCart >= product.stock}
				>
					<IconShoppingCart size={18} className="mr-2" />
					{isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
				</button>
			)}
		</div>
	);

	if (isDetailDisabled) {
		return <div className="group">{cardContent}</div>;
	}

	return (
		<Link to="/product/$productId" params={{ productId: product.id }} className="group">
			{cardContent}
		</Link>
	);
}
