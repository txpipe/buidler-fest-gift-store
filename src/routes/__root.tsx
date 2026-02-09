import '@fontsource-variable/inter';
import '@fontsource/abel';
import '@fontsource-variable/roboto-mono';
import { TanStackDevtools } from '@tanstack/react-devtools';
import type { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools';
import { createRootRouteWithContext, HeadContent, Scripts } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';

// Components
import Header from '@/components/Header';
import { CartProvider } from '@/contexts/CartContext';

// Helpers
import { generateMetaTags } from '@/lib/seo';

// Styles
import appCss from '@/styles.css?url';

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
}>()({
	head: () => {
		const metaTags = generateMetaTags();

		return {
			meta: [
				{
					charSet: 'utf-8',
				},
				{
					name: 'viewport',
					content: 'width=device-width, initial-scale=1',
				},
				...metaTags,
			],
			links: [
				{
					rel: 'stylesheet',
					href: appCss,
				},
				{
					rel: 'apple-touch-icon',
					sizes: '180x180',
					href: '/apple-touch-icon.png',
				},
				{
					rel: 'icon',
					type: 'image/svg+xml',
					sizes: 'any',
					href: '/favicon.svg',
				},
				{ rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
				{ rel: 'manifest', href: '/manifest.json', color: '#fffff' },
				{ rel: 'icon', href: '/favicon.ico' },
			],
		};
	},

	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body className="flex flex-col min-h-screen">
				<CartProvider>
					<Header />
					<main className="flex-1 flex flex-col">{children}</main>
					<TanStackDevtools
						config={{
							position: 'bottom-right',
						}}
						plugins={[
							{
								name: 'Tanstack Router',
								render: <TanStackRouterDevtoolsPanel />,
							},
							{
								name: 'React Query',
								render: <ReactQueryDevtoolsPanel />,
							},
						]}
					/>
					<Scripts />
				</CartProvider>
			</body>
		</html>
	);
}
