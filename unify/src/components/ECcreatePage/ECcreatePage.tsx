import React, { useContext } from 'react'
import { Redirect, RouteComponentProps } from 'react-router-dom';
import tokenContext from '../../contexts/tokenContext';
import { ExtracurricularSubmission } from '../@types';
import axios from 'axios';
import ECcreateForm from "./ECcreateForm"
import { toast } from 'react-toastify';

const ROOT_URL = process.env.REACT_APP_root_url


const ECcreatePage = (props: RouteComponentProps) => {
    const { token }= useContext(tokenContext)

    if (!token) return <Redirect to ="/login" />

    else return (
        <div className = "ec-create-page-wrapper">
            <ECcreateForm onSubmit = {(EC: ExtracurricularSubmission) => {SubmitEC(EC, token, props.history.replace)}}/>
        </div>
    )


}


async function SubmitEC(EC: ExtracurricularSubmission, token: string, redirect: (path: string) => void): Promise<void> {
    try {
        console.log(EC)
        await axios.post(ROOT_URL + "/extracurriculars", EC, {headers: {user_auth_token: token}})
        redirect("/")
    }
    catch(err) {toast.error("There was an error uploading your extracurricular")}
}



export default ECcreatePage