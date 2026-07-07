import { InputHTMLAttributes } from 'react';

export default function Checkbox({
    className = '',
    ...props
}: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-gray-300 text-[#0F5132] shadow-sm focus:ring-[#0F5132] dark:border-gray-700 dark:bg-gray-900 dark:focus:ring-[#0F5132] dark:focus:ring-offset-gray-800 ' +
                className
            }
        />
    );
}
