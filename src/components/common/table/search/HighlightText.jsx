import React from "react";

function HighlightText({

    text = "",

    keyword = "",

}) {

    if (!keyword) {

        return text;

    }

    const lowerText = text.toString();

    const lowerKeyword = keyword.toLowerCase();

    const index = lowerText
        .toLowerCase()
        .indexOf(lowerKeyword);

    if (index === -1) {

        return text;

    }

    return (

        <>

            {lowerText.substring(0, index)}

            <mark>

                {

                    lowerText.substring(

                        index,

                        index + keyword.length

                    )

                }

            </mark>

            {

                lowerText.substring(

                    index + keyword.length

                )

            }

        </>

    );

}

export default React.memo(HighlightText);