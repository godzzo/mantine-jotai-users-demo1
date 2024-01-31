import { Button, Stack } from '@mantine/core';
import { Component, ErrorInfo, ReactNode, createElement } from 'react';

interface ErrorBoundaryProps {
	fallback: (props: { error: Error; errorInfo: ErrorInfo }) => JSX.Element;
	children: ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
	error: Error;
	errorInfo: ErrorInfo;
}

export class ErrorBoundary extends Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	constructor(props: ErrorBoundaryProps) {
		super(props);

		this.state = {
			hasError: false,
			error: null as any,
			errorInfo: null as any,
		};
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error('Error caught by ErrorBoundary:', error, errorInfo);

		this.setState({ hasError: true, error, errorInfo });
	}

	render() {
		if (this.state.hasError) {
			const show = createElement(
				this.props.fallback,
				{ ...this.state },
				null
			);

			return (
				<Stack>
					<Button
						variant="light"
						color="red"
						onClick={() => {
							this.setState({ hasError: false });
						}}
					>
						Rerender
					</Button>
					{show}
				</Stack>
			);
		}

		return this.props.children;
	}
}

export function ShowError({
	error,
	errorInfo,
}: {
	error: Error;
	errorInfo: ErrorInfo;
}) {
	return (
		<div>
			<h2>Something went wrong.</h2>

			<details>
				<summary>Details</summary>
				{error.toString()}
				<br />
				{errorInfo.componentStack}
			</details>
		</div>
	);
}
