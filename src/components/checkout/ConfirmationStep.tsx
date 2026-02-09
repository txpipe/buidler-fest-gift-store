import { IconCheck } from '@tabler/icons-react';
import { memo } from 'react';

// Components
import { Button } from '@/components/ui/button';
// Lib
import { formatPriceSyncById } from '@/lib/unified-formatter';

interface ConfirmationStepProps {
	createdOrders: Database.Order[];
	error?: string | null;
	onRetry: () => void;
}

function ConfirmationStepComponent({ createdOrders, error, onRetry }: ConfirmationStepProps) {
	const hasOrders = createdOrders.length > 0;

	return (
		<div className="space-y-6 text-center">
			<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
				<IconCheck className="w-8 h-8 text-green-600" />
			</div>

			{error ? (
				<div className="space-y-4">
					<div className="p-4 bg-red-50 border border-red-200 rounded-lg text-left">
						<p className="text-red-800">{error}</p>
					</div>

					<Button onClick={onRetry} variant="outline" className="w-full">
						Try Again
					</Button>
				</div>
			) : (
				<div className="space-y-4">
					<p className="text-gray-600">Thank you for your order! Your payment has been processed successfully.</p>

					{hasOrders && (
						<div className="space-y-4 text-left">
							<h3 className="font-semibold">Order Details</h3>
							{createdOrders.map(order => (
								<div key={order.id} className="p-4 bg-gray-50 rounded-lg space-y-3">
									<div className="space-y-2 text-sm">
										<div className="flex justify-between">
											<span>Tx Hash:</span>
											{order.cardano_tx_hash ? (
												<a
													href={`${import.meta.env.VITE_EXPLORER_URL}/tx/${order.cardano_tx_hash}`}
													target="_blank"
													rel="noopener noreferrer"
												>
													{order.cardano_tx_hash}
												</a>
											) : (
												<span className="font-mono text-xs break-all">Not available</span>
											)}
										</div>
										<div className="flex justify-between">
											<span>Status:</span>
											<span className="text-green-600 font-medium">Paid</span>
										</div>
									</div>

									{order.order_items && order.order_items.length > 0 && (
										<div className="space-y-3">
											<h4 className="text-sm font-semibold">Items</h4>
											<div className="space-y-3">
												{order.order_items.map(item => {
													const primaryImage = item.products?.product_images?.[0]?.image_url;

													return (
														<div key={item.id} className="flex items-center gap-3 rounded-lg bg-white p-3">
															<div className="h-14 w-14 shrink-0 overflow-hidden rounded-md bg-gray-800">
																{primaryImage ? (
																	<img
																		src={primaryImage}
																		alt={item.products?.name ?? 'Product image'}
																		className="h-full w-full object-cover"
																	/>
																) : (
																	<div className="flex h-full w-full items-center justify-center">
																		<span className="text-xs text-gray-400">No image</span>
																	</div>
																)}
															</div>

															<div className="min-w-0 flex-1">
																<p className="text-sm font-medium text-gray-900 truncate">
																	{item.products?.name ?? 'Item'}
																</p>
																<p className="text-xs text-gray-500">Qty: {item.quantity}</p>
															</div>

															<div className="text-right text-sm font-medium text-gray-700">
																{formatPriceSyncById(item.price * item.quantity, item.token_id ?? order.token_id, {
																	supportedToken: order.supported_tokens ?? item.supported_tokens ?? undefined,
																})}
															</div>
														</div>
													);
												})}
											</div>
										</div>
									)}
								</div>
							))}
						</div>
					)}

					{!hasOrders && (
						<div className="p-4 bg-gray-50 rounded-lg text-left">
							<h3 className="font-semibold mb-3">Order Details</h3>
							<p className="text-sm text-gray-600">We could not load your order details. Please try again.</p>
						</div>
					)}
				</div>
			)}
		</div>
	);
}

export const ConfirmationStep = memo(ConfirmationStepComponent);
