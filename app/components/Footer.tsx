'use client'
import React from 'react'
import {HeartFill} from 'react-bootstrap-icons'
import Link from 'next/link'


const Footer = () => {
    return (
        <div className={'footer'}>
            <small>Made with <HeartFill /> by <Link className={'madeBy'} href={'https://www.linkedin.com/in/stefanoesposito75'} target={'_blank'}><strong>Stefano Esposito</strong></Link></small>
        </div>
    )
}

export default Footer