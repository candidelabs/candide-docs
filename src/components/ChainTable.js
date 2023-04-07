import React from 'react'
import Table from './Table'

export default function ChainTable({ items }) {
    return (
        <Table
            items={items}
            leftHeading="Network"
            rightHeading="Gas Faucet"
            centerHeading="Chain ID"
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
            renderRightItem={item => <span>{item.faucet}</span>}
            renterCenterItem={item => <span>{item.chainId}</span>}
        />
    )
}

export function BundlerEndPointTable({ items }) {
    return (
        <Table
            items={items}
            leftHeading="Network"
            rightHeading="RPC address"
            centerHeading="Chain ID"
            farRightHeading="Provider"
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
            renderRightItem={item => <span>{item.address}</span>}
            renterCenterItem={item => <span>{item.chainId}</span>}
            renderFarRightItem={item => <span>{item.provider}</span>}
        />
    )
}