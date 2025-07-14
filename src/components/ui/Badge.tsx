import React from 'react';

const Badge = ({children} : {children: React.ReactNode}) => {
    return (
        <div>
            <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded text-nowrap border border-blue-100">
                {children}
            </span>
        </div>
    );
};

export default Badge;