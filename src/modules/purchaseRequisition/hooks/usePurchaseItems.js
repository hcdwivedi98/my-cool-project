import { useMemo, useState } from "react";

function usePurchaseItems(initialItems = []) {

    const [items, setItems] = useState(initialItems);

    //-----------------------------------------------------
    // Add Item
    //-----------------------------------------------------

    function addItem(item) {

        setItems(prev => {

            const existing = prev.find(x =>

                x.itemCode === item.itemCode &&
                x.batchNo === item.batchNo

            );

            if (existing) {

                return prev.map(x =>

                    x.itemCode === item.itemCode &&
                        x.batchNo === item.batchNo

                        ? {
                            ...x,
                            qty: x.qty + 1,
                        }

                        : x

                );

            }

            return [

                ...prev,

                {
                    ...item,

                    qty: 1,

                    amount: item.purchaseRate,

                },

            ];

        });

    }

    //-----------------------------------------------------
    // Delete
    //-----------------------------------------------------

    function removeItem(id) {

        setItems(prev =>

            prev.filter(x => x.id !== id)

        );

    }

    //-----------------------------------------------------
// Update Qty
//-----------------------------------------------------

function updateQty(id, qty) {

    qty = Number(qty);

    if (isNaN(qty) || qty < 1) {

        qty = 1;

    }

    setItems(prev =>

        prev.map(item => {

            if (item.id !== id) {

                return item;

            }

            return {

                ...item,

                qty,

                amount: qty * item.purchaseRate,

            };

        })

    );

}

    //-----------------------------------------------------
    // Clear
    //-----------------------------------------------------

    function clearItems() {

        setItems([]);

    }

    //-----------------------------------------------------
    // Summary
    //-----------------------------------------------------

    const summary = useMemo(() => {

        const totalItems = items.length;

        const totalQty = items.reduce(

            (sum, x) => sum + x.qty,

            0

        );

        const subtotal = items.reduce(

            (sum, x) =>

                sum + x.amount,

            0

        );

        return {

            totalItems,

            totalQty,

            subtotal,

        };

    }, [items]);

    //-----------------------------------------------------

    return {

        items,

        addItem,

        removeItem,

        updateQty,

        clearItems,

        summary,

    };

}

export default usePurchaseItems;