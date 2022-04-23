import React, { useEffect, useState } from 'react'
import styles from './cases.module.css'
import { useFetchData } from '../hooks/fetchData'
import axios from 'axios'

export default function Main(props) {
    const { selected, data } = props

    const cases = data[selected].All
    console.log(cases)
    const totals = {
        confirmed: cases.confirmed,
        recovered: cases.confirmed - cases.deaths,
        deaths: cases.deaths
    }

    const max = Math.max(...Object.values(totals))

    return (
        <>
            <div className={styles.graph}>
                {[1, 2, 3, 4, 5].map(val => {
                    return <div style={{ top: `${val * 20 - 20}%` }} className={styles.gridLines} key={val}>
                        <p className={styles.values}>{((6 - val) * 20 * max / 100).toFixed(0)}</p>
                    </div>
                })}
                {Object.keys(totals).map((val, index) => {
                    return <div key={index}
                        className={`${styles.bar} ${styles[`bar${index}`]}`} style={{ height: `${(totals[val] / max) * 100}%` }}>
                        <p className={styles.barLabels}>{val}</p>
                    </div>
                })}
            </div>
            <div className={styles.countryInfo}>
                {Object.keys(cases).map((val, index) => {
                    return <div key={index} className={styles.info}>
                        <p>
                            {val.replaceAll('_', " ")}:
                        </p>
                        <p>
                            {cases[val]}
                        </p>
                    </div>
                })}
            </div>
        </>
    )
}
