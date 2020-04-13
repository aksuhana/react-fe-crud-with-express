import React, {
    useState
} from "react";
import UserDataService from "../services/userService";

const AddUser = () => {
    const initialUserState = {

        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        is_user_verified: false,
        is_email_verified: false,
        is_phone_verified: false
    };
    const [user, setUser] = useState(initialUserState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        const {
            name,
            value
        } = event.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const saveUser = () => {
        console.log(user);
        var data = {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            phone: user.phone,
            is_user_verified: user.is_user_verified,
            is_email_verified: user.is_email_verified,
            is_phone_verified: user.is_phone_verified,

        };
        console.log(data);

        UserDataService.createUser(data)
            .then(response => {
                setUser({
                    id: response.data.id,
                    first_name: response.first_name,
                    last_name: response.last_name,
                    email: response.email,
                    phone: response.phone,
                    is_user_verified: response.is_user_verified,
                    is_email_verified: response.is_email_verified,
                    is_phone_verified: response.is_phone_verified,
                });
                setSubmitted(true);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newUser = () => {
        setUser(initialUserState);
        setSubmitted(false);
    };

    return ( <
        div className = "submit-form" > {
            submitted ? ( <
                div >
                <
                h4 > You submitted successfully! < /h4> <
                button className = "btn btn-success"
                onClick = {
                    newUser
                } >
                Add User <
                /button> <
                /div>
            ) : ( <
                div >
                <
                div className = "form-group" >
                <
                label htmlFor = "title" > First Name < /label> <
                input type = "text"
                className = "form-control"
                id = "fn"
                required value = {
                    user.first_name
                }
                onChange = {
                    handleInputChange
                }
                name = "first_name" /
                >
                <
                /div> <
                div className = "form-group" >
                <
                label htmlFor = "title" > Last Name < /label> <
                input type = "text"
                className = "form-control"
                id = "ln"
                required value = {
                    user.last_name
                }
                onChange = {
                    handleInputChange
                }
                name = "last_name" /
                >
                <
                /div> <
                div className = "form-group" >
                <
                label htmlFor = "title" > Email < /label> <
                input type = "text"
                className = "form-control"
                id = "email"
                required value = {
                    user.email
                }
                onChange = {
                    handleInputChange
                }
                name = "email" /
                >
                <
                /div> <
                div className = "form-group" >
                <
                label htmlFor = "title" > Phone Number < /label> <
                input type = "text"
                className = "form-control"
                id = "phn"
                required value = {
                    user.phone
                }
                onChange = {
                    handleInputChange
                }
                name = "phone" /
                >
                <
                /div>



                <
                button onClick = {
                    saveUser
                }
                className = "btn btn-success" >
                Submit <
                /button> <
                /div>
            )
        } <
        /div>
    );
};

export default AddUser