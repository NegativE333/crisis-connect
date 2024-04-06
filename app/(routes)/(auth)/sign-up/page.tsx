import { SignUp } from "@clerk/nextjs";


const SignUpPage = () => {
    return (  
        <div className="h-full w-full flex items-center justify-center">
            <SignUp />
        </div>
    );
}
 
export default SignUpPage;