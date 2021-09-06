import axios from 'axios'
import React, { useContext , useState , useEffect} from 'react'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import { toast } from 'react-toastify'
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
            <div className = "ec-page">
                <h2>{EC.name}</h2>
                <h5>Description</h5>
                <p>{EC.description}</p>
                <div className = "ec-dates">
                    <span>Date Started: {new Date(Date.parse(EC.dateStarted)).toDateString()}</span>
                    <span>{(EC.onGoing) ?  "Date ended: This extracurricular is ongoing" : `Date ended: ${new Date(Date.parse(EC.dateEnded!)).toDateString()}`}</span>
                </div>

                <div className = "ec-references">
                    <h4>References:</h4>
                    {EC.references && EC.references.map(ref => {
                        return (
                        <div key={ref.name} className = "ec-reference-info">
                            <span>{ref.name}</span>
                            <span>{ref.email}</span>
                            <span>{ref.phoneNumber}</span>
                        </div>)
                    })}
                    {EC.references && EC.references.length === 0 && <h3>No references</h3>}
                </div>
                <button className = "ec-delete" onClick = {() => DeleteEC(EC, token, props.history.replace)}>Delete</button>
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

async function DeleteEC(EC: Extracurricular, token: string, redirect: Function) {
    try {
        await axios.delete(ROOT_URL + "/extracurriculars/" + EC._id, {headers: {user_auth_token: token}})
        redirect("/")
    }
    catch(err: any) {
        toast.error(err.response.data)
    }
}



export default ECpage