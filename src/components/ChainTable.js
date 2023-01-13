import React from 'react'
import Table from './Table'

export default function ChainTable({ items }) {
    return (
        <Table
            items={items}
            leftHeading="Network"
            rightHeading="Chain ID"
            renderLeftItem={item => (
                <div style={{
                    display: "flex",
                    justifyContent: "flex-start center",
                }}>
                    <img
                        src={item.logo}
                        style={{
                            width: "25px",
                            marginRight: "10px",
                        }} />
                    <span>{item.network}</span>
                </div>
            )}
            renderRightItem={item => <span>{item.chainId}</span>}
        />
    )
}