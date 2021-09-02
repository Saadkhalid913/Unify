import axios from 'axios'
import React, { useContext , useState , useEffect} from 'react'

import { Redirect, RouteComponentProps } from 'react-router-dom'
import tokenContext from '../../contexts/tokenContext'
import { Extracurricular } from '../@types'

const ROOT_URL = process.env.REACT_APP_root_url

const ECpage = (props: RouteComponentProps) => {
    // @ts-ignore
    const ECID = props.match.params.id
    const { token } = useContext(tokenContext)

    const [EC, SetEC] = useState<Extracurricular>()
    useEffect(() => {
        getECData(token, ECID).then(data => SetEC(data))
    }, [SetEC, token, ECID])

    if (!token) return <Redirect to ="/login" />
    if (!EC) return <div>No EC Found</div>
    else return (
        <div className = "ec-page-wrapper">
            <div className = "ec-heading-wrapper">
                <h2>{EC.name}</h2>
                <p>{EC.description}</p>
            </div>

        </div>
    )
}


async function getECData(token: String, ID: string) : Promise<Extracurricular | undefined> {
    try {
        const { data : ECData } = await axios.get(ROOT_URL + "/extracurriculars/" + ID, {headers: {user_auth_token: token}})
        return ECData
    }
    catch(err) {
        return undefined
    }
}


export default ECpage