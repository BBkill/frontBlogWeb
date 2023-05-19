import { useForm } from "react-hook-form";
import axios from "axios";
import "./RegisterForm.css"; // import file CSS

function RegisterForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    var getGender = (gender) => {
        if (gender === "male") {
            return 0;
        } 
        else
        if (gender === "female") {
            return 1;
        } 
        else
        if (gender === "other") {
            return 2;
        }  
    }

    const onSubmit = async (data) => {
        data.gender = getGender(data.gender);
        try {
            // http://localhost:9000/
            await axios.post("http://localhost:9081/reading-service/api/v1/user/register", data);
            // Đăng ký thành công, điều hướng đến trang chủ
            window.location.href = "/login";
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
            <h2>Register</h2>
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" {...register("username", { required: true })} />
                {errors.username && <span className="error-message">This field is required</span>}
            </div>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" {...register("name", { required: true })} />
                {errors.name && <span className="error-message">This field is required</span>}
            </div>
            <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <select id="gender" {...register("gender", { required: true })}>
                    <option value="">-- Select gender --</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
                {errors.gender && <span className="error-message">This field is required</span>}
            </div>
            <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input type="text" id="phone" {...register("phone", { required: true })} />
                {errors.phone && <span className="error-message">This field is required</span>}
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" {...register("password", { required: true })} />
                {errors.password && <span className="error-message">This field is required</span>}
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" {...register("email", { required: true })} />
                {errors.email && <span className="error-message">This field is required</span>}
            </div>
            <button type="submit" className="btn-register">Register</button>
        </form>
    );
}

export default RegisterForm;