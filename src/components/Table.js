import React from 'react'

export default function Table({
    items,
    leftHeading,
    centerHeading,
    rightHeading,
    renderLeftItem,
    renterCenterItem,
    renderRightItem,
}) {
    return (
        <table>
            <thead>
                <th align="left">{leftHeading}</th>
                <th align="left">{centerHeading}</th>
                <th align="left">{rightHeading}</th>
            </thead>
            <tbody>
                {items.map(function (item, index) {
                    return (
                        <tr key={index}>
                            <td align="left">{renderLeftItem(item)}</td>
                            <td align="left">{renterCenterItem(item)}</td>
                            <td align="left">{renderRightItem(item)}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}