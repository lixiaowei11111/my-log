import React, { useState, ReactNode, ErrorInfo } from "react";

type ErrorBoundaryProps = {
	children: ReactNode;
};

function ErrorBoundary({ children }: ErrorBoundaryProps) {
	const [hasError, setHasError] = useState(false);

	const handleCatchError = (error: Error, errorInfo: ErrorInfo) => {
		// 可以在这里记录错误信息或将其发送给日志记录服务
		console.error("Error:", error);
		console.error("Error Info:", errorInfo);
		setHasError(true);
	};

	if (hasError) {
		// 当发生错误时渲染错误界面
		return (
			<div>
				<h1>Oops! Something went wrong.</h1>
				<p>Please try again later.</p>
			</div>
		);
	}

	// 如果没有错误，则正常渲染子组件
	return (
		<>
			{React.Children.map(children, child =>
				React.cloneElement(child as React.ReactElement<any>, {
					onError: handleCatchError,
				}),
			)}
		</>
	);
}

export default ErrorBoundary;
