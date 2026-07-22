import React, { memo } from "react";

function AppPage({

    title,

    extra,

    children,

}) {

    return (

        <div className="erp-page">

            {(title || extra) && (

                <div className="erp-page-header">

                    <div>

                        {title && (

                            <h2>{title}</h2>

                        )}

                    </div>

                    <div>

                        {extra}

                    </div>

                </div>

            )}

            <div className="erp-page-body">

                {children}

            </div>

        </div>

    );

}

export default memo(AppPage);