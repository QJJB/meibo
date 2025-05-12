export default function InputLabel({
    value,
    className = "",
    children,
    ...props
}) {
    return (
        <label
            {...props}
            className={
                `block text-xs mb-3 font-semibold tracking-tight text-[#868688] ` +
                className
            }
        >
            {value ? value : children}
        </label>
    );
}
