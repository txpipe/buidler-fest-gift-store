export const brandConfig: BrandConfig = {
	seo: {
		title: 'Buidler Fest Shop',
		description: 'Exchange your buidler reward token for exclusive merchandise and collectibles.',
		keywords: ['buidlerfest', 'cardano', 'ada', 'crypto', 'shopping'],
		openGraph: {
			type: 'website',
			siteName: 'Buidler Fest Shop',
			locale: 'en_US',
			url: 'https://shop.buidlerfest.com',
		},
		twitterCard: {
			card: 'summary_large_image',
		},
	},
	contact: {
		email: 'hello@txpipe.io',
		social: {
			twitter: 'https://x.com/txpipe_tools',
		},
	},
	business: {
		name: 'TxPipe',
	},
	features: {
		enableShipping: false,
		disableProductsPage: true,
		disableProductDetailPage: true,
		disableCartFlow: true,
	},
};
