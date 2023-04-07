import React from 'react'

export default function Table({
    items,
    leftHeading,
    centerHeading,
    rightHeading,
    farRightHeading,
    renderLeftItem,
    renterCenterItem,
    renderRightItem,
    renderFarRightItem,
}) {
    return (
        <table>
            <thead>
                <th align="left">{leftHeading}</th>
                <th align="left">{centerHeading}</th>
                <th align="left">{rightHeading}</th>
                {!farRightHeading? null: <th align="left">{farRightHeading}</th>}
            </thead>
            <tbody>
                {items.map(function (item, index) {
                    return (
                        <tr key={index}>
                            <td align="left">{renderLeftItem(item)}</td>
                            <td align="left">{renterCenterItem(item)}</td>
                            <td align="left">{renderRightItem(item)}</td>
                            {!renderFarRightItem ? null : <td align="left">{renderFarRightItem(item)}</td>}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}