export default function Button({
	label,
	onClick,
	className,
	style,
	isLoading,
}) {
	return (
		<>
			<button
				onClick={onClick}
				className={`primary-button ${className}`}
				style={style}
				disabled={isLoading}
			>
				{label}
			</button>
		</>
	);
}
