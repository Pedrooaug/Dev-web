import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import FirebaseContext from "../../../utils/FirebaseContext";
import FirebaseStudentService from "../../../services/FirebaseStudentService";
import RestrictPage from "../../../utils/RestrictPage";

const ProfessorStudentPage = ({setShowToast,setToast}) =>
<FirebaseContext.Consumer>
    {
        (firebase) => {
            return (
                <RestrictPage isLogged={firebase.getUser()!=null}>
                    <CreateStudent 
                        firebase={firebase}
                        setShowToast={setShowToast}
                        setToast={setToast}/>
                </RestrictPage>
            )
        }
    }
</FirebaseContext.Consumer>

function CreateStudent(props) {

    const [name, setName] = useState("")
    const [course, setCourse] = useState("")
    const [ira, setIRA] = useState(0)
    const [validate,setValidate] = useState({name:'',university:'',degree:''})
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const validateFields = () => {
        let res = true
        setValidate({name:'',university:'',degree:''})

        if(name === '' || university === '' || degree === ''){
            props.setToast({header:'Erro!',body:'Preencha todos os campos.'})
            props.setShowToast(true)
            setLoading(false)
            res = false
            let validateObj = {name:'',university:'',degree:''}
            if(name === '') validateObj.name = 'is-invalid'
            if(course === '') validateObj.university = 'is-invalid'
            if(ira === '') validateObj.degree = 'is-invalid'
            console.log(university)
            setValidate(validateObj)
        }

    
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setLoading(true)
        if(!validateFields()) return
        const newStudent = { name, university, degree }

       FirebaseStudentService.create(
           props.firebase.getFirestoreDb(),
           ()=>{
            props.setToast({header:'Sucesso!',body:`Professor ${name} criado com sucesso.`})
            props.setShowToast(true)
            setLoading(false)
            navigate("/listProfessor")
           },
           newProfessor
       )

        
    }

    const renderSubmitButton = () => {
        if (loading) {
            return (
                <div style={{ paddingTop: 20 }}>
                    <button className="btn btn-primary" type="button" disabled>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        <span style={{ marginLeft: 10 }}>Carregando...</span>
                    </button>
                </div>
            )
        }
        return (
            <>
                <div className="form-group" style={{ paddingTop: 20 }}>
                    <input type="submit" value="Efetuar Cadastro" className="btn btn-primary" />
                </div>
            </>
        )
    }

    return (
        <>
            <main>
                <h2>
                    Criar Professor
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nome* </label>
                        <input type="text"
                            className={`form-control ${validate.name}`}
                            value={(name == null || name === undefined) ? "" : name}
                            name="name"
                            onChange={(event) => { setName(event.target.value) }} />
                    </div>
                    {renderSubmitButton()}
                </form>
            </main>
            <nav>
                <Link to="/">Home</Link>
            </nav>
        </>
    );
}

export default ProfessorStudentPage